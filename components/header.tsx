"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import type { User } from "@/types"
import { Logo } from "@/components/logo"

interface HeaderProps {
  user: User
  notificationCount: number
}

export default function Header({ user, notificationCount }: HeaderProps) {
  return (
    <header className="bg-white p-3 flex items-center justify-between">
      <Link href="/history" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
          <Logo className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-sm">PayGo</h1>
          <p className="text-xs text-gray-600">Hi, {user.name}</p>
        </div>
      </Link>

      <Link href="/history" className="relative">
        <Bell className="h-5 w-5" />
        {notificationCount === 1 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        )}
      </Link>
    </header>
  )
}
