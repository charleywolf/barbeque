import Info, { InfoProps } from "@/components/Info";

import Image from "next/image";
import Overlay from "@/components/Overlay";
import clsx from "clsx";

export interface WrapperProps extends Omit<InfoProps, "songArtists"> {
  imageSrc: string;
  songArtists: SpotifyApi.ArtistObjectSimplified[];
  isPlaying: boolean;
  dashboard?: boolean;
}

export default function Wrapper({
  songTitle,
  songArtists,
  albumReleaseDate,
  albumName,
  songExplicit,
  albumType,
  albumTracks,
  songPopularity,
  imageSrc,
  isPlaying,
  dashboard,
}: WrapperProps) {
  const stringifiedArtists = songArtists.map((a) => a.name).join(", ");
  return (
    <>
      <div
        className={clsx(
          "z-20 flex flex-col absolute left-5",
          dashboard ? "bottom-36 lg:bottom-8 lg:left-8" : "bottom-5"
        )}
      >
        <Overlay songTitle={songTitle} songArtists={stringifiedArtists} />
      </div>

      <Info
        songTitle={songTitle}
        songArtists={stringifiedArtists}
        albumReleaseDate={albumReleaseDate}
        albumName={albumName}
        songExplicit={songExplicit}
        albumType={albumType}
        albumTracks={albumTracks}
        songPopularity={songPopularity}
      />

      <Image
        src={imageSrc}
        alt={`${albumName} Cover Art`}
        layout="fill"
        className={clsx(
          "object-cover blur-[5px]",
          !isPlaying ? "brightness-[0.3]" : "brightness-[0.5]"
        )}
      />
    </>
  );
}
