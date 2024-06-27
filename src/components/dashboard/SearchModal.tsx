import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconSearch } from "@tabler/icons-react";
import SearchComponent from "./SearchComponent";

export default function Search({}: {}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-3 left-16 bg-white text-neutral-500 h-10 rounded-full w-1/2 flex items-center justify-start gap-3 p-4">
          <IconSearch />
          Search
        </button>
      </DialogTrigger>
      <DialogContent className="w-full overflow-y-scroll max-h-screen h-screen-res flex flex-col justify-start">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            View and search the available songs and add to the queue.
          </DialogDescription>
        </DialogHeader>

        <SearchComponent />
      </DialogContent>
    </Dialog>
  );
}
