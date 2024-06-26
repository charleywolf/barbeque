"use server";

import { auth } from "@/auth";
import pausePlayback from "../fetch/pausePlayback";
import resumePlayback from "../fetch/resumePlayback";
import setPlaybackVolume from "../fetch/setPlaybackVolume";
import skipToNext from "../fetch/skipToNext";
import skipToPrevious from "../fetch/skipToPrevious";

export async function pauseResume(isPlaying: boolean): Promise<boolean> {
  const session = await auth();

  if (session && session.user) {
    if (isPlaying) {
      const status = await pausePlayback();
      return status;
    } else {
      const status = await resumePlayback();
      return status;
    }
  } else {
    return false;
  }
}

export async function skip(back?: boolean): Promise<boolean> {
  const session = await auth();

  if (session && session.user) {
    if (back) {
      // skip to previous track
      const status = await skipToPrevious();
      return status;
    } else {
      // skip to next track
      const status = await skipToNext();
      return status;
    }
  } else {
    return false;
  }
}

export async function saveVolume(volumePercent: number): Promise<boolean> {
  const session = await auth();

  if (session && session.user) {
    const status = await setPlaybackVolume(volumePercent);
    return status;
  } else {
    return false;
  }
}
