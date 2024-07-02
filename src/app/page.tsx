import PublicDisplay from "@/components/public/PublicDisplay";
import getPlaybackState from "@/lib/fetch/getPlaybackState";

export const revalidate = 5;

export default async function Home() {
  const playback = await getPlaybackState();

  return <PublicDisplay playback={playback} />;
}
