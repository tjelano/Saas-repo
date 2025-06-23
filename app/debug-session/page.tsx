import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function DebugSession() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  // Get all cookies for debugging
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Session Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User State</h2>
            {error ? (
              <div className="text-red-600">
                <p><strong>Error:</strong> {error.message}</p>
              </div>
            ) : user ? (
              <div className="text-green-600">
                <p><strong>✅ User is authenticated</strong></p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.user_metadata?.full_name || 'Not set'}</p>
                <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
                <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || user.created_at).toLocaleString()}</p>
              </div>
            ) : (
              <div className="text-red-600">
                <p><strong>❌ No user found</strong></p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Cookies ({allCookies.length})</h2>
            <div className="space-y-2">
              {allCookies.map((cookie, index) => (
                <div key={index} className="text-sm border-b pb-2">
                  <p><strong>{cookie.name}:</strong></p>
                  <p className="text-gray-600 break-all">{cookie.value.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Links</h2>
          <div className="space-x-4">
            <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
            <a href="/test-auth" className="text-blue-600 hover:underline">Test Auth</a>
          </div>
        </div>
      </div>
    </div>
  )
} 