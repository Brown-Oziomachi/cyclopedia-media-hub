"use client"

import { Suspense } from "react";
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 py-30 bg-gray-400/5  rounded-lg shadow-lg ">
      <h1 className="text-4xl font-extrabold mb-6 text-white text-center brightness-200">Privacy Policy</h1>
         <ScrollProgressBar />
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          Webwiz Creation is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and disclose your personal data.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">2. Information We Collect</h2>
        <p className="text-gray-300 leading-relaxed">
          We collect the following types of information:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Personal data, such as your name and email address, when you create an account or contact us.</li>
          <li>Usage data, such as your IP address and browser type, when you visit our website.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">3. How We Use Your Information</h2>
        <p className="text-gray-300 leading-relaxed">
          We use your information to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Provide and improve our services.</li>
          <li>Respond to your inquiries and provide support.</li>
          <li>Send you newsletters and promotional emails.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">4. Disclosure of Your Information</h2>
        <p className="text-gray-300 leading-relaxed">
          We may disclose your information to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Our affiliates and partners.</li>
          <li>Service providers who help us operate our business.</li>
          <li>Authorities, if required by law.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">5. Your Rights</h2>
        <p className="text-gray-300 leading-relaxed">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Access and update your personal data.</li>
          <li>Request deletion of your personal data.</li>
          <li>Opt-out of marketing communications.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">6. Changes to This Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new policy on our website.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600">7. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <Link href="mailto:support@webwizcreation.com">
            <p className="text-green-600 hover:text-cyan-600 underline">support@webwizcreation.com</p>
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

