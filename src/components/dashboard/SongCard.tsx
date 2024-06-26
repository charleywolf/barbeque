import { IconExplicit } from "@tabler/icons-react";
import Image from "next/image";
import clsx from "clsx";

export interface SongCardProps {
  image?: SpotifyApi.ImageObject;
  title: string;
  artists: string;
  explicit: boolean;
  index: number;
}

export default function SongCard({
  image,
  title,
  artists,
  index,
  explicit,
}: SongCardProps) {
  return (
    <div
      className={clsx(
        "relative w-full grid grid-cols-10 gap-2 p-2 rounded-xl items-center",
        index === 1
          ? "animate-active-song hover:bg-yellow-300"
          : "hover:bg-neutral-100"
      )}
    >
      {/* NUMBER */}
      <div className="flex items-center justify-center">
        <span className="py-1 px-2 border-2 border-black rounded-xl h-fit">
          {index}
        </span>
      </div>

      {/* IMAGE */}
      <div className="flex col-span-3 items-center justify-center">
        {image ? (
          <Image
            src={image.url}
            alt={`${title} Cover Art`}
            height={image.height}
            width={image.width}
            className="rounded-xl h-20 w-20 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="rounded-xl h-20 w-20 aspect-square bg-neutral-800"></div>
        )}
      </div>

      {/* INFO */}
      <div className="gap-1 col-span-6 flex flex-col">
        <h1 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h1>
        <h2 className="text-lg text-neutral-500 overflow-hidden whitespace-nowrap text-ellipsis">
          {artists}
        </h2>
      </div>

      {/* EXPLICIT */}
      {explicit && <IconExplicit className="absolute top-3 right-3 h-5 w-5" />}
    </div>
  );
}
