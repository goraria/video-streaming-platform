import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  BarChart3,
  MessageSquare,
  Users,
  SquareUser,
  Home,
  LifeBuoy,
  Send,
  History,
  ListVideo,
  Clock,
  ThumbsUp,
  Download,
  Music,
  Rocket,
  Newspaper,
  SportShoe,
} from "gorth-ui/cores/lucide"

export const mainSidebar = {
  user: {
    name: "japtor",
    email: "japtor@gorth.org",
    avatar: "/avatar/waddles.jpeg",
  },
  route: "/",
  role: "main",
  brand: {
    name: "Gortheia",
    logo: "/logo/icon.png",
  },
  // teams: [
  //   {
  //     name: "Gorth Inc.",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Goraria Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Waddles Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Your channel",
      url: "/channel",
      icon: SquareUser,
      isActive: true,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
      isActive: true,
    },
    {
      title: "Playlists",
      url: "/playlists",
      icon: ListVideo,
      isActive: true,
    },
    {
      title: "Watch later",
      url: "/playlists?list=later",
      icon: Clock,
      isActive: true,
    },
    {
      title: "Liked videos",
      url: "/playlists?list=like",
      icon: ThumbsUp,
      isActive: true,
    },
    {
      title: "Downloads",
      url: "/downloads",
      icon: Download,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Your videos",
      url: "/profile/videos",
      icon: SquareUser,
      isActive: true,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Music",
      url: "/explore/music",
      icon: Music,
    },
    {
      name: "Gaming",
      url: "/explore/gaming",
      icon: Rocket,
    },
    {
      name: "News",
      url: "/explore/news",
      icon: Newspaper,
    },
    {
      name: "Sports",
      url: "/explore/news",
      icon: SportShoe,
    },
  ],
}
