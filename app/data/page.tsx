"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import HeaderBack from "@/components/header-back"
import { Tab } from "@/components/ui/tab"

const networks = ["Airtel", "MTN", "Glo", "9mobile"]
const dataPeriods = ["Daily", "Weekly", "Monthly"]

const dailyPlans = [
  { duration: "1 DAY", data: "100MB", price: 70 },
  { duration: "1 DAY", data: "200MB", price: 150 },
  { duration: "1 DAY", data: "500MB", price: 200 },
  { duration: "1 DAY", data: "1GB", price: 350 },
]

export default function DataPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [selectedNetwork, setSelectedNetwork] = useState("MTN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("Daily")
  const [payId, setPayId] = useState("")

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const handleBuyData = () => {
    if (!phoneNumber) {
      alert("Please enter a phone number")
      return
    }

    if (!payId) {
      alert("Please enter your PAY ID")
      return
    }

    // In a real app, this would make an API call
    alert("Data purchase initiated. Check your notifications for updates.")
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeaderBack title="Data" />

      <div className="p-4">
        <div className="bg-green-500 text-white rounded-xl p-4 mb-6 flex justify-between items-center">
          <div>
            <span className="font-medium">Enjoy </span>
            <span className="text-yellow-300 font-bold">Glo&apos;s</span>
            <span className="font-medium"> Amazing 5X Airtime Bonuses!</span>
          </div>
          <button className="bg-yellow-400 text-black font-bold px-4 py-1 rounded-full">GO</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {networks.map((network) => (
            <button
              key={network}
              className={`p-3 rounded-lg border ${
                selectedNetwork === network ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedNetwork(network)}
            >
              {network}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="input-field"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex border-b border-gray-200 mb-4">
          {dataPeriods.map((period) => (
            <Tab key={period} active={selectedPeriod === period} onClick={() => setSelectedPeriod(period)}>
              {period}
            </Tab>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {dailyPlans.map((plan, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">{plan.duration}</p>
              <p className="text-2xl font-bold">{plan.data}</p>
              <p className="text-gray-700">₦{plan.price}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter PAY ID Code"
            className="input-field"
            value={payId}
            onChange={(e) => setPayId(e.target.value)}
          />
        </div>

        <button onClick={handleBuyData} className="btn-primary bg-purple-500">
          Buy Data
        </button>
      </div>
    </main>
  )
}
