"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "gorth-ui/default/card";
import { Badge } from "gorth-ui/default/badge";
import { Avatar, AvatarFallback, AvatarImage } from "gorth-ui/custom/avatar";
import { Button } from "gorth-ui/custom/button";
import { Tabs, TabsList, TabsTrigger } from "gorth-ui/custom/tabs";
import { CommunityButton, MembershipButton, MoreInfoButton, SubscribeButton } from "@/components/button";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Shield,
  Bell,
  Settings,
  CheckCircle,
  Crown,
  Eye,
  Flag,
  Globe,
  Info,
  LinkIcon,
  MessageSquare,
  Share,
  Star,
  UtensilsCrossed,
  Receipt,
  Clock,
  CreditCard,
  Award,
  TrendingUp,
  ShoppingBag,
  Users,
  Video,
  X
} from "gorth-ui/cores/lucide";
import Background from "gorth-ui/assets/background/profile-banner.png"
import Waddles from "gorth-ui/assets/avatar/waddles.jpeg"

const channelTabs = [
  "Home",
  "Videos",
  "Shorts",
  "Live",
  "Playlists",
  "Community",
  "Channels",
  "About",
]

export default function ProfilePage() {
  const { user } = {
    user: {
      username: "jp",
      fullName: "Waddles",
      emailAddresses: [
        {
          emailAddress: "Email",
        }
      ],
      imageUrl: "/images/logo.png",
      createdAt: new Date(),
    }
  }

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
    <>
      <Card className="mb-6 overflow-hidden py-0">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={Background}
            alt="Banner image"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/*<NeonBackground className="rounded-top w-full h-full" />*/}
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col items-end gap-4 text-center md:flex-row md:items-end md:text-left">
            <Avatar className="-mt-12 size-32 rounded-xl border-4 border-background bg-background after:rounded-xl">{/*shadow-md*/}
              <AvatarImage
                // src={user?.imageUrl}
                src={Waddles.src}
                alt="Avatar"
                width={128}
                height={128}
                className="size-full rounded-lg object-cover"
              />
              <AvatarFallback className="rounded-lg text-2xl font-bold">SW</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-row items-start gap-4 overflow-hidden md:items-start">
              <div className="flex min-w-0 max-w-full flex-col gap-2">
                <h4 className="text-2xl font-semibold leading-tight">
                  {user?.fullName}
                </h4>
                <div className="flex min-w-0 max-w-full flex-col">
                  <div className="flex flex-wrap items-center justify-start gap-x-2 text-sm text-muted-foreground md:justify-start">
                    <span className="font-medium text-foreground">{channelProfile.handle}</span>
                    <span> • </span>
                    <span>{channelProfile.subscribers}</span>
                    <span> • </span>
                    <span>{channelProfile.videos}</span>
                  </div>
                  <MoreInfoButton/>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 md:shrink-0 md:justify-end">
              <MembershipButton channelName={channelProfile.name} />
              <CommunityButton channelSlug={channelSlug} />
              <SubscribeButton className="" />
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="home" className="mb-6">
        <div className="overflow-x-auto">
          <TabsList className="w-max justify-start gap-2 rounded-none p-0">
            {channelTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                // className="h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 text-sm font-semibold text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </>
  );
}

