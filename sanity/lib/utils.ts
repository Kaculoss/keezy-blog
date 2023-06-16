import { groq } from "next-sanity";
import { sanityClient } from "./client";
import { CommentType, Post, UserType } from "@/types/sanityTypes";

export const getPosts = async (): Promise<Post[]> => {
  return sanityClient.fetch(
    groq`*[_type == "post"] {
      _id,
      title, 
      "slug": slug.current,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      description,
      publishedAt,
      body,
      author -> {name, "image": image.asset->url, "imageAlt": image.alt, }
      }`
  );
};

export const getSinglePost = async (slug: string): Promise<Post> => {
  return sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title, 
      "slug": slug.current,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      description,
      publishedAt,
      body,
      author -> {name, "image": image.asset->url, "imageAlt": image.alt, }
      }`,
    { slug }
  );
};

export const getComment = async (id: string): Promise<CommentType[]> => {
  return sanityClient.fetch(
    groq`*[_type == "comment" && post._ref == $id && approved == true] {
      _id,
      name, 
      email,
      comment,
      post -> {title, description, _id, "slug": slug.current}
      }`,
    { id }
  );
};

export const getUser = async (email: string): Promise<UserType> => {
  return sanityClient.fetch(
    groq`*[_type == "user" && email == $email][0] {
      _id,
      name, 
      email,
      hashedPassword,
      }`,
    { email }
  );
};
