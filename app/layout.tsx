import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Design Muse AI",
  description: "AI-Powered Interior Design Studio",
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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
