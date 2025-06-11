"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const shippingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(10, "Phone number is required"),
  saveAddress: z.boolean().optional(),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

interface ShippingFormProps {
  onSubmit: (data: ShippingFormValues) => void
  initialData?: ShippingFormValues
  userId: string
}

export default function ShippingForm({ onSubmit, initialData, userId }: ShippingFormProps) {
  const [savedAddresses, setSavedAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initialData || {
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      saveAddress: false,
    },
  })

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/user/addresses`)
        if (response.ok) {
          const data = await response.json()
          setSavedAddresses(data)
        }
      } catch (error) {
        console.error("Error fetching addresses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [userId])

  // Handle selecting a saved address
  const handleSelectAddress = (address: any) => {
    setSelectedAddressId(address.id)

    setValue("name", address.name)
    setValue("address1", address.line1)
    setValue("address2", address.line2 || "")
    setValue("city", address.city)
    setValue("state", address.state)
    setValue("postalCode", address.postal)
    setValue("country", address.country)
    setValue("phone", address.phone || "")
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

      {/* Saved addresses */}
      {savedAddresses.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Saved Addresses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-3 cursor-pointer ${
                  selectedAddressId === address.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                }`}
                onClick={() => handleSelectAddress(address)}
              >
                <p className="font-medium">{address.name}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postal}
                </p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              id="address1"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("address1")}
            />
            {errors.address1 && <p className="mt-1 text-sm text-red-600">{errors.address1.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              id="address2"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("address2")}
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("city")}
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State / Province
            </label>
            <input
              id="state"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("state")}
            />
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("postalCode")}
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("country")}
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("phone")}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("saveAddress")}
            />
            <span className="ml-2 text-sm text-gray-700">Save this address for future orders</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )
}
