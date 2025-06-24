import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import SupaUserInfo from '@/components/SupaUserInfo';
import SupaLogoutButton from '@/components/SupaLogoutButton';
// import { logEnvironmentValidation } from '@/utils/env-validation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Design Muse AI",
  description: "AI-Powered Interior Design Studio",
};

// Validate environment variables on server startup
// Temporarily disabled to debug API issues
// if (typeof window === 'undefined') {
//   logEnvironmentValidation();
// }

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
          <div className="pt-4">
            <SupaUserInfo />
            <SupaLogoutButton />
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
