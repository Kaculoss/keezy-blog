import { PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  author: Author;
  description: string;
  publishedAt: string;
  body: PortableTextBlock[];
};

export type Author = {
  imageAlt: string;
  name: string;
  image: string;
};

export type CommentType = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  post: SmallPost;
};

export type SmallPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  hashedPassword: string;
};
