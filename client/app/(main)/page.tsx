"use client"

import { Video } from "@/components/video"

export default function Page() {
  const videos = [
    {
      video: {
        id: "1001",
        thumbnail: "/logo/logo.png",
        title: "Cách dựng homepage video theo kiểu YouTube",
        publishedAt: "15 phút trước",
        duration: "08:42",
      },
      channel: {
        name: "Gorth Studio",
        slug: "gorth-studio",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1002",
        thumbnail: "/logo/icon.png",
        title: "Tối ưu layout component cho feed video",
        publishedAt: "2 giờ trước",
        duration: "12:48",
      },
      channel: {
        name: "Gorth UI",
        slug: "gorth-ui",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1003",
        thumbnail: "/logo/icon.png",
        title: "Variant nhỏ cho danh sách đề xuất",
        publishedAt: "Hôm nay",
        duration: "05:21",
      },
      channel: {
        name: "Gorth Team",
        slug: "gorth-team",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1004",
        thumbnail: "/logo/icon.png",
        title: "Thiết kế UI video card gọn gàng",
        publishedAt: "Hôm qua",
        duration: "09:30",
      },
      channel: {
        name: "Studio",
        slug: "studio",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1005",
        thumbnail: "/logo/logo.png",
        title: "Hướng dẫn làm layout video giống YouTube",
        publishedAt: "3 ngày trước",
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
        id: "1006",
        thumbnail: "/logo/icon.png",
        title: "Cách chia grid video 5 cột",
        publishedAt: "1 tuần trước",
        duration: "06:14",
      },
      channel: {
        name: "UI Lab",
        slug: "ui-lab",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1007",
        thumbnail: "/logo/logo.png",
        title: "Thiết kế homepage video sáng tối",
        publishedAt: "2 tuần trước",
        duration: "14:02",
      },
      channel: {
        name: "Channel Name",
        slug: "channel-name",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1008",
        thumbnail: "/logo/icon.png",
        title: "Bố cục feed video theo thẻ",
        publishedAt: "3 tuần trước",
        duration: "07:58",
      },
      channel: {
        name: "Creator One",
        slug: "creator-one",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1009",
        thumbnail: "/logo/icon.png",
        title: "Gợi ý UI cho danh sách video",
        publishedAt: "1 tháng trước",
        duration: "05:40",
      },
      channel: {
        name: "Creator Two",
        slug: "creator-two",
        avatar: "/logo/icon.png",
      },
    },
    {
      video: {
        id: "1010",
        thumbnail: "/logo/logo.png",
        title: "Cách tổ chức video metadata",
        publishedAt: "1 tháng trước",
        duration: "09:18",
      },
      channel: {
        name: "Creator Three",
        slug: "creator-three",
        avatar: "/logo/icon.png",
      },
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {videos.map((item) => (
          <Video
            key={item.video.id}
            layout="below"
            size="md"
            video={item.video}
            channel={item.channel}
          />
        ))}
      </section>
    </div>
  )
}
