"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import NoPlayback from "../NoPlayback";
import PauseOverlay from "./PauseOverlay";
import Wrapper from "../Wrapper";

export default function PublicDisplay({
  playback,
}: {
  playback: SpotifyApi.CurrentlyPlayingResponse | null;
}) {
  const [currentPlayback, setCurrentPlayback] =
    useState<SpotifyApi.CurrentlyPlayingResponse | null>(playback);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!document.hidden) {
        const response = await fetch("/api/spotify/current-playback");
        const data =
          (await response.json()) as SpotifyApi.CurrentlyPlayingResponse;
        if (
          data &&
          typeof data === "object" &&
          "device" in data &&
          data.device.id === process.env.NEXT_PUBLIC_SPEAKER_ID
        ) {
          setCurrentPlayback(data);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (
    currentPlayback &&
    currentPlayback.item &&
    "album" in currentPlayback.item &&
    currentPlayback.device.id === process.env.NEXT_PUBLIC_SPEAKER_ID
  ) {
    return (
      <main className="relative w-screen bg-slate-900 min-h-screen text-white">
        <Wrapper
          songTitle={currentPlayback.item.name}
          songArtists={currentPlayback.item.artists}
          albumReleaseDate={currentPlayback.item.album.release_date}
          albumName={currentPlayback.item.album.name}
          songExplicit={currentPlayback.item.explicit}
          albumType={currentPlayback.item.album.album_type}
          albumTracks={currentPlayback.item.album.total_tracks}
          songPopularity={currentPlayback.item.popularity}
          imageSrc={currentPlayback.item.album.images[0].url}
          isPlaying={currentPlayback.is_playing}
        />

        <Link
          href="/dashboard"
          className="absolute text-black top-3 left-3 h-10 z-20 flex bg-white px-3 py-2 rounded-full"
        >
          Dashboard
        </Link>

        {!currentPlayback.is_playing && <PauseOverlay />}
      </main>
    );
  } else {
    return <NoPlayback />;
  }
}
