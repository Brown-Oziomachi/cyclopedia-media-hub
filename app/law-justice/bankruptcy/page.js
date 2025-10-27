"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BankruptcyPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is bankruptcy?",
      answer: {
        text: "Bankruptcy is a process that is governed by federal law, supervised by bankruptcy court, which allows individuals to seek relief from overwhelming debt and obtain a new financial start. An individual that cannot repay their debts when they become due, files for bankruptcy, following a legal framework that resolves debts and determines how creditors will be paid. A bankruptcy attorney can help determine which one is right, based on your situation. Some types of bankruptcy proceedings include:",
        list: [
          "Chapter 7 bankruptcy",
          "Chapter 11 bankruptcy",
          "Chapter 13 bankruptcy"
        ]
      }
    },
    {
      question: "What are the consequences for filing for bankruptcy?",
      answer: {
        text: "There can be various consequence for filing for bankruptcy. However, the impact is not permanent. Given time, and responsible financial management, an individual can rebuild positive financial standing. Common consequences for filing for bankruptcy include:",
        list: [
          "Impact on credit score",
          "Difficulty obtaining credit",
          "Potential loss of assets",
          "Public record of filing",
          "Impact of future financial opportunities"
        ]
      }
    },
    {
      question: "What assets can I keep in bankruptcy?",
      answer: {
        text: "The assets that you can keep in bankruptcy depend on the type of bankruptcy you file and the state you live in, determining exemption laws. Exemption laws define types and amounts of property that can be protected from seizure to repay creditors. Exemption laws do have limitations. Consulting with a bankruptcy attorney can help you understand what is best for your situation and which assets you can keep.",
        list: []
      }
    },
    {
      question: "What debts can be discharged in bankruptcy?",
      answer: {
        text: "Through bankruptcy, a debt that you are no longer liable for repaying is considered discharged. Discharged depts vary with the type of bankruptcy you file and the laws and regulations in your state. Not all debts can be discharged, and some have certain requirements that must be met. Common types of debt that may be discharged are:",
        list: [
          "Credit card debt",
          "Medical bills",
          "Personal loans",
          "Utility bills",
          "Tax debts",
          "Civil judgments",
          "Repossessions or foreclosure deficiencies"
        ]
      }
    },
    {
      question: "How Do I Choose A Bankruptcy Lawyer?",
      answer: {
        text: "Consider the following when contacting a law firm and determining which lawyer to work with:",
        sections: [
          {
            title: "Comfort Level",
            content: "- Are you comfortable telling the lawyer personal information? How do you feel when speaking with the attorney?"
          },
          {
            title: "Credentials",
            content: "- How long has the lawyer offered legal advice to clients in bankruptcy cases? Has the lawyer handled cases before the U.S. Bankruptcy Court?"
          },
          {
            title: "Cost",
            content: "- Is the attorney affordable for your price range? Can the lawyer estimate the cost of your bankruptcy filing, including filing fee?"
          },
          {
            title: "City",
            content: "- Is the lawyer's office conveniently located near you?"
          }
        ]
      }
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center text-center bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute w-[400px] h-[400px] bg-orange-500/30 blur-3xl rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-red-500/30 blur-3xl rounded-full bottom-10 right-20 animate-pulse"></div>

        <div className="relative z-10 px-4 max-w-4xl lg:mt-40">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase mb-4 drop-shadow-lg">
            Bankruptcy Law
          </h1>
          <p className="text-gray-100 text-base md:text-lg leading-relaxed">
            Find legal guidance and resources for navigating bankruptcy proceedings
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Find the Right Lawyer for Your Legal Needs in Bankruptcy
          </h2>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base md:text-lg font-semibold text-blue-600 pr-4">
                    {faq.question}
                  </h3>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                
                {openAccordion === index && (
                  <div className="p-4 md:p-5 pt-0 border-t border-gray-200">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {faq.answer.text}
                    </p>
                    {faq.answer.list && faq.answer.list.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2">
                        {faq.answer.list.map((item, idx) => (
                          <li key={idx} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    )}
                    {faq.answer.sections && (
                      <div className="space-y-4">
                        {faq.answer.sections.map((section, idx) => (
                          <div key={idx}>
                            <h4 className="font-bold text-gray-800 mb-1">{section.title}</h4>
                            <p className="text-gray-700">{section.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Browse Articles Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Learn More About Bankruptcy
          </h2>
          
          <div className="border-l-4 border-orange-500 pl-6 py-2">
            <p className="text-orange-600 text-base md:text-lg leading-relaxed">
              Want to learn more about bankruptcy options and financial recovery strategies? Browse our comprehensive news articles and legal guides to discover how to navigate debt relief, understand exemption laws, avoid common bankruptcy mistakes, and rebuild your credit score after filing. Our expert resources will help you make informed decisions about your financial future.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <a 
              href="/law-justice" 
              className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Read Our Bankruptcy Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Related Topics */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Related Legal Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Debt Relief',
              'Credit Counseling',
              'Foreclosure Defense',
              'Asset Protection',
              'Creditor Harassment',
              'Wage Garnishment'
            ].map((topic, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {topic}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankruptcyPage;