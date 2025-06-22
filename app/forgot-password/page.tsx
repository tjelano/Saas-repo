import Link from 'next/link'
import { Home } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ForgotPassword() {
    return (
        <div className="flex items-center justify-center bg-background min-h-screen" >
            <Card className="w-[350px] mx-auto">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center py-4">
                        <Link href='/' className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
                                <Home className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                                Design Muse
                            </span>
                        </Link>
                    </div>

                    <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
                    <CardDescription>Enter your email address</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ForgotPasswordForm />
                </CardContent>
                <CardFooter className="flex-col text-center">
                    <Link className="w-full text-sm text-muted-foreground " href="/login">
                        Back to login
                    </Link>
                    <Link className="w-full text-sm text-muted-foreground" href="/signup">
                        Don&apos;t have an account? Signup
                    </Link>
                </CardFooter>
            </Card>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    )
}