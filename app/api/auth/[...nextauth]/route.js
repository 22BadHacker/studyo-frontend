import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: '/Auth/Login',
  //   error: '/Auth/Login',
  // },
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/google-auth`, {
          email: user.email,
          username: user.name,
          profile_image: user.image,
        });

        return !!response.data.success;
      } catch (err) {
        console.error("Google sign-in failed", err);
        return false;
      }
    },

    async jwt({ token }) {
      return token;
    },

    async session({ session, token }) {
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl + '/'; // ✅ Change this to where you want to go after login
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
