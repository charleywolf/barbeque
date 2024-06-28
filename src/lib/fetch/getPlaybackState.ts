import "server-only";

import getUserAuthorization from "./getUserAuthorization";

export default async function getPlaybackState(): Promise<SpotifyApi.CurrentlyPlayingResponse | null> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      next: {
        tags: ["playback"],
        revalidate: 5,
      },
    });

    if (data.status === 200) {
      const body = await data.json();

      const playbackState: SpotifyApi.CurrentlyPlayingResponse =
        body as SpotifyApi.CurrentPlaybackResponse;

      return playbackState;
    } else if (data.status === 204) {
      return null;
    } else {
      throw Error(`${data.status} - ${data.statusText}`);
    }
  } catch (e) {
    console.error("Fetch error in getPlaybackState: " + e);
    return null;
  }
}
