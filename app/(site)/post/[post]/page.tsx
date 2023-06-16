import { Comment, CommentForm } from "@/app/components";
import { dataset, projectId } from "@/sanity/env";
import { getComment, getSinglePost } from "@/sanity/lib/utils";
import Image from "next/image";
import PortableText from "react-portable-text";

type Props = {
  params: { post: string };
};

const PostPage = async ({ params }: Props) => {
  const slug = params.post;
  const post = await getSinglePost(slug);
  const comments = await getComment(post._id);

  return (
    <>
      <Image
        src={post.image}
        alt={post.imageAlt}
        height={400}
        width={600}
        className="w-full h-96 object-cover"
      />
      <div className="max-w-3xl mx-auto mb-10">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10">
          <h1 className="font-titleFont font-medium text-[32px] text-primaryColor border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div>
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 object-cover bg-red-400"
            />
            <p className="font-bodyFont text-base">
              Blog post by{" "}
              <span className="font-bold text-secondaryColor">
                {post.author.name}
              </span>{" "}
              - Published at {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-10">
            <PortableText
              content={post.body}
              dataset={dataset}
              projectId={projectId}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="text-3xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a
                    className="text-cyan-500 hover:underline cursor-pointer"
                    href={href}
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border-[1px] border-secondaryColor" />

        <div>
          <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">
            Enjoyed this article?
          </p>
          <h3 className="font-titleFont text-3xl font-bold">
            Leave a Comment Below!
          </h3>
          <hr className="py-3 mt-2" />
          <CommentForm postId={post._id} />
          <Comment comments={comments} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
