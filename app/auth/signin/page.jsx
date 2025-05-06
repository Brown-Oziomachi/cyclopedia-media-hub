import React from "react";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import AuthForm from "@/components/Login";
import { ChartPie, Facebook, Github } from "lucide-react";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect("/myprofile");
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row items-center  justify-between px-4 lg:px-20 relative z-0">
  {/* Background Glow */}
  
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-gray-900 to-orange-400 opacity-50 z-0"></div>

  {/* Left Section: Logo and Form */}
  
  <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-0 py-20 lg:py-20">
    <h1 className="text-4xl lg:text-6xl font-extrabold text-cyan-400 tracking-wide mb-6">
      Welcome to <br /> WebWiz Creation
    </h1>
    <p className="text-lg text-gray-300 max-w-md lg:max-w-lg leading-relaxed mb-8">
      Step into the future of creativity and possibilities. Sign in to get started!
    </p>
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg px-6 py-8 lg:px-8 lg:py-10">
      {/* <AuthForm /> */}
    </div>
    
  </div>



      {/* Right Section: Social Sign-In */}
      <div className="relative w-full lg:w-1/2 flex flex-col gap-6 items-center lg:items-start lg:mt-60 lg:ml-30 z-10 ">
        <h2 className="text-xl lg:text-2xl font-bold text-cyan-400 mb-4 lg:mb-6">
          Sign in to get started
        </h2>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="flex items-center gap-3 w-full shadow-md text-lg py-3 px-8 rounded-lg bg-gradient-to-r from-red-700 via-yellow-500 to-green-600 hover:scale-105 transform transition-all duration-300">
          <ChartPie  className="text-2xl lg:text-3xl" />
            Continue with Google
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("facebook");
          }}
        >
          <button className="flex items-center gap-3 w-full shadow-md text-lg py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transform transition-all duration-300">
          <Facebook  className="text-2xl lg:text-3xl" />
            Continue with Facebook
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button className=" text-white flex items-center gap-3 w-full shadow-md text-lg py-3 px-8 rounded-lg bg-gray-800 hover:scale-105 transform transition-all duration-300">
          <Github  className="text-2xl lg:text-3xl text-white" />
            Continue with GitHub
          </button>
        </form>

        {/* Terms & Privacy */}
        <div className="text-center lg:text-left text-sm text-gray-500 mt-6">
          By signing in, you accept our
          <Link href="/privacypolicy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          and
          <Link href="/termsofservices" className="text-blue-500 hover:underline">
            Terms of Services
          </Link>.
        </div>
      </div>
      
    </main>
  );
};

export default Page;
