import Link from "next/link";
import { redirect } from "next/navigation";
import { ChartPie, Github } from "lucide-react";
import { auth, signIn } from "@/auth";

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/profile");
  }

  return (
    <main className="min-h-screen bg-gray-400/5 border-x flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-400/10 border-y rounded-lg shadow-xl p-8 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Welcome to WebWiz Creation
          </h1>
          <p className="text-green-600">
            Sign in to unlock your creative potential.
          </p>
        </header>

        <section className="space-y-6">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center border border-green-600 gap-3 border-b-4 bg-white/5 border-x text-white font-semibold py-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-500 transition"
              aria-label="Sign in with Google"
            >
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
            <button
              type="submit"
              className="w-full flex items-center justify-center  border border-green-600 border-b-4 gap-3 bg-gray-400/5 border-x text-white font-semibold py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500 transition"
              aria-label="Sign in with Github"
            >
              <Github className="text-2xl" />
              Sign in with GitHub
            </button>
          </form>
        </section>

        <footer className="text-center text-sm text-gray-400">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="/privacypolicy"
              className="text-green-600 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/termsofservices"
              className="text-green-600 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Terms of Service
            </Link>
            .
          </p>
          <p className="mt-4 select-none">&copy; {new Date().getFullYear()} WebWiz Creation. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default page;
