import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const phone = "+91 6363784290";
const email = "genzybasket@gmail.com";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
    <div className="text-sm text-gray-600 space-y-2">{children}</div>
  </div>
);

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-emerald-50 to-cyan-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-surface-border shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-400 mb-6">
            Last updated: March 2026
          </p>

          <Section title="1. Information We Collect">
            <p>
              When you use Genzy Basket, we may collect the following information:
            </p>
            <p>
              <strong>Personal Details:</strong> Name, phone number, and email
              address provided during registration.
            </p>
            <p>
              <strong>Delivery Address &amp; GPS:</strong> Your delivery address
              and location coordinates to fulfil orders accurately.
            </p>
            <p>
              <strong>Order History:</strong> Details of your past orders to
              provide a better shopping experience.
            </p>
            <p>
              <strong>Device Information:</strong> Device type, operating system,
              and app version for troubleshooting and compatibility.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <p>
              <strong>Process Orders:</strong> Fulfil your orders and arrange
              delivery to your specified address.
            </p>
            <p>
              <strong>Communicate Updates:</strong> Send order confirmations,
              delivery updates, and important service notifications.
            </p>
            <p>
              <strong>Improve Our App:</strong> Analyse usage patterns to enhance
              features, performance, and user experience.
            </p>
            <p>
              <strong>Prevent Fraud:</strong> Detect and prevent fraudulent
              activity to protect our users and platform.
            </p>
            <p>
              <strong>Legal Compliance:</strong> Meet applicable legal and
              regulatory requirements.
            </p>
          </Section>

          <Section title="3. Payment Information">
            <p>
              All online payments are processed securely through{" "}
              <strong>Razorpay</strong>, our trusted payment gateway
              partner. Razorpay is PCI-DSS compliant and adheres to the highest
              industry security standards.
            </p>
            <p>
              We do <strong>not</strong> store your credit card, debit card, or
              bank account details on our servers. All payment data is handled
              directly by Razorpay.
            </p>
          </Section>

          <Section title="4. Data Sharing">
            <p>
              We do <strong>not sell</strong> your personal data to third parties.
              We may share your information only in the following circumstances:
            </p>
            <p>
              <strong>Delivery Personnel:</strong> Your name, phone number, and
              delivery address are shared with our delivery partners to fulfil
              your orders.
            </p>
            <p>
              <strong>Payment Processors:</strong> Transaction details are shared
              with Razorpay for processing your payments securely.
            </p>
            <p>
              <strong>Law Enforcement:</strong> We may disclose your information
              if required by law, court order, or government regulation.
            </p>
          </Section>

          <Section title="5. Data Storage &amp; Security">
            <p>
              Your data is stored on encrypted, secure servers. We implement
              industry-standard security measures including encryption, access
              controls, and regular security audits to protect your personal
              information from unauthorised access, alteration, or disclosure.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <p>
              <strong>Access:</strong> Request a copy of the personal data we hold
              about you.
            </p>
            <p>
              <strong>Correction:</strong> Request correction of any inaccurate or
              incomplete information.
            </p>
            <p>
              <strong>Deletion:</strong> Request deletion of your account and
              associated data, subject to legal retention requirements.
            </p>
            <p>
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </Section>

          <Section title="7. Cookies &amp; Analytics">
            <p>
              We may use anonymised analytics to understand how users interact
              with our platform. This helps us improve our services and user
              experience. No personally identifiable information is shared with
              analytics providers.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Genzy Basket is not intended for use by children under the age of
              13. We do not knowingly collect personal information from children
              under 13. If we become aware that we have collected data from a
              child under 13, we will take steps to delete it promptly.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. Continued
              use of the platform after changes constitutes acceptance of the
              revised policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
              >
                {email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-primary hover:underline"
              >
                {phone}
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
