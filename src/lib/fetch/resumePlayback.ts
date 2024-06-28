import "server-only";

import getUserAuthorization from "./getUserAuthorization";
import { revalidateTag } from "next/cache";

export default async function resumePlayback(): Promise<boolean> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({ device_id: process.env.NEXT_PUBLIC_SPEAKER_ID }),
    });

    if (data.status === 202 || data.status === 204) {
      revalidateTag("playback");
      return true;
    } else {
      throw Error("Invalid response from Spotify API");
    }
  } catch (e) {
    console.error("Fetch error in resumePlayback: " + e);
    return false;
  }
}
