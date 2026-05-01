"use client"

import React from "react"
import { Building2, MapPin, Package } from "lucide-react"
import { Badge } from "@/components/element/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils/formatters"
import { getRestaurantStatusLabel, getRestaurantStatusVariant } from "@/lib/utils/renderers"
import { InventoryItem, OrganizationShortly, Restaurant } from "@/lib/interfaces"

export interface SearchRestaurantDataColumn extends Restaurant {
	organization: OrganizationShortly
}

export interface SearchIngredientDataColumn extends InventoryItem {
	organization: OrganizationShortly
}

export function SearchRestaurantList({ data }: { data: SearchRestaurantDataColumn[] }) {
  if (!data.length) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-lg border bg-background p-8 text-center">
        <Building2 className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-semibold">Không có nhà hàng</h3>
        <p className="text-sm text-muted-foreground">Thử tìm kiếm với từ khoá khác.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {data.map((restaurant, index) => {
        const key = restaurant.id || `restaurant-${index}`
        const name = restaurant.name || "Nhà hàng"
        const description = restaurant.description || "Chưa có mô tả"
        const organizationName = restaurant.organization?.name || "Tổ chức chưa xác định"

        return (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base">{name}</CardTitle>
                  <CardDescription className="mt-1">{organizationName}</CardDescription>
                </div>
                <Badge variant={getRestaurantStatusVariant(restaurant.status)}>
                  {getRestaurantStatusLabel(restaurant.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{restaurant.address || "Chưa có địa chỉ"}</span>
              </div>
              <p className="text-sm text-foreground">{description}</p>
              {restaurant.code ? (
                <p className="text-xs text-muted-foreground">Mã: {restaurant.code}</p>
              ) : null}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function SearchIngredientList({ data }: { data: SearchIngredientDataColumn[] }) {
  if (!data.length) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-lg border bg-background p-8 text-center">
        <Package className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-semibold">Không có nguyên liệu</h3>
        <p className="text-sm text-muted-foreground">Thử tìm kiếm với từ khoá khác.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {data.map((ingredient, index) => {
        const key = ingredient.id || `ingredient-${index}`
        const unitCost = formatCurrency({ value: ingredient.unitCost ?? 0, currency: "VND" })

        return (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base">{ingredient.name || "Nguyên liệu"}</CardTitle>
                  <CardDescription className="mt-1">
                    {ingredient.organization?.name || "Tổ chức chưa xác định"}
                  </CardDescription>
                </div>
                <Badge variant={ingredient.isActive === false ? "secondary" : "default"}>
                  {ingredient.isActive === false ? "Tạm ngưng" : "Đang dùng"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-foreground">{ingredient.description || "Chưa có mô tả"}</p>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Đơn vị: {ingredient.unit || "-"}</span>
                <span className="font-semibold text-primary">{unitCost}</span>
              </div>
              {ingredient.sku ? (
                <p className="text-xs text-muted-foreground">SKU: {ingredient.sku}</p>
              ) : null}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}