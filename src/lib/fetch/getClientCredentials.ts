import "server-only";

/**
 * Fetches access token for "Authorization" header - client credentials only
 * @returns {Promise<null | string>} - Returns a promise that resolves to a string containing the access token or null if an error occurred.
 */
export default async function getClientCredentials(): Promise<string> {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret)
      throw Error("Missing environment variables");

    const authOptions: RequestInit = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      method: "POST",
      body: ["grant_type=authorization_code"].join("&"),
      next: {
        revalidate: 3600,
      },
    };

    const authRequest = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const body = (await authRequest.json()) as unknown;
    if (
      typeof body === "object" &&
      body &&
      "access_token" in body &&
      "token_type" in body &&
      body.token_type &&
      body.access_token &&
      typeof body.access_token === "string" &&
      typeof body.token_type === "string"
    ) {
      return body.token_type + " " + body.access_token;
    } else {
      throw Error("Invalid response from Spotify API");
    }
  } catch (e) {
    throw Error("Fetch error: " + e);
  }
}
