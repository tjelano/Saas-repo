"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function SupaUserInfo() {
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  if (!email) return null
  return <div className="text-sm text-muted-foreground text-center mb-2">Signed in as <span className="font-semibold">{email}</span></div>
} 