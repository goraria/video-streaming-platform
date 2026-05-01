"use client"

import { Video } from "@/components/video"

export default function Page() {
  return (
    <>
      <Video
        // className="w-96"
        layout="side"
        size="md"
        metadataPosition="right"
        video={{
          id: "3003",
          thumbnail: "/logo/logo.png",
          title: "Overlay layout cho featured content",
          publishedAt: "Hôm qua",
          duration: "14:02",
          description: "Vẫn là card video nhưng metadata nằm trên ảnh, hợp hero banner.",
        }}
        channel={{
          name: "Channel Name",
          slug: "channel-name",
          avatar: "/logo/icon.png",
        }}
      />
      <span className="text-lg font-medium">History</span>
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
