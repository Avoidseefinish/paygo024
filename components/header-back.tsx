"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface HeaderBackProps {
  title: string
}

export default function HeaderBack({ title }: HeaderBackProps) {
  const router = useRouter()

  return (
    <header className="bg-white p-4 flex items-center">
      <button onClick={() => router.back()} className="mr-4">
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-medium">{title}</h1>
    </header>
  )
}
