import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Refund Policy | Ecommerce",
  description: "Our comprehensive refund and return policy including eligibility, process, and timelines"
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Return Window</h2>
                <p className="text-gray-700 mb-4">
                  We offer a <strong>30-day return window</strong> for most items purchased from our store. The return period begins on the date you receive your order.
                </p>
                <p className="text-gray-700 mb-4">
                  To be eligible for a return, items must be unused, in their original condition, and in their original packaging. Some restrictions may apply to certain product categories.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligible Items</h2>
                <p className="text-gray-700 mb-4">
                  The following items are eligible for returns:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Clothing and accessories in original condition with tags attached</li>
                  <li>Electronics in original packaging with all accessories</li>
                  <li>Home and garden items that are unused and undamaged</li>
                  <li>Books, DVDs, and media in original condition</li>
                  <li>Jewelry and watches with original packaging</li>
                  <li>Toys and games that are unopened and unused</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Non-Returnable Items</h2>
                <p className="text-gray-700 mb-4">
                  For health, safety, and hygiene reasons, the following items cannot be returned:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Personal care items (cosmetics, skincare, fragrances)</li>
                  <li>Underwear and intimate apparel</li>
                  <li>Food and beverages</li>
                  <li>Personalized or custom-made items</li>
                  <li>Digital downloads and software</li>
                  <li>Gift cards and vouchers</li>
                  <li>Items damaged by misuse or normal wear</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How to Return an Item</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Initiate Your Return</h3>
                <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
                  <li>Log in to your account and go to "Order History"</li>
                  <li>Find your order and click "Return Items"</li>
                  <li>Select the items you wish to return and reason</li>
                  <li>Print the prepaid return label</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Package Your Return</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Place items in original packaging when possible</li>
                  <li>Include all accessories, manuals, and documentation</li>
                  <li>Use a sturdy box and adequate padding</li>
                  <li>Attach the prepaid return label</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Ship Your Return</h3>
                <p className="text-gray-700 mb-4">
                  Drop off your package at any authorized shipping location or schedule a pickup. We recommend obtaining a tracking number for your records.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Processing</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Processing Time</h3>
                <p className="text-gray-700 mb-4">
                  Once we receive your return, we will:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Inspect the item within 2-3 business days</li>
                  <li>Send email confirmation of return approval or denial</li>
                  <li>Process approved refunds within 5-7 business days</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Refund Method</h3>
                <p className="text-gray-700 mb-4">
                  Refunds will be issued to your original payment method:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Credit/Debit Cards:</strong> 3-5 business days</li>
                  <li><strong>PayPal:</strong> 1-2 business days</li>
                  <li><strong>Bank Transfer:</strong> 5-7 business days</li>
                  <li><strong>Store Credit:</strong> Immediate</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Return Shipping</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Free Return Shipping</h3>
                <p className="text-gray-700 mb-4">
                  We provide free return shipping for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Defective or damaged items</li>
                  <li>Wrong items sent by mistake</li>
                  <li>Orders over $50 (within 30 days)</li>
                  <li>Premium members (all returns)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Return Shipping Fees</h3>
                <p className="text-gray-700 mb-4">
                  For other returns, shipping fees may apply:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Standard returns: $7.99</li>
                  <li>Large items: $15.99</li>
                  <li>International returns: Actual shipping cost</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Exchanges</h2>
                <p className="text-gray-700 mb-4">
                  We offer exchanges for size, color, or style within the same product line:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Follow the same return process</li>
                  <li>Select "Exchange" as your return reason</li>
                  <li>Choose your preferred replacement item</li>
                  <li>We'll ship the new item once we receive your return</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  If there's a price difference, we'll charge or refund the difference accordingly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Defective or Damaged Items</h2>
                <p className="text-gray-700 mb-4">
                  If you receive a defective or damaged item:
                </p>
                <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
                  <li>Contact us immediately with photos of the damage</li>
                  <li>We'll provide a prepaid return label</li>
                  <li>You'll receive a full refund or replacement</li>
                  <li>No return shipping charges apply</li>
                </ol>
                <div className="bg-red-50 p-4 rounded-lg mt-4">
                  <p className="text-red-800 font-medium">Important:</p>
                  <p className="text-red-700 text-sm">
                    Please report damaged items within 48 hours of delivery for fastest resolution.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Special Circumstances</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Holiday Returns</h3>
                <p className="text-gray-700 mb-4">
                  Items purchased between November 1st and December 25th can be returned until January 31st of the following year.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Pre-Orders</h3>
                <p className="text-gray-700 mb-4">
                  Pre-ordered items can be cancelled anytime before shipment. Once shipped, standard return policy applies.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 Bulk Orders</h3>
                <p className="text-gray-700 mb-4">
                  Orders over $1,000 or containing 20+ items may have different return terms. Please contact customer service for details.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Restocking Fees</h2>
                <p className="text-gray-700 mb-4">
                  A restocking fee may apply in the following situations:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Electronics returned without original packaging: 15%</li>
                  <li>Large appliances: 20%</li>
                  <li>Special order items: 25%</li>
                  <li>Items missing accessories or parts: 10-30%</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Returns</h2>
                <p className="text-gray-700 mb-4">
                  For international customers:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Extended 60-day return window</li>
                  <li>Customer responsible for return shipping costs</li>
                  <li>Items must clear customs for processing</li>
                  <li>Original shipping costs are non-refundable</li>
                  <li>Import duties and taxes are customer responsibility</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about returns or need assistance, contact our customer service team:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> returns@ecommerce.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700"><strong>Live Chat:</strong> Available 24/7 on our website</p>
                  <p className="text-gray-700"><strong>Return Address:</strong></p>
                  <p className="text-gray-700 ml-4">
                    Ecommerce Returns Center<br/>
                    456 Fulfillment Blvd<br/>
                    Warehouse City, State 12345
                  </p>
                </div>
              </section>
            </div>

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
                  href="/shipping" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Shipping Info
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