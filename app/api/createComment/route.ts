import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import prismaClient from "@/app/libs/prismadb";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../../../sanity/env";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, id, comment } = body;

    const post = await client.create({
      _type: "comment",
      post: { _type: "reference", _ref: id },
      name,
      email,
      comment,
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error, "CREATE_COMMENT_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
