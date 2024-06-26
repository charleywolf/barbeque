import "server-only";

import getUserAuthorization from "./getUserAuthorization";
import { timeoutPlaybackState } from "../timeout";

export default async function getPlaybackState(): Promise<SpotifyApi.CurrentlyPlayingResponse | null> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      next: {
        tags: ["playback"],
      },
    });

    if (data.status === 200) {
      const body = await data.json();

      const playbackState: SpotifyApi.CurrentlyPlayingResponse =
        body as SpotifyApi.CurrentPlaybackResponse;

      playbackState.is_playing &&
        playbackState.item &&
        timeoutPlaybackState(
          playbackState.progress_ms,
          playbackState.item.duration_ms,
          playbackState.timestamp
        );

      return playbackState;
    } else if (data.status === 204) {
      return null;
    } else {
      throw Error(data.status.toString());
    }
  } catch (e) {
    console.error("Fetch error: " + e);
    return null;
  }
}
