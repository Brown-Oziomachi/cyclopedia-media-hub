import Link from "next/link";
import { redirect, } from "next/navigation";
import { ChartPie, Facebook, Github } from "lucide-react";
import { auth, signIn } from "@/auth";



const page = async () => {
  
  
  const session = await auth();
  if (session) {
    redirect("/profile");
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
        <p className="text-lg text-gray-300 lg:max-w-lg leading-relaxed  ">
          Step into the future of creativity and possibilities. Sign in to get started!
        </p>
      </div>
      {/* Right Section: Social Sign-In */}
      <div className="relative w-full lg:w-1/2 flex flex-col  items-center lg:items-start z-10 lg:mt-30 ">
        <h2 className="text-xl lg:text-2xl font-bold text-cyan-400 mb-4 lg:mb-6 lg:ml-50">Sign in to get started</h2>

        <div className="max-w-2xl mx-auto my-1 p-5 flex flex-col justify-center items-center gap-10">
        <form
        action={async () => {
            "use server";
            await signIn("google");
            }}
            >
            <button className="flex items-center gap-2 shadow-md text-lg py-2 px-5 lg:px-10 rounded-full cursor-pointer text-white bg-[#4285F4] hover:bg-[#357ae8] transition duration-300">
            <ChartPie className="text-2xl" />
            Sign in with Google
            </button>
            </form>

            <form
            action={async () => {
            "use server";
            await signIn("github");
            }}
          >
            <button className="flex items-center  gap-2 shadow-md text-lg py-2 px-5 lg:px-10 rounded-full cursor-pointer text-white bg-black transition duration-300 ">
            <Github className="text-2xl" />
            Sign in with Github
            </button>
          </form>
      
        {/* Terms & Privacy */}
        <div className="text-center lg:text-left text-sm text-gray-500 mb-10">
          By signing in, you accept our
          <Link href="/privacypolicy" className="text-blue-500 hover:underline"> Privacy Policy </Link>
          and
        <Link href="/termsofservices" className="text-blue-500 hover:underline"> Terms of Services </Link>.
        </div>
      </div>
      </div>
      {/* Footer Section */}
      <footer className="absolute bottom-0 left-0 w-full py-4 bg-gray-900 text-center text-gray-500 ">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WebWiz Creation. All rights reserved.
        </p>
      </footer>
    </main>
  );
};


export default page;
