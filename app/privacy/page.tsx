import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Ecommerce",
  description: "Privacy policy and data protection information for our ecommerce platform"
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  At Ecommerce ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-700 mb-4">We collect personal information that you provide to us, including:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Payment information (billing address, payment method details)</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                  <li>Customer service interactions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">We automatically collect certain information when you visit our website:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website</li>
                  <li>Clickstream data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies and Tracking Technologies</h3>
                <p className="text-gray-700 mb-4">
                  We use cookies, web beacons, and similar tracking technologies to enhance your experience and collect information about how you use our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer service and support</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Personalize your shopping experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Analyze website usage and improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We share information with third-party service providers who help us operate our business, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Payment processors</li>
                  <li>Shipping and fulfillment partners</li>
                  <li>Email marketing services</li>
                  <li>Analytics providers</li>
                  <li>Customer service platforms</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose your information if required by law or in response to valid legal processes, such as subpoenas or court orders.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Business Transfers</h3>
                <p className="text-gray-700 mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Access and Correction</h3>
                <p className="text-gray-700 mb-4">
                  You can access and update your account information at any time through your account dashboard.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Marketing Communications</h3>
                <p className="text-gray-700 mb-4">
                  You can opt out of marketing emails by clicking the unsubscribe link in any marketing email or by contacting us directly.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Cookies</h3>
                <p className="text-gray-700 mb-4">
                  You can control cookies through your browser settings, though disabling cookies may affect website functionality.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.4 Data Portability and Deletion</h3>
                <p className="text-gray-700 mb-4">
                  You may request a copy of your personal data or request deletion of your account and associated data by contacting us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Generally:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Account information: Until you delete your account</li>
                  <li>Order information: 7 years for tax and legal purposes</li>
                  <li>Marketing data: Until you opt out or as required by law</li>
                  <li>Website analytics: Up to 2 years</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us to have it removed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Links</h2>
                <p className="text-gray-700 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">Email: privacy@ecommerce.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-700">Address: 123 Business Street, City, State 12345</p>
                  <p className="text-gray-700">Data Protection Officer: dpo@ecommerce.com</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  href="/terms" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/contact" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 