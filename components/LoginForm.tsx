"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { loginUser } from "@/app/auth/actions"
import { useFormState } from "react-dom"

export default function LoginForm() {
    const [state, formAction] = useFormState(loginUser, { message: "" })
    return (
        <form action={formAction}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    required
                />
            </div>
            <div className="grid gap-2 mt-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                />
            </div>
            <Button className="w-full mt-4" type="submit">Sign In</Button>
            {state.message && (
                <p className="text-sm text-red-500 text-center py-2">{state.message}</p>
            )}
        </form>
    )
}