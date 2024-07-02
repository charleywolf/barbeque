"use client";

import {
  getCurrentPlaybackAction,
  getCurrentQueueAction,
} from "@/lib/actions/fetch";
import { useEffect, useState } from "react";

import Controls from "./Controls";
import NoPlayback from "../NoPlayback";
import Queue from "./Queue";
import Search from "./SearchModal";
import Volume from "./Volume";
import Wrapper from "../Wrapper";

export default function DashboardDisplay({
  playback,
  queue,
  admin,
}: {
  playback: SpotifyApi.CurrentlyPlayingResponse | null;
  queue?: SpotifyApi.UsersQueueResponse | null;
  admin?: true;
}) {
  const [currentPlayback, setCurrentPlayback] =
    useState<SpotifyApi.CurrentlyPlayingResponse | null>(playback);

  useEffect(() => {
    setCurrentPlayback(playback);
  }, [playback]);

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
        const data = await getCurrentPlaybackAction();
        const queueData = await getCurrentQueueAction();

        if (data && data.device.id === process.env.NEXT_PUBLIC_SPEAKER_ID) {
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
    <main className="screen">
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
          {admin && <Search />}
        </>
      ) : (
        <NoPlayback dashboard />
      )}
    </main>
  );
}
