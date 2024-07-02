import { refresh, startPlaylist } from "@/lib/actions/controls";

import Link from "next/link";

export default function NoPlayback({ dashboard }: { dashboard?: boolean }) {
  const handleRefresh = async () => {
    const transferred = await startPlaylist();
    const refreshed = await refresh();
    if (refreshed && transferred) window.location.reload();
  };
  if (dashboard) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Waiting for the BBQ...
        </h1>
        <button
          onClick={handleRefresh}
          className="text-black h-10 z-20 flex bg-white px-3 py-2 rounded-full"
        >
          Start Playlist!
        </button>
      </div>
    );
  } else {
    return (
      <main className="screen flex items-center justify-center">
        <div className="text-2xl sm:text-3xl font-extrabold">
          Waiting for the BBQ...
        </div>
        <Link
          href="/dashboard"
          className="absolute text-black top-3 left-3 h-10 z-20 flex bg-white px-3 py-2 rounded-full"
        >
          Dashboard
        </Link>
      </main>
    );
  }
}
