"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { auth, db1 } from "@/lib/firebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        try {
          // Listen for real-time changes to user document
          const unsubscribeDoc = onSnapshot(
            doc(db1, "users", currentUser.uid),
            (userDoc) => {
              if (userDoc.exists()) {
                setUser({
                  uid: currentUser.uid,
                  email: currentUser.email,
                  ...userDoc.data(),
                });
              } else {
                setUser({
                  uid: currentUser.uid,
                  email: currentUser.email,
                });
              }
              setLoading(false);
            },
            (error) => {
              console.error("Error listening to user document:", error);
              setUser({
                uid: currentUser.uid,
                email: currentUser.email,
              });
              setLoading(false);
            }
          );

          return unsubscribeDoc;
        } catch (error) {
          console.error("Error setting up user listener:", error);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
          });
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ user, loading, logout }}>
        <main>{children}</main>
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
