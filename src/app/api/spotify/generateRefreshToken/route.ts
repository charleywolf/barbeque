import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const siteAddress = process.env.NEXTAUTH_URL;

  if (!code)
    return NextResponse.json(
      { message: "Bad Request: Missing Code Parameter" },
      { status: 400 }
    );

  if (!clientId || !clientSecret || !siteAddress)
    throw new Error("Missing environment variables");

  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      redirect_uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000" + "/api/spotify/generateRefreshToken"
          : siteAddress + "/api/spotify/generateRefreshToken",
      code: code,
    }),
    cache: "no-store",
  });

  const body = (await data.json()) as unknown;

  if (
    body &&
    typeof body === "object" &&
    "refresh_token" in body &&
    body.refresh_token &&
    typeof body.refresh_token === "string"
  ) {
    return NextResponse.json(
      {
        message:
          "Do not share this refresh token. Save it as SPOTIFY_REFRESH_TOKEN in your environmentals.",
        refresh_token: body.refresh_token,
      },
      { status: 200 }
    );
  }
}
