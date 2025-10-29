
export const metadata = {
  title: "Privacy Policy | The Cyclopedia",
  description:
    "The Cyclopedia's privacy policy. Learn how we protect your data, handle personal information, and maintain your privacy and security.",
  referrer: "strict-origin-when-cross-origin",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 mt-10 lg:mt-30">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg">
            <strong>The Cyclopedia</strong>
          </p>
          <p className="text-lg">Last Updated: October 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              The Cyclopedia is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              personal information when you visit our website, use our services,
              subscribe to newsletters, or interact with our content.
            </p>
            <p className="mt-4">
              By accessing The Cyclopedia, you agree to the terms of this
              Privacy Policy. If you do not agree, please do not use our
              services.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Information You Provide
            </h3>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Account information (name, email, password)</li>
              <li>Feedback and contact form submissions</li>
              <li>
                Payment information (processed by secure third-party providers)
              </li>
              <li>Newsletter subscription preferences</li>
              <li>User-generated comments and content</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Information Collected Automatically
            </h3>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Cookies and tracking technologies</li>
              <li>IP address, browser type, and operating system</li>
              <li>Pages visited and time spent on site</li>
              <li>Device information and identifiers</li>
              <li>Analytics data from Vercel and Google Analytics</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Providing and improving our news platform</li>
              <li>Processing subscriptions and transactions</li>
              <li>Sending newsletters and updates</li>
              <li>Responding to inquiries</li>
              <li>Analyzing user behavior and improving content</li>
              <li>Detecting and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We share information with trusted third parties:
            </p>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Hosting and cloud service providers</li>
              <li>Email service providers</li>
              <li>Analytics providers (Vercel and Google Analytics)</li>
              <li>Customer support platforms</li>
            </ul>
            <p className="mt-4">
              We disclose information when required by law, to protect our
              rights, or during business transactions.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Retention</h2>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Account information: As long as account is active</li>
              <li>Emails and feedback: 2-3 years</li>
              <li>Cookies: 1-2 years</li>
              <li>Log data: 90 days</li>
              <li>Payment records: 7 years</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Your Privacy Rights</h2>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Request access to your personal information</li>
              <li>Correct or delete inaccurate information</li>
              <li>Opt out of promotional emails</li>
              <li>Control cookies through browser settings</li>
              <li>
                California residents (CCPA): Delete data, opt-out of sales
              </li>
              <li>EU residents (GDPR): Additional data protection rights</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              7. International Data Transfers
            </h2>
            <p>
              We may transfer your information to countries outside your
              residence. EU transfers comply with GDPR requirements.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <p>
              The Cyclopedia is not intended for children under 13. We do not
              knowingly collect information from children under 13. Parents may
              contact us to review or delete information.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party services. This
              Privacy Policy does not apply to them. Review their privacy
              policies before providing information.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Cookies</h2>
            <ul className="ml-4 space-y-2 list-disc list-inside">
              <li>Essential Cookies: Required for functionality</li>
              <li>Performance Cookies: Understand user interaction</li>
              <li>Marketing Cookies: Track advertising effectiveness</li>
              <li>Third-Party Cookies: Set by analytics providers</li>
            </ul>
            <p className="mt-4">
              Manage cookie preferences through browser settings or our cookie
              consent tool.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes
              will be notified by updating the date and sending direct
              notifications. Your continued use means you accept changes.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Email:</p>
                <p>privacy@thecyclopedia.ng</p>
              </div>
              <div>
                <p className="font-semibold">Mailing Address:</p>
                <p>
                  The Cyclopedia 
                  <br />
                  Privacy Department
                  <br />
                  Abuja, Nigeria
                </p>
              </div>
              <div>
                <p className="font-semibold">Response Time:</p>
                <p>We will respond to privacy inquiries within 30 days.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t pt-8 mt-12">
            <p className="text-sm">
              This Privacy Policy is effective as of October 2025.
            </p>
            <p className="text-sm mt-4">
              © 2025 The Cyclopedia. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
