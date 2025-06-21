import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 py-30text-gray-400/5 rounded-lg shadow-lg text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-white mt-20 text-center">Terms of Services</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">1. Introduction</h2>
        <p className="text-gray-300 leading-relaxed">
          Welcome to Webwiz Creation. By accessing or using our website, you agree to these Terms of Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">2. Use of Our Website</h2>
        <p className="text-gray-300 leading-relaxed">
          You agree to use our website for lawful purposes only. You must not:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Use our website in any way that could harm, disable, overburden, or impair it.</li>
          <li>Infringe on our intellectual property rights.</li>
          <li>Upload or transmit any content that is unlawful, libelous, abusive, or obscene.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">3. Intellectual Property</h2>
        <p className="text-gray-300 leading-relaxed">
          All content on our website, including text, images, code, and graphics, is owned by Webwiz Creation or licensed to us.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">4. User Content</h2>
        <p className="text-gray-300 leading-relaxed">
          If you submit content to our website, you grant us a non-exclusive license to use, modify, and distribute that content.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">5. Accounts and Registration</h2>
        <p className="text-gray-300 leading-relaxed">
          To access certain features on our website, you may need to create an account. You agree to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4">
          <li>Provide accurate and complete information during registration.</li>
          <li>Keep your account information up-to-date.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">6. Changes to Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">7. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have any questions about these Terms of Service, please contact us at{' '}
          <Link href="mailto:support@webwizcreation.com">
            <p className="text-cyan-400/ hover:text-cyan-600 underline">support@webwizcreation.com</p>
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
