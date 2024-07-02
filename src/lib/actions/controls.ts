"use server";

import addItemToQueue from "../fetch/addItemToQueue";
import { auth } from "@/auth";
import isAdminSession from "../isAdminSession";
import pausePlayback from "../fetch/pausePlayback";
import resumePlayback from "../fetch/resumePlayback";
import { revalidateTag } from "next/cache";
import searchForItem from "../fetch/searchForItem";
import setPlaybackVolume from "../fetch/setPlaybackVolume";
import skipToNext from "../fetch/skipToNext";
import skipToPrevious from "../fetch/skipToPrevious";
import transferPlaybackState from "../fetch/transferPlaybackState";

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

export async function search(
  query: string
): Promise<SpotifyApi.TrackSearchResponse | null> {
  const session = await auth();

  if (query !== "" && isAdminSession(session)) {
    const results = await searchForItem(query);
    return results;
  }

  return null;
}

export async function add(uri: string): Promise<boolean> {
  const session = await auth();

  if (isAdminSession(session)) {
    const status = await addItemToQueue(uri);
    return status;
  } else {
    return false;
  }
}

export async function refresh() {
  const session = await auth();

  if (session && session.user && session.user.email) {
    revalidateTag("playback");
    return true;
  } else {
    return false;
  }
}

export async function startPlaylist() {
  const session = await auth();
  if (session && session.user) {
    await transferPlaybackState();
    const status = await resumePlayback(process.env.SPOTIFY_PLAYLIST_URI);
    return status;
  } else {
    return false;
  }
}
