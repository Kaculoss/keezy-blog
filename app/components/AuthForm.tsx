"use client";

import React, { useCallback, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { getUser } from "@/sanity/lib/utils";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const IsExistingUser = async (email: string) => {
    const user = await getUser(email);
    return user;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      IsExistingUser(data.email).then((user) => {
        console.log("User =>", user);
        if (user) {
          toast.error("Email Already Exists");
          setIsLoading(false);
        } else {
          toast
            .promise(axios.post("/api/register", data), {
              error: "Registration Went Wrong!",
              loading: "Registering...",
              success: "Registered Successfully!",
            })
            .then(() =>
              toast.promise(
                signIn("credentials", data).then((callback) => {
                  if (callback?.ok && !callback?.error) {
                    router.back();
                  }
                }),
                {
                  error: "Sign In Error!",
                  loading: "Logging In...",
                  success: "Logged In!",
                }
              )
            )
            .catch((err) => console.log("Toast Promise Err =>", err))
            .finally(() => setIsLoading(false));
        }
      });
    }

    if (variant === "LOGIN") {
      toast.promise(
        signIn("credentials", { ...data, redirect: false })
          .then((callback) => {
            if (callback?.ok && !callback?.error) {
              router.back();
            }
          })
          .finally(() => setIsLoading(false)),
        {
          error: "Sign In Error!",
          loading: "Logging In...",
          success: "Logged In!",
        }
      );
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullwidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Keezy Blog?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
