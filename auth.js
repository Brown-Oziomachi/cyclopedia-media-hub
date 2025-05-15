import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // Add user.id to the session
      session.user.id = user.id;
      // Include name and email from the token (which usually has it)
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture; // Also include the image
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the name and email into the token right after sign in
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture; // Also persist the image
      }
      return token;
    },
  },
});
