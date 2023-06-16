import { getPosts } from "@/sanity/lib/utils";
import { Banner, BannerBottom } from "../components";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [posts] = await Promise.all([getPosts()]);

  return (
    <>
      <Banner />
      <div className="max-w-7xl mx-auto h-60 relative">
        <BannerBottom />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group ">
              <div className="h-3/5 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt || "postImage"}
                  width={380}
                  height={350}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                />
              </div>
              <div className="h-2/5 w-full flex flex-col justify-center">
                <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                  <p>{post.title}</p>
                  <Image
                    src={post.author.image}
                    alt={post.author.imageAlt}
                    height={50}
                    width={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <p className="py-2 px-4 text-base">
                  {post.description.substring(0, 60)}... by -
                  <span className="font-semibold"> {post.author.name}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
