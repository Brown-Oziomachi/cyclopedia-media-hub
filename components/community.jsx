"use client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import Ads from "@/components/community";
import { LoaderCircle } from "lucide-react";

async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect(session ? "/community" : "/auth/signin");
  }
  return (
    <div className="min-h-screen bg-gray-400/5 text-white py-12 lg:px-12">
      {/* Header info bar */}
      <div className="max-w-4xl backdrop-blur-md rounded-xl shadow-lg p-6 mt-10 border border-gray-800 mx-auto">
        <div>
          <img src="/community.jpg" alt="community banner" className="w-full h-fit"/>
        </div>

        <div className=" text-center">
          <h1 className="text-center">
            <span className="text-green-600 text-center">Wiz_Community</span>{" "}
            Member
          </h1>
          <h2 className="text-xs text-center">{session?.user?.name}</h2>
        </div>
      </div>
      <div className="bg-gray-400/5 h-auto w-full py-5 border-t border-x mt-10 rounded-md">
        <h1 className="text-center text-white/90 text-lg font-semibold">
          Hello!{" "}
          <span className="text-green-600 font-serif">
            {session?.user?.name}
          </span>
        </h1>
        <h2 className="text-center text-white/70 text-3xl mt-1">
          Welcome to Wiz_Community.{" "}
        </h2>
        <h1 className="font-bold font-serif cursor-pointer  text-center py-10">
          Here you can chat with members of the <span className="text-green-600">Wiz_Community</span>
        </h1>
      </div>
      <h1 className="text-center">
        WE ARE BUILDING THE <span className="text-green-600">CHAT</span> SECTION
      </h1>
      <div className="flex items-center justify-center mt-5">
        <LoaderCircle className="text-green-600 w-14 h-14 animate-spin" />
      </div>
    </div>
  );
}
export default ProfilePage;
