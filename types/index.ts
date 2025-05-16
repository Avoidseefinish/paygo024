export interface User {
  id: string
  name: string
  email: string
  balance: number
  hasPayId: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface Transaction {
  id: string
  type: "withdrawal" | "airtime" | "data" | "pay_id" | "bpc"
  amount: number
  status: "pending" | "completed" | "failed"
  timestamp: string
  details?: string
}
