import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            image: data.user.image,
            token: data.token,
            expires: data.expires,
          };
        } catch (error: unknown) {
          const defaultMessage = "Failed to login";
          const errorMessage =
            error instanceof Error
              ? error.message + defaultMessage
              : defaultMessage;
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.token = user.token;
        token.expires = user.expires;
        token.id = user.id
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.token = token.token as string;

      if(token.expires){
        session.expires = token.expires;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};
