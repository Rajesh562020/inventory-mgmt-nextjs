import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Explicitly type options as NextAuthOptions
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" }, // ✅ TS now accepts this
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    // 👇 add explicit param types
    async jwt({
      token,
      user,
    }: {
      token: any; // you can refine later
      user?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any; // can extend Session type later
      token: any;
    }) {
      if (session.user) {
        (session.user as any).id = token.id ?? token.sub ?? null;
        (session.user as any).email = token.email ?? null;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
