const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

const envVarsToCheck = [
  "AUTH_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "SPOTIFY_CODE",
  "KV_URL",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
  "KV_REST_API_READ_ONLY_TOKEN",
  "NEXT_PUBLIC_SPEAKER_ID",
  "NEXTAUTH_URL",
  "ALLOWED_USERS",
  "ADMIN_USERS",
];

envVarsToCheck.forEach((envVar) => {
  if (process.env[envVar] === undefined) {
    console.error(`Missing environmental: ${envVar}`);
    process.exit(-1);
  }
});
