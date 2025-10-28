"use client"
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function BankruptcyGuide() {
    const [openCountry, setOpenCountry] = useState(null);

    const toggleCountry = (countryId) => {
        setOpenCountry(openCountry === countryId ? null : countryId);
    };

    const countries = [
        {
            id: 'nigeria',
            name: 'Nigeria',
            flag: '🇳🇬',
            overview: 'In Nigeria, bankruptcy and insolvency are governed by the Bankruptcy Act and the Companies and Allied Matters Act (CAMA). The process applies to both individuals and businesses.',
            types: [
                { title: 'Personal Bankruptcy', desc: 'Individual debtors who cannot pay their debts' },
                { title: 'Corporate Insolvency', desc: 'Companies unable to meet financial obligations' },
                { title: 'Receivership', desc: 'Court-appointed receiver manages assets' },
                { title: 'Liquidation', desc: 'Winding up of company affairs' }
            ],
            filing: [
                'Petition filed in Federal High Court',
                'Creditor\'s petition requires debt of at least ₦2,000',
                'Debtor can file voluntary petition',
                'Court examines debtor\'s financial status',
                'Bankruptcy order issued if proven insolvent'
            ],
            exemptions: [
                'Basic household items and personal effects',
                'Tools of trade necessary for livelihood',
                'Pension benefits (partially protected)'
            ],
            highlight: 'Bankruptcy in Nigeria carries social stigma and various legal disabilities. Bankrupts cannot serve as company directors or hold certain public offices.',
            recovery: 'Discharge typically occurs 3-5 years after bankruptcy order. Debtors must cooperate with trustees and court. After discharge, most debts are forgiven, but certain obligations like tax debts may persist.'
        },
        {
            id: 'southafrica',
            name: 'South Africa',
            flag: '🇿🇦',
            overview: 'South Africa\'s insolvency framework is governed by the Insolvency Act of 1936 and the National Credit Act. The system provides for both voluntary and compulsory sequestration.',
            types: [
                { title: 'Voluntary Surrender', desc: 'Debtor applies for sequestration' },
                { title: 'Compulsory Sequestration', desc: 'Creditor forces bankruptcy' },
                { title: 'Debt Review', desc: 'Alternative under National Credit Act' },
                { title: 'Administration', desc: 'For businesses in financial distress' }
            ],
            filing: [
                'Must prove advantage to creditors',
                'Debts must exceed assets',
                'Filing done in High Court',
                'Legal representation typically required'
            ],
            exemptions: [
                'Necessary clothing and bedding',
                'Food for two months',
                'Professional books and tools',
                'Portion of pension fund benefits'
            ],
            highlight: 'Debt review under the National Credit Act is often preferred, allowing debtors to restructure debts without sequestration.',
            recovery: 'Rehabilitation can occur after 10 years automatically, or earlier (4 years minimum) by court application. Rehabilitation removes legal disabilities and allows fresh financial start.'
        },
        {
            id: 'usa',
            name: 'United States',
            flag: '🇺🇸',
            overview: 'U.S. bankruptcy law is federal and provides several chapters under the Bankruptcy Code. It\'s designed to give honest debtors a fresh start while treating creditors fairly.',
            types: [
                { title: 'Chapter 7', desc: 'Liquidation bankruptcy for individuals and businesses' },
                { title: 'Chapter 13', desc: 'Reorganization for individuals with regular income' },
                { title: 'Chapter 11', desc: 'Reorganization primarily for businesses' },
                { title: 'Chapter 12', desc: 'Family farmers and fishermen' }
            ],
            filing: [
                'Credit counseling required before filing',
                'File petition with bankruptcy court',
                'Pay filing fee ($338 Chapter 7, $313 Chapter 13)',
                'Automatic stay stops collection actions',
                'Attend 341 meeting with trustee',
                'Complete financial management course'
            ],
            exemptions: [
                'Homestead exemption up to $27,900',
                'Vehicle exemption up to $4,450',
                'Household goods up to $14,875',
                'Retirement accounts fully protected',
                'Tools of trade up to $2,800',
                'Wildcard exemption available'
            ],
            highlight: 'The automatic stay immediately stops most creditor actions, including foreclosures, repossessions, and wage garnishments.',
            recovery: 'Chapter 7: Typically 3-6 months. Chapter 13: 3-5 years after plan completion. Some debts non-dischargeable (student loans, taxes, child support).'
        },
        {
            id: 'uk',
            name: 'United Kingdom',
            flag: '🇬🇧',
            overview: 'UK insolvency law is governed by the Insolvency Act 1986 and Enterprise Act 2002. The system aims to balance debtor relief with creditor interests.',
            types: [
                { title: 'Bankruptcy', desc: 'For individuals unable to pay debts' },
                { title: 'Individual Voluntary Arrangement (IVA)', desc: 'Debt repayment plan' },
                { title: 'Debt Relief Order (DRO)', desc: 'For those with limited assets and income' },
                { title: 'Administration', desc: 'For companies in financial difficulty' }
            ],
            filing: [
                'Online application through government service',
                'Fee: £680 (can be paid in installments)',
                'Minimum debt: £5,000',
                'Official receiver appointed automatically',
                'Interview with official receiver required'
            ],
            exemptions: [
                'Reasonable household items',
                'Tools and equipment for work',
                'Pension rights',
                'Items of sentimental value (considered case by case)'
            ],
            highlight: 'Most bankruptcies are discharged after just 12 months, one of the fastest discharge periods globally.',
            recovery: 'Bankruptcy restrictions typically last 12 months. During this time, you cannot borrow more than £500 without disclosure, act as a company director, or trade under a different name. After discharge, most debts are written off.'
        },
        {
            id: 'canada',
            name: 'Canada',
            flag: '🇨🇦',
            overview: 'Canadian bankruptcy law is federal, governed by the Bankruptcy and Insolvency Act (BIA). Only Licensed Insolvency Trustees can administer bankruptcies.',
            types: [
                { title: 'Personal Bankruptcy', desc: 'Legal process to eliminate most debts' },
                { title: 'Consumer Proposal', desc: 'Negotiate to repay portion of debt' },
                { title: 'Division I Proposal', desc: 'For debts over $250,000' },
                { title: 'Corporate Restructuring', desc: 'For businesses under BIA or CCAA' }
            ],
            filing: [
                'Consult Licensed Insolvency Trustee (LIT)',
                'LIT files bankruptcy documents',
                'Filing fee approximately $1,800',
                'Automatic stay of proceedings begins',
                'Attend two financial counseling sessions',
                'Submit monthly income/expense reports'
            ],
            exemptions: [
                'Primary residence equity (varies by province)',
                'Vehicle up to certain value',
                'Household furnishings',
                'RRSPs except contributions in past 12 months',
                'Tools of trade'
            ],
            highlight: 'If your income exceeds standards, you must pay 50% of surplus income for extended period.',
            recovery: 'First-time bankruptcy: 9 months (no surplus income) or 21 months (with surplus). Second bankruptcy: 24-36 months. Student loans discharged 7 years after leaving school.'
        },
        {
            id: 'australia',
            name: 'Australia',
            flag: '🇦🇺',
            overview: 'Australian bankruptcy is governed by the Bankruptcy Act 1966, administered by the Australian Financial Security Authority (AFSA). It provides protection for honest debtors while ensuring creditors are treated fairly.',
            types: [
                { title: 'Bankruptcy', desc: 'Legal process releasing you from most debts' },
                { title: 'Debt Agreement', desc: 'Negotiate reduced payment with creditors' },
                { title: 'Personal Insolvency Agreement (PIA)', desc: 'Formal agreement alternative' }
            ],
            filing: [
                'Submit online debtor\'s petition or creditor\'s petition',
                'No court appearance usually required',
                'Trustee appointed to manage estate',
                'Complete Statement of Affairs',
                'Cooperate with trustee throughout process'
            ],
            exemptions: [
                'Household property up to prescribed value',
                'Vehicle up to $9,100',
                'Tools of trade up to $4,050',
                'Superannuation (with some exceptions)',
                'Life insurance policies'
            ],
            highlight: 'Bankruptcy period reduced to 1 year for first-time bankrupts (from 3 years) as of 2021.',
            recovery: 'Automatic discharge after 1 year (first time) or 3 years (subsequent). During bankruptcy, restrictions include overseas travel limits, credit disclosure requirements, and restrictions on running a business.'
        },
        {
            id: 'kenya',
            name: 'Kenya',
            flag: '🇰🇪',
            overview: 'Kenyan bankruptcy law is governed by the Insolvency Act of 2015, which modernized the country\'s insolvency framework. The system covers both personal and corporate insolvency.',
            types: [
                { title: 'Personal Bankruptcy', desc: 'For individuals unable to pay debts' },
                { title: 'Corporate Insolvency', desc: 'Liquidation or administration of companies' },
                { title: 'Voluntary Arrangement', desc: 'Negotiate with creditors' },
                { title: 'Administration', desc: 'Business rescue mechanism' }
            ],
            filing: [
                'File petition in High Court',
                'Minimum debt of KES 100,000',
                'Insolvency practitioner may be appointed',
                'Creditors\' meeting held',
                'Court issues bankruptcy order if appropriate'
            ],
            exemptions: [
                'Basic household items',
                'Tools necessary for employment',
                'Personal effects',
                'Items of limited value necessary for basic living'
            ],
            highlight: 'The 2015 Act introduced business rescue provisions to help viable businesses avoid liquidation.',
            recovery: 'Discharge typically occurs 3-5 years after bankruptcy order. Certain restrictions apply during bankruptcy period, including restrictions on obtaining credit and running businesses. After discharge, most debts are eliminated.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-16 text-center lg:mt-40 mt-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">📚 Global Bankruptcy Guide</h1>
                    <p className="text-lg md:text-xl opacity-95">
                        Comprehensive information on bankruptcy laws and procedures worldwide
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Introduction */}
                    <div className="bg-slate-50 border-l-4 border-purple-600 p-6 rounded-lg mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">
                            Understanding Bankruptcy Around the World
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            Bankruptcy laws vary significantly across countries. This guide provides detailed
                            information about bankruptcy procedures, types, exemptions, and recovery strategies
                            for different nations. Click on any country below to expand and learn more.
                        </p>
                    </div>

                    {/* Country Accordion */}
                    <div className="space-y-4">
                        {countries.map((country) => (
                            <div
                                key={country.id}
                                className="border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Country Header */}
                                <button
                                    onClick={() => toggleCountry(country.id)}
                                    className="w-full   hover:from-purple-700 hover:to-indigo-700  px-6 py-5 flex justify-between items-center transition-all"
                                >
                                    <span className="text-xl font-semibold">
                                        {country.flag} {country.name}
                                    </span>
                                    <ChevronDown
                                        className={`w-6 h-6 transition-transform duration-300 ${openCountry === country.id ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Country Content */}
                                <div
                                    className={`transition-all duration-300 ease-in-out ${openCountry === country.id
                                            ? 'max-h-[5000px] opacity-100'
                                            : 'max-h-0 opacity-0'
                                        } overflow-hidden`}
                                >
                                    <div className="p-8 space-y-8">
                                        {/* Overview */}
                                        <section>
                                            <h3 className="text-2xl font-bold text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                                                Overview
                                            </h3>
                                            <p className="text-slate-700 leading-relaxed">{country.overview}</p>
                                        </section>

                                        {/* Types */}
                                        <section>
                                            <h3 className="text-2xl font-bold text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                                                Types of Bankruptcy
                                            </h3>
                                            <div className="space-y-3">
                                                {country.types.map((type, idx) => (
                                                    <div key={idx} className="flex gap-3">
                                                        <span className="text-purple-600 font-bold">•</span>
                                                        <p className="text-slate-700">
                                                            <strong className="text-slate-900">{type.title}:</strong> {type.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Filing Process */}
                                        <section>
                                            <h3 className="text-2xl font-bold text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                                                Filing Process
                                            </h3>
                                            <ul className="space-y-2">
                                                {country.filing.map((item, idx) => (
                                                    <li key={idx} className="flex gap-3 text-slate-700">
                                                        <span className="text-purple-600">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* Exemptions */}
                                        <section>
                                            <h3 className="text-2xl font-bold text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                                                Exemptions
                                            </h3>
                                            <ul className="space-y-2">
                                                {country.exemptions.map((item, idx) => (
                                                    <li key={idx} className="flex gap-3 text-slate-700">
                                                        <span className="text-purple-600">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* Highlight Box */}
                                        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-lg">
                                            <p className="text-slate-800">
                                                <strong className="text-amber-700">💡 Important Note:</strong>{' '}
                                                {country.highlight}
                                            </p>
                                        </div>

                                        {/* Recovery */}
                                        <section>
                                            <h3 className="text-2xl font-bold text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                                                Recovery & Discharge
                                            </h3>
                                            <p className="text-slate-700 leading-relaxed">{country.recovery}</p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}