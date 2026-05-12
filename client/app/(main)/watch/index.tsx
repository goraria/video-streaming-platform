"use client"

import React from "react"
import Link from "next/link"
import {
  Card
} from "gorth-ui/default/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "gorth-ui/default/accordion"
import { VideoPlaceHolder, VideoAvatar } from "@/components/video"
import {
  VideoPlayer,
  VideoPlayerCaptionsButton,
  VideoPlayerControlBar,
  VideoPlayerFullscreenButton,
  VideoPlayerLiveButton,
  VideoPlayerMuteButton,
  VideoPlayerPipButton,
  VideoPlayerPlayButton,
  VideoPlayerPlaybackRateButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "gorth-ui/pattern/video-player"
import { ButtonGroup } from "gorth-ui/default/button-group"
import { Button } from "gorth-ui/custom/button"
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Bookmark,
  Download,
  Flag
} from "gorth-ui/cores/lucide"

type SuggestionItem = {
  video: {
    id: string
    thumbnail: string
    title: string
    publishedAt: string
    duration: string
  }
  channel: {
    name: string
    slug: string
    avatar: string
  }
}

export default function Watch() {
  const suggestions: SuggestionItem[] = [
    {
      video: {
        id: "s-1001",
        thumbnail: "/logo/icon.png",
        title: "Goi y video 1",
        publishedAt: "2 gio truoc",
        duration: "08:12",
      },
      channel: {
        name: "Gorth Studio",
        slug: "gorth-studio",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "s-1002",
        thumbnail: "/logo/logo.png",
        title: "Goi y video 2",
        publishedAt: "Hom nay",
        duration: "05:44",
      },
      channel: {
        name: "UI Lab",
        slug: "ui-lab",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "s-1003",
        thumbnail: "/logo/icon.png",
        title: "Goi y video 3",
        publishedAt: "1 ngay truoc",
        duration: "11:06",
      },
      channel: {
        name: "Frontend Notes",
        slug: "frontend-notes",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "s-1004",
        thumbnail: "/logo/logo.png",
        title: "Goi y video 4",
        publishedAt: "3 ngay truoc",
        duration: "09:30",
      },
      channel: {
        name: "Creator One",
        slug: "creator-one",
        avatar: "/logo/icon.png",
      },
    },
  ]

  return (
    <div className="">
      <div className="grid gap-6 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-single">
        <div className="flex flex-col gap-4 3xl:col-span-5 2xl:col-span-4 lg:col-span-3">
          <div className="flex">
            <VideoPlayer className="w-full rounded-lg overflow-hidden border">
              {/* biome-ignore lint/a11y/useMediaCaption: demo video */}
              {/*<video*/}
              {/*  className="flex items-center justify-center object-cover"*/}
              {/*  slot="media"*/}
              {/*  src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/high.mp4"*/}
              {/*  poster="https://4kwallpapers.com/images/walls/thumbs_3t/26268.jpg"*/}
              {/*  suppressHydrationWarning*/}
              {/*/>*/}
              <video
                className="flex items-center justify-center object-cover"
                slot="media"
                src="https://m3md.n6uem8.xyz/doudou/ms/a52c74711847369ea09049cfa6__1125583/hls/1/index.m3u8"
                // poster="https://fourhoi.com/fc2-ppv-4815747/cover-n.jpg"
                poster="https://4kwallpapers.com/images/walls/thumbs_3t/26268.jpg"
                suppressHydrationWarning
              />
              <VideoPlayerControlBar className="p-2 gap-2 opacity-75">
                <VideoPlayerPlayButton className="size-9 rounded-md" />
                <VideoPlayerMuteButton className="size-9 rounded-md" />
                <VideoPlayerVolumeRange className="h-9 rounded-md" />
                <VideoPlayerPlaybackRateButton className="h-9 rounded-md" />
                <VideoPlayerLiveButton className="h-9 rounded-md" />
                <VideoPlayerTimeDisplay className="h-9 rounded-md" showDuration />
                <VideoPlayerTimeRange className="h-9 rounded-md" />
                <VideoPlayerCaptionsButton className="h-9 rounded-md" />
                <VideoPlayerPipButton className="h-9 rounded-md" />
                <VideoPlayerFullscreenButton className="h-9 rounded-md" />
              </VideoPlayerControlBar>
            </VideoPlayer>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Overlay layout cho featured content</h1>
            <div className="flex flex-row justify-between">
              <div className="flex items-start gap-2">
                <VideoAvatar channel={{
                  avatar: "/logo/icon.png",
                  name: "Japtor",
                  handle: "japtor",
                }}/>
                <div className="flex flex-col text-left leading-tight">
                  <Link
                    href={`/channel/${"japtor"}`}
                    className="truncate text-foreground font-medium text-sm hover:text-foreground"
                  >
                    {"Japtor"}
                  </Link>
                  <span className="truncate text-muted-foreground text-xs" suppressHydrationWarning>
                  2M subs
                </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ButtonGroup>
                  <Button variant="outline">
                    <ThumbsUp className="size-4" />
                    1M
                  </Button>
                  <Button variant="outline">
                    <ThumbsDown className="size-4" />
                    100
                  </Button>
                </ButtonGroup>
                <Button variant="outline">
                  Share
                  <Share className="size-4" />
                </Button>
                <Button variant="outline">
                  Save
                  <Bookmark className="size-4" />
                </Button>
                <Button variant="outline">
                  Download
                  <Download className="size-4" />
                </Button>
                <Button variant="outline">
                  Report
                  <Flag className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <Card className="p-4 gap-2">
            <div className="text-sm text-muted-foreground">2M views • Hom qua</div>
            <Accordion
              type="single"
              collapsible
              // defaultValue="description"
              className="w-full"
            >
              <AccordionItem value="description">
                <AccordionTrigger className="p-0">Descriptions</AccordionTrigger>
                <AccordionContent className="p-0 pt-2 h-auto text-sm text-muted-foreground">
                  We offer standard (5-7 days), express (2-3 days), and overnight
                  shipping. Free shipping on international orders.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  Van la card video nhung metadata nam tren anh, hop hero banner.
                  <p className="truncate text-sm text-muted-foreground">
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-1">
          {/*<div className="text-sm font-semibold text-foreground">Video suggest</div>*/}
          <div className="flex flex-col gap-3">
            {suggestions.map((item) => (
              <VideoPlaceHolder
                key={item.video.id}
                layout="side"
                size="md"
                metadataPosition="below"
                video={item.video}
                channel={item.channel}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
