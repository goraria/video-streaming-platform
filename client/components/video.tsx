import React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "gorth-ui/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "gorth-ui/default/avatar"
import { Badge } from "gorth-ui/custom/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "gorth-ui/default/tooltip"

export type VideoLayout = "below" | "overlay" | "side"
export type VideoSize = "sm" | "md" | "lg" | "auto"
export type MetadataPosition = "below" | "left" | "right" | "top"

export interface ChannelInfo {
  name?: string
  slug?: string
  avatar?: string
}

export interface VideoInfo {
  id: string | undefined
  thumbnail: string
  title: string
  duration?: string
  publishedAt?: string
  description?: string
}

export interface VideoProps
  extends Omit<React.ComponentProps<"article">, "title"> {
  video?: VideoInfo
  channel?: ChannelInfo
  layout?: VideoLayout
  size?: VideoSize
  metadataPosition?: MetadataPosition
  contentClassName?: string
}

export function Video({
  video,
  channel,
  layout = "below",
  size = "md",
  metadataPosition,
  className,
  contentClassName,
  ...props
}: VideoProps) {
  const {
    id: videoId,
    thumbnail = "/logo/icon.png",
    title = "7 cách làm video thumbnail hấp dẫn hơn",
    duration = "12:48",
    publishedAt = "2 giờ trước",
    description,
  } = video ?? {}

  const {
    name: channelName = "Gorth Studio",
    slug: channelSlug = "gorth-studio",
    avatar: channelAvatar,
  } = channel ?? {}

  const isSideLayout = layout === "side"
  const isOverlayLayout = layout === "overlay"
  const channelSize = size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs"

  // Use metadataPosition if provided, otherwise derive from layout
  const position: MetadataPosition = metadataPosition || (isSideLayout ? "left" : isOverlayLayout ? "below" : "below")

  // Small components are defined above: TitleWithTooltip and AvatarLink

  // Render image with badges; enforce 16:9 aspect for sizes (except auto)
  // Render metadata components
  if (!isOverlayLayout) {
    // For left/right positions: Title on top, avatar below
    if (position === "left" || position === "right") {
      const sideMetadata = (
        <div className={cn("min-w-0 flex flex-col gap-2", contentClassName)}>
          {/*<TitleWithTooltip title={title} videoId={videoId} titleSize={titleSize} titleClassName={titleClassName} />*/}
          <div className="flex items-end gap-2">
            {/*<AvatarLink channel={{ name: channelName, slug: channelSlug, avatar: channelAvatar }} channelSize={channelSize} />*/}
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <span aria-hidden="true">•</span>
              <span className="text-muted-foreground text-xs">{publishedAt}</span>
            </div>
          </div>
          {description ? (
            <p className={cn("line-clamp-2 text-muted-foreground", channelSize)}>
              {description}
            </p>
          ) : null}
        </div>
      )

      if (position === "left") {
        return (
          <article
            className={cn(
              "group/video flex w-full gap-3 text-left",
              "flex-row-reverse",
              className
            )}
            {...props}
          >
            <VideoThumbnail video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}/>
            <div className="flex-1 min-w-0">{sideMetadata}</div>
          </article>
        )
      }

      return (
        <article
          className={cn(
            "group/video flex w-full gap-3 text-left",
            "flex-row",
            className
          )}
          {...props}
        >
          <VideoThumbnail video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}/>
          <div className="flex-1 min-w-0">{sideMetadata}</div>
        </article>
      )
    }

    // For top/below positions: Avatar left, title right
    const belowMetadata = (
      <>
        <VideoDetail
          channel={{ name: channelName, slug: channelSlug, avatar: channelAvatar }}
          video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}
        />
      </>
    )

    if (position === "top") {
      return (
        <article
          className={cn("group/video flex w-full flex-col-reverse gap-3 text-left", className)}
          {...props}
        >
          <VideoThumbnail video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}/>
          {belowMetadata}
        </article>
      )
    }

    // Default: below
    return (
      <article
        className={cn("group/video flex w-full flex-col gap-3 text-left", className)}
        {...props}
      >
        <VideoThumbnail video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}/>
        {belowMetadata}
      </article>
    )
  }

  // Overlay layout fallback
  return (
    <article
      className={cn("group/video flex w-full flex-col gap-3 text-left", "hover:border-professional-main", className)}
      {...props}
    >
      <VideoThumbnail video={{ id: videoId, thumbnail: thumbnail, title: title, publishedAt: publishedAt, duration: duration, description: description }}/>
    </article>
  )
}

