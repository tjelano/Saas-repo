"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export default function SupaAuthForm() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [view, setView] = useState<'login'|'signup'>("login")

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router, supabase.auth])

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          setError(error.message)
        } else {
          // Redirect to dashboard or the original intended page
          const redirectTo = searchParams.get('redirect') || '/dashboard'
          router.push(redirectTo)
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
          setError(error.message)
        } else {
          setError("Check your email for the confirmation link!")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
    }
    
    setLoading(false)
  }

  async function handleSocial(provider: "google" | "github") {
    setLoading(true)
    setError("")
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${searchParams.get('redirect') || '/dashboard'}`
        }
      })
      if (error) setError(error.message)
    } catch (err) {
      setError("An unexpected error occurred")
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-background rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-center mb-2">{view === "login" ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : view === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 border-t" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 border-t" />
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => handleSocial("google")} disabled={loading}>
          Continue with Google
        </Button>
        <Button variant="outline" onClick={() => handleSocial("github")} disabled={loading}>
          Continue with GitHub
        </Button>
      </div>
      {view === "login" && (
        <div className="text-center mt-2">
          <a href="/forgot-password" className="text-xs underline text-muted-foreground hover:text-foreground">Forgot password?</a>
        </div>
      )}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="text-center text-sm mt-2">
        {view === "login" ? (
          <>Don't have an account? <button className="underline" onClick={() => setView("signup")}>Sign Up</button></>
        ) : (
          <>Already have an account? <button className="underline" onClick={() => setView("login")}>Sign In</button></>
        )}
      </div>
    </div>
  )
} 