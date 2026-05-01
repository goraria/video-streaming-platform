"use client";

import Link from "next/link";
import { MapPin, Phone, Store } from "lucide-react";
import { Restaurant, RestaurantStatus } from "@/lib/interfaces";
import { getRestaurantStatusLabel } from "@/lib/utils/renderers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RestaurantCardItemProps {
  restaurant: Restaurant;
}

export function RestaurantCardItem({ restaurant }: RestaurantCardItemProps) {
  const coverImage = restaurant.coverUrl || restaurant.logoUrl || "/logo/logo.png";
  const status = restaurant.status ?? RestaurantStatus.inactive;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden border-b bg-muted">
        <img
          src={coverImage}
          alt={restaurant.name || "Nhà hàng"}
          className="h-full w-full object-cover"
        />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-1 text-lg">{restaurant.name || "Nhà hàng"}</CardTitle>
          <Badge variant={status === RestaurantStatus.active ? "default" : "secondary"}>
            {getRestaurantStatusLabel(status, "Không xác định")}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {restaurant.description || "Không có mô tả cho nhà hàng này."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="line-clamp-2">{restaurant.address || "Chưa cập nhật địa chỉ"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0" />
          <span>{restaurant.phoneNumber || "Chưa cập nhật số điện thoại"}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/restaurant/${restaurant.id}`}>
            <Store className="mr-2 h-4 w-4" />
            Xem chi tiết
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
