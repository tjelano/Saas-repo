"use client"

import Link from 'next/link'

export function Footer() {
	return (
		<footer className="block bg-background">
		  {/* Container */}
		  <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
		    {/* Component */}
		    <div className="flex-col flex items-center">
		      <Link href="/" className="mb-8 inline-block max-w-full text-foreground">
		        <h3 className="text-2xl font-bold">Design Muse</h3>
		      </Link>
		      <div className="text-center font-semibold">
		        <Link href="/#features" className="inline-block px-6 py-2 font-normal text-foreground transition hover:text-primary bg-transparent border-none cursor-pointer">
		          Features
		        </Link>
		        <Link href="/#gallery" className="inline-block px-6 py-2 font-normal text-foreground transition hover:text-primary bg-transparent border-none cursor-pointer">
		          Gallery
		        </Link>
		        <Link href="/#pricing" className="inline-block px-6 py-2 font-normal text-foreground transition hover:text-primary bg-transparent border-none cursor-pointer">
		          Pricing
		        </Link>
		        <Link href="/#faq" className="inline-block px-6 py-2 font-normal text-foreground transition hover:text-primary bg-transparent border-none cursor-pointer">
		          FAQ
		        </Link>
		      </div>
		      <div className="mb-8 mt-8 border-b border-border w-48"></div>
		      <p className="text-sm sm:text-base text-muted-foreground">
		        © Copyright 2024. All rights reserved.
		      </p>
		    </div>
		  </div>
		</footer>
	);
} 