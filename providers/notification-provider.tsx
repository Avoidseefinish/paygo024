"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { Notification } from "@/types"

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem("paygo_notifications")

    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    } else {
      // Add default welcome notification for new users
      const welcomeNotification = {
        id: "1",
        title: "Welcome to PayGo!",
        message: "You've received ₦180,000 as a welcome bonus.",
        timestamp: new Date().toISOString(),
        read: false,
      }

      setNotifications([welcomeNotification])
      localStorage.setItem("paygo_notifications", JSON.stringify([welcomeNotification]))
    }
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    const updatedNotifications = [newNotification, ...notifications]
    setNotifications(updatedNotifications)
    localStorage.setItem("paygo_notifications", JSON.stringify(updatedNotifications))
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    setNotifications(updatedNotifications)
    localStorage.setItem("paygo_notifications", JSON.stringify(updatedNotifications))
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({ ...notification, read: true }))

    setNotifications(updatedNotifications)
    localStorage.setItem("paygo_notifications", JSON.stringify(updatedNotifications))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}
