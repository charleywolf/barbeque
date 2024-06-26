import "server-only";

import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

export default async function getUserAuthorization(): Promise<string> {
  try {
    noStore();
    const expiry = await kv.get<number>("expiry");

    if (expiry && Date.now() > expiry) {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      if (!clientId || !clientSecret)
        throw Error("Missing environment variables");

      const refreshToken = await kv.get<string>("refresh_token");
      if (!refreshToken) throw Error("No refresh token available!");

      const authOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        cache: "no-store",
      };

      const data = await fetch(
        "https://accounts.spotify.com/api/token",
        authOptions
      );
      const body = (await data.json()) as unknown;

      if (
        body &&
        typeof body === "object" &&
        "access_token" in body &&
        // "expires_in" in body &&
        body.access_token &&
        // body.expires_in &&
        typeof body.access_token === "string"
        // typeof body.expires_in === "number"
      ) {
        await kv.set("access_token", body.access_token);
        const newExpiry = Date.now() + 3600 * 1000;

        await kv.set("expiry", newExpiry);

        if ("refresh_token" in body && typeof body.refresh_token === "string")
          await kv.set("refresh_token", body.refresh_token);

        return body.access_token;
      } else {
        throw Error("Invalid response from Spotify API");
      }
    } else {
      const accessToken = await kv.get<string>("access_token");

      if (!accessToken) throw Error("No access token available");
      return accessToken;
    }
  } catch (e) {
    throw Error("Error fetching user authorization data: " + e);
  }
}