export function Profile() {

  const { user } = {
    user: {
      username: "jp",
      fullName: "Waddles",
      emailAddresses: [
        {
          emailAddress: "Email",
        }
      ],
      imageUrl: "/images/logo.png",
      createdAt: new Date(),
    }
  }

  // Mock data cho thống kê khách hàng - thông tin nhà hàng
  const customerStats = {
    totalReservations: 24,
    completedOrders: 186,
    totalSpent: 12850000,
    favoriteRestaurant: "Waddles",
    memberSince: "2024",
    loyaltyPoints: 2450,
    lastVisit: "2024-08-20",
    averageOrderValue: 385000
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-08-20", restaurant: "Waddles", total: 450000, status: "Completed" },
    { id: "ORD-002", date: "2024-08-18", restaurant: "Waddles", total: 320000, status: "Completed" },
    { id: "ORD-003", date: "2024-08-15", restaurant: "Waddles", total: 680000, status: "Completed" }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
                <p className="text-muted-foreground">
                  Quản lý thông tin tài khoản của bạn
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                {/*<UserMenu user={user} />*/}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={"/logo/icon.png"!}
                        alt={"Japtor Channel"!}
                      />
                      <AvatarFallback className="text-2xl">
                        {"Japtor Channel"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{"Japtor Channel"}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">Pro</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Chỉnh sửa hồ sơ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Đổi mật khẩu
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Thông tin cá nhân
                  </CardTitle>
                  <CardDescription>
                    Thông tin cơ bản về tài khoản của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Họ và tên
                      </label>
                      <p className="text-sm">{"Japtor Channel"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <p className="text-sm flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        {"japtor@gorth.org"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Số điện thoại
                      </label>
                      <p className="text-sm flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        {"Chưa cập nhật"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Ngày tạo tài khoản
                      </label>
                      <p className="text-sm flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date().toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Thông tin tài khoản
                  </CardTitle>
                  <CardDescription>
                    Chi tiết về tài khoản và bảo mật
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        ID người dùng
                      </label>
                      <p className="text-sm font-mono break-all">
                        {"112234234324123123"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Trạng thái email
                      </label>
                      <p className="text-sm">
                        <Badge variant={2 > 1 ? "default" : "secondary"}>
                          {2 > 1 ? "Đã xác thực" : "Chưa xác thực"}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Lần đăng nhập cuối
                      </label>
                      <p className="text-sm">
                        {2 > 3
                          ? new Date().toLocaleString('vi-VN')
                          : "Chưa có"
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Vai trò
                      </label>
                      <p className="text-sm">
                        <Badge variant="secondary">Khách hàng</Badge>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Tùy chọn
                  </CardTitle>
                  <CardDescription>
                    Cài đặt cá nhân và thông báo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Nhận thông báo email</p>
                        <p className="text-xs text-muted-foreground">
                          Nhận thông báo về đơn hàng và cập nhật
                        </p>
                      </div>
                      <Badge variant="default">Bật</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Nhận tin tức</p>
                        <p className="text-xs text-muted-foreground">
                          Nhận email về sản phẩm và dịch vụ mới
                        </p>
                      </div>
                      <Badge variant="secondary">Tắt</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 gap-6">
        {/* Left Column - About User and Restaurant Activity */}
        <div className="xl:col-span-4 lg:col-span-5 md:col-span-5 space-y-6">
          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground">Giới thiệu</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Họ và tên:</span>
                  <span>{user?.fullName}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Trạng thái:</span>
                  <span>Khách hàng VIP</span>
                </li>
                <li className="flex items-center">
                  <Crown className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Hạng thành viên:</span>
                  <span>Gold Member</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium mx-2">Điểm tích lũy:</span>
                  <span>{customerStats.loyaltyPoints.toLocaleString()} điểm</span>
                </li>
              </ul>

              <p className="text-xs uppercase text-muted-foreground mt-6">Liên hệ</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Số điện thoại:</span>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Tên người dùng:</span>
                  <span>{user?.username}</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Email:</span>
                  <span>{user?.emailAddresses[0].emailAddress}</span>
                </li>
              </ul>

              <p className="text-xs uppercase text-muted-foreground mt-6">Hoạt động nhà hàng</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <UtensilsCrossed className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Số lần đặt bàn:</span>
                  <span>{customerStats.totalReservations} lần</span>
                </li>
                <li className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Đơn hàng hoàn thành:</span>
                  <span>{customerStats.completedOrders} đơn</span>
                </li>
                <li className="flex items-center">
                  <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium mx-2">Tổng chi tiêu:</span>
                  <span>{customerStats.totalSpent.toLocaleString('vi-VN')} VND</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Lần cuối ghé thăm:</span>
                  <span>{customerStats.lastVisit}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground">Thống kê chi tiêu</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium mx-2">Giá trị đơn hàng TB:</span>
                  <span>{customerStats.averageOrderValue.toLocaleString('vi-VN')} VND</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Nhà hàng yêu thích:</span>
                  <span>{customerStats.favoriteRestaurant}</span>
                </li>
                <li className="flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium mx-2">Thành viên từ:</span>
                  <span>{customerStats.memberSince}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order History and Restaurant Activity */}
        <div className="xl:col-span-8 lg:col-span-7 md:col-span-7">
          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground mb-4">Lịch sử đơn hàng gần đây</p>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {order.total.toLocaleString('vi-VN')} VND
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Xem tất cả lịch sử đơn hàng
                </Button>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase text-muted-foreground mb-4">Thao tác nhanh</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col">
                    <UtensilsCrossed className="h-6 w-6 mb-1" />
                    <span className="text-sm">Đặt bàn</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <ShoppingBag className="h-6 w-6 mb-1" />
                    <span className="text-sm">Đặt món</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Star className="h-6 w-6 mb-1" />
                    <span className="text-sm">Đánh giá</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Award className="h-6 w-6 mb-1" />
                    <span className="text-sm">Ưu đãi</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
