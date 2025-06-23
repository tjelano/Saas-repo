import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ReceiptText, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"
import { createClient } from '@/utils/supabase/server'
import { generateStripeBillingPortalLink } from '@/utils/stripe/api'

export default async function DashboardHeaderProfileDropdown() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let billingPortalURL = '#'
    let billingPortalAvailable = false
    if (user && user.email) {
        try {
            const portalLink = await generateStripeBillingPortalLink(user.email)
            if (portalLink) {
                billingPortalURL = portalLink
                billingPortalAvailable = true
            }
        } catch (error) {
            console.error("Failed to generate Stripe billing portal link:", error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || user?.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/design">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Design Studio</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/inspiration">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Inspiration</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    {billingPortalAvailable ? (
                        <Link href={billingPortalURL} className="">
                            <ReceiptText className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </Link>
                    ) : (
                        <span className="opacity-50 cursor-not-allowed flex items-center">
                            <ReceiptText className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </span>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutButton variant="ghost" className="w-full justify-start p-0 h-auto" showIcon={false}>
                        Log out
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}