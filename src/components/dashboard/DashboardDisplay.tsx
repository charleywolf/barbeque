"use client";

import { useEffect, useState } from "react";

import Controls from "./Controls";
import NoPlayback from "../NoPlayback";
import Volume from "./Volume";
import Wrapper from "../Wrapper";

export default function DashboardDisplay({
  playback,
}: {
  playback: SpotifyApi.CurrentlyPlayingResponse | null;
}) {
  const [currentPlayback, setCurrentPlayback] =
    useState<SpotifyApi.CurrentlyPlayingResponse | null>(playback);

  const [isPlaying, setIsPlaying] = useState<boolean>(
    playback?.is_playing ?? false
  );

  const [volume, setVolume] = useState<number | null>(
    playback?.device.volume_percent ?? null
  );

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
    <main className="relative w-screen bg-slate-900 min-h-screen text-white">
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
            isPlaying={isPlaying}
            dashboard
          />
          <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <Volume volume={volume} setVolume={setVolume} />
        </>
      ) : (
        <NoPlayback />
      )}
    </main>
  );
}
