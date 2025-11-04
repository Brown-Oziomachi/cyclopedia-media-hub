"use client"
import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Phone, Headphones, Bug, HelpCircle, Send, CheckCircle } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db1 } from '@/lib/firebaseConfig';

export default function ContactSupportPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        priority: 'normal'
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const supportCategories = [
        { id: 'technical', name: 'Technical Issue', icon: Bug, color: 'red' },
        { id: 'account', name: 'Account Help', icon: Headphones, color: 'blue' },
        { id: 'billing', name: 'Billing Question', icon: MessageSquare, color: 'green' },
        { id: 'feature', name: 'Feature Request', icon: HelpCircle, color: 'purple' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on input change
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Please enter your name');
            return false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.subject.trim()) {
            setError('Please enter a subject');
            return false;
        }
        if (!formData.message.trim()) {
            setError('Please enter a message');
            return false;
        }
        if (activeTab === 'support' && !formData.category) {
            setError('Please select a support category');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Prepare data for Firebase
            const submissionData = {
                ...formData,
                type: activeTab,
                timestamp: serverTimestamp(),
                status: 'new'
            };

            // Add document to Firestore
            const docRef = await addDoc(collection(db1, 'contact-Support'), submissionData);

            console.log('Document written with ID: ', docRef.id);
            setSubmitted(true);
            setLoading(false);

            // Reset after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: '',
                    message: '',
                    priority: 'normal'
                });
            }, 3000);
        } catch (err) {
            console.error('Error adding document: ', err);
            setError('Failed to submit form. Please try again.');
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ">
                        <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
                    <p className="text-gray-600">
                        {activeTab === 'support'
                            ? "Our support team will get back to you within 24 hours."
                            : "Thank you for reaching out. We'll respond soon!"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  py-12 px-4">
            <div className="max-w-6xl mx-auto  mt-20 lg:mt-50">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600">
                        Choose how you'd like to contact us
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'general'
                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Mail className="inline mr-2" size={20} />
                        General Contact
                    </button>
                    <button
                        onClick={() => setActiveTab('support')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'support'
                            ? 'bg-red-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Headphones className="inline mr-2" size={20} />
                        Technical Support
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Contact Cards */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Contact</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Email</p>
                                        <a href="mailto:support@cyclopedia.com" className="text-blue-600 hover:underline text-sm">
                                            support@cyclopedia.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Phone</p>
                                        <a href="tel:+1234567890" className="text-green-600 hover:underline text-sm">
                                            +1 (234) 567-890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Live Chat</p>
                                        <p className="text-gray-600 text-sm">Available 9AM-5PM EST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Categories */}
                        {activeTab === 'support' && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Support Categories</h3>
                                <div className="space-y-3">
                                    {supportCategories.map((cat) => {
                                        const Icon = cat.icon;
                                        const isSelected = formData.category === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${isSelected
                                                    ? 'bg-blue-100 border-2 border-blue-500'
                                                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                    }`}
                                            >
                                                <Icon className="text-blue-600" size={24} />
                                                <span className="font-medium text-gray-800">{cat.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Response Time */}
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">Response Time</h3>
                            <p className="text-sm opacity-90">
                                {activeTab === 'support'
                                    ? "Support tickets: Within 24 hours"
                                    : "General inquiries: 2-3 business days"}
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {activeTab === 'support' ? 'Submit Support Ticket' : 'Send us a Message'}
                            </h2>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                                    <p className="text-red-600 font-semibold">{error}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 text-black border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 text-black border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 text-black border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                        placeholder={activeTab === 'support' ? "Brief description of your issue" : "What's this about?"}
                                    />
                                </div>

                                {activeTab === 'support' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Priority Level
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 text-black border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                        >
                                            <option value="low">Low - General question</option>
                                            <option value="normal">Normal - Need assistance</option>
                                            <option value="high">High - Service disruption</option>
                                            <option value="urgent">Urgent - Critical issue</option>
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border-2 text-black border-gray-200 focus:border-blue-500 focus:outline-none transition resize-none"
                                        placeholder={activeTab === 'support'
                                            ? "Please describe your issue in detail. Include any error messages or steps to reproduce the problem."
                                            : "Tell us what's on your mind..."}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className={`w-full py-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 shadow-lg ${activeTab === 'support'
                                        ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                                        : 'bg-red-600'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Send size={20} />
                                            {activeTab === 'support' ? 'Submit Ticket' : 'Send Message'}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}