"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/components/AuthProvider";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // Redirect if user is already logged in
    useEffect(() => {
        if (user && !authLoading) {
            router.push("/feedback"); 
        }
    }, [user, authLoading, router]);

    // Show loading while checking auth status
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    // If user is logged in, don't show login form
    if (user) {
        return null;
    }

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-credential":
                return "Account doesn't exist. Sign up first";
            case "auth/user-not-found":
                return "Account doesn't exist. Sign up first";
            case "auth/wrong-password":
                return "Incorrect password. Please try again";
            case "auth/invalid-email":
                return "Please enter a valid email address";
            case "auth/user-disabled":
                return "This account has been disabled";
            case "auth/too-many-requests":
                return "Too many login attempts. Please try again later";
            default:
                return "Login failed. Please try again";
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            router.push("/feedback");
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = getErrorMessage(errorCode);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md border rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

                {error && (
                    <div className="mb-4 p-3 border border-red-500 rounded text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-700 hover:bg-purple-800  text-white font-semibold rounded-lg disabled:opacity-50 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}