import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE = "+916363784290";
const EMAIL = "genzybasket@gmail.com";

export default function DeleteAccountPage() {
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

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Delete Your Account
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            We're sorry to see you go. Please read the following information
            carefully before proceeding.
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              What happens when you delete your account?
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                When you request account deletion, the following actions will be
                taken:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Your personal information (name, email, phone number) will be
                  deactivated and no longer accessible.
                </li>
                <li>Your delivery address and saved preferences will be removed.</li>
                <li>Your order history will be retained for legal and compliance purposes.</li>
                <li>Your wallet balance, if any, will be forfeited.</li>
                <li>Any active subscriptions will be cancelled.</li>
                <li>You will be immediately logged out and will not be able to log in again.</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Data Retention
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                In accordance with applicable laws and regulations, we may retain
                certain transaction records and order data for a period required
                by law, even after your account is deleted. This data will not be
                used for marketing or any other purpose beyond legal compliance.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 text-center">
            <p className="text-sm text-amber-800 font-medium mb-2">
              To delete your account, please use the Genzy Basket app.
            </p>
            <p className="text-xs text-amber-600">
              Go to Profile → Settings → Delete Account
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Need Help?
            </h2>
            <p className="text-sm text-gray-600">
              If you have any questions or need assistance, please contact us at{" "}
              <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                {EMAIL}
              </a>{" "}
              or call{" "}
              <a href={`tel:${PHONE}`} className="text-primary hover:underline">
                {PHONE}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
