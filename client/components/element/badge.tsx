import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border px-2 py-0.5 text-xs font-medium w-fit h-6 whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        danger:
          "border-transparent bg-professional-danger/16 text-professional-danger font-medium [a&]:hover:bg-professional-danger/90",
        warning:
          "border-transparent bg-professional-warning/16 text-professional-warning font-medium [a&]:hover:bg-professional-warning/90",
        info:
          "border-transparent bg-professional-info/16 text-professional-info font-medium [a&]:hover:bg-professional-info/90",
        success:
          "border-transparent bg-professional-success/16 text-professional-success font-medium [a&]:hover:bg-professional-success/90",
        "primary-1":
          "border-transparent bg-professional-primary-1/16 text-professional-primary-1 font-medium [a&]:hover:bg-professional-primary-1/90",
        "primary-2":
          "border-transparent bg-professional-primary-2/16 text-professional-primary-2 font-medium [a&]:hover:bg-professional-primary-2/90",
        "primary-3":
          "border-transparent bg-professional-primary-3/16 text-professional-primary-3 font-medium [a&]:hover:bg-professional-primary-3/90",
        "primary-4":
          "border-transparent bg-professional-primary-4/16 text-professional-primary-4 font-medium [a&]:hover:bg-professional-primary-4/90",
        "primary-5":
          "border-transparent bg-professional-primary-5/16 text-professional-primary-5 font-medium [a&]:hover:bg-professional-primary-5/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
