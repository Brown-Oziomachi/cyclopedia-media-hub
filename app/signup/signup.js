"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db1 } from "@/lib/firebaseConfig";
import { useAuth } from "@/components/AuthProvider";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // Redirect if user is already logged in
    useEffect(() => {
        if (user && !authLoading) {
            router.push("/pp-feedbacks");
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

    // If user is logged in, don't show signup form
    if (user) {
        return null;
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 8) {
            errors.push("At least 8 characters");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("One uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("One lowercase letter");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("One number");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("One special character (!@#$%^&*)");
        }

        return errors;
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else {
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors.join(", ");
            }
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db1, "users", userCredential.user.uid), {
                name: name.trim(),
                email: email.toLowerCase(),
                createdAt: serverTimestamp(),
                bio: "",
                businessLink: "",
                profileImage: null,
                notificationsEnabled: true,
                newsletterSubscribed: true,
            });

            alert("Account created successfully!");
            router.push("/login");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setErrors({ email: "This email is already in use" });
            } else if (err.code === "auth/weak-password") {
                setErrors({ password: "Password is too weak" });
            } else {
                setErrors({ general: "Signup failed. Please try again" });
            }
        } finally {
            setLoading(false);
        }
    };

    const passwordErrors = validatePassword(password);
    const isPasswordStrong = password && passwordErrors.length === 0;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md border rounded-lg p-8 mt-10 lg:mt-30">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                {errors.general && (
                    <div className="mb-4 p-3 border border-red-500 rounded text-red-600 text-sm">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${errors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${errors.password
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}

                        {/* Password Requirements */}
                        {password && (
                            <div className="mt-3 p-3 border rounded-lg bg-gray-50">
                                <p className="text-xs font-semibold mb-2">
                                    Password must contain:
                                </p>
                                <ul className="text-xs space-y-1">
                                    <li
                                        className={
                                            password.length >= 8
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {password.length >= 8 ? "✓" : "○"} At
                                        least 8 characters
                                    </li>
                                    <li
                                        className={
                                            /[A-Z]/.test(password)
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {/[A-Z]/.test(password) ? "✓" : "○"}{" "}
                                        One uppercase letter
                                    </li>
                                    <li
                                        className={
                                            /[a-z]/.test(password)
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {/[a-z]/.test(password) ? "✓" : "○"}{" "}
                                        One lowercase letter
                                    </li>
                                    <li
                                        className={
                                            /[0-9]/.test(password)
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {/[0-9]/.test(password) ? "✓" : "○"}{" "}
                                        One number
                                    </li>
                                    <li
                                        className={
                                            /[!@#$%^&*]/.test(password)
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {/[!@#$%^&*]/.test(password)
                                            ? "✓"
                                            : "○"}{" "}
                                        One special character (!@#$%^&*)
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${errors.confirmPassword
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}