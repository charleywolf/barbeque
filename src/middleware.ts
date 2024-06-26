import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  if (!request.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
});

export const config = {
  matcher: ["/dashboard"],
};
