import "server-only";

export default async function getUserAuthorization(): Promise<string> {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken)
      throw Error("Missing environment variables");

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
      next: { revalidate: 3600 },
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
      body.access_token &&
      typeof body.access_token === "string"
    ) {
      return body.access_token;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    throw Error("Error fetching user authorization data: " + e);
  }
}
