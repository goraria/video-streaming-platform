"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "gorth-ui/default/button"
import { Badge } from "gorth-ui/default/badge"
import { cn } from "gorth-ui/lib/utils"
import {
  VideoPlayer,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerMuteButton,
  VideoPlayerVolumeRange,
  VideoPlayerFullscreenButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerContent,

} from "gorth-ui/pattern/video-player"

export default function Watch() {
  return (
    <>
      <div className="inset-0 flex items-center justify-center p-8">
        <div className="w-full">
          <VideoPlayer className="rounded-lg overflow-hidden border">
            {/* biome-ignore lint/a11y/useMediaCaption: demo video */}
            <video
              className="flex justify-center items-center"
              slot="media"
              src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/high.mp4"
              poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=0"
              suppressHydrationWarning
            />
            <VideoPlayerControlBar className="p-2 gap-2 opacity-75">
              <VideoPlayerPlayButton className="size-9 rounded-md" />
              <VideoPlayerMuteButton className="size-9 rounded-md" />
              <VideoPlayerVolumeRange className="h-9 rounded-md" />
              {/*<div className="group flex items-center gap-2">*/}
              {/*  <VideoPlayerMuteButton className="size-9 rounded-md" />*/}
              {/*  <VideoPlayerVolumeRange className="h-9 rounded-md opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto group-hover:inline-flex" />*/}
              {/*</div>*/}
              <VideoPlayerTimeDisplay className="h-9 rounded-md" showDuration />
              <VideoPlayerTimeRange className="h-9 rounded-md" />
              <VideoPlayerFullscreenButton className="h-9 rounded-md" />
            </VideoPlayerControlBar>
          </VideoPlayer>
        </div>
      </div>
      Watch
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  )
}
