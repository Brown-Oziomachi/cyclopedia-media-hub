"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

export default function AgeVerification() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [confirmed, setConfirmed] = useState(false);

  const handleVerify = async () => {
    if (!confirmed || !user) return;

    try {
      await updateDoc(doc(db1, "users", user.uid), {
        ageVerified: true
      });
      router.push(`/${redirect}`);
    } catch (error) {
      console.error("Error updating age verification:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Age Verification</h1>
        <p className="text-gray-600 mb-6">
          This content is intended for adults 18 years and older. By confirming below, you attest that you are at least 18 years old.
        </p>

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-sm">I confirm I am 18 years or older</span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            disabled={!confirmed}
            onClick={handleVerify}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 hover:bg-purple-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}