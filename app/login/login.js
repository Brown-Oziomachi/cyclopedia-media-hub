"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/components/AuthProvider";
import { TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import Image from "next/image";

// ✅ Lucide icons
import { LogIn, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (user && !authLoading) {
            router.push("/feedback");
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="text-center">
                    <CircularProgress size={60} sx={{ color: '#7c3aed' }} />
                    <p className="mt-4 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (user) return null;

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-credential":
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
            router.push("/feedback");
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 ">
            <div className="w-full max-w-md mt-30">
                <div className=" rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900 overflow-hidden">

                    {/* Logo Section */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]"></div>
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full mt-4 flex items-center justify-center shadow-2xl">
                               <img src="/hid.png" />
                            </div>
                            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Welcome Back</h1>
                            <p className="text-purple-100 mt-2">Sign in to continue to The Cyclopedia</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                            Login to Your Account
                        </h2>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
                                <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-10">
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="thecyclopedianews@email.com"
                                required
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: '#e5e7eb' },
                                        '&:hover fieldset': { borderColor: '#a855f7' },
                                        '&.Mui-focused fieldset': { borderColor: '#7c3aed', borderWidth: '2px' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#7c3aed' },
                                }}
                            />

                            <TextField
                                className="mb-5"
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: '#e5e7eb' },
                                        '&:hover fieldset': { borderColor: '#a855f7' },
                                        '&.Mui-focused fieldset': { borderColor: '#7c3aed', borderWidth: '2px' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#7c3aed' },
                                }}
                            />

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                                {/* <a href="/forgot-password" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                                    Forgot password?
                                </a> */}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Login</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 dark:text-gray-400">
                                    New to The Cyclopedia?
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold hover:underline">
                                    Create Account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                    By continuing, you agree to our{" "}
                    <a href="/terms-of-services" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}
