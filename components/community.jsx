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
            Member:
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
      </div>
      {/* Public Chat Section */}
      <div className="max-w-2xl mx-auto mt-10 bg-gray-800/80 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500 text-center">Public Chat</h2>
        {/* Chat messages */}
        <div className="h-64 overflow-y-auto mb-4 border border-gray-700 rounded p-3 bg-gray-900/60" id="chat-messages">
          {/* Example messages with improved style */}
          <div className="mb-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-300">Brown Code</span>
                <span className="text-xs text-gray-400">• 2 min ago</span>
              </div>
              <div className="bg-gray-700/80 rounded-lg px-4 py-2 mt-1 text-white shadow">
                Hello everyone!
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-300">Webwiz</span>
                <span className="text-xs text-gray-400">• 1 min ago</span>
              </div>
              <div className="bg-gray-700/80 rounded-lg px-4 py-2 mt-1 text-white shadow">
                Hi Brown Code! 👋
              </div>
            </div>
          </div>
          {/* TODO: Replace with dynamic messages */}
        </div>
        {/* Chat input */}
        <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="flex-1 rounded px-3 py-2 bg-gray-700 text-white focus:outline-none"
            placeholder="Type your message..."
            disabled
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-60"
            disabled
          >
            Send
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-center">Chat coming soon!</p>
      </div>
      <h1 className="text-center mt-10">
        WE ARE BUILDING THE <span className="text-green-600">CHAT</span> SECTION
      </h1>
      <div className="flex items-center justify-center mt-5">
        <LoaderCircle className="text-green-600 w-14 h-14 animate-spin" />
      </div>
    </div>
  );
}
export default ProfilePage;
