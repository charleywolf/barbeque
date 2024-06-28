import { IconExplicit } from "@tabler/icons-react";
import Image from "next/image";
import SearchCardSettings from "./SearchCardSettings";
import { SongCardProps } from "./SongCard";

export interface SearchCardProps extends Omit<SongCardProps, "index"> {
  uri: string;
}

export default function SearchCard({
  image,
  title,
  artists,
  explicit,
  uri,
}: SearchCardProps) {
  return (
    <div className="relative w-full grid grid-cols-4 gap-4 p-2 rounded-xl items-center">
      {/* IMAGE */}
      <div className="flex items-center justify-center">
        {image ? (
          <Image
            src={image.url}
            alt={`${title} Cover Art`}
            height={image.height}
            width={image.width}
            className="rounded-xl h-20 w-20 object-cover border border-neutral-600"
            loading="lazy"
          />
        ) : (
          <div className="rounded-xl h-20 w-20 aspect-square bg-neutral-800"></div>
        )}
      </div>

      {/* INFO */}
      <div className="gap-1 col-span-3 flex flex-col pr-10">
        <h1 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h1>
        <h2 className="text-lg text-neutral-500 overflow-hidden whitespace-nowrap text-ellipsis">
          {artists}
        </h2>
      </div>

      {/* EXPLICIT */}
      {explicit && <IconExplicit className="absolute top-3 right-3 h-5 w-5" />}

      {/* THREE DOTS */}

      <SearchCardSettings uri={uri} />
    </div>
  );
}
