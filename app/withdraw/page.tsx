"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useNotification } from "@/hooks/use-notification"
import Link from "next/link"

const VALID_PAY_ID = "PAG-G12830EB&$&!M037CL"

export default function WithdrawPage() {
  const router = useRouter()
  const { user, updateBalance } = useAuth()
  const { addNotification } = useNotification()
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bank, setBank] = useState("")
  const [amount, setAmount] = useState("")
  const [payId, setPayId] = useState("")
  const [error, setError] = useState("")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!accountName || !accountNumber || !bank || !amount || !payId) {
      setError("Please fill in all fields")
      return
    }

    const amountValue = Number.parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (amountValue > user.balance) {
      setError("Insufficient balance")
      return
    }

    if (payId !== VALID_PAY_ID) {
      setError("Invalid PAY ID. Please enter the correct PAY ID.")
      return
    }

    // Store withdrawal data in localStorage
    localStorage.setItem(
      "paygo_withdrawal",
      JSON.stringify({
        amount: amountValue,
        accountName,
        accountNumber,
        bank,
        timestamp: new Date().toISOString(),
      }),
    )

    // Update user balance
    updateBalance(user.balance - amountValue)

    // Add transaction to history
    const transaction = {
      id: Date.now().toString(),
      type: "withdrawal",
      amount: amountValue,
      status: "completed",
      timestamp: new Date().toISOString(),
      details: `Withdrawal to ${bank} ****${accountNumber.slice(-4)}`,
    }

    const storedTransactions = localStorage.getItem("paygo_transactions")
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : []
    localStorage.setItem("paygo_transactions", JSON.stringify([transaction, ...transactions]))

    // Add notification
    addNotification({
      title: "Withdrawal Successful",
      message: `Your withdrawal of ₦${amountValue.toLocaleString()} has been processed successfully.`,
    })

    // Redirect to success page
    router.push("/withdraw/success")
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="bg-purple-600 p-4">
        <h1 className="text-white text-xl font-medium">Transfer To Bank</h1>
      </div>

      <div className="p-4">
        {!user.hasPayId && (
          <div className="bg-yellow-100 p-4 rounded-lg mb-6">
            <p className="text-amber-800">Please purchase your PAY ID from the app to enable withdrawals.</p>
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Account Name"
              className="w-full p-4 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Account Number"
              className="w-full p-4 border-2 border-orange-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full p-4 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Select Bank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="Fidelity Bank">Fidelity Bank</option>
              <option value="First Bank">First Bank</option>
              <option value="First City Monument Bank">First City Monument Bank (FCMB)</option>
              <option value="Guaranty Trust Bank">Guaranty Trust Bank (GTBank)</option>
              <option value="Heritage Bank">Heritage Bank</option>
              <option value="Keystone Bank">Keystone Bank</option>
              <option value="Polaris Bank">Polaris Bank</option>
              <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
              <option value="Sterling Bank">Sterling Bank</option>
              <option value="Union Bank">Union Bank</option>
              <option value="United Bank for Africa">United Bank for Africa (UBA)</option>
              <option value="Unity Bank">Unity Bank</option>
              <option value="Wema Bank">Wema Bank</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="Citibank Nigeria">Citibank Nigeria</option>
              <option value="Ecobank Nigeria">Ecobank Nigeria</option>
              <option value="Standard Chartered Bank">Standard Chartered Bank</option>
              <option value="Providus Bank">Providus Bank</option>
              <option value="Titan Trust Bank">Titan Trust Bank</option>
              <option value="Globus Bank">Globus Bank</option>
              <option value="SunTrust Bank">SunTrust Bank</option>
              <option value="TAJBank">TAJBank</option>
              <option value="Jaiz Bank">Jaiz Bank</option>
              <option value="Kuda Bank">Kuda Bank</option>
              <option value="VFD Microfinance Bank">VFD Microfinance Bank</option>
              <option value="Rubies Microfinance Bank">Rubies Microfinance Bank</option>
              <option value="Parallex Bank">Parallex Bank</option>
              <option value="Opay">Opay</option>
              <option value="Palmpay">Palmpay</option>
              <option value="Moniepoint">Moniepoint</option>
              <option value="Sparkle Microfinance Bank">Sparkle Microfinance Bank</option>
              <option value="Mint Finex MFB">Mint Finex MFB</option>
              <option value="Renmoney Microfinance Bank">Renmoney Microfinance Bank</option>
              <option value="Accion Microfinance Bank">Accion Microfinance Bank</option>
              <option value="Coronation Merchant Bank">Coronation Merchant Bank</option>
              <option value="FBNQuest Merchant Bank">FBNQuest Merchant Bank</option>
              <option value="FSDH Merchant Bank">FSDH Merchant Bank</option>
              <option value="Rand Merchant Bank">Rand Merchant Bank</option>
              <option value="Nova Merchant Bank">Nova Merchant Bank</option>
              <option value="Greenwich Merchant Bank">Greenwich Merchant Bank</option>
              <option value="Abbey Mortgage Bank">Abbey Mortgage Bank</option>
              <option value="AG Mortgage Bank">AG Mortgage Bank</option>
              <option value="Haggai Mortgage Bank">Haggai Mortgage Bank</option>
              <option value="Infinity Trust Mortgage Bank">Infinity Trust Mortgage Bank</option>
              <option value="Nigeria Mortgage Refinance Company">Nigeria Mortgage Refinance Company</option>
              <option value="Trustbond Mortgage Bank">Trustbond Mortgage Bank</option>
              <option value="Jubilee Life Mortgage Bank">Jubilee Life Mortgage Bank</option>
              <option value="Mayfresh Mortgage Bank">Mayfresh Mortgage Bank</option>
              <option value="SafeTrust Mortgage Bank">SafeTrust Mortgage Bank</option>
              <option value="Platinum Mortgage Bank">Platinum Mortgage Bank</option>
              <option value="First Generation Mortgage Bank">First Generation Mortgage Bank</option>
              <option value="Bainstone Microfinance Bank">Bainstone Microfinance Bank</option>
              <option value="Bowen Microfinance Bank">Bowen Microfinance Bank</option>
              <option value="Mutual Trust Microfinance Bank">Mutual Trust Microfinance Bank</option>
              <option value="Peace Microfinance Bank">Peace Microfinance Bank</option>
              <option value="Petra Microfinance Bank">Petra Microfinance Bank</option>
              <option value="Unical Microfinance Bank">Unical Microfinance Bank</option>
              <option value="Xslnce Microfinance Bank">Xslnce Microfinance Bank</option>
              <option value="Finca Microfinance Bank">Finca Microfinance Bank</option>
              <option value="Fina Trust Microfinance Bank">Fina Trust Microfinance Bank</option>
              <option value="Grooming Microfinance Bank">Grooming Microfinance Bank</option>
              <option value="Hasal Microfinance Bank">Hasal Microfinance Bank</option>
              <option value="Lapo Microfinance Bank">Lapo Microfinance Bank</option>
              <option value="NPF Microfinance Bank">NPF Microfinance Bank</option>
              <option value="Page Microfinance Bank">Page Microfinance Bank</option>
              <option value="Parkway Microfinance Bank">Parkway Microfinance Bank</option>
              <option value="Seed Capital Microfinance Bank">Seed Capital Microfinance Bank</option>
              <option value="TCF Microfinance Bank">TCF Microfinance Bank</option>
              <option value="Verite Microfinance Bank">Verite Microfinance Bank</option>
              <option value="Amju Unique Microfinance Bank">Amju Unique Microfinance Bank</option>
              <option value="BC Kash Microfinance Bank">BC Kash Microfinance Bank</option>
              <option value="Bridgeway Microfinance Bank">Bridgeway Microfinance Bank</option>
              <option value="Cemcs Microfinance Bank">Cemcs Microfinance Bank</option>
              <option value="Daylight Microfinance Bank">Daylight Microfinance Bank</option>
              <option value="Empire Trust Microfinance Bank">Empire Trust Microfinance Bank</option>
              <option value="Microvis Microfinance Bank">Microvis Microfinance Bank</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-4 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter PAY ID Code"
              className="w-full p-4 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={payId}
              onChange={(e) => setPayId(e.target.value)}
            />
          </div>

          <div>
            <p className="text-purple-600 mb-4">
              Don&apos;t have a PAY ID?{" "}
              <Link href="/buy-pay-id" className="font-medium">
                Buy PAY ID
              </Link>
            </p>
          </div>

          <div>
            <p className="text-gray-800 font-medium mb-4">Available Balance: ₦{user.balance.toLocaleString()}</p>
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-4 px-4 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}
