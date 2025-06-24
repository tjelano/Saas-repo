"use client"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"

export default function SupaAuthForm() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [view, setView] = useState<'login'|'signup'>("login")

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (view === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  async function handleSocial(provider: "google" | "github") {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setError(error.message)
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
        <Button variant="outline" onClick={() => handleSocial("google")}>Continue with Google</Button>
        <Button variant="outline" onClick={() => handleSocial("github")}>Continue with GitHub</Button>
      </div>
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