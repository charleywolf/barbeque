import { FormEvent, useRef, useState } from "react";

import { Button } from "../ui/button";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import SearchCard from "./SearchCard";
import SongCard from "./SongCard";
import { search } from "@/lib/actions/controls";

export default function SearchComponent() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SpotifyApi.TrackSearchResponse | null>(
    null
  );

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current) {
      const query = searchRef.current.value;
      const searchResults = await search(query);
      setResults(searchResults);
    }
  };

  return (
    <div className="flex flex-col items-center h-full py-5">
      <form
        onSubmit={handleSearch}
        className="w-full mx-2 flex gap-2 items-center px-3 py-2 h-10"
      >
        <Input
          ref={searchRef}
          type="text"
          placeholder="What do you want to play?"
        />
        <Button type="submit" className="rounded-full h-10">
          <IconSearch />
        </Button>
      </form>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {results?.tracks.items.map((song) => (
          <SearchCard
            key={song.id}
            uri={song.uri}
            title={song.name}
            artists={song.artists.map((a) => a.name).join(", ")}
            image={song.album.images[0]}
            explicit={song.explicit}
          />
        ))}
        {results && <hr className="h-10 col-span-full" />}
      </div>
    </div>
  );
}
