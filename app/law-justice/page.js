import React from 'react';
import Link from 'next/link';
import { Scale, Users, Ambulance, Home, Briefcase, Gavel, Car, Heart, UserCheck, Building, FileText } from 'lucide-react';

const LegalCategories = () => {
  const categories = [
    { name: 'Criminal Law', icon: Scale, color: 'from-blue-500 to-blue-600', link: '/law-justice/criminal-law' },
    { name: 'Family Law', icon: Users, color: 'from-purple-500 to-purple-600', link: '/law-justice/family-law' },
    { name: 'Employment Law', icon: Briefcase, color: 'from-indigo-500 to-indigo-600', link: '/law-justice/employment-law' },
    { name: 'Litigation & Appeals', icon: Gavel, color: 'from-orange-500 to-orange-600', link: '/law-justice/litigation-appeals' },
    { name: 'Divorce', icon: Heart, color: 'from-pink-500 to-pink-600', link: '/law-justice/divorce-law' },
    { name: 'Medical Malpractice', icon: UserCheck, color: 'from-teal-500 to-teal-600', link: '/law-justice/medical-malpractice' },
    { name: 'Landlord-Tenant Law', icon: Building, color: 'from-yellow-500 to-yellow-600', link: '/law-justice/landlord-tenant-law' },
  ];

  const additionalIssues = [
    { name: 'Bankruptcy', link: '/law-justice/bankruptcy' },
    { name: 'Employment Law', link: '/law-justice/employment-law' },
    { name: 'Civil Right', link: '/law-justice/civil-right' },
    { name: 'Business', link: '/law-justice/business-law' },
    { name: 'Immigration', link: '/law-justice/immigration' },
    { name: 'Real Estate', link: '/law-justice/real-estate' },
    { name: 'Education', link: '/education' },
    { name: 'Litigation & Appeals', link: '/law-justice/litigation-appeals' },
    { name: 'Sex Offenses', link: '/law-justice/sex-offenses' },
    // { name: 'Wrongful Death', link: '/law-justice/wrongful-death' },
    // { name: 'Elder Law', link: '/law-justice/elder-law' },
    { name: 'Medical Malpractice', link: '/law-justice/medical-malpractice' },
    // { name: 'Sexual Harassment', link: '/law-justice/sexual-harassment' },
    // { name: 'Wrongful Termination', link: '/law-justice/wrongful-termination' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 lg:mt-40 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore Legal Practice Areas
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          Whether you are facing a legal issue or want to learn about a specific legal subject,
          browse through different areas of law to find the information and resources you need
        </p>

        <div className="mt-8 max-w-4xl mx-auto text-left">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-900">Understanding Nigerian Law</h3>
            <p className="text-gray-700 mb-3">
              Nigeria operates under a mixed legal system that includes:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-semibold">Federal laws</span> - Enacted by the National Assembly</li>
              <li><span className="font-semibold">State laws</span> - Enacted by State Houses of Assembly across Nigeria's 36 states and FCT</li>
              <li><span className="font-semibold">Customary law</span> - Traditional practices recognized in many communities</li>
              <li><span className="font-semibold">Sharia law</span> - Applied in northern states for personal matters involving Muslims</li>
              <li><span className="font-semibold">Common law</span> - Inherited from the British colonial era</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Constitutional & Civil Rights</h4>
              <p className="text-gray-600 text-sm">Your fundamental rights under the Nigerian Constitution</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Criminal Law</h4>
              <p className="text-gray-600 text-sm">Criminal offenses, procedures, and your rights</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Family Law</h4>
              <p className="text-gray-600 text-sm">Marriage, divorce, custody, and family matters</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Property & Land Law</h4>
              <p className="text-gray-600 text-sm">Land ownership, transactions, and disputes</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Employment & Labor Law</h4>
              <p className="text-gray-600 text-sm">Workers' rights and employment regulations</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Business & Corporate Law</h4>
              <p className="text-gray-600 text-sm">Company registration, contracts, and regulations</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Consumer Protection</h4>
              <p className="text-gray-600 text-sm">Your rights as a consumer in Nigeria</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Taxation</h4>
              <p className="text-gray-600 text-sm">Tax obligations and regulations</p>
            </div>
          </div>
        </div>
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
      <div className="text-center mb-16">
        <Link href="/all-legal">
          <button className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
            All Legal Issues
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Additional Legal Issues Section */}
      <div className="mt-20 pt-12 border-t-2 border-gray-200">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Additional Legal Issues
          </h3>
          <p className="text-gray-600">
            View <Link href="/all-legal" className="text-blue-600 hover:underline font-semibold">full list</Link> of legal issues.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalIssues.map((issue, index) => (
            <Link href={issue.link} key={index}>
              <button className="group flex items-center gap-2 text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">
                <svg className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm md:text-base">{issue.name}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalCategories;