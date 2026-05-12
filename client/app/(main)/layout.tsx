"use client"

import React from "react"
import {
  SidebarProvider,
  SidebarInset,
} from "gorth-ui/custom/sidebar"
import { Dashbar } from "@/layouts/dashbar"
import { Copyright } from "gorth-ui/layouts/copyright"
import { AppSidebar } from "gorth-ui/dashboard/app-sidebar"
import { mainSidebar } from "@/lib/constant"
import { useAuth } from "@/hooks/use-auth"
import { useUser } from "@/hooks/use-user"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useUser()
  const metadata = user?.user_metadata ?? {}
  const sidebarUser = {
    name: metadata.name ?? metadata.full_name ?? "Guest",
    email: user?.email ?? "",
    avatar: metadata.avatar_url ?? metadata.picture ?? "/logo/icon.png",
  }

  console.log("sidebarUser", sidebarUser)

  return (
    <SidebarProvider>
      <AppSidebar data={{ ...mainSidebar, user: sidebarUser }} />

      <SidebarInset>
        <Dashbar/>
        <main className="flex flex-1 flex-col">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
        {/*<Copyright />*/}
      </SidebarInset>
    </SidebarProvider>
  )
}
