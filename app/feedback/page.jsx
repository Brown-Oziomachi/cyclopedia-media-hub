"use client"
import { useEffect, useRef, useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { redirect } from "next/navigation"
import { Send, CheckCircle, X } from "lucide-react"
import { db1 } from "@/lib/firebaseConfig"

export default function FeedbackForm() {
    const [feedbackType, setFeedbackType] = useState("")
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [popup, setPopup] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitData, setSubmitData] = useState(null)
    const popupDataRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupDataRef.current && !popupDataRef.current.contains(e.target)) setPopup(false)
        }
        if (popup) document.addEventListener("mousedown", handleClickOutside)
        
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [popup])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        
        const data = {
            feedbackType,
            email,
            title,
            message,
            createdAt: new Date().toISOString(),
        }

        try {
            const feedbackId = `feedback_${Date.now()}`
            await setDoc(doc(db1, "feedback", feedbackId), data)
            setSubmitData(data)
            setPopup(true)
            setFeedbackType("")
            setEmail("")
            setTitle("")
            setMessage("")
        } catch (error) {
            console.error("Error submitting feedback:", error)
        } finally {
            setSubmitting(false)
        }
    }

    const feedbackOptions = [
        { value: "bug", label: " Bug Report", desc: "Report a technical issue" },
        { value: "feature", label: " Feature Request", desc: "Suggest a new feature" },
        { value: "improvement", label: "Improvement", desc: "Suggest an improvement" },
        { value: "praise", label: " Praise", desc: "Share positive feedback" },
        { value: "other", label: " Other", desc: "Something else" },
    ]

    return (
        <div className="min-h-screen py-12 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold  mb-3 lg:mt-30 mt-10">
                        Share Your <span className="text-purple-500">Feedback</span>
                    </h1>
                    <p className=" text-lg">
                        Help us improve. Your insights matter to us.
                    </p>
                </div>

                <div className="shadow-2xl rounded-2xl p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block font-semibold mb-4">
                                Feedback Type
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {feedbackOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`relative flex items-center p-4 shadow rounded-lg cursor-pointer transition-all duration-200 ${
                                            feedbackType === option.value
                                                ? " bg-purple-500"
                                                : " bg-gray-800/50 hover:border-gray-600"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="feedbackType"
                                            value={option.value}
                                            checked={feedbackType === option.value}
                                            onChange={(e) => setFeedbackType(e.target.value)}
                                            className="sr-only"
                                            required
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{option.label}</p>
                                            <p className="text-sm ">{option.desc}</p>
                                        </div>
                                        {feedbackType === option.value && (
                                            <div className="w-5 h-5 rounded-full border-2 "></div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border  rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block  font-semibold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Brief title of your feedback..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3  border rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Message
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Tell us what's on your mind..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-3 border  rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 resize-none"
                                required
                            />
                        </div>

                        <button
                            disabled={submitting}
                            type="submit"
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Feedback
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {popup && submitData && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div
                        ref={popupDataRef}
                        className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl w-full md:w-[500px] animate-in fade-in zoom-in"
                    >
                        <button
                            onClick={() => setPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-green-500/10 p-3 border border-green-500/30">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            Thank You!
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Your feedback has been received. We appreciate your input and will review it shortly.
                        </p>

                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6 space-y-3">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white font-medium capitalize">{submitData.feedbackType}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400">Email:</span>
                                <span className="text-white font-medium text-right">{submitData.email}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400">Title:</span>
                                <span className="text-white font-medium text-right">{submitData.title}</span>
                            </div>
                            <div className="border-t border-gray-700 pt-3">
                                <span className="text-gray-400 block mb-2">Message:</span>
                                <p className="text-white text-sm line-clamp-3">{submitData.message}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setPopup(false)}
                            className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}