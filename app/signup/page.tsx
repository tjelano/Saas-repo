import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Home } from 'lucide-react'
import SignupForm from "@/components/SignupForm"
import ProviderSigninBlock from "@/components/ProviderSigninBlock"
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Signup() {
    return (
        <div className="flex items-center justify-center bg-background min-h-screen">
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

                    <CardTitle className="text-2xl font-bold">Signup</CardTitle>
                    <CardDescription>Create your account now!</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <SignupForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <ProviderSigninBlock />
                </CardContent>
                <CardFooter className="flex-col text-center">
                    <Link className="w-full text-sm text-muted-foreground" href="/login">
                        Have an account? Login
                    </Link>
                </CardFooter>
            </Card>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div >
    )
}