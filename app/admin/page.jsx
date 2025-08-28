"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/auth";
import AdminLiveStream from "@/components/Live";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const allowedEmail = "browncemmanuel@gmail.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email === allowedEmail) {
        setUser(firebaseUser);
      } else {
        setUser(false); // ❌ unauthorized
      }
    });

    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <Loader />;
  }

  if (user === false) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">
          ❌ Access denied. Please{" "}
          <a href="/admin/login" className="underline">
            login
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100 mt-50">
        <h1 className="font-bold">✅ Welcome, {user.email}</h1>
        <button
          onClick={() => signOut(auth)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
          </div>
          <AdminLiveStream />
    </div>
  );
}
