// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/Auth/Login", // optional: custom login page
//   },
// });
'use client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { useAppHook } from '@/context/AppProvider';

const { authToken } = useAppHook();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Optional: Add custom pages or theme
  pages: {
    signIn: '/auth/signin',
  },
  // Optional: Add custom session handling
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider
      session.user.id = token.sub;
      return session;
    },
  },
  // Optional: Enable debug messages in the console if you're having problems
  debug: process.env.NODE_ENV === 'development',
});
