import NextAuth, { AuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../../../../sanity/env";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient, groq } from "next-sanity";
import { getUser } from "@/sanity/lib/utils";
import bcrypt from "bcrypt";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_API_TOKEN,
});

const authOptions: AuthOptions = {
  adapter: SanityAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        let credEmail = credentials.email;

        const user = await client.fetch(
          groq`*[_type == "user" && email == $credEmail][0] {
            _id,
            name, 
            email,
            hashedPassword,
            }`,
          { credEmail }
        );

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
    // SanityCredentials(client), // only if you use sign in with credentials
  ],
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
