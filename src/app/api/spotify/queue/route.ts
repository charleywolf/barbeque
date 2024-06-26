import { NextResponse } from "next/server";
import { auth } from "@/auth";
import getQueue from "@/lib/fetch/getQueue";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.ADMIN_USERS) throw Error("Missing environmentals!");

  const adminList = process.env.ADMIN_USERS.split(" ");

  if (
    !session.user ||
    !session.user.email ||
    !adminList.includes(session.user.email)
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const queue = await getQueue();
  return NextResponse.json(queue);
}
