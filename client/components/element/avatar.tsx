import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"

export const AvatarDefault = ({
  title,
  image,
  className,
}: {
  title?: string;
  image?: string | null;
  className?: string;
}) => (
  <>
    <Avatar className={cn("h-9 w-9 rounded-md", className)}>
      {image ? (
        <>
          <AvatarImage
            src={image || undefined}
            alt={title}
          />
        </>
      ) : (
        <>
          <AvatarImage
            src={undefined}
            alt={title}
          />
        </>
      )}
      <AvatarFallback className="bg-professional-main/24 rounded-md" suppressHydrationWarning>
        {title}
      </AvatarFallback>
      {/*<AvatarFallback className="rounded-md">{title}</AvatarFallback>*/}
    </Avatar>
  </>
)

export const AvatarDetail = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) => (
  <>
    <div className={cn("grid flex-1 text-left text-sm leading-tight", className)}>
      <span className="truncate font-medium" suppressHydrationWarning>
        {title}
      </span>
      <span className="truncate text-xs text-muted-foreground" suppressHydrationWarning>
        {description}
      </span>
    </div>
  </>
)
