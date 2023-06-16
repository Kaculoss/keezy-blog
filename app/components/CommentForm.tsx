"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CommentForm = ({ postId }: { postId: string }) => {
  const session = useSession();
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", comment: "", id: postId },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (session.status === "authenticated") {
      setShowError(false);
      setIsLoading(true);
      toast.promise(
        axios
          .post("/api/createComment", data)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false)),
        {
          loading: "Creating Comment...",
          success: "Comment Created!",
          error: "Something Went wrong!",
        }
      );
    } else {
      setShowError(true);
    }
  };

  if (isSubmitted)
    return (
      <div className="flex flex-col items-center gap-2 p-10 my-10 bg-bgColor text-white mx-auto">
        <h1 className="text-2xl font-bold">
          Thank you for submitting your comment!
        </h1>
        <p>Once it has been approved, it will appear below!</p>
      </div>
    );

  return (
    <form
      className="mt-7 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col">
        <span className="font-titleFont font-semibold text-base">Name</span>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register("name", { required: true })}
          className={`text-base placeholder:text-sm border-b-[1px] py-1 px-4 outline-none focus-within:shadow-xl ${
            errors["name"]
              ? "shadow-red-500 border-red-500"
              : "border-secondaryColor shadow-secondaryColor"
          }`}
        />
      </label>
      <label className="flex flex-col">
        <span className="font-titleFont font-semibold text-base">Email</span>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className={`text-base placeholder:text-sm border-b-[1px] py-1 px-4 outline-none focus-within:shadow-xl ${
            errors["email"]
              ? "shadow-red-500 border-red-500"
              : "border-secondaryColor shadow-secondaryColor"
          }`}
        />
      </label>
      <label className="flex flex-col">
        <span className="font-titleFont font-semibold text-base">Comment</span>
        <textarea
          rows={6}
          id="comment"
          placeholder="Enter your Comment"
          {...register("comment", { required: true })}
          className={`text-base placeholder:text-sm border-b-[1px] py-1 px-4 outline-none focus-within:shadow-xl ${
            errors["comment"]
              ? "shadow-red-500 border-red-500"
              : "border-secondaryColor shadow-secondaryColor"
          }`}
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-bgColor text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300"
      >
        Submit
      </button>
      {showError && (
        <p className="text-sm font-titleFont text-center w-full font-semibold my-1 text-red-500 px-4 animate-bounce italic">
          You need to sign in before you can comment on this post
        </p>
      )}
    </form>
  );
};

export default CommentForm;
