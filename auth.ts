import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

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

        return { id: user.id, email: user.email, name: user.name, tenantId: user.tenantId  };
      },
    }),
  ],
  callbacks: {
    // 👇 add explicit param types
    async jwt({
      token,
      user,
    }: {
      token: JWT; // you can refine later
      user?: User;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.tenantId = user.tenantId ?? undefined;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session; // can extend Session type later
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.email = token.email ?? undefined;
        session.user.tenantId = token.tenantId ?? undefined;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
