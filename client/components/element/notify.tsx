import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon, Bell, X } from "lucide-react";

interface NotifyItemProps {
  title: string;
  description: string;
  timestamp: Date;
  icon: LucideIcon
}

export function NotifyButton() {
  const notify: NotifyItemProps[] = [
    {
      title: "New Message",
      description: "You have new message from Natalie",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Japtor",
      description: "Bạn có tin nhắn mới từ Goraria",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Goraria",
      description: "Bạn có tin nhắn mới từ Goraria",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Ichibulup",
      description: "Bạn có tin nhắn mới từ Goraria",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Schweitzenburg",
      description: "Bạn có tin nhắn mới từ Goraria",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Title",
      description: "Bạn có tin nhắn mới từ Goraria",
      timestamp: new Date,
      icon: Bell,
    },
    {
      title: "Demo",
      description: "New",
      timestamp: new Date,
      icon: Bell,
    },
  ]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
              8
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="h-9 px-2.5 py-2">Thông báo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[320px]">
            {/* <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Message</span>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
            </DropdownMenuItem> */}

            {notify.map((item, index) => (
              <NotifyItem
                key={index}
                title={item.title}
                description={item.description}
                timestamp={item.timestamp}
                icon={item.icon}
              />
            ))}
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-9 p-2.5">
            Xem tất cả
            <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function NotifyItem({
  title,
  description,
  timestamp,
  icon,
}: NotifyItemProps) {
  const time = timestamp.toLocaleString();
  const status = true

  return (
    <>
      {/*<DropdownMenuItem className="flex flex-col items-start p-2.5 gap-1">*/}
      {/*  */}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <span className="font-medium">{title}</span>*/}
      {/*    <span className="text-xs text-muted-foreground">{time}</span>*/}
      {/*  </div>*/}
      {/*  <p className="text-sm text-muted-foreground">{description}</p>*/}
      {/*</DropdownMenuItem>*/}
      <DropdownMenuItem className="grid grid-cols-[auto_1fr_auto] gap-2 p-2.5 cursor-pointer focus:bg-accent">
        {/* CỘT 1: Icon Avatar */}
        <div className="flex w-9 h-9 border-background rounded-full bg-professional-sub items-center justify-center">
          <Bell size={16} className="text-background" />
        </div>

        {/* CỘT 2: Text Content - flex-1 nhưng phải truncate */}
        <div className="flex flex-col gap-1 min-w-0">
          {/* TITLE + TIME */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium text-sm truncate">
              {title}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
              {timestamp.toLocaleTimeString()}
            </span>
          </div>

          {/* DESCRIPTION: truncate */}
          <span
            className="text-sm text-muted-foreground truncate"
            title={description}
          >
            {description}
          </span>
        </div>

        {/* CỘT 3: Button X - luôn hiển thị */}
        <div className="flex items-center">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              // Handle delete notification
            }}
          >
            <X size={16} />
          </Button>
        </div>
      </DropdownMenuItem>
      {/* <DropdownMenuItem className="flex items-center justify-between w-full p-2.5 bg-background min-w-0">
        <div className="flex flex-row flex-1 items-center gap-2.5 min-w-0">
          <div className="flex w-9 h-9 border-background rounded-full bg-professional-sub items-center justify-center shrink-0">
            <Bell size={16} className="text-background" />
          </div>

          <div className="flex flex-col flex-1 gap-1 items-start min-w-0">
            <div className="flex w-full items-center gap-2 min-w-0">
              <span className="font-medium truncate min-w-0">
                {title}
              </span>
              <span className="text-xs text-muted-foreground text-right shrink-0">
                {timestamp.toLocaleTimeString()}
              </span>
            </div>

            <span
              className="text-sm text-muted-foreground block w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-0"
              title={description}
            >
              {description}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center h-9 w-4 rounded-full bg-transparent shrink-0">
          <Button size="icon" variant="ghost">
            <X size={16} />
          </Button>
        </div>
      </DropdownMenuItem> */}

      {/*<DropdownMenuItem className="flex items-center justify-between w-full p-2.5 bg-background">*/}
      {/*  <div className="flex flex-row flex-1 items-center gap-2.5">*/}
      {/*    <div className="flex w-9 h-9 border-background rounded-full bg-professional-sub items-center justify-center">*/}
      {/*      /!*{icon ? <Icon as={icon} size={28} /> : null}*!/*/}
      {/*      <Bell size={16} className="text-background" />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col flex-1 gap-1 items-start">*/}
      {/*      <div className="flex flex-row justify-between items-center gap-2">*/}
      {/*        <span className="font-medium">*/}
      {/*          {title}*/}
      {/*        </span>*/}
      {/*        <span className="text-xs text-muted-foreground text-right">*/}
      {/*          {timestamp.toLocaleTimeString()}*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*      /!*<span*!/*/}
      {/*      /!*  // numberOfLines={1} // line-clamp-1*!/*/}
      {/*      /!*  className="text-sm text-muted-foreground line-clamp-1 truncate text-ellipsis"*!/*/}
      {/*      /!*>*!/*/}
      {/*      /!*  {description}*!/*/}
      {/*      /!*</span>*!/*/}
      {/*      <span*/}
      {/*        className="text-sm text-muted-foreground block overflow-hidden text-ellipsis whitespace-nowrap w-full"*/}
      {/*        title={description}*/}
      {/*      >*/}
      {/*        {description}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-row justify-center items-center h-9 w-4 rounded-full bg-transparent">*/}
      {/*    {status ? (*/}
      {/*      <Button*/}
      {/*        size="icon"*/}
      {/*        variant="ghost"*/}
      {/*      >*/}
      {/*        <X size={16}/>*/}
      {/*      </Button>*/}
      {/*    ) : (*/}
      {/*      <div className="flex bg-muted-foreground aspect-square w-2 h-2 rounded-full"/>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</DropdownMenuItem>*/}
    </>
  )
}
