import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Store</h1>
          <p className="text-xl text-gray-600">
            We're passionate about bringing you the best products at unbeatable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, our ecommerce store started with a simple mission: to provide 
              high-quality products that enhance our customers' lives. What began as a small 
              venture has grown into a trusted destination for thousands of satisfied customers.
            </p>
            <p className="text-gray-600 mb-4">
              We carefully curate our product selection, working directly with manufacturers 
              and trusted suppliers to ensure every item meets our strict quality standards. 
              From electronics to clothing, from home goods to personal care items, we're 
              committed to offering products that deliver exceptional value.
            </p>
            <p className="text-gray-600">
              Our team is dedicated to providing outstanding customer service, fast shipping, 
              and a seamless shopping experience that keeps our customers coming back.
            </p>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We source only the highest quality products from trusted manufacturers worldwide.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Quick and reliable shipping options to get your orders to you as fast as possible.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority. We're here to help with any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 