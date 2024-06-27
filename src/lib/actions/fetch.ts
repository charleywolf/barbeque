import { auth } from "@/auth";
import getPlaybackState from "../fetch/getPlaybackState";
import getQueue from "../fetch/getQueue";
import isAdminSession from "../isAdminSession";

export async function getCurrentPlayback() {
  const playback = await getPlaybackState();
  return playback;
}

export async function getCurrentQueue() {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (!isAdminSession(session)) {
    return null;
  }

  const queue = await getQueue();
  return queue;
}
