"use client"

import type React from "react"

interface TabProps {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

export function Tab({ children, active, onClick }: TabProps) {
  return (
    <button
      className={`px-6 py-3 font-medium ${active ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
