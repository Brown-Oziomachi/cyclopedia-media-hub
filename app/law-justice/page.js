import React from 'react';
import Link from 'next/link';
import { Scale, Users, Ambulance, Home, Briefcase, Gavel, Car, Heart, UserCheck, Building, FileText } from 'lucide-react';

const LegalCategories = () => {
  const categories = [
    { name: 'Criminal Law', icon: Scale, color: 'from-blue-500 to-blue-600', link: '/law-justice/criminal-law' },
    { name: 'Family Law', icon: Users, color: 'from-purple-500 to-purple-600', link: '/law-justice/family-law' },
    // { name: 'Personal Injury', icon: Ambulance, color: 'from-red-500 to-red-600', link: '/legal/personal-injury' },
    // { name: 'Real Estate Law', icon: Home, color: 'from-green-500 to-green-600', link: '/legal/real-estate-law' },
    { name: 'Employment Law', icon: Briefcase, color: 'from-indigo-500 to-indigo-600', link: '/law-justice/employment-law' },
    { name: 'Litigation & Appeals', icon: Gavel, color: 'from-orange-500 to-orange-600', link: '/law-justice/litigation-appeals' },
    // { name: 'Car Accidents', icon: Car, color: 'from-cyan-500 to-cyan-600', link: '/legal/car-accidents' },
    { name: 'Divorce', icon: Heart, color: 'from-pink-500 to-pink-600', link: '/law-justice/divorce' },
    { name: 'Medical Malpractice', icon: UserCheck, color: 'from-teal-500 to-teal-600', link: '/law-justice/medical-malpractice' },
    // { name: 'Custody & Visitation', icon: Users, color: 'from-violet-500 to-violet-600', link: '/legal/custody-visitation' },
    { name: 'Landlord-Tenant Law', icon: Building, color: 'from-yellow-500 to-yellow-600', link: '/law-justice/landlord-tenant-law' },
    // { name: 'Estate Planning', icon: FileText, color: 'from-emerald-500 to-emerald-600', link: '/legal/estate-planning' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 lg:mt-40 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Explore Legal Practice Areas
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse through different areas of law to find the information and resources you need
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link href={category.link} key={index}>
              <button
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 text-left overflow-hidden w-full"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${category.color} p-3 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-gray-700 font-semibold text-base group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>

                {/* Arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </Link>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link href="/all-legal">
          <button className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
            All Legal Issues
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LegalCategories;
