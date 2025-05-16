"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import HeaderBack from "@/components/header-back"
import { MessageCircle, Send } from "lucide-react"
import { Logo } from "@/components/logo"

export default function SupportPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeaderBack title="Support" />

      <div className="p-4">
        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">How can we help you?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available to assist you with any issues or questions you may have.
          </p>

          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-16 mb-4 overflow-hidden">
              <Logo className="w-full" animated />
            </div>
            <h3 className="font-bold text-lg mb-1">PayGo Finance</h3>
            <p className="text-gray-500 text-sm mb-4">Official WhatsApp Channel</p>
            <button
              onClick={() => window.open(https://chat.whatsapp.com/Jf8tG61UCe2FdjbP6d6Szc", "_blank")}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Join WhatsApp Channel
            </button>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg mb-1">PayGo Support</h3>
            <p className="text-gray-500 text-sm mb-4">Official Telegram Support</p>
            <button
              onClick={() => window.open("https://t.me/PayGo_Official_Support", "_blank")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
            >
              <Send className="h-5 w-5" />
              Contact on Telegram
            </button>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-medium mb-2">Why join our support channels?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Get instant updates about new features</li>
            <li>• Receive notifications about promotions</li>
            <li>• Learn tips and tricks to maximize your earnings</li>
            <li>• Connect with other PayGo users</li>
            <li>• Get direct support from our team</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
