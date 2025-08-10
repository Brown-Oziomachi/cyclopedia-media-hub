import Link from "next/link";
import { redirect } from "next/navigation";
import { ChartPie, Github } from "lucide-react";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect("/blog");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-gray-600 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-10 transition-all duration-500 ease-in-out hover:shadow-green-500/30">
        
        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide">
            Welcome to <span className="text-green-400">Cyclopedia</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Uncover the hidden truths. Sign in to explore.
          </p>
        </header>

        {/* SIGN-IN BUTTONS */}
        <section className="space-y-4">
          {/* Google Sign In */}
          <form action>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 border border-green-500 bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-green-500/10 hover:border-green-400 transition-all"
              aria-label="Sign in with Google"
            >
              <ChartPie className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>

          {/* GitHub Sign In */}
          <form action>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 border border-gray-500 bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 hover:border-gray-400 transition-all"
              aria-label="Sign in with GitHub"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>
          </form>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-gray-400 space-y-3">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="/privacypolicy"
              className="text-green-500 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/termsofservices"
              className="text-green-500 hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
          <p className="select-none">
            &copy; {new Date().getFullYear()} Cyclopedia. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Page;
