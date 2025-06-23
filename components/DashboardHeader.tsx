import { Bell, Menu, Search, Home, Plus, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import DashboardHeaderProfileDropdown from "./DashboardHeaderProfileDropdown"
import { Badge } from "@/components/ui/badge"
import { getStripePlan } from "@/utils/stripe/api"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const stylePlanFallback = "No Plan"

export default async function DashboardHeader() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    let stripePlan = null
    if (user?.email) {
        try {
            stripePlan = await getStripePlan(user.email)
        } catch (error) {
            console.error("Failed to get Stripe plan:", error)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <div className="mr-6 hidden md:flex items-center space-x-6">
                    <Link className="flex items-center space-x-2" href="/">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
                            <Home className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Design Muse
                        </span>
                    </Link>
                    <Suspense fallback={<Badge variant="outline" className="mr-2"><Skeleton className="w-[50px] h-[20px] rounded-full" /></Badge>}>
                        <Badge variant="outline" className="mr-2">
                            {stripePlan || stylePlanFallback}
                        </Badge>
                    </Suspense>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link className="transition-colors hover:text-foreground text-foreground flex items-center space-x-1" href="/dashboard">
                            <Home className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <Link className="transition-colors hover:text-foreground text-foreground/60 flex items-center space-x-1" href="/design">
                            <Plus className="w-4 h-4" />
                            <span>Design Studio</span>
                        </Link>
                        <Link className="transition-colors hover:text-foreground text-foreground/60 flex items-center space-x-1" href="/inspiration">
                            <Star className="w-4 h-4" />
                            <span>Inspiration</span>
                        </Link>
                    </nav>
                </div>
                <Button variant="outline" size="icon" className="mr-2 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search designs, templates..."
                                    className="pl-10 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                />
                            </div>
                        </form>
                    </div>
                    <DashboardHeaderProfileDropdown />
                </div>
            </div>
        </header>
    )
}