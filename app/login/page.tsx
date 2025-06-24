import SupaAuthForm from '@/components/SupaAuthForm'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <SupaAuthForm />
      </Suspense>
    </div>
  )
} 