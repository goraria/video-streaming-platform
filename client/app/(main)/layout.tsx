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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar data={mainSidebar} />

      <SidebarInset>
        <Dashbar/>
        {children}
        <Copyright />
      </SidebarInset>
    </SidebarProvider>
  )
}
