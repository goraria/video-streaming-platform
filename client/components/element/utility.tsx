"use client"

import React from "react"
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
	Grid2X2, 
	Calendar, 
	FileText, 
	User, 
	Shield, 
	LayoutDashboard, 
	Settings,
	Package,
	ShoppingCart,
	LucideIcon,
  Plus
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UtilityItemProps {
	icon: LucideIcon;
	title: string;
	subtitle: string;
	onClick?: () => void;
}

function UtilityItem({
  icon: Icon,
  title,
  subtitle,
  onClick
}: UtilityItemProps) {
	return (
		<DropdownMenuItem
			onClick={onClick}
			className="flex flex-col items-center justify-center gap-2 p-4 h-auto cursor-pointer"
		>
			<div className="flex w-10 h-10 rounded-full bg-professional-main/24 items-center justify-center">
				<Icon className="h-6 w-6 size-6 text-primary" />
			</div>
			<div className="flex flex-col items-center text-center">
				<span className="font-medium text-sm">{title}</span>
				<span className="text-xs text-muted-foreground">{subtitle}</span>
			</div>
		</DropdownMenuItem>
	);
}

export function Utility({
	className,
	...props
}: React.ComponentProps<"span"> & {
	className?: string
}) {
	const utilities = [
		{
			icon: Calendar,
			title: "Calendar",
			subtitle: "Appointments",
			onClick: () => console.log("Calendar clicked")
		},
		{
			icon: FileText,
			title: "Invoice App",
			subtitle: "Manage Accounts",
			onClick: () => console.log("Invoice clicked")
		},
		{
			icon: User,
			title: "User App",
			subtitle: "Manage Users",
			onClick: () => console.log("User App clicked")
		},
		{
			icon: Shield,
			title: "Role Management",
			subtitle: "Permission",
			onClick: () => console.log("Role Management clicked")
		},
		{
			icon: LayoutDashboard,
			title: "Dashboard",
			subtitle: "User Dashboard",
			onClick: () => console.log("Dashboard clicked")
		},
		{
			icon: Settings,
			title: "Setting",
			subtitle: "Account Settings",
			onClick: () => console.log("Setting clicked")
		},
		{
			icon: Package,
			title: "Products",
			subtitle: "Manage Products",
			onClick: () => console.log("Products clicked")
		},
		{
			icon: ShoppingCart,
			title: "Orders",
			subtitle: "Manage Orders",
			onClick: () => console.log("Orders clicked")
		},
	];

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="cursor-pointer"
						size="icon"
					>
						<Grid2X2 className="h-[1.2rem] w-[1.2rem]" />
						<span className="sr-only">Quick Setting</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-80">
					<DropdownMenuLabel
            className="flex justify-between items-center p-0 pl-2" // px-4 py-3
          >
            Phím tắt
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8" // rounded-full
            >
              <Plus className="h-4 w-4"/>
            </Button>
          </DropdownMenuLabel>
					<DropdownMenuSeparator />
					<ScrollArea className="h-[356px]">
						<div className="grid grid-cols-2 gap-1">
							{utilities.map((utility, index) => (
								<UtilityItem
									key={index}
									icon={utility.icon}
									title={utility.title}
									subtitle={utility.subtitle}
									onClick={utility.onClick}
								/>
							))}
						</div>
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
