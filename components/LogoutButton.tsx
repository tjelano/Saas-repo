"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from '@/app/auth/actions'

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export default function LogoutButton({ 
  variant = "outline", 
  size = "default", 
  className = "",
  showIcon = true,
  children = "Logout"
}: LogoutButtonProps) {
  return (
    <form action={logout} className="inline">
      <Button variant={variant} size={size} type="submit" className={className}>
        {showIcon && <LogOut className="w-4 h-4 mr-2" />}
        {children}
      </Button>
    </form>
  )
} 