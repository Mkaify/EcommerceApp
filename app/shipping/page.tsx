import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shipping Information | Ecommerce",
  description: "Comprehensive shipping information including delivery options, timeframes, and costs"
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Shipping Options</h2>
                <p className="text-gray-700 mb-4">
                  We offer multiple shipping options to meet your delivery needs:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 mb-6">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 border-b text-left font-semibold">Shipping Method</th>
                        <th className="px-4 py-3 border-b text-left font-semibold">Delivery Time</th>
                        <th className="px-4 py-3 border-b text-left font-semibold">Cost</th>
                        <th className="px-4 py-3 border-b text-left font-semibold">Features</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="px-4 py-3 border-b font-medium">Standard Shipping</td>
                        <td className="px-4 py-3 border-b">5-7 business days</td>
                        <td className="px-4 py-3 border-b">$5.99</td>
                        <td className="px-4 py-3 border-b">Basic tracking</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b font-medium">Expedited Shipping</td>
                        <td className="px-4 py-3 border-b">3-4 business days</td>
                        <td className="px-4 py-3 border-b">$9.99</td>
                        <td className="px-4 py-3 border-b">Enhanced tracking</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b font-medium">Express Shipping</td>
                        <td className="px-4 py-3 border-b">1-2 business days</td>
                        <td className="px-4 py-3 border-b">$19.99</td>
                        <td className="px-4 py-3 border-b">Priority handling, SMS updates</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b font-medium">Same-Day Delivery</td>
                        <td className="px-4 py-3 border-b">Same day</td>
                        <td className="px-4 py-3 border-b">$29.99</td>
                        <td className="px-4 py-3 border-b">Select cities only, real-time tracking</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b font-medium">Overnight Shipping</td>
                        <td className="px-4 py-3 border-b">Next business day</td>
                        <td className="px-4 py-3 border-b">$39.99</td>
                        <td className="px-4 py-3 border-b">Guaranteed delivery, signature required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Free Shipping</h2>
                <p className="text-gray-700 mb-4">
                  Enjoy free shipping on qualifying orders:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Orders over $50:</strong> Free standard shipping</li>
                  <li><strong>Orders over $100:</strong> Free expedited shipping</li>
                  <li><strong>Premium Members:</strong> Free shipping on all orders</li>
                  <li><strong>First-Time Customers:</strong> Free shipping with code WELCOME</li>
                </ul>
                <div className="bg-green-50 p-4 rounded-lg mt-4">
                  <p className="text-green-800 font-medium">Pro Tip:</p>
                  <p className="text-green-700 text-sm">
                    Join our membership program for unlimited free shipping and exclusive perks!
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Processing Time</h2>
                <p className="text-gray-700 mb-4">
                  Order processing times before shipment:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>In-Stock Items:</strong> 1-2 business days</li>
                  <li><strong>Custom/Personalized Items:</strong> 3-5 business days</li>
                  <li><strong>Pre-Order Items:</strong> Ships on release date</li>
                  <li><strong>Bulk Orders (20+ items):</strong> 2-4 business days</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Orders placed before 2:00 PM EST on business days are processed the same day.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Delivery Areas</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Domestic Shipping (United States)</h3>
                <p className="text-gray-700 mb-4">
                  We ship to all 50 states, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Residential addresses</li>
                  <li>Business addresses</li>
                  <li>P.O. Boxes (standard shipping only)</li>
                  <li>Military APO/FPO addresses</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 International Shipping</h3>
                <p className="text-gray-700 mb-4">
                  We ship to over 200 countries worldwide:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Canada:</strong> 7-10 business days, starting at $15.99</li>
                  <li><strong>Europe:</strong> 10-15 business days, starting at $24.99</li>
                  <li><strong>Asia-Pacific:</strong> 12-18 business days, starting at $29.99</li>
                  <li><strong>Rest of World:</strong> 15-25 business days, starting at $34.99</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  International customers are responsible for customs duties, taxes, and import fees.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Order Tracking</h2>
                <p className="text-gray-700 mb-4">
                  Stay updated on your order status:
                </p>
                <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Order Confirmation:</strong> Immediate email confirmation</li>
                  <li><strong>Processing:</strong> Email when order begins processing</li>
                  <li><strong>Shipment:</strong> Tracking number and carrier information</li>
                  <li><strong>In Transit:</strong> Real-time tracking updates</li>
                  <li><strong>Delivery:</strong> Delivery confirmation notification</li>
                </ol>
                <p className="text-gray-700 mb-4">
                  Track your order anytime by logging into your account or using our order lookup tool.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Special Shipping Circumstances</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Large Items</h3>
                <p className="text-gray-700 mb-4">
                  Oversized items require special handling:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>White glove delivery available for furniture</li>
                  <li>Curbside delivery standard for large appliances</li>
                  <li>Additional fees may apply</li>
                  <li>Delivery appointment scheduling required</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Fragile Items</h3>
                <p className="text-gray-700 mb-4">
                  Delicate items receive extra protection:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Premium packaging materials</li>
                  <li>Fragile handling throughout transit</li>
                  <li>Signature required upon delivery</li>
                  <li>Insurance included up to $500</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Hazardous Materials</h3>
                <p className="text-gray-700 mb-4">
                  Some items have shipping restrictions:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Lithium batteries: Ground shipping only</li>
                  <li>Aerosols and liquids: Domestic shipping only</li>
                  <li>Flammable items: Special carrier requirements</li>
                  <li>Check product pages for specific restrictions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Delivery Instructions</h2>
                <p className="text-gray-700 mb-4">
                  Ensure successful delivery by providing:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Complete and accurate shipping address</li>
                  <li>Apartment/suite numbers when applicable</li>
                  <li>Special delivery instructions (gate codes, etc.)</li>
                  <li>Alternative contact information if needed</li>
                </ul>
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-yellow-800 font-medium">Important:</p>
                  <p className="text-yellow-700 text-sm">
                    Packages left unattended due to incomplete addresses may be subject to additional delivery charges.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Delivery Attempts</h2>
                <p className="text-gray-700 mb-4">
                  Our shipping partners will attempt delivery:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>First Attempt:</strong> Standard delivery to address</li>
                  <li><strong>Second Attempt:</strong> Next business day retry</li>
                  <li><strong>Third Attempt:</strong> Final delivery attempt</li>
                  <li><strong>Hold for Pickup:</strong> Available at local facility</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Packages not collected within 5 business days will be returned to our facility.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Address Changes</h2>
                <p className="text-gray-700 mb-4">
                  Need to update your shipping address?
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Before Processing:</strong> Update in your account or contact us</li>
                  <li><strong>During Processing:</strong> Contact customer service immediately</li>
                  <li><strong>After Shipment:</strong> Contact the carrier directly</li>
                  <li><strong>Address Correction Fee:</strong> $5.99 if changed after processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Shipping Partners</h2>
                <p className="text-gray-700 mb-4">
                  We work with trusted carriers to ensure reliable delivery:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Domestic Carriers</h4>
                    <ul className="text-sm text-gray-700">
                      <li>• UPS</li>
                      <li>• FedEx</li>
                      <li>• USPS</li>
                      <li>• DHL (Express only)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">International Carriers</h4>
                    <ul className="text-sm text-gray-700">
                      <li>• DHL Express</li>
                      <li>• FedEx International</li>
                      <li>• UPS Worldwide</li>
                      <li>• Regional partners</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Holiday Shipping</h2>
                <p className="text-gray-700 mb-4">
                  Special considerations during peak seasons:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Extended processing times during holidays</li>
                  <li>Guaranteed delivery cutoff dates posted in advance</li>
                  <li>Limited same-day and next-day service</li>
                  <li>No shipments on major holidays</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Plan ahead during Black Friday, Cyber Monday, and December holidays.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Shipping Support</h2>
                <p className="text-gray-700 mb-4">
                  Need help with shipping questions or issues?
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> shipping@ecommerce.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700"><strong>Live Chat:</strong> Available 24/7 on our website</p>
                  <p className="text-gray-700"><strong>Track Your Order:</strong> 
                    <Link href="/track-order" className="text-blue-600 hover:text-blue-800 ml-1">
                      Order Tracking Tool
                    </Link>
                  </p>
                  <p className="text-gray-700"><strong>Business Hours:</strong> Monday-Friday, 8 AM - 8 PM EST</p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  href="/refund-policy" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Refund Policy
                </Link>
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