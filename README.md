# Barbeque

Barbeque is a web application which allows multiple people to control a Spotify Connect device at once.

**Note: A song must already be in the player (although _it can be paused_) before the dashboard can be used. If a song is not already in the player at build-time, it will take up to 60 seconds for the song to propogate and display.**

# Screenshots

<div style="display: flex">
  <img src="https://i.ibb.co/wCL3q1X/Screenshot-2024-06-26-at-9-55-57-PM.png" height="500" alt="Dashboard"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://i.ibb.co/G0PQFyF/localhost-3000-dashboard-i-Phone-XR-2.png" height="500" alt="Search"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://i.ibb.co/FV4sXYR/localhost-3000-dashboard-i-Phone-XR.png" height="500" alt="Queue"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://i.ibb.co/j5gX8Vz/localhost-3000-dashboard-i-Phone-XR-1.png" height="500" alt="Information"/>
</div>

# Features

- Google OAuth integration allows easy signin and an easy way to approve people (via their email address) to access your speaker.

- 5-second caching and revalidation upon a dashboard action lowers the cost on your host and lowers the requests sent to the Spotify API, to avoid ratelimiting.

- The PWA feature allows users to download the app on their devices and use like a native application.

- Guests (users without permitted accounts) can view the currently playing song along with its cover image and artist(s).

  - **Additional information about the song** is visible in the Info tab in the top right.

- Dashboard users can do **basic audio controls**: pause/resume, skip to the next song, skip to the last song, and control the volume.

- Admin users can do all of the above and also **search for songs and add them to the queue**, and **view the queue**.

# Deployment Guide

To deploy this project you must follow these steps:

- Configure your OAuth with Google
- Create and setup a Spotify application **(Spotify Premium Required)**
- Setup your environmental variables
- Deploy on a platform compatible with Next.js
  - **IMPORTANT NOTE:** Serverless architecture is not recommended to host this site, as it can be very costly with the amount of function invocations that come as a result of (as close to) real time updates as we have.

### Configure your OAuth with Google

- Go to [the google developer console](https://console.developers.google.com/apis/credentials).
- Press **Create Credentials** near the top of the page.
- In the appearing dropdown, choose **OAuth client ID**.
- The **Application type** should be Web application.
- Add the production domain, followed by **/api/auth/callback/google** as an **Authorized redirect URI**.
- Save the Client Id and Client Secret for environmental variables.

### Create and setup a Spotify Application

_From the Spotify Docs:_

- Login to the [dashboard](https://developer.spotify.com/dashboard) using your account.
- [Create an app](https://developer.spotify.com/documentation/web-api/concepts/apps) and select "Web API" for the question asking which APIs are you planning to use.
- Add the production domain, followed by **/api/spotify/generateRefreshToken** as a redirect URI. In addition, add http://localhost:3000 followed by that URL for local setup.
- Once you have created your app, save the Client ID and Client Secret for the environmental variables.

### Setup your environmental variables

Add these to wherever your environmental variables are stored.

`AUTH_SECRET`
Run `openssl rand -base64 33` on your terminal to generate a valid authentication secret, used to validate sessions.

`AUTH_GOOGLE_ID`
Your google client ID, from the previous steps.

`AUTH_GOOGLE_SECRET`
Your google client secret, from the previous steps.

`AUTH_URL`
The production url of your site. (development environments will be automatically detected)

`SPOTIFY_CLIENT_ID`
Your spotify client ID, from the previous steps.

`SPOTIFY_CLIENT_SECRET`
Your spotify client secret, from the previous steps.

`NEXT_PUBLIC_SPEAKER_ID`
Locate the Spotify Connect Speaker's Id that you are intending on using.

`ALLOWED_USERS`
Allowed email addresses to the dashboard, separated by space.

`ADMIN_USERS`
Users that are allowed to search for songs and add them to the queue; email addresses separated by space.

`SPOTIFY_REFRESH_TOKEN`
Run the application in development using `npm run dev` and open the `http://localhost:3000/api/spotify` route. Sign in to spotify, and the browser will display a refresh token. Save that as this. _If your app ever breaks and loses authentication for whatever reason, redo this step._

`SPOTIFY_PLAYLIST_URI`
Default playlist that allowed users can start if nothing is playing.
