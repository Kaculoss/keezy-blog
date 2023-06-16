"use client";

import { CommentType } from "@/types/sanityTypes";
import { useSession } from "next-auth/react";

const Comment = ({ comments }: { comments: CommentType[] }) => {
  const session = useSession();

  return (
    <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
      <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
      <hr />
      {session.status === "authenticated" &&
        comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-secondaryColor">{comment.name} </span>
              {comment.comment}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Comment;
