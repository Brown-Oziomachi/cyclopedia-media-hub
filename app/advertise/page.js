"use client"
import React, { useState } from 'react';

export default function AdvertiseWithUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        adType: '',
        budget: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you! We will contact you soon.');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center lg:mt-50">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Advertise With Us</h1>
                    <p className="text-xl opacity-90">Reach thousands of engaged readers across Nigeria</p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Stats Section */}
                <section className="mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-8 pb-4 border-b-4 border-blue-700">
                            Why Advertise With The Cyclopedia?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-8 text-center">
                                <h3 className="text-4xl font-bold mb-2">50K+</h3>
                                <p className="text-lg">Monthly Readers</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
                                <h3 className="text-4xl font-bold mb-2">10K+</h3>
                                <p className="text-lg">Daily Page Views</p>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-lg p-8 text-center">
                                <h3 className="text-4xl font-bold mb-2">24/7</h3>
                                <p className="text-lg">Content Updates</p>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <p className="text-gray-700 text-lg mb-4">
                                The Cyclopedia is Nigeria's trusted source for news, politics, sports, technology, and more.
                                Our engaged audience consists of educated professionals, decision-makers, and active consumers.
                            </p>
                            <ul className="text-gray-700 space-y-2">
                                <li>✓ High-quality, original news content</li>
                                <li>✓ Strong social media presence</li>
                                <li>✓ Mobile-optimized platform</li>
                                <li>✓ Targeted Nigerian audience</li>
                                <li>✓ Multiple content categories</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Advertising Options */}
                <section className="mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-8 pb-4 border-b-4 border-blue-700">
                            Advertising Options
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Banner Ads */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Banner Ads</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Header/Footer placement</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Sidebar placement</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>In-article placement</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Responsive design</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">From ₦50,000/month</div>
                            </div>

                            {/* Sponsored Content */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Sponsored Articles</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Professional writing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>SEO optimized</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Social media promotion</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Permanent placement</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">From ₦100,000/article</div>
                            </div>

                            {/* Video Ads */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Video Ads</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Pre-roll ads</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Mid-roll ads</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>High engagement rate</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Detailed analytics</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">Custom Pricing</div>
                            </div>

                            {/* Social Media Package */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Social Media Package</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Facebook promotion</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Twitter/X coverage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Instagram posts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Wide reach</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">From ₦75,000/month</div>
                            </div>

                            {/* Newsletter Ads */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Newsletter Ads</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Direct email reach</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Targeted subscribers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>High open rates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Click tracking</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">From ₦40,000/send</div>
                            </div>

                            {/* Custom Package */}
                            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Custom Package</h3>
                                <ul className="space-y-3 mb-6 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Tailored solutions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Multiple channels</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Campaign management</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 font-bold mr-2">✓</span>
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                                <div className="text-3xl font-bold text-blue-700 mb-4">Contact Us</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-8 pb-4 border-b-4 border-blue-700">
                            Get Started Today
                        </h2>

                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="company">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        placeholder="+234 xxx xxx xxxx"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="adType">
                                        Advertising Type *
                                    </label>
                                    <select
                                        id="adType"
                                        name="adType"
                                        value={formData.adType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="banner">Banner Ads</option>
                                        <option value="sponsored">Sponsored Articles</option>
                                        <option value="video">Video Ads</option>
                                        <option value="social">Social Media Package</option>
                                        <option value="newsletter">Newsletter Ads</option>
                                        <option value="custom">Custom Package</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="budget">
                                        Monthly Budget
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="50k-100k">₦50,000 - ₦100,000</option>
                                        <option value="100k-250k">₦100,000 - ₦250,000</option>
                                        <option value="250k-500k">₦250,000 - ₦500,000</option>
                                        <option value="500k+">₦500,000+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    placeholder="Tell us about your advertising goals..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Submit Inquiry
                            </button>
                        </form>

                        <div className="mt-8 text-center text-gray-600">
                            <p className="mb-2">Or contact us directly:</p>
                            <p className="font-bold text-blue-900">Email: ads@thecyclopedia.com.ng</p>
                            <p className="font-bold text-blue-900">Phone: +234 XXX XXX XXXX</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}