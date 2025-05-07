"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react"; // Using `next-auth/react`
import { useRouter } from "next/navigation";
import { ChartPie, Facebook, Github } from "lucide-react";
import Login from "@/components/Login";



const Page = () => {
  const { data: session, status } = useSession(); // Checking if user is logged in
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/myprofile"); // Redirect after successful login
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20 relative z-0">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-orange-400 opacity-100 z-0"></div>
      {/* Left Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-0 py-20 lg:py-20">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-cyan-400 tracking-wide mb-6">
          Welcome to <br /> WebWiz Creation
        </h1>
        <p className="text-lg text-gray-300 max-w-md lg:max-w-lg leading-relaxed  ">
          Step into the future of creativity and possibilities. Sign in to get started!
        </p>
      </div>
      {/* Right Section: Social Sign-In */}
      <div className="relative w-full lg:w-1/2 flex flex-col gap-6 items-center lg:items-start z-10 lg:mt-30">
        <h2 className="text-xl lg:text-2xl font-bold text-cyan-400 mb-4 lg:mb-6">Sign in to get started</h2>

        <button
          className="flex items-center gap-3 w-full shadow-md text-lg py-3 px-8 rounded-lg bg-gradient-to-r from-red-700 via-yellow-500 to-green-600 hover:scale-105 transform transition-all duration-300"
          onClick={() => signIn("google")}
        >
          <ChartPie className="text-2xl lg:text-3xl" /> Continue with Google
        </button>

        <button
          className="flex items-center gap-3 w-full shadow-md text-lg py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transform transition-all duration-300"
          onClick={() => signIn("facebook")}
        >
          <Facebook className="text-2xl lg:text-3xl" /> Continue with Facebook
        </button>

        <button
          className="text-white flex items-center gap-3 w-full shadow-md text-lg py-3 px-8 rounded-lg bg-gray-800 hover:scale-105 transform transition-all duration-300"
          onClick={() => signIn("github")}
        >
          <Github className="text-2xl lg:text-3xl text-white" /> Continue with GitHub
        </button>
        <Login/>

        {/* Terms & Privacy */}
        <div className="text-center lg:text-left text-sm text-gray-500 mt-6">
          By signing in, you accept our
          <Link href="/privacypolicy" className="text-blue-500 hover:underline"> Privacy Policy </Link>
          and
          <Link href="/termsofservices" className="text-blue-500 hover:underline"> Terms of Services </Link>.
        </div>
      </div>
    </main>
  );
};

export default Page;
