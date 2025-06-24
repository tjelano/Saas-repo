"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Home, Plus, Star } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/design", label: "Design Studio", icon: Plus },
  { href: "/inspiration", label: "Inspiration", icon: Star },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M12 3l9 8-1.5 1.5L18 11.5V19a1 1 0 0 1-1 1h-3v-4h-2v4H7a1 1 0 0 1-1-1v-7.5l-1.5 1.5L3 11l9-8z" />
        </svg>
      </div>
      <span className={"text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent " + (className || "")}>Design Muse</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`flex items-center space-x-1 transition-colors ${pathname === href ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 