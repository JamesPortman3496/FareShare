import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim() || "";
        const password = credentials?.password?.toString() || "";
        const name = credentials?.name?.toString().trim() || undefined;
        const mode = credentials?.mode === "signup" ? "signup" : "signin";

        const demoEmail = process.env.DEMO_USER_EMAIL || "demo@fareshare.app";
        const demoPassword = process.env.DEMO_USER_PASSWORD || "password123";

        if (email === demoEmail && password === demoPassword) {
          return {
            id: "demo-user",
            email: demoEmail,
            name: "Demo User",
            mode,
          };
        }

        if (!email || !password) {
          return null;
        }
        if (password.length < 8) {
          // simple client-side validation; replace with backend check
          return null;
        }

        // TODO: replace with real backend calls
        // For now accept any email/password and return a basic user object.
        return {
          id: email,
          email,
          name: name || email.split("@")[0],
          mode,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
});

export { handler as GET, handler as POST };
