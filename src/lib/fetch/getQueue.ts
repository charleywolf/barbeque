import "server-only";

import getUserAuthorization from "./getUserAuthorization";

export default async function getQueue(): Promise<SpotifyApi.UsersQueueResponse | null> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
      },
      next: {
        tags: ["playback"],
      },
    });

    if (data.status === 200) {
      const body = (await data.json()) as SpotifyApi.UsersQueueResponse;
      return body;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    console.error("Fetch error in getQueue: " + e);
    return null;
  }
}
