import Link from "next/link";

export default function NoPlayback({ dashboard }: { dashboard?: boolean }) {
  if (dashboard) {
    return (
      <div className="text-2xl sm:text-3xl font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Waiting for the BBQ...
      </div>
    );
  } else {
    return (
      <main className="relative w-screen min-h-screen text-white bg-slate-900 flex items-center justify-center">
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
