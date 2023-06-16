// app/api/sanity/signUp/route.ts
import { signUpHandler } from "next-auth-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../../../../sanity/env";
import { createClient } from "next-sanity";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_API_TOKEN,
});

export const POST = signUpHandler(client);
