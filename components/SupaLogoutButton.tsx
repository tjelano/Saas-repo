"use client"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"

export default function SupaLogoutButton() {
  const supabase = createClient()
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await supabase.auth.signOut()
        window.location.reload()
      }}
    >
      Log out
    </Button>
  )
} 