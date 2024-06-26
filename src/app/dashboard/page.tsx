import DashboardDisplay from "@/components/dashboard/DashboardDisplay";
import { auth } from "@/auth";
import getPlaybackState from "@/lib/fetch/getPlaybackState";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const playback = await getPlaybackState();
  const user = await auth();

  if (user && user.user && user.user.email) {
    return <DashboardDisplay playback={playback} />;
  } else {
    redirect("/api/auth/signin");
  }
}
