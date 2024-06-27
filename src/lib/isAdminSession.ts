import { Session } from "next-auth";

export default function isAdminSession(session: Session | null) {
  if (session && session.user && session.user.email) {
    const admins = process.env.ADMIN_USERS;
    if (!admins) return false;

    if (admins.split(" ").includes(session.user.email)) return true;
  }
}
