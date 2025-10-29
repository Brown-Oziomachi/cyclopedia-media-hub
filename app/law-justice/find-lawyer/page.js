"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

export default function LawyerSearchSection() {
    const [legalIssue, setLegalIssue] = useState('Criminal Defense');
    const [location, setLocation] = useState('Abuja, FCT');

    const handleSearch = () => {
        // Handle search logic here
        console.log('Searching for:', { legalIssue, location });
    };

    const clearLegalIssue = () => setLegalIssue('');
    const clearLocation = () => setLocation('');

    return (
        <div className="w-full">
            {/* Search Section */}
            <section className="relative lg:mt-40 mt-20 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-16 px-4">
                <div className="absolute inset-0 opacity-10 ">
                    <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl top-0 right-20"></div>
                    <div className="absolute w-64 h-64 bg-slate-600 rounded-full blur-3xl bottom-0 left-20"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                        Search Criminal Defense Lawyers Near You.
                    </h1>

                    <p className="text-gray-200 mb-8 text-lg">
                        Enter information in one or both fields. (Required)
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {/* Legal Issue Input */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Legal Issue
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={legalIssue}
                                    onChange={(e) => setLegalIssue(e.target.value)}
                                    placeholder="Criminal Defense"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                                />
                                {legalIssue && (
                                    <button
                                        onClick={clearLegalIssue}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Location Input */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                City, ZIP Code or County
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Abuja, FCT"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                                />
                                {location && (
                                    <button
                                        onClick={clearLocation}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link href="/law-justice/find-lawyer/lawyer-directory"
                        onClick={handleSearch}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        Find a Lawyer
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Breadcrumb and Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-8">
                    <Link href="/law-justice/find-lawyer/lawyer-directory" className="text-blue-600 hover:underline uppercase">
                        LAWYER DIRECTORY
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600 uppercase">CRIMINAL DEFENSE</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-8">
                    Find Criminal Defense Attorneys Near You
                </h2>

                {/* Info Box */}
                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
                    <p className="text-orange-700 text-lg leading-relaxed">
                        Facing criminal charges can be overwhelming, but you don't have to go through it alone.
                        Skilled criminal defense attorneys provide aggressive representation to protect your rights
                        and achieve the best possible outcome. Whether it's a misdemeanor or felony, browse our
                        directory for criminal defense attorneys who offer comprehensive legal strategies tailored
                        to your case.
                    </p>
                </div>

                {/* Additional Content Area */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Why You Need a Criminal Defense Lawyer
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Expert knowledge of criminal law and procedures</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Protection of your constitutional rights</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Negotiation skills for plea bargains</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Aggressive courtroom representation</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Types of Criminal Cases We Handle
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>DUI/DWI offenses</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Drug crimes and possession</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Theft and property crimes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Violent crimes and assault</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}