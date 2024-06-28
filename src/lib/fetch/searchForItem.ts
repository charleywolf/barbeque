import "server-only";

import getClientCredentials from "./getClientCredentials";

export default async function searchForItem(
  query: string
): Promise<SpotifyApi.TrackSearchResponse | null> {
  try {
    const authToken = await getClientCredentials();

    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    );

    if (data.status === 200) {
      const body = (await data.json()) as SpotifyApi.TrackSearchResponse;
      return body;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    console.error("Fetch error in searchForItem: " + e);
    return null;
  }
}
