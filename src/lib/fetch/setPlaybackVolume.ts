import "server-only";

import getUserAuthorization from "./getUserAuthorization";
import { revalidateTag } from "next/cache";

export default async function setPlaybackVolume(
  volumePercent: number
): Promise<boolean> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}&device_id=${process.env.NEXT_PUBLIC_SPEAKER_ID}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    );

    if (data.status === 202 || data.status === 204) {
      revalidateTag("playback");
      return true;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    console.error("Fetch error in setPlaybackVolume: " + e);
    return false;
  }
}
