"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/element/badge"
import { Star, Heart, ShoppingCart, Clock, Flame } from "lucide-react"
import { MenuItemDataColumn } from "@/lib/interfaces"
import { formatCurrency } from "@/lib/utils/formatters"
import { cn } from "@/lib/utils"

interface MenuItemCardProps {
  item: MenuItemDataColumn
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const router = useRouter()
  // Chuyển đổi giá từ Decimal/String sang Number an toàn
  const priceValue = typeof item.price === "string" ? parseFloat(item.price) : Number(item.price)
  const handleNavigate = () => router.push(`/menu/item/${item.id}`)

  return (
    <Card
      className={cn(
        "group overflow-hidden border-none shadow-sm transition-all duration-300 ease-in-out pt-0",
        "hover:ring-1 hover:ring-professional-main cursor-pointer" // hover:-translate-y-1 hover:shadow-xl
      )}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleNavigate()
        }
      }}
    >
      {/* Image Section */}
      <CardHeader className="relative aspect-[4/3] overflow-hidden bg-muted">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-108"
          />
        ) : (
          <Image
            src={"/element/1.png"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {/*<div className="flex h-full w-full items-center justify-center bg-secondary/30">*/}
        {/*  <Utensils className="h-12 w-12 text-muted-foreground/40" />*/}
        {/*</div>*/}
        {/* Badges Overlay */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {item.isFeatured && (
            <Badge className="bg-professional-main hover:bg-professional-sub">
              <Star className="h-4 w-4 fill-current" /> Phổ biến
            </Badge>
          )}
          {!item.isAvailable && (
            <Badge variant="destructive">Hết món</Badge>
          )}
        </div>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 h-6 w-6 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-90 bg-foreground/90 backdrop-blur-sm cursor-pointer"
          onClick={(event) => event.stopPropagation()}
        >
          <Heart className="h-4 w-4 text-professional-main" />
        </Button>
      </CardHeader>

      <CardContent className="px-6">
        {/* Category & Availability */}
        {/*<div className="mb-1 flex items-center justify-between">*/}
        {/*  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">*/}
        {/*    {item.category?.name || "Món chính"}*/}
        {/*  </span>*/}
        {/*  <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">*/}
        {/*    <Star className="h-3 w-3 fill-current" />*/}
        {/*    <span>4.8</span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Name & Description */}
        <div className="mb-1 flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg font-bold group-hover:text-primary transition-colors">
            {item.name}
          </CardTitle>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {item.category?.name || "Món chính"}
          </span>
        </div>

        {/* Description: 1 line truncate */}
        <p className="line-clamp-1 text-sm text-muted-foreground mb-4 italic">
          {item.description || "Hương vị truyền thống thơm ngon khó cưỡng..."}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{item.preparationTime || 15} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              <span>{item.calories || 0} kcal</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-professional-warning">
            <Star className="h-4 w-4 fill-current" />
            <span>4.8</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        {/* Price & Action */}
        <div className="flex flex-col">
          {/*<span className="text-xs text-muted-foreground leading-none mb-1">Giá từ</span>*/}
          <span className="text-professional-danger line-through leading-none mb-1">
            {formatCurrency({ value: "100000", currency: "VND" })}
          </span>
          <span className="text-xl font-extrabold text-primary">
            {formatCurrency({ value: priceValue, currency: "VND" })}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 font-medium"
            onClick={(event) => {
              event.stopPropagation()
              handleNavigate()
            }}
          >
            Chi tiet
          </Button>

          <Button
            size="icon"
            className="cursor-pointer"
            disabled={!item.isAvailable}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
