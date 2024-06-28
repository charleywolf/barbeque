import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams();

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const site_address = process.env.AUTH_URL;

  if (!client_id || !site_address)
    throw new Error("Missing environment variables");

  params.append("client_id", client_id);
  params.append("response_type", "code");
  params.append(
    "scope",
    "user-read-playback-state user-modify-playback-state user-read-currently-playing"
  );
  if (process.env.NODE_ENV === "development") {
    params.append(
      "redirect_uri",
      "http://localhost:3000" + "/api/spotify/generateRefreshToken"
    );
  } else {
    params.append(
      "redirect_uri",
      site_address + "/api/spotify/generateRefreshToken"
    );
  }

  return NextResponse.redirect(
    "https://accounts.spotify.com/authorize?" + params
  );
}
