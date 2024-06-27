import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { DialogDescription } from "@radix-ui/react-dialog";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { capitalizeFirstLetter } from "@/lib/utils";

const View = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <h3 className="text-lg font-bold flex items-center">{title}:</h3>
      <span className="flex items-center justify-center">{value}</span>
    </>
  );
};

export interface InfoProps {
  songTitle: string;
  songArtists: string;
  albumName: string;
  songExplicit: boolean;
  albumType: string;
  albumTracks: number;
  songPopularity: number;
  albumReleaseDate: string;
}

export default function Info({
  songTitle,
  songArtists,
  albumName,
  songExplicit,
  albumType,
  albumTracks,
  albumReleaseDate,
  songPopularity,
}: InfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconInfoCircleFilled
          color="white"
          className="z-20 flex absolute top-3 right-3 h-10 w-10 hover:opacity-80"
        />
      </DialogTrigger>
      <DialogContent className="w-full overflow-y-scroll max-h-screen h-screen-res flex flex-col justify-start">
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
          <DialogDescription>
            Additional facts about the BBQ song.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center h-full py-5">
          <div className="grid grid-cols-2 gap-y-5">
            <h1 className="mt-5 font-bold text-3xl col-span-2 py-5">
              Song Details
            </h1>
            <View title="Title" value={songTitle} />
            <View title="Artists" value={songArtists} />
            <View
              title="Spotify Popularity Score"
              value={`${songPopularity} / 100`}
            />
            <View title="Explicit" value={songExplicit ? "Yes" : "No"} />

            <h1 className="font-bold text-3xl col-span-2 py-5">
              Album Information
            </h1>
            <View title="Name" value={albumName} />
            <View title="Type" value={capitalizeFirstLetter(albumType)} />
            <View title="Total Tracks" value={albumTracks.toString()} />
            <View title="Release Date" value={albumReleaseDate} />
          </div>
        </div>

        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
