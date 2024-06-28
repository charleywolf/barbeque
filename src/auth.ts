import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedUsers = process.env.ALLOWED_USERS;
      if (!allowedUsers || !profile || !profile.email) return false;

      const users = allowedUsers.split(" ");

      if (users.includes(profile.email)) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});
