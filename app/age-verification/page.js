"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig"; // make sure this points to your Firestore instance


export default function AgeVerification() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleVerify = async () => {
    setError("");

    // validate date
    if (!dateOfBirth) {
      setError("Please enter your date of birth");
      return;
    }

    const birthDate = new Date(dateOfBirth);
    const age = calculateAge(birthDate);

    if (age < 18) {
      setError("You must be at least 18 years old to access this content");
      return;
    }

    if (!confirmed) {
      setError("Please confirm you are 18 years or older");
      return;
    }

    if (!user || !user.uid) {
      setError("You must be logged in");
      return;
    }

    setLoading(true);

    try {
      await setDoc(
        doc(db1, "users", user.uid),
        {
          dateOfBirth: dateOfBirth,
          ageVerified: true,
        },
        { merge: true }
      );

      router.push(redirect.startsWith("/") ? redirect : `/${redirect}`);
    } catch (err) {
      console.error("Error updating age verification:", err);
      setError("Failed to verify age. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full  rounded-2xl p-8 shadow-2xl lg:mt-30">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16  rounded-full mb-4">
            <span className="text-3xl">🔞</span>
          </div>
          <h1 className="text-2xl font-bold  mb-2">
            Age Verification Required
          </h1>
          <p className=" text-sm">
            This content is intended for adults 18 years and older. Please verify your age to continue.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Date of Birth Input */}
          <div>
            <label className="block text-sm font-semibold mb-2 ">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split("T")[0]} 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm">
              I confirm that I am 18 years of age or older and agree to access age-restricted educational content.
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => router.push("/")}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium "
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleVerify}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition font-semibold"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </div>
        </div>

        <p className="text-xs text-center  mt-6">
          Your date of birth will be stored securely and only used for age verification purposes.
        </p>
      </div>
    </div>
  );
}
