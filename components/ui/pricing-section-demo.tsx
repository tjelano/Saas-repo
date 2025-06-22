"use client"

import { Sparkles, Zap, Gem, BriefcaseIcon, UsersIcon } from "lucide-react"
import { PricingSection, PricingTier } from "@/components/ui/pricing-section"

const defaultTiers: PricingTier[] = [
  {
    name: "Hobby",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Perfect for trying out Design Muse and personal projects.",
    icon: (
      <div className="relative">
        <Sparkles className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400 animate-[float_3s_ease-in-out_infinite]" />
      </div>
    ),
    features: [
      {
        name: "5 Generations per day",
        description: "Enough to experiment with new ideas daily.",
        included: true,
      },
      {
        name: "Access to all styles",
        description: "Explore our full range of design aesthetics.",
        included: true,
      },
      {
        name: "Standard Resolution",
        description: "Good quality images for web and social media.",
        included: true,
      },
      {
        name: "Community Support",
        description: "Get help and inspiration from other users.",
        included: true,
      },
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: {
      monthly: 29,
      yearly: 290,
    },
    description: "For design enthusiasts and professionals who want more.",
    highlight: true,
    badge: "Most Popular",
    icon: (
      <div className="relative">
        <Gem className="w-7 h-7 relative z-10" />
      </div>
    ),
    features: [
      {
        name: "Unlimited Generations",
        description: "Create as many designs as you want, whenever you want.",
        included: true,
      },
      {
        name: "4K High-Resolution",
        description: "Download stunning, print-quality images.",
        included: true,
      },
      {
        name: "Priority Support",
        description: "24/7 priority email and chat support.",
        included: true,
      },
      {
        name: "Commercial License",
        description: "Use your designs for commercial purposes.",
        included: true,
      },
    ],
  },
]

function PricingSectionDemo() {
  return <PricingSection tiers={defaultTiers} />
}

export { PricingSectionDemo }
