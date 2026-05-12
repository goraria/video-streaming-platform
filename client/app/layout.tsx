"use client"

import { Geist, Geist_Mono, Inter } from "next/font/google"

import "@/styles/globals.css"
import "gorth-ui/globals.css";
import { ThemeProvider } from "gorth-ui/providers/theme";
import { ToasterProvider } from "gorth-ui/providers/toaster";
import { TooltipProvider } from "gorth-ui/default/tooltip";
import { cn } from "gorth-ui/lib/utils";
import { AuthProvider } from "@/providers/auth";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
         <ThemeProvider>
          <TooltipProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <ToasterProvider/>
          </TooltipProvider>
         </ThemeProvider>
      </body>
    </html>
  )
}
