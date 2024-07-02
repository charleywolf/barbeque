import "server-only";

import getUserAuthorization from "./getUserAuthorization";

export default async function getPlaybackState(): Promise<boolean> {
  try {
    const authToken = await getUserAuthorization();

    const data = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({
        device_ids: [process.env.NEXT_PUBLIC_SPEAKER_ID],
        play: false,
      }),
    });

    if (data.status === 204) {
      return true;
    } else {
      throw Error(`${data.status} - ${data.statusText}`);
    }
  } catch (e) {
    console.error("Fetch error in transferPlaybackState: " + e);
    return false;
  }
}
