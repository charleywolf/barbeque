import { revalidateTag } from "next/cache";

export async function timeoutPlaybackState(
  currentPosition: number | null,
  endPosition: number | null,
  timeOfRequest: number | null
) {
  // all times in ms
  if (!currentPosition || !endPosition || !timeOfRequest) return;

  const songLeft = endPosition - currentPosition;
  const endTime = songLeft + timeOfRequest;
  if (Date.now() > endTime) {
    revalidateTag("playback");
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(revalidateTag("playback"));
      }, endTime - Date.now());
    });
  }

  return;
}
