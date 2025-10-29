"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Phone, Mail, Globe, Award, Briefcase, GraduationCap, Filter, X, ChevronDown, LoaderCircle } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db1 } from '@/lib/firebaseConfig';

export default function LawyerDirectoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Practice Areas');
    const [showFilters, setShowFilters] = useState(false);
    const [experienceFilter, setExperienceFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = [
        'All Practice Areas',
        'Criminal Defense',
        'Family Law',
        'Personal Injury',
        'Business Law',
        'Real Estate Law',
        'Immigration Law',
        'Employment Law',
        'Tax Law',
        'Estate Planning',
        'Intellectual Property',
        'Civil Litigation',
        'Corporate Law'
    ];

    // Fetch lawyers from Firebase
    useEffect(() => {
        fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
        try {
            setLoading(true);
            setError(null);

            // Query only approved lawyers (no orderBy)
            const q = query(
                collection(db1, "lawyer_registrations"),
                where("status", "==", "approved")
            );

            const querySnapshot = await getDocs(q);
            const lawyersData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                lawyersData.push({
                    id: doc.id,
                    ...data,
                    rating: data.rating || 0,
                    reviews: data.reviews || 0
                });
            });

            // Sort in JavaScript instead
            lawyersData.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setLawyers(lawyersData);
        } catch (err) {
            console.error("Error fetching lawyers:", err);
            setError("Failed to load lawyers. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate years of experience as a number for filtering
    const getExperienceYears = (experience) => {
        if (!experience) return 0;
        // Extract first number from experience string (e.g., "7-10" -> 7, "20+" -> 20)
        const match = experience.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const filteredLawyers = lawyers.filter(lawyer => {
        const matchesSearch = lawyer.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = location === '' ||
            lawyer.city?.toLowerCase().includes(location.toLowerCase()) ||
            lawyer.state?.toLowerCase().includes(location.toLowerCase()) ||
            lawyer.location?.toLowerCase().includes(location.toLowerCase());

        const matchesCategory = selectedCategory === 'All Practice Areas' ||
            lawyer.specialty?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            lawyer.practiceAreas?.some(area => area.toLowerCase().includes(selectedCategory.toLowerCase()));

        let matchesExperience = true;
        const experienceYears = getExperienceYears(lawyer.experience);
        if (experienceFilter === '5+') {
            matchesExperience = experienceYears >= 5;
        } else if (experienceFilter === '10+') {
            matchesExperience = experienceYears >= 10;
        } else if (experienceFilter === '15+') {
            matchesExperience = experienceYears >= 15;
        }

        let matchesRating = true;
        if (ratingFilter === '4+') {
            matchesRating = lawyer.rating >= 4;
        } else if (ratingFilter === '4.5+') {
            matchesRating = lawyer.rating >= 4.5;
        }

        return matchesSearch && matchesLocation && matchesCategory && matchesExperience && matchesRating;
    });

    return (
        <div className="w-full min-h-screen ">
            {/* Hero Section */}
            <div className="bg-[#0c0b2bfa] text-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mt-40 mt-20">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Find Expert Legal Representation
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Connect with verified, experienced lawyers across Nigeria ready to handle your legal matters
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2  w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or specialty..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-1">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Location (City or State)"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700  font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                                Filters
                            </button>
                        </div>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Practice Area
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Experience
                                        </label>
                                        <select
                                            value={experienceFilter}
                                            onChange={(e) => setExperienceFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        >
                                            <option value="all">All Experience Levels</option>
                                            <option value="5+">5+ Years</option>
                                            <option value="10+">10+ Years</option>
                                            <option value="15+">15+ Years</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Rating
                                        </label>
                                        <select
                                            value={ratingFilter}
                                            onChange={(e) => setRatingFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        >
                                            <option value="all">All Ratings</option>
                                            <option value="4+">4+ Stars</option>
                                            <option value="4.5+">4.5+ Stars</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className=" text-lg">Loading lawyers...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-semibold">{error}</p>
                        <button
                            onClick={fetchLawyers}
                            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Results */}
                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold ">
                                {filteredLawyers.length} Lawyer{filteredLawyers.length !== 1 ? 's' : ''} Found
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="">Sort by:</span>
                                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ">
                                    <option>Highest Rated</option>
                                    <option>Most Experienced</option>
                                    <option>Most Reviews</option>
                                    <option>Recently Joined</option>
                                </select>
                            </div>
                        </div>

                        {/* Lawyer Cards */}
                        <div className="space-y-6">
                            {filteredLawyers.map((lawyer) => (
                                <div key={lawyer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                                    <div className="grid md:grid-cols-4 gap-6 p-6">
                                        {/* Profile Image */}
                                        <div className="md:col-span-1 flex flex-col items-center">
                                            <div className="relative">
                                                {lawyer.profileImageURL ? (
                                                    <img
                                                        src={lawyer.profileImageURL}
                                                        alt={lawyer.fullName}
                                                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                                                    />
                                                ) : (
                                                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-blue-100">
                                                        <span className="text-4xl font-bold text-blue-600">
                                                            {lawyer.fullName?.charAt(0) || '?'}
                                                        </span>
                                                    </div>
                                                )}
                                                {lawyer.status === 'approved' && (
                                                    <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                                                        <Award className="w-5 h-5 " />
                                                    </div>
                                                )}
                                            </div>
                                            {lawyer.rating > 0 && (
                                                <div className="mt-4 flex items-center gap-1">
                                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-bold text-gray-900">{lawyer.rating.toFixed(1)}</span>
                                                    <span className="text-gray-500 text-sm">({lawyer.reviews} reviews)</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Lawyer Details */}
                                        <div className="md:col-span-3">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{lawyer.fullName}</h3>
                                                    <p className="text-blue-600 font-semibold text-lg mb-2">{lawyer.specialty}</p>
                                                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {lawyer.city}, {lawyer.state}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Briefcase className="w-4 h-4" />
                                                            {lawyer.experience} experience
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-4 leading-relaxed">
                                                {lawyer.bio}
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                                        <GraduationCap className="w-4 h-4" />
                                                        {lawyer.degree} - {lawyer.lawSchool}
                                                    </p>
                                                    {lawyer.graduationYear && (
                                                        <p className="text-gray-600 text-sm mb-2">
                                                            <span className="font-semibold">Graduated:</span> {lawyer.graduationYear}
                                                        </p>
                                                    )}
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        <span className="font-semibold">Bar Number:</span> {lawyer.barNumber}
                                                    </p>
                                                    {lawyer.languages && lawyer.languages.length > 0 && (
                                                        <p className="text-gray-600 text-sm">
                                                            <span className="font-semibold">Languages:</span> {lawyer.languages.filter(l => l.trim()).join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    {lawyer.achievements && lawyer.achievements.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {lawyer.achievements.filter(a => a.trim()).map((achievement, idx) => (
                                                                <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                                                    {achievement}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {lawyer.practiceAreas && lawyer.practiceAreas.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-semibold text-gray-700 mb-1">Practice Areas:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {lawyer.practiceAreas.slice(0, 3).map((area, idx) => (
                                                                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                                        {area}
                                                                    </span>
                                                                ))}
                                                                {lawyer.practiceAreas.length > 3 && (
                                                                    <span className="text-xs text-gray-500 px-2 py-1">
                                                                        +{lawyer.practiceAreas.length - 3} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                                                <a
                                                    href={`tel:${lawyer.phone}`}
                                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Call Now
                                                </a>
                                                <a
                                                    href={`mailto:${lawyer.email}`}
                                                    className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-semibold"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                    Email
                                                </a>
                                                {lawyer.firmWebsite && (
                                                    <a
                                                        href={lawyer.firmWebsite.startsWith('http') ? lawyer.firmWebsite : `https://${lawyer.firmWebsite}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors font-semibold"
                                                    >
                                                        <Globe className="w-4 h-4" />
                                                        Website
                                                    </a>
                                                )}
                                                {/* <Link
                                                    href={`/lawyers/${lawyer.id}`}
                                                    className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                                                >
                                                    View Full Profile
                                                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                                </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredLawyers.length === 0 && lawyers.length > 0 && (
                            <div className="text-center py-16">
                                <div className="mb-4">
                                    <Search className="w-16 h-16 text-gray-400 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No lawyers found</h3>
                                <p className="">Try adjusting your search criteria or filters</p>
                            </div>
                        )}

                        {lawyers.length === 0 && (
                            <div className="text-center py-16">
                                <div className="mb-4">
                                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold  mb-2">No registered lawyers yet</h3>
                                <p className=" mb-6">Be the first to register your practice!</p>
                                <Link
                                    href="/law-justice/find-lawyer/lawyer-directory/lawyer-registration-form"
                                    className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Register Now
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-[#0c0b2bfa] py-16 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Are You a Lawyer?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join our directory and connect with clients who need your expertise
                    </p>
                    <Link
                        href="/law-justice/find-lawyer/lawyer-directory/lawyer-registration-form"
                        className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Register Your Practice
                    </Link>
                </div>
            </div>
        </div>
    );
}