"use client";

import Image from "next/image";
import Link from "next/link";
import logoDark from "../../public/images/logoDark.png";
import Keezy from "../../public/images/Sani Alhassan-.jpg";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">Home</li>
            <li className="headerLi">Posts</li>
            <li className="headerLi">Pages</li>
            <li className="headerLi">Features</li>
            <li className="headerLi">Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <Image
              height={40}
              width={40}
              className="w-8 h-8 rounded-full"
              src={Keezy}
              alt="logo"
            />
            <p className="text-sm font-medium">
              Hello{" "}
              {session.status === "authenticated"
                ? session.data?.user?.name
                : "Stranger"}
              !
            </p>
          </div>

          {session.status !== "unauthenticated" ? (
            <button
              type="button"
              onClick={() => signOut()}
              disabled={session.status === "loading"}
              className=" cursor-pointer uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className=" cursor-pointer uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
