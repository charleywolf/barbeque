import dynamic from "next/dynamic";
import getPlaybackState from "@/lib/fetch/getPlaybackState";

const DynamicPublicDisplay = dynamic(
  () => import("@/components/public/PublicDisplay"),
  {
    ssr: false,
  }
);

export default async function Home() {
  const playback = await getPlaybackState();

  return <DynamicPublicDisplay playback={playback} />;
}
