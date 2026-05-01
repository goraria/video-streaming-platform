"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoonStar, Moon, Sun, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

export function ModeToggle({
  className,
  ...props
}: React.ComponentProps<"span"> & {
  className?: string
}) {
  const [layout, setLayout] = useState(0)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className={cn("", className)} {...props}>
        <Button variant="ghost" size="icon">
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </span>
    )
  }

  // Hàm để cycle qua các theme: light -> dark -> system -> light
  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  // Icon hiển thị dựa trên theme hiện tại
  const getCurrentIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />
    } else if (theme === "dark" || (theme === "system" && resolvedTheme === "dark")) {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />
    } else {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  return (
    <span className={cn("", className)} {...props}>
      {layout === 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
              {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
              {getCurrentIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <div className="grid grid-cols-3 gap-1">
              <DropdownMenuItem
                disabled={theme === "light"}
                onClick={() => setTheme("light")}
                className="h-9 gap-3 p-2.5"
              >
                <Sun className="h-4 w-4 text-primary" />
                {/* Light */}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={theme === "system"}
                onClick={() => setTheme("system")}
                className="h-9 gap-3 p-2.5"
              >
                <Monitor className="h-4 w-4 text-primary" />
                {/* System */}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={theme === "dark"}
                onClick={() => setTheme("dark")}
                className="h-9 gap-3 p-2.5"
              >
                <Moon className="h-4 w-4 text-primary" />
                {/* Dark */}
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : layout === 1 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
              {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
              {getCurrentIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="h-9 gap-3 p-2.5"
            >
              <Sun className="h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="h-9 gap-3 p-2.5"
            >
              <Moon className="h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="h-9 gap-3 p-2.5"
            >
              <Monitor className="h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : layout === 2 ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
        >
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
          {/* <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" /> */}
          {/*<Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
          {getCurrentIcon()}
          <span className="sr-only">Toggle theme (Light/Dark/System)</span>
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      ) : (
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        />
      )}
    </span>
  )
}
