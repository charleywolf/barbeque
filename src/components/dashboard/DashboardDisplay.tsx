"use client";

import { useEffect, useState } from "react";

import Controls from "./Controls";
import NoPlayback from "../NoPlayback";
import Wrapper from "../Wrapper";

export default function DashboardDisplay({
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

  const valid =
    currentPlayback &&
    currentPlayback.device.id === process.env.NEXT_PUBLIC_SPEAKER_ID;

  return (
    <main className="relative w-screen min-h-screen text-white">
      {valid && currentPlayback.item && "album" in currentPlayback.item ? (
        <>
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
            dashboard
          />
          <Controls isPlaying={currentPlayback.is_playing} />
        </>
      ) : (
        <NoPlayback />
      )}
    </main>
  );
}
