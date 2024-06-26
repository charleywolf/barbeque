import { revalidateTag } from "next/cache";

export function timeoutPlaybackState(
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
    setTimeout(() => {
      revalidateTag("playback");
    }, endTime - Date.now());
  }

  return;
}
