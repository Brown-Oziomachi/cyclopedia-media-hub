"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseAuth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
    });

    return unsubscribe;
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return isAuthenticated ? children : null;
}