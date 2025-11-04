import React, { useState } from "react";
import { AlertCircle, CheckCircle, Flag, Send, X } from "lucide-react";
import { db1 } from "@/lib/firebaseConfig";

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
    { value: "inappropriate-content", label: "Inappropriate Content" },
    { value: "misinformation", label: "Misinformation/Fake News" },
    { value: "spam", label: "Spam or Misleading" },
    { value: "harassment", label: "Harassment or Bullying" },
    { value: "copyright", label: "Copyright Violation" },
    { value: "hate-speech", label: "Hate Speech" },
    { value: "violence", label: "Violence or Threats" },
    { value: "privacy", label: "Privacy Violation" },
    { value: "technical", label: "Technical Issue/Bug" },
    { value: "other", label: "Other" },
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
      newErrors.reportType = "Please select a report type";
    }

    if (!formData.reporterEmail) {
      newErrors.reporterEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.reporterEmail)) {
      newErrors.reporterEmail = "Please enter a valid email";
    }

    if (!formData.description || formData.description.length < 20) {
      newErrors.description =
        "Please provide at least 20 characters describing the issue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToFirebase = async (reportData) => {
    // FIREBASE INTEGRATION CODE:
    import { getFirestore, collection, addDoc } from 'firebase/firestore';
    const db = getFirestore();
    const docRef = await addDoc(collection(db1, 'reports'), reportData);
    return { success: true, id: docRef.id };

    // // Simulated submission for demo
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("Report submitted:", reportData);
    //     resolve({ success: true, id: "REPORT-" + Date.now() });
    //   }, 1500);
    // });
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
        message: `Report submitted successfully! Reference ID: ${result.id}`,
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
        message:
          "Failed to submit report. Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Flag className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Report an Issue
          </h1>
          <p className="text-gray-600 text-lg">
            Help us maintain a safe and reliable platform
          </p>
        </div>

        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start justify-between ${
              submitStatus.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start">
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
              )}
              <div>
                <p
                  className={`font-semibold ${
                    submitStatus.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {submitStatus.type === "success" ? "Success!" : "Error"}
                </p>
                <p
                  className={`text-sm ${
                    submitStatus.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSubmitStatus(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What are you reporting? *
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.reportType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select report type...</option>
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.reportType && (
                <p className="mt-1 text-sm text-red-600">{errors.reportType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL of Reported Content (if applicable)
              </label>
              <input
                type="url"
                name="reportedUrl"
                value={formData.reportedUrl}
                onChange={handleInputChange}
                placeholder="https://thecyclopedia.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="reporterEmail"
                  value={formData.reporterEmail}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.reporterEmail ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.reporterEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.reporterEmail}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="flex gap-4">
                {["low", "medium", "high", "urgent"].map((priority) => (
                  <label
                    key={priority}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                placeholder="Please provide detailed information about the issue you're reporting..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.description.length} characters
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </>
              )}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your report will be reviewed within 24-48 hours</li>
              <li>
                • You'll receive an email confirmation with a reference ID
              </li>
              <li>• We'll update you on the status of your report</li>
              <li>• Serious violations may be escalated to authorities</li>
            </ul>
          </div>

          <p className="mt-6 text-xs text-gray-500 text-center">
            By submitting this report, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need immediate assistance?
            <a
              href="mailto:browncemmanuel@gmail.com"
              className="text-blue-600 hover:underline ml-1"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
