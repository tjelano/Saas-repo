"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from "framer-motion"
import { User } from '@supabase/supabase-js'

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

export function HeroSection({ user }: { user: User | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <section className="relative w-full overflow-hidden bg-background text-foreground">
            <header className="fixed top-0 left-0 right-0 z-50">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between bg-background/80 backdrop-blur-sm border border-border rounded-full p-2">
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
                            {user ? (
                                <Link href="/dashboard">
                                    <Button variant="default" className="rounded-full">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button variant="default" className="rounded-full">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
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
                         <div className="bg-background border rounded-lg shadow-lg p-4">
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
                                    {user ? (
                                        <Link href="/dashboard">
                                            <Button variant="default" className="w-full">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Link href="/login" className="w-full">
                                                <Button variant="ghost" className="w-full">Login</Button>
                                            </Link>
                                            <Link href="/signup" className="w-full">
                                                <Button variant="default" className="w-full">Sign Up</Button>
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
                 <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
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
                                    Design Muse AI is now public!
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
                            <Link href="/signup">
                                <Button size="lg" className="rounded-full">
                                    Get Started for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
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
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M12 2L1 9l4 12h14l4-12L12 2zm0 3.315L18.395 9H5.605L12 5.315zM6.928 11h10.144l-1.82 5.46H8.747L6.928 11zM6 20v-2.95l2-6h8l2 6V20H6z"/>
            </svg>
          </div>
          <span className={cn("text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent", className)}>
            Design Muse
          </span>
        </Link>
    )
}