export function VideoDetail({ channel, video }: { channel: ChannelInfo, video: VideoInfo }) {
  const channelName = channel.name ?? "Channel"
  return (
    <div className="flex items-start gap-2">
      <Link
        href={`/channel/@${channel.slug ?? ""}`}
        className="shrink-0 hover:opacity-80 transition-opacity"
        aria-label={typeof channelName === "string" ? channelName : "Channel"}
      >
        <Avatar className="rounded-md size-9">
          {channel.avatar ? (
            <AvatarImage src={channel.avatar} alt={"Channel"} className="rounded-md" />
          ) : (
            <AvatarFallback className="rounded-md">{"CN"}</AvatarFallback>
          )}
        </Avatar>
      </Link>
      <div className="grid flex-1 text-left leading-tight">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/watch?id=${video.id}`} className="inline-block">
              <h3 className={cn("line-clamp-1 font-semibold leading-snug text-foreground transition-colors group-hover/video:text-primary cursor-help")}>
                {video.title}
              </h3>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p>{video.title}</p>
          </TooltipContent>
        </Tooltip>
        <Link
          href={`/channel/@${channel.slug ?? ""}`}
          className="truncate text-muted-foreground font-medium text-sm hover:text-foreground"
        >
          {channelName}
        </Link>
        <span className="truncate text-muted-foreground text-xs" suppressHydrationWarning>
          2M views • {video.publishedAt}
        </span>
      </div>
    </div>
  )
}

export function VideoThumbnail({ video }: { video: VideoInfo }) {
  // const imageElement = (
  //   <div className={cn(isSideLayout && imageWidth, maxWidth)}>
  //     <div
  //       className={cn(
  //         "relative overflow-hidden bg-muted/50 ring-1 ring-black/5 transition-transform duration-300 group-hover/video:-translate-y-0.5 group-hover/video:shadow-xl",
  //         rounded,
  //         // enforce 16:9 always
  //         "aspect-video",
  //         imageClassName
  //       )}
  //     >
  //       <Image
  //         src={thumbnail}
  //         alt={typeof title === "string" ? title : "Video thumbnail"}
  //         fill
  //         className="object-cover transition-transform duration-500 group-hover/video:scale-105"
  //         sizes={isSideLayout ? "160px" : "(max-width: 768px) 100vw, 33vw"}
  //         priority={false}
  //       />
  //
  //       <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent opacity-80" />
  //
  //       <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-2 p-3">
  //         <Badge variant="secondary">
  //           4K
  //         </Badge>
  //         <Badge variant="default">
  //           {duration}
  //         </Badge>
  //         {/*<div className="inline-flex rounded-sm bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">*/}
  //         {/*  {duration}*/}
  //         {/*</div>*/}
  //       </div>
  //
  //       {isOverlayLayout ? (
  //         <div className="absolute inset-x-0 bottom-0 p-4">
  //           <div className={cn("max-w-[90%] rounded-lg bg-black/45 p-3 text-white backdrop-blur-md", rounded)}>
  //             <h3 className={cn("line-clamp-1 font-semibold leading-snug", titleSize)}>
  //               {title}
  //             </h3>
  //             <div className={cn("mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80", channelSize)}>
  //               <span>{channelName}</span>
  //               <span aria-hidden="true">•</span>
  //               <span>{publishedAt}</span>
  //             </div>
  //             {description ? (
  //               <p className={cn("mt-2 line-clamp-2 text-white/75", channelSize)}>
  //                 {description}
  //               </p>
  //             ) : null}
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   </div>
  // )

  return (
    <div className="aspect-video w-full">
      <Link
        className={cn(
          "block h-full w-full relative overflow-hidden bg-muted/50 ring-1 ring-black/5 transition-transform duration-300 group-hover/video:-translate-y-0.5 group-hover/video:shadow-xl",
          "rounded-lg",
          "aspect-video",
          // imageClassName
        )}
        href={`/watch?id=${video.id}`}
      >
        <Image
          src={video.thumbnail || "/logo/icon.png"}
          alt={"Video thumbnail"}
          fill
          className="object-cover transition-transform duration-500 group-hover/video:scale-105"
          // sizes={isSideLayout ? "160px" : "(max-width: 768px) 100vw, 33vw"}
          priority={false}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent opacity-80" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-2 p-2">
          <Badge variant="secondary">
            4K
          </Badge>
          <Badge variant="default">
            {video.duration}
          </Badge>
          {/*<div className="inline-flex rounded-sm bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">*/}
          {/*  {duration}*/}
          {/*</div>*/}
        </div>
      </Link>
    </div>
  )
}
