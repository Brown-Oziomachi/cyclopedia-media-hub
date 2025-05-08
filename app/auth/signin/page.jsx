import Link from "next/link";
import { redirect, } from "next/navigation";
import { ChartPie, Facebook, Github } from "lucide-react";
import Login from "@/components/Login";
import { auth, signIn } from "@/auth";



const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/upload-to-blog");
  }

  
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

        <div className="max-w-2xl mx-auto my-1 p-5 flex flex-col justify-center items-center gap-10">
        <form
        action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="flex items-center md:gap-5 gap-2 shadow-md text-lg py-2 px-20 lg:px-30  rounded-full cursor-pointer text-white bg-gradient-to-r from-red-500 via-green-500 to-yellow-400 transition duration-300">
            <ChartPie className="text-2xl" />
             Google
          </button>

        </form>

        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button className="flex items-center md:gap-5 gap-2 shadow-md text-lg py-2 px-23 lg:px-30 text-white bg-black rounded-full cursor-pointer ">
            <Github className="text-2xl text-gray-800" />
             Github
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("facebook");
          }}
        >
          <button className="flex items-center md:gap-5 gap-2 shadow-md text-lg py-2 px-20 lg:px-30  text-white bg-blue-500 rounded-full cursor-pointer">
            <Facebook className="text-2xl text-gray-800" />
            Facebook
          </button>
        </form>
        <Login/>

        {/* Terms & Privacy */}
        <div className="text-center lg:text-left text-sm text-gray-500 mt-6">
          By signing in, you accept our
          <Link href="/privacypolicy" className="text-blue-500 hover:underline"> Privacy Policy </Link>
          and
        <Link href="/termsofservices" className="text-blue-500 hover:underline"> Terms of Services </Link>.
        </div>
      </div>
    </div>
    </main>
  )
  }

export default page;
