"use client"

import * as React from "react"
import Link from "next/link"
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "gorth-ui/default/dialog"
import { Button } from "gorth-ui/custom/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "gorth-ui/custom/dropdown"
import {
  Bell,
  BellDot,
  BellOff,
  BellRing,
  Calendar,
  CheckCircle,
  ChevronDown,
  Crown,
  Eye,
  Flag,
  Gift,
  Globe,
  Info,
  LinkIcon,
  MapPin,
  MessageSquare,
  Share,
  Sparkles,
  Users,
  UserX,
  Video,
  X,
} from "gorth-ui/cores/lucide"
import {
  CommunityButtonProps,
  MembershipButtonProps,
  SubscribeButtonProps
} from "../lib/interface"

export function SubscribeButton({
  defaultSubscribed = false,
  isSubscribed,
  className,
  onSubscribedChange,
  onNotificationChange,
}: SubscribeButtonProps) {
  const [internalSubscribed, setInternalSubscribed] = React.useState(defaultSubscribed)
  const subscribed = isSubscribed ?? internalSubscribed

  const updateSubscribed = (nextSubscribed: boolean) => {
    if (isSubscribed === undefined) {
      setInternalSubscribed(nextSubscribed)
    }

    onSubscribedChange?.(nextSubscribed)
  }

  if (!subscribed) {
    return (
      <Button
        variant="default"
        className={className}
        onClick={() => updateSubscribed(true)}
      >
        Đăng ký
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Bell className="size-4" />
          Đã đăng ký
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onNotificationChange?.("all")}>
            <BellRing className="size-4" />
            Tất cả
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onNotificationChange?.("personalized")}>
            <BellDot className="size-4" />
            Cá nhân hóa
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onNotificationChange?.("none")}>
            <BellOff className="size-4" />
            Tắt thông báo
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => updateSubscribed(false)}
        >
          <UserX className="size-4" />
          Hủy đăng ký
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MembershipButton({
  channelName = "kênh này",
  className,
}: MembershipButtonProps) {
  const perks = [
    "Huy hiệu hội viên cạnh tên của bạn",
    "Quyền truy cập nội dung hậu trường",
    "Ưu tiên bình luận và thông báo từ kênh",
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Crown className="size-4" />
          Hội viên
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tham gia hội viên {channelName}</DialogTitle>
          <DialogDescription>
            Nhận quyền lợi riêng và ủng hộ trực tiếp cho kênh.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <div>
                <p className="font-medium">Gói Waddles Member</p>
                <p className="text-sm text-muted-foreground">49.000 VND / tháng</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-sm">
                <CheckCircle className="size-4 text-primary" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <Button className="w-full">
            <Gift className="size-4" />
            Tham gia ngay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CommunityButton({ channelSlug, className }: CommunityButtonProps) {
  return (
    <Button asChild variant="outline" className={className}>
      <Link href={`/channel/${encodeURIComponent(channelSlug)}/comunity`}>
        <MessageSquare className="size-4" />
        Cộng đồng
      </Link>
    </Button>
  )
}

export function MoreInfoButton({ channel }: { channel?: string}) {
  const channelProfile = {
    name: "Waddles",
    handle: "@waddles",
    subscribers: "248K người đăng ký",
    videos: "186 video",
    description: [
      "Welcome to the official Waddles YouTube channel, where every bite has a story.",
      "This is the place where you can find all the latest and greatest Waddles videos from your favorite restaurant moments, along with behind-the-scenes videos, exclusive sneak peeks, fan creations and more.",
      "Subscribe for non-stop Waddles fun!",
    ],
    links: [
      { title: "Waddles.com", href: "waddles.com" },
      { title: "Subscribe here!", href: "youtube.com/@waddles?sub_confirmation=1" },
      { title: "Waddles Facebook", href: "facebook.com/waddles" },
      { title: "Waddles Instagram", href: "instagram.com/waddles" },
      { title: "Waddles TikTok", href: "tiktok.com/@waddles" },
    ],
    url: "www.youtube.com/@waddles",
    location: "Vietnam",
    joined: "Joined May 10, 2026",
    views: "12,850,000 views",
  }

  const channelDescription = channelProfile.description.join(" ");
  const channelSlug = channelProfile.handle.replace("@", "");
  const channelMoreInfo = [
    { icon: Globe, value: channelProfile.url },
    { icon: MapPin, value: channelProfile.location },
    { icon: Calendar, value: channelProfile.joined },
    { icon: Users, value: channelProfile.subscribers },
    { icon: Video, value: channelProfile.videos },
    { icon: Eye, value: channelProfile.views },
  ];

  return (
    <Dialog>
      <div className="flex min-w-0 max-w-full items-center justify-center text-sm leading-6 text-muted-foreground md:justify-start">
        <p className="min-w-0 max-w-full flex-1 truncate">
          {channelDescription}
        </p>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="h-auto shrink-0 cursor-pointer font-medium text-foreground hover:no-underline"
          >
            ...thêm
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100vh-6rem)] overflow-y-auto gap-0 p-0 scrollbar-none sm:max-w-2xl [&::-webkit-scrollbar]:hidden"
      >
        <DialogHeader className="sticky top-0 z-10 flex-row items-center justify-between border-b bg-popover p-6">
          <DialogTitle className="text-xl">{channelProfile.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Thông tin giới thiệu kênh {channelProfile.name}
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm" className="-mr-2">
              <X className="size-5" />
              <span className="sr-only">Đóng</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold">
              <Info className="size-5" />
              Description
            </h3>
            <div className="space-y-4 text-sm leading-6 text-foreground">
              {channelProfile.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="space-y-3 border-t pt-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <LinkIcon className="size-5" />
              Links
            </h3>
            <div className="grid gap-4">
              {channelProfile.links.map((link) => (
                <a
                  key={link.title}
                  href={`https://${link.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="grid gap-1 text-sm"
                >
                  <span className="font-medium text-foreground">{link.title}</span>
                  <span className="break-all text-primary">{link.href}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3 border-t pt-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Info className="size-5" />
              More info
            </h3>
            <div className="grid gap-3 text-sm text-foreground">
              {channelMoreInfo.map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3">
                  <Icon className="size-5 text-muted-foreground" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <DialogFooter className="flex flex-wrap gap-2 sm:justify-start border-t p-6">
          <Button variant="outline">
            <Share className="size-4" />
            Share channel
          </Button>
          <Button variant="danger">
            <Flag className="size-4" />
            Report user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SubscribeButtonX({}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="default" variant="outline">
            <Bell className="size-4" />
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BellRing className="size-4" />
              All
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellOff className="size-4" />
              None
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellDot className="size-4" />
              Personalized
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="size-4" />
              Unsubscribe
              <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
