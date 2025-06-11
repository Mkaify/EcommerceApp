import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Ecommerce",
  description: "Terms and conditions for using our ecommerce platform"
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using this e-commerce platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily access the materials on Ecommerce's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Terms</h2>
                <p className="text-gray-700 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the security of your account.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One person or legal entity may not maintain more than one account</li>
                  <li>You are responsible for all activity that occurs under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Products and Services</h2>
                <p className="text-gray-700 mb-4">
                  All products and services are subject to availability. We reserve the right to discontinue any product or service at any time without notice. Prices for products are subject to change without notice.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Product descriptions and pricing are subject to change</li>
                  <li>We do not guarantee that product descriptions are accurate or complete</li>
                  <li>We reserve the right to limit quantities of any products or services</li>
                  <li>All sales are final unless otherwise stated in our return policy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  By placing an order, you represent and warrant that you are authorized to use the payment method and authorize us to charge your payment method for the total amount of your order.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Payment must be received by us before products are shipped</li>
                  <li>You are responsible for all charges incurred on your account</li>
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Shipping and Delivery</h2>
                <p className="text-gray-700 mb-4">
                  We will make every effort to deliver products in a timely manner, however, delivery times are estimates and we cannot guarantee specific delivery dates.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Shipping costs are calculated at checkout</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                  <li>International orders may be subject to customs duties and taxes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
                <p className="text-gray-700 mb-4">
                  We want you to be satisfied with your purchase. Items may be returned within 30 days of delivery for a full refund, subject to our return policy.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Items must be in original condition and packaging</li>
                  <li>Customer is responsible for return shipping costs</li>
                  <li>Refunds will be processed within 5-10 business days</li>
                  <li>Some items may not be eligible for return</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall Ecommerce or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ecommerce's website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">Email: legal@ecommerce.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-700">Address: 123 Business Street, City, State 12345</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
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