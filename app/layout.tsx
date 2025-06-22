import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SessionProvider } from '@/components/SessionProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAS Starter Kit",
  description: "SAAS Starter Kit with Stripe, Supabase, Postgres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Required for pricing table */}
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
