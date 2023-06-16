import NextAuth, { AuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../../../../sanity/env";
import { createClient } from "next-sanity";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_API_TOKEN,
});

export const authOptions: AuthOptions = {
  adapter: SanityAdapter(client),
  providers: [
    SanityCredentials(client), // only if you use sign in with credentials
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
