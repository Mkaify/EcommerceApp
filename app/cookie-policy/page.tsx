import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | Ecommerce",
  description: "Information about how we use cookies and tracking technologies on our website"
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Essential Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation, security, network management, and accessibility.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Authentication cookies (to keep you logged in)</li>
                  <li>Security cookies (to prevent fraud)</li>
                  <li>Session cookies (to maintain your shopping cart)</li>
                  <li>Load balancing cookies (to distribute traffic)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Performance Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting anonymous information about pages visited and links clicked.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Google Analytics cookies</li>
                  <li>Page performance monitoring</li>
                  <li>Error tracking and reporting</li>
                  <li>Website optimization cookies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Functional Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and choices.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Language preference cookies</li>
                  <li>Theme and display preference cookies</li>
                  <li>Location-based service cookies</li>
                  <li>Accessibility feature cookies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.4 Marketing Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Social media advertising cookies</li>
                  <li>Retargeting and remarketing cookies</li>
                  <li>Interest-based advertising cookies</li>
                  <li>Campaign effectiveness cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Detailed Cookie Information</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 border-b text-left font-semibold">Cookie Name</th>
                        <th className="px-4 py-2 border-b text-left font-semibold">Purpose</th>
                        <th className="px-4 py-2 border-b text-left font-semibold">Duration</th>
                        <th className="px-4 py-2 border-b text-left font-semibold">Type</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="px-4 py-2 border-b">_ga</td>
                        <td className="px-4 py-2 border-b">Google Analytics - tracks user behavior</td>
                        <td className="px-4 py-2 border-b">2 years</td>
                        <td className="px-4 py-2 border-b">Performance</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">_gid</td>
                        <td className="px-4 py-2 border-b">Google Analytics - distinguishes users</td>
                        <td className="px-4 py-2 border-b">24 hours</td>
                        <td className="px-4 py-2 border-b">Performance</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">session_id</td>
                        <td className="px-4 py-2 border-b">Maintains your login session</td>
                        <td className="px-4 py-2 border-b">Browser session</td>
                        <td className="px-4 py-2 border-b">Essential</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">cart_items</td>
                        <td className="px-4 py-2 border-b">Stores your shopping cart contents</td>
                        <td className="px-4 py-2 border-b">30 days</td>
                        <td className="px-4 py-2 border-b">Functional</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">preferences</td>
                        <td className="px-4 py-2 border-b">Remembers your site preferences</td>
                        <td className="px-4 py-2 border-b">1 year</td>
                        <td className="px-4 py-2 border-b">Functional</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Some cookies on our website are set by third-party services. We work with several partners who may place cookies on your device:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing (Stripe, PayPal)</li>
                  <li><strong>Social Media:</strong> For social sharing functionality</li>
                  <li><strong>Customer Support:</strong> For live chat and help desk services</li>
                  <li><strong>Email Marketing:</strong> For newsletter and promotional campaigns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies through your browser settings. Here's how to manage cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Cookie Consent Management</h3>
                <p className="text-gray-700 mb-4">
                  When you first visit our website, we'll ask for your consent to use non-essential cookies. You can:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your preferences by cookie category</li>
                  <li>Change your preferences at any time</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-blue-800 font-medium">Note:</p>
                  <p className="text-blue-700 text-sm">
                    Disabling certain cookies may affect the functionality of our website and your user experience.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Mobile Applications</h2>
                <p className="text-gray-700 mb-4">
                  Our mobile applications may use similar tracking technologies to cookies, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Mobile device identifiers</li>
                  <li>App usage analytics</li>
                  <li>Push notification tokens</li>
                  <li>Location data (with your permission)</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  You can manage these preferences through your device settings or within the app itself.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. When we make changes, we will:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Update the "Last updated" date at the top of this policy</li>
                  <li>Notify you of significant changes through our website</li>
                  <li>Request new consent if required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">Email: cookies@ecommerce.com</p>
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
                  href="/privacy" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Privacy Policy
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