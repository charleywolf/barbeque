"use server";

import { auth } from "@/auth";
import pausePlayback from "../fetch/pausePlayback";

export async function pauseResume(isPlaying: boolean): Promise<boolean> {
  const session = await auth();

  if (session && session.user) {
    if (isPlaying) {
      await pausePlayback();
      return true;
    } else {
      // finish
      return true;
    }
  } else {
    return false;
  }
}
