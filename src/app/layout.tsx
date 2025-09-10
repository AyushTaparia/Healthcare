import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "HealthCare Plus - Book Doctor Appointments Online",
  description:
    "Book appointments with top-rated doctors instantly. Experience healthcare that puts you first with our modern, convenient booking system.",
  keywords: "doctor appointment, healthcare, medical booking, online consultation",
  authors: [{ name: "HealthCare Plus" }],
  generator: "v0.app",
  openGraph: {
    title: "HealthCare Plus - Book Doctor Appointments Online",
    description: "Book appointments with top-rated doctors instantly. Experience healthcare that puts you first.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthCare Plus - Book Doctor Appointments Online",
    description: "Book appointments with top-rated doctors instantly.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}