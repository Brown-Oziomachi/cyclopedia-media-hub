"use client";

import DonationForm from "@/components/Affiliate";


export default function DonatePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full  shadow-lg rounded-2xl p-8 mt-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Support Our Cause
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your donation helps us continue our mission. Thank you for your
          support!
        </p>
        <DonationForm />
      </div>
    </main>
  );
}
