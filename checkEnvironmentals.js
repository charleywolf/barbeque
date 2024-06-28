const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

const envVarsToCheck = [
  "AUTH_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_URL",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "SPOTIFY_REFRESH_TOKEN",
  "ALLOWED_USERS",
  "ADMIN_USERS",
];

envVarsToCheck.forEach((envVar) => {
  if (process.env[envVar] === undefined) {
    console.error(`Missing environmental: ${envVar}`);
    process.exit(-1);
  }
});
