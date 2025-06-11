"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"

const paymentSchema = z.object({
  cardholderName: z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().min(16, "Card number is required").max(16, "Card number must be 16 digits"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(1, "Expiry year is required"),
  cvv: z.string().min(3, "CVV is required").max(4, "CVV must be 3-4 digits"),
  sameAsShipping: z.boolean().optional(),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  onSubmit: (data: PaymentFormValues) => void
  onBack: () => void
  initialData?: PaymentFormValues
}

export default function PaymentForm({ onSubmit, onBack, initialData }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData || {
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      sameAsShipping: true,
    },
  })

  const sameAsShipping = watch("sameAsShipping")

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return {
      value: month.toString().padStart(2, "0"),
      label: month.toString().padStart(2, "0"),
    }
  })

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i
    return {
      value: year.toString(),
      label: year.toString(),
    }
  })

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("cardholderName")}
            />
            {errors.cardholderName && <p className="mt-1 text-sm text-red-600">{errors.cardholderName.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={16}
              {...register("cardNumber")}
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Month
            </label>
            <select
              id="expiryMonth"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("expiryMonth")}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            {errors.expiryMonth && <p className="mt-1 text-sm text-red-600">{errors.expiryMonth.message}</p>}
          </div>

          <div>
            <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Year
            </label>
            <select
              id="expiryYear"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              {...register("expiryYear")}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            {errors.expiryYear && <p className="mt-1 text-sm text-red-600">{errors.expiryYear.message}</p>}
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              maxLength={4}
              {...register("cvv")}
            />
            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("sameAsShipping")}
            />
            <span className="ml-2 text-sm text-gray-700">Billing address is the same as shipping address</span>
          </label>
        </div>

        {/* Billing address fields would go here if sameAsShipping is false */}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Shipping
          </button>

          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  )
}
