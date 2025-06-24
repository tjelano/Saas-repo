"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from '@/utils/supabase/client'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#gallery", label: "Gallery" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
]

export function HeroSection() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data }) => {
            setIsLoggedIn(!!data.user)
        })
        // Listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session?.user)
        })
        return () => {
            listener?.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <section className="relative w-full overflow-hidden text-foreground">
            {/* Interior design-inspired background: soft, subtle grid and optional texture */}
            <div className="absolute inset-0 -z-10">
                {/* Always light in light mode, warm light neutral in dark mode */}
                <div className="absolute inset-0 bg-white dark:bg-[#232323]" />
                {/* Faint geometric grid pattern, even softer */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(180,180,180,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(180,180,180,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
                {/* Optional: subtle paper/linen texture overlay for warmth */}
                <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-soft-light" style={{backgroundImage:'url("https://www.transparenttextures.com/patterns/paper-fibers.png")'}} />
            </div>

            <header className="fixed top-0 left-0 right-0 z-50">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-sm">
                        <Logo />
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="default" className="rounded-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 mr-2" /> Log out
                                        </Button>
                                </>
                            ) : (
                                    <Link href="/login">
                                        <Button variant="default" className="rounded-full">
                                        Log in
                                        </Button>
                                    </Link>
                            )}
                        </div>
                        <div className="lg:hidden">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full right-0 mt-2 w-full p-4 z-40"
                    >
                         <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-foreground hover:text-primary transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-t border-border pt-4 mt-2">
                                        <div className="flex flex-col gap-2">
                                        {isLoggedIn ? (
                                            <>
                                                <Link href="/dashboard" className="w-full">
                                                <Button variant="default" className="w-full">
                                                    Dashboard
                                                </Button>
                                            </Link>
                                                <Button variant="outline" className="w-full" onClick={handleLogout}>
                                                    <LogOut className="w-4 h-4 mr-2" /> Log out
                                                </Button>
                                            </>
                                        ) : (
                                            <Link href="/login" className="w-full">
                                                <Button variant="default" className="w-full">
                                                    Log in
                                                </Button>
                                            </Link>
                                        )}
                                        </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                    >
                        <motion.div
                            variants={transitionVariants.item}
                            className="mb-6"
                        >
                            <Link href="/blog" passHref>
                                <motion.a
                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/80"
                                >
                                    ✨ Design Muse AI is now public!
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </motion.a>
                            </Link>
                        </motion.div>
                        <motion.h1
                            variants={transitionVariants.item}
                            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            Transform Your Space <br /> with AI-Powered Interior Design
                        </motion.h1>
                        <motion.p
                            variants={transitionVariants.item}
                            className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl"
                        >
                            Upload a photo, and watch your room reimagined in seconds —
                            effortlessly, beautifully, uniquely yours.
                        </motion.p>
                        <motion.div variants={transitionVariants.item} className="mt-8 flex justify-center gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="rounded-full">
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/design">
                                <Button size="lg" className="rounded-full">
                                    Design
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
            {/* House icon SVG, no background circle */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 3l9 8-1.5 1.5L18 11.5V19a1 1 0 0 1-1 1h-3v-4h-2v4H7a1 1 0 0 1-1-1v-7.5l-1.5 1.5L3 11l9-8z" />
            </svg>
          </div>
          <span className={cn("text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent", className)}>
            Design Muse
          </span>
        </Link>
    )
}