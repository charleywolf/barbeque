import { NextResponse } from "next/server";
import getPlaybackState from "@/lib/fetch/getPlaybackState";

export async function GET() {
  const playback = await getPlaybackState();

  return NextResponse.json(playback);
}
