const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

const envVarsToCheck = [
  "AUTH_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "SPOTIFY_REFRESH_TOKEN",
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
