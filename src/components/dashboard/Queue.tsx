import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconBrandSpotifyFilled } from "@tabler/icons-react";
import SongCard from "./SongCard";

export default function Queue({
  queueResponse,
}: {
  queueResponse: SpotifyApi.UsersQueueResponse;
}) {
  const { currently_playing, queue } = queueResponse;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconBrandSpotifyFilled
          color="white"
          className="z-20 flex absolute top-3 left-3 h-10 w-10 hover:opacity-80"
        />
      </DialogTrigger>
      <DialogContent className="w-full overflow-y-scroll h-screen-res max-h-screen flex flex-col justify-start">
        <DialogHeader>
          <DialogTitle>Queue</DialogTitle>
          <DialogDescription>View the BBQ queue.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center h-full py-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currently_playing.type === "track" && (
              <SongCard
                title={currently_playing.name}
                artists={currently_playing.artists
                  .map((a) => a.name)
                  .join(", ")}
                image={currently_playing.album.images[0]}
                explicit={currently_playing.explicit}
                index={1}
              />
            )}

            {queue.map((song, index) => {
              if (song.type === "track") {
                return (
                  <SongCard
                    index={index + 2}
                    key={song.id}
                    image={song.album.images[0]}
                    title={song.name}
                    artists={song.artists.map((a) => a.name).join(", ")}
                    explicit={song.explicit}
                  />
                );
              }
            })}
            <hr className="h-10 col-span-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
