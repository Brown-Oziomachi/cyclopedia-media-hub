"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db1 } from "@/lib/firebaseConfig";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight } from "lucide-react";
import { CircularProgress } from "@mui/material";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect");
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (user && !authLoading) {
            router.push("/pp-feedbacks");
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center">Loading...</p>
            </div>
        );
    }

    if (user) {
        return null;
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push("At least 8 characters");
        if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
        if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
        if (!/[0-9]/.test(password)) errors.push("One number");
        if (!/[!@#$%^&*]/.test(password)) errors.push("One special character (!@#$%^&*)");
        return errors;
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else {
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors.join(", ");
            }
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (redirectTo === "sex-education") {
            if (!dateOfBirth) {
                newErrors.dateOfBirth = "Date of birth is required";
            } else {
                const birthDate = new Date(dateOfBirth);
                const age = calculateAge(birthDate);
                if (age < 18) {
                    newErrors.dateOfBirth = "You must be at least 18 years old to access this content";
                }
            }
            if (!ageConfirmed) {
                newErrors.ageConfirmed = "You must confirm you are 18 years or older";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createUserDocument = async (userId, userData) => {
        try {
            await setDoc(doc(db1, "users", userId), userData);
        } catch (error) {
            console.error("Error creating user document:", error);
            throw error;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const userData = {
                name: name.trim(),
                email: email.toLowerCase(),
                createdAt: new Date().toISOString(),
                bio: "",
                businessLink: "",
                profileImage: null,
                skills: "",
                interests: "",
                quote: "",
                socialLinks: {
                    twitter: "",
                    linkedin: "",
                    instagram: ""
                },
                notificationsEnabled: true,
                newsletterSubscribed: true,
            };

            if (redirectTo === "sex-education") {
                userData.dateOfBirth = dateOfBirth;
                userData.ageVerified = true;
            }

            await createUserDocument(userCredential.user.uid, userData);

            alert("Account created successfully!");

            if (redirectTo === "sex-education") {
                router.push("/sex-education");
            } else {
                router.push("/feedback");
            }
        } catch (err) {
            console.error("Signup error:", err);
            if (err.code === "auth/email-already-in-use") {
                setErrors({ email: "This email is already in use, please log in." });
            } else if (err.code === "auth/weak-password") {
                setErrors({ password: "Password is too weak" });
            } else {
                setErrors({ general: "Signup failed. Please try again" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        setErrors({});

        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            const userDocRef = doc(db1, "users", result.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                const userData = {
                    name: result.user.displayName || result.user.email.split('@')[0],
                    email: result.user.email,
                    profileImage: result.user.photoURL || null,
                    createdAt: new Date().toISOString(),
                    bio: "",
                    businessLink: "",
                    skills: "",
                    interests: "",
                    quote: "",
                    socialLinks: {
                        twitter: "",
                        linkedin: "",
                        instagram: ""
                    },
                    notificationsEnabled: true,
                    newsletterSubscribed: true,
                };

                await createUserDocument(result.user.uid, userData);
            }

            if (redirectTo === "sex-education") {
                router.push("/sex-education");
            } else {
                router.push("/feedback");
            }
        } catch (err) {
            console.error("Google sign-up error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                setErrors({ general: "Sign-in was cancelled. Please try again." });
            } else if (err.code === 'auth/popup-blocked') {
                setErrors({ general: "Popup was blocked. Please allow popups and try again." });
            } else {
                setErrors({ general: "Google sign-up failed. Please try again." });
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const isAgeRestrictedContent = redirectTo === "sex-education";

    return (
        <div className="min-h-screen flex lg:mt-30">
            {/* Left Side - Image (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
                    <div className="w-32 h-32 mb-8 rounded-full shadow-2xl">
                        <img src="/truth.png" alt="Logo" className="rounded-full w-full h-full object-cover" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4 text-center drop-shadow-lg">Welcome to The Cyclopedia</h1>
                    <p className="text-xl text-center max-w-md opacity-90">Join our community and unlock a world of knowledge and connection</p>
                    <div className="mt-12 space-y-4 max-w-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-2xl">📚</span>
                            </div>
                            <p className="text-lg">Access educational resources</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <p className="text-lg">Connect with community</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <p className="text-lg">Share your feedback</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:mt-20 mt-10 w-full lg:w-1/2 flex items-center justify-center px-4 py-12 bg-[#0c0b0bfa] overflow-y-auto">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="lg:hidden mb-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full">
                            <img src="/truth.png" alt="Logo" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join The Cyclopedia</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Create your account to get started</p>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:block mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                        <p className="text-gray-600 dark:text-gray-400">Sign up to get started</p>
                    </div>

                    {isAgeRestrictedContent && (
                        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
                            <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">
                                This content is for educational purposes and <span className="text-red-600 font-bold">restricted</span> to users 18+
                            </p>
                        </div>
                    )}

                    {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
                            <p className="text-red-700 dark:text-red-400 text-sm font-medium">{errors.general}</p>
                        </div>
                    )}

                    {/* Google Sign Up Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading || loading}
                        className="w-full mb-6 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                    >
                        {googleLoading ? (
                            <>
                                <CircularProgress size={20} sx={{ color: '#dc2626' }} />
                                <span>Signing up with Google...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Sign up with Google</span>
                            </>
                        )}
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or sign up with email</span>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-red-600 dark:focus:border-red-500"}`}
                            />
                            {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-red-600 dark:focus:border-red-500"}`}
                            />
                            {errors.email && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-red-600 dark:focus:border-red-500"}`}
                            />
                            {errors.password && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password}</p>}

                            {password && (
                                <div className="mt-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                    <p className="text-xs font-semibold mb-2 text-gray-900 dark:text-white">Password must contain:</p>
                                    <ul className="text-xs space-y-1">
                                        <li className={password.length >= 8 ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                                            {password.length >= 8 ? "✓" : "○"} At least 8 characters
                                        </li>
                                        <li className={/[A-Z]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                                            {/[A-Z]/.test(password) ? "✓" : "○"} One uppercase letter
                                        </li>
                                        <li className={/[a-z]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                                            {/[a-z]/.test(password) ? "✓" : "○"} One lowercase letter
                                        </li>
                                        <li className={/[0-9]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                                            {/[0-9]/.test(password) ? "✓" : "○"} One number
                                        </li>
                                        <li className={/[!@#$%^&*]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                                            {/[!@#$%^&*]/.test(password) ? "✓" : "○"} One special character (!@#$%^&*)
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-red-600 dark:focus:border-red-500"}`}
                            />
                            {errors.confirmPassword && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {isAgeRestrictedContent && (
                            <>
                                <div>
                                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.dateOfBirth ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-red-600 dark:focus:border-red-500"}`}
                                    />
                                    {errors.dateOfBirth && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={ageConfirmed}
                                            onChange={(e) => setAgeConfirmed(e.target.checked)}
                                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">I confirm I am 18 years or older</span>
                                    </label>
                                    {errors.ageConfirmed && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.ageConfirmed}</p>}
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={loading || googleLoading}
                            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={20} sx={{ color: 'white' }} />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign Up</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Already registered?{" "}
                            <a href="/login" className="text-red-600 hover:underline font-semibold">
                                Login Here
                            </a>
                        </p>
                    </div>

                    <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                        By continuing, you agree to our{" "}
                        <a href="/terms-of-services" className="text-red-600 hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" className="text-red-600 hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}