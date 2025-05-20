import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'; // Path relative to src/app
import { Toaster } from "@/components/ui/toaster"; // Import Toaster here for global availability

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Generic metadata for the root layout
export const metadata: Metadata = {
  title: 'SecureGlobal', // Will be overridden by [lang]/layout.tsx
  description: 'Cybersecurity Solutions for a Secure Digital Future.', // Will be overridden
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
