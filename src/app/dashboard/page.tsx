import { auth } from "@/auth";
import dynamic from "next/dynamic";
import getPlaybackState from "@/lib/fetch/getPlaybackState";
import getQueue from "@/lib/fetch/getQueue";
import { redirect } from "next/navigation";

const DynamicDashboardDisplay = dynamic(
  () => import("@/components/dashboard/DashboardDisplay"),
  {
    ssr: false,
  }
);

export default async function Dashboard() {
  const playback = await getPlaybackState();
  const user = await auth();

  if (user && user.user && user.user.email) {
    if (!process.env.ADMIN_USERS) throw Error("Missing environmentals!");
    const adminList = process.env.ADMIN_USERS.split(" ");

    const admin = adminList.includes(user.user.email);
    if (admin) {
      const queue = await getQueue();
      return <DynamicDashboardDisplay playback={playback} queue={queue} />;
    } else {
      return <DynamicDashboardDisplay playback={playback} />;
    }
  } else {
    redirect("/api/auth/signin");
  }
}
