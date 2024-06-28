import "server-only";

import getUserAuthorization from "./getUserAuthorization";
import { revalidateTag } from "next/cache";

export default async function addItemToQueue(uri: string): Promise<boolean> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch(
      `https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(
        uri
      )}&type=track&limit=20`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    );

    if (data.status === 204) {
      revalidateTag("playback");
      return true;
    } else {
      throw Error(
        `Invalid response from Spotify API: ${data.status} ${data.statusText}`
      );
    }
  } catch (e) {
    console.error("Fetch error in addItemToQueue: " + e);
    return false;
  }
}
