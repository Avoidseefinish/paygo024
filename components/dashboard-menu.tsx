"use client"

import Link from "next/link"
import { ScrollText, CreditCard, BarChart3, MessageCircle, Info, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function DashboardMenu() {
  const { logout } = useAuth()
  const router = useRouter()

  const menuItems = [
    {
      icon: <ScrollText className="h-6 w-6 text-orange-500" />,
      label: "History",
      href: "/history",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-yellow-500" />,
      label: "Buy PAY ID",
      href: "/buy-pay-id",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-500" />,
      label: "Watch",
      href: "https://t.me/+0uSrNzTtEcllNGJk",
      external: true,
    },
    {
      icon: <span className="text-xl">📱</span>,
      label: "Airtime",
      href: "/airtime",
    },
    {
      icon: <span className="text-xl">📶</span>,
      label: "Data",
      href: "/data",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      label: "Support",
      href: "/support",
    },
    {
      icon: <span className="text-xl">🌐</span>,
      label: "Group",
      href: "https://whatsapp.com/channel/0029VbA8ZHsL7UVVM0zP1L1o",
      external: true,
    },
    {
      icon: <Info className="h-6 w-6 text-gray-500" />,
      label: "About",
      href: "/about",
    },
    {
      icon: <LogOut className="h-6 w-6 text-red-500" />,
      label: "Log out",
      href: "#",
      onClick: logout,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {menuItems.map((item, index) => {
        if (item.external) {
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-2 flex flex-col items-center justify-center aspect-square"
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.label}</span>
            </a>
          )
        }

        return (
          <Link
            key={index}
            href={item.href}
            onClick={item.onClick}
            className="bg-white rounded-lg p-2 flex flex-col items-center justify-center aspect-square"
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
