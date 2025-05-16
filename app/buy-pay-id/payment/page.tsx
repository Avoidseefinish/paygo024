"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DollarSign } from "lucide-react"

export default function PayIdPaymentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Get form data from localStorage
    const storedFormData = localStorage.getItem("paygo_pay_id_form")
    if (!storedFormData) {
      router.push("/buy-pay-id")
      return
    }

    setFormData(JSON.parse(storedFormData))
  }, [user, router])

  const copyToClipboard = (text: string, type: "amount" | "account") => {
    navigator.clipboard.writeText(text)
    if (type === "amount") {
      setCopiedAmount(true)
      setTimeout(() => setCopiedAmount(false), 2000)
    } else {
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2000)
    }
  }

  const handleConfirmPayment = () => {
    router.push("/buy-pay-id/verifying")
  }

  if (!formData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="bg-gray-300 p-4 flex justify-between items-center">
        <h1 className="text-black text-lg font-medium">Bank Transfer</h1>
        <button onClick={() => router.push("/dashboard")} className="text-red-500 font-medium">
          Cancel
        </button>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center overflow-hidden mr-4">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">NGN 6,500</p>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>

        <p className="text-center text-lg mb-6">Proceed to your bank app to complete this Transfer</p>

        <div className="w-full border border-gray-200 rounded-md overflow-hidden mb-4">
          <div className="p-4 bg-gray-50">
            <div className="mb-4">
              <p className="text-gray-600">Amount</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">NGN 6500</p>
                <button
                  onClick={() => copyToClipboard("6500", "amount")}
                  className="bg-orange-400 text-white px-2 py-1 rounded text-sm"
                >
                  {copiedAmount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Account Number</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">1100465587</p>
                <button
                  onClick={() => copyToClipboard("1100465587", "account")}
                  className="bg-orange-400 text-white px-2 py-1 rounded text-sm"
                >
                  {copiedAccount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Bank Name</p>
              <p className="font-bold">CapitalMetriQ MFB</p>
            </div>

            <div>
              <p className="text-gray-600">Account Name</p>
              <p className="font-bold>PayGo</p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <p className="text-gray-800 mb-4">Pay to this specific account and get your PAY ID</p>
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-orange-400 text-black font-medium py-3 px-4 rounded-md hover:bg-orange-500 transition-colors"
            >
              I have made this bank Transfer
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
