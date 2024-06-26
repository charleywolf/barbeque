"use client";

import { useEffect, useState } from "react";

import Controls from "./Controls";
import NoPlayback from "../NoPlayback";
import Queue from "./Queue";
import Volume from "./Volume";
import Wrapper from "../Wrapper";

export default function DashboardDisplay({
  playback,
  queue,
}: {
  playback: SpotifyApi.CurrentlyPlayingResponse | null;
  queue?: SpotifyApi.UsersQueueResponse | null;
}) {
  const [currentPlayback, setCurrentPlayback] =
    useState<SpotifyApi.CurrentlyPlayingResponse | null>(playback);

  const [isPlaying, setIsPlaying] = useState<boolean>(
    playback?.is_playing ?? false
  );

  const [volume, setVolume] = useState<number | null>(
    playback?.device.volume_percent ?? null
  );

  const [currentQueue, setCurrentQueue] = useState<
    SpotifyApi.UsersQueueResponse | null | undefined
  >(queue);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!document.hidden) {
        const response = await fetch("/api/spotify/current-playback");
        const data =
          (await response.json()) as SpotifyApi.CurrentlyPlayingResponse;

        const queueResponse = await fetch("/api/spotify/queue");
        const queueData =
          (await queueResponse.json()) as SpotifyApi.UsersQueueResponse;

        if (
          data &&
          typeof data === "object" &&
          "device" in data &&
          data.device.id === process.env.NEXT_PUBLIC_SPEAKER_ID
        ) {
          if (currentPlayback?.device.volume_percent === volume) {
            setVolume(data?.device.volume_percent);
          }
          setCurrentPlayback(data);
          setIsPlaying(data.is_playing);
        }

        if (
          queueData &&
          typeof queueData === "object" &&
          "queue" in queueData
        ) {
          setCurrentQueue(queueData);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  });

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
          {currentQueue && <Queue queueResponse={currentQueue} />}
          <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <Volume volume={volume} setVolume={setVolume} />
        </>
      ) : (
        <NoPlayback dashboard />
      )}
    </main>
  );
}
