"use client"
import React, { useState } from "react";
import { AlertCircle, CheckCircle, Flag, Send, X, ChevronRight } from "lucide-react";
import { db1 } from "@/lib/firebaseConfig";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Link from "next/link";

export default function ReportPage() {
    const [formData, setFormData] = useState({
        reportType: "",
        reportedUrl: "",
        reporterName: "",
        reporterEmail: "",
        category: "",
        description: "",
        priority: "medium",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const reportTypes = [
        { value: "inappropriate-content", label: "Inappropriate Content", icon: "⚠️" },
        { value: "misinformation", label: "False Information", icon: "❌" },
        { value: "spam", label: "Spam", icon: "🚫" },
        { value: "harassment", label: "Bullying or Harassment", icon: "😢" },
        { value: "copyright", label: "Intellectual Property Violation", icon: "©️" },
        { value: "hate-speech", label: "Hate Speech", icon: "🛑" },
        { value: "violence", label: "Violence or Dangerous Organizations", icon: "⚔️" },
        { value: "privacy", label: "Privacy Violation", icon: "🔒" },
        { value: "technical", label: "Something Isn't Working", icon: "🔧" },
        { value: "other", label: "Something Else", icon: "💬" },
    ];

    const categories = [
        "Politics",
        "Business",
        "Technology",
        "Science",
        "Entertainment",
        "Culture",
        "General",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.reportType) {
            newErrors.reportType = "Please select a reason for reporting";
        }

        if (!formData.reporterEmail) {
            newErrors.reporterEmail = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.reporterEmail)) {
            newErrors.reporterEmail = "Please enter a valid email";
        }

        if (!formData.description || formData.description.length < 20) {
            newErrors.description = "Please provide more details (at least 20 characters)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitToFirebase = async (reportData) => {
        const docRef = await addDoc(collection(db1, 'reports'), reportData);
        return { success: true, id: docRef.id };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const reportData = {
                ...formData,
                timestamp: new Date().toISOString(),
                status: "pending",
                userAgent: navigator.userAgent,
            };

            const result = await submitToFirebase(reportData);

            setSubmitStatus({
                type: "success",
                message: `Thanks for letting us know`,
                detail: `Your feedback helps keep our community safe. Reference: ${result.id}`,
                id: result.id,
            });

            setFormData({
                reportType: "",
                reportedUrl: "",
                reporterName: "",
                reporterEmail: "",
                category: "",
                description: "",
                priority: "medium",
            });
        } catch (error) {
            console.error("Error submitting report:", error);
            setSubmitStatus({
                type: "error",
                message: "Something went wrong",
                detail: "Please try again or contact support if the problem persists.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-2xl mx-auto lg:mt-55 mt-20">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Report</h1>
                    <p className="text-sm opacity-70">
                        If you think something on our platform goes against our Community Standards, please let us know.
                    </p>
                </div>

                {/* Success/Error Message */}
                {submitStatus && (
                    <div className="mb-6 p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                {submitStatus.type === "success" ? (
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold mb-1">{submitStatus.message}</p>
                                    <p className="text-sm opacity-70">{submitStatus.detail}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSubmitStatus(null)}
                                className="hover:opacity-70 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Form Card */}
                <div className="rounded-lg border shadow-sm">
                    <div className="p-6 space-y-6">
                        {/* Report Type Selection */}
                        <div>
                            <label className="block text-sm font-semibold mb-3">
                                Why are you reporting this?
                            </label>
                            <div className="space-y-2">
                                {reportTypes.map((type) => (
                                    <label
                                        key={type.value}
                                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition hover:border-blue-500 ${formData.reportType === type.value
                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                                                : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value={type.value}
                                                checked={formData.reportType === type.value}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600"
                                            />
                                            <span className="text-xl">{type.icon}</span>
                                            <span className="font-medium">{type.label}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 opacity-40" />
                                    </label>
                                ))}
                            </div>
                            {errors.reportType && (
                                <p className="mt-2 text-sm text-red-600">{errors.reportType}</p>
                            )}
                        </div>

                        {/* Divider */}
                        {formData.reportType && (
                            <>
                                <div className="border-t"></div>

                                {/* URL Input */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Link to content (optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="reportedUrl"
                                        value={formData.reportedUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://thecyclopedia.com/..."
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border bg-[#0c0b0bfa] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a category...</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat.toLowerCase()}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="reporterName"
                                            value={formData.reporterName}
                                            onChange={handleInputChange}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="reporterEmail"
                                            value={formData.reporterEmail}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.reporterEmail ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.reporterEmail && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.reporterEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Additional details
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="5"
                                        placeholder="Please give us more details about why you're reporting this..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? "border-red-500" : ""
                                            }`}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.description && (
                                            <p className="text-sm text-red-600">{errors.description}</p>
                                        )}
                                        <p className="text-xs opacity-60 ml-auto">
                                            {formData.description.length} characters
                                        </p>
                                    </div>
                                </div>

                                {/* Priority (Hidden but functional) */}
                                <input type="hidden" name="priority" value={formData.priority} />

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`w-full py-3 rounded-lg font-semibold transition ${isSubmitting
                                            ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50"
                                            : "bg-red-600 hover:bg-blue-700 text-white"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Submit Report"
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 rounded-lg border bg-red-800">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        What happens after you submit a report
                    </h3>
                    <ul className="text-sm opacity-70 space-y-1.5 ml-7">
                        <li>• We'll review your report and determine if it violates our policies</li>
                        <li>• You'll get an update on your report via email</li>
                        <li>• If we find a violation, we'll take action</li>
                        <li>• Reports are confidential</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm opacity-60">
                        Need help?{" "}
                        <Link
                            href="/contact-support"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}