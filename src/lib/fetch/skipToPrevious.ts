import "server-only";

import getUserAuthorization from "./getUserAuthorization";
import { revalidateTag } from "next/cache";

export default async function skipToPrevious(): Promise<boolean> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + authToken,
      },
      body: `device_id=${process.env.NEXT_PUBLIC_SPEAKER_ID}`,
    });

    if (data.status === 202 || data.status === 204) {
      revalidateTag("playback");
      return true;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    console.error("Fetch error: " + e);
    return false;
  }
}
