import { auth } from "@/auth";
import dynamic from "next/dynamic";
import getPlaybackState from "@/lib/fetch/getPlaybackState";
import getQueue from "@/lib/fetch/getQueue";
import isAdminSession from "@/lib/isAdminSession";
import { redirect } from "next/navigation";

export const revalidate = 5;

const DynamicDashboardDisplay = dynamic(
  () => import("@/components/dashboard/DashboardDisplay"),
  {
    ssr: false,
  }
);

export default async function Dashboard() {
  const playback = await getPlaybackState();
  const session = await auth();

  if (session && session.user && session.user.email) {
    const admin = isAdminSession(session);
    if (admin) {
      const queue = await getQueue();
      return (
        <DynamicDashboardDisplay playback={playback} queue={queue} admin />
      );
    } else {
      return <DynamicDashboardDisplay playback={playback} />;
    }
  } else {
    redirect("/api/auth/signin");
  }
}
