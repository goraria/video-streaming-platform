"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowLeft, Package } from "lucide-react"
import { Badge } from "@/components/element/badge"
import { DataTable } from "@/components/element/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  PurchaseOrderDataColumn,
  PurchaseOrderItemDataColumn,
  PurchaseOrderStatus,
  SupplierStatus,
  InventoryUnit,
  UserRole,
} from "@/lib/interfaces"
import { formatCurrency, formatDateTime } from "@/lib/utils/formatters"
import { getInventoryUnitLabel, getPurchaseOrderStatusColor, getPurchaseOrderStatusLabel } from "@/lib/utils/renderers"
import { useGetPurchaseOrdersQuery } from "@/state/api"

const fallbackOrders: PurchaseOrderDataColumn[] = [
  {
    id: "7cb9f496-f472-4424-b5e8-85dae3ebbe65",
    supplierId: "d1be46ed-97bf-4b05-83e3-11e5f4238b43",
    restaurantId: "203a8224-6a7d-4dbf-bc00-1678e39236d2",
    orderNumber: "PO-1772385976478",
    status: PurchaseOrderStatus.confirmed,
    orderDate: new Date("2026-03-01T17:26:16.478Z"),
    expectedDate: new Date("2026-03-09T17:00:00.000Z"),
    receivedDate: null,
    totalAmount: "4570000",
    notes: "Warehouse request origin: d219d000-fdb9-4248-9116-e63eb19cbb20",
    createdById: "2ed8fc55-79d6-44a2-9e4c-52b451a813e3",
    createdAt: new Date("2026-03-01T17:26:16.478Z"),
    updatedAt: new Date("2026-03-01T17:26:16.478Z"),
    supplier: {
      id: "d1be46ed-97bf-4b05-83e3-11e5f4238b43",
      name: "Einmalow",
      phone: null,
      email: null,
      status: SupplierStatus.active,
    },
    restaurant: {
      id: "203a8224-6a7d-4dbf-bc00-1678e39236d2",
      name: "Gorthenburg",
      code: "GB",
    },
    createdBy: {
      id: "2ed8fc55-79d6-44a2-9e4c-52b451a813e3",
      fullName: "Warehouse Gorthenburg",
      email: "warehouse@gorth.org",
      username: "warehouse.gorthenburg",
      role: UserRole.warehouse,
    },
    items: [
      {
        id: "6a8fc47d-6ed6-45de-a2cf-011b39e933c2",
        purchaseOrderId: "7cb9f496-f472-4424-b5e8-85dae3ebbe65",
        inventoryItemId: "54ed6e95-bbc9-4af7-9902-c9c17d3c3ee1",
        quantity: "10",
        unitPrice: "25000",
        totalPrice: "250000",
        receivedQty: "0",
        notes: null,
        inventoryItem: {
          id: "54ed6e95-bbc9-4af7-9902-c9c17d3c3ee1",
          name: "Bột gạo",
          sku: "SKU-BOT-GAO",
          unit: InventoryUnit.kg,
          unitCost: 25000,
          description: "Bột làm bánh cuốn, bánh xèo",
        },
      },
      {
        id: "22e882a3-eb18-46df-adee-5e34562fef2b",
        purchaseOrderId: "7cb9f496-f472-4424-b5e8-85dae3ebbe65",
        inventoryItemId: "31f0013c-1606-4675-9404-7f0747dbbc11",
        quantity: "18",
        unitPrice: "240000",
        totalPrice: "4320000",
        receivedQty: "0",
        notes: null,
        inventoryItem: {
          id: "31f0013c-1606-4675-9404-7f0747dbbc11",
          name: "Mực ống",
          sku: "SKU-MUC-ONG",
          unit: InventoryUnit.kg,
          unitCost: 240000,
          description: "Mực cho chả mực, mực nhồi thịt",
        },
      },
    ],
    _count: { items: 2 },
  },
]

const toNumber = (value: string | number | null | undefined) => {
  const numeric = typeof value === "string" ? Number(value) : value
  return Number.isFinite(numeric) ? Number(numeric) : 0
}

type Props = {
  id: string
  backHref: string
}

export default function PurchaseOrderDetailView({ id, backHref }: Props) {
  const { data: apiData } = useGetPurchaseOrdersQuery()

  const orders = useMemo<PurchaseOrderDataColumn[]>(() => {
    if (Array.isArray(apiData) && apiData.length > 0) return apiData as PurchaseOrderDataColumn[]
    return fallbackOrders
  }, [apiData])

  const selectedOrder = useMemo(() => orders.find((order) => order.id === id), [orders, id])

  const itemColumns: ColumnDef<PurchaseOrderItemDataColumn>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="w-4.5 h-4.5 ml-2"
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="w-4.5 h-4.5 ml-2"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Nguyên liệu",
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center">
                <Package className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate">{item.inventoryItem?.name || "Mặt hàng"}</div>
              <div className="truncate text-xs text-muted-foreground">
                {item.inventoryItem?.description || item.inventoryItem?.sku || "Không có mô tả"}
              </div>
            </div>
          </div>
        )
      },
      size: 320,
    },
    {
      id: "unit",
      header: () => <div className="flex justify-center items-center">Đơn vị</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Badge variant="outline">
            {row.original.inventoryItem?.unit ? getInventoryUnitLabel(row.original.inventoryItem.unit) : "Chưa có"}
          </Badge>
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: "quantity",
      header: () => <div className="flex justify-center items-center">Số lượng</div>,
      cell: ({ row }) => <div className="text-center">{toNumber(row.original.quantity)}</div>,
      size: 120,
    },
    {
      accessorKey: "unitPrice",
      header: () => <div className="flex justify-center items-center">Đơn giá</div>,
      cell: ({ row }) => <div className="text-right">{formatCurrency({ value: toNumber(row.original.unitPrice) })}</div>,
      size: 120,
    },
    {
      accessorKey: "totalPrice",
      header: () => <div className="flex justify-center items-center">Thành tiền</div>,
      cell: ({ row }) => <div className="text-right font-medium">{formatCurrency({ value: toNumber(row.original.totalPrice) })}</div>,
      size: 150,
    },
  ]

  if (!selectedOrder) {
    return (
      <div className="space-y-4">
        <Button asChild variant="outline" size="sm">
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Không tìm thấy đơn đặt hàng.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Chi tiết đơn - {selectedOrder.orderNumber}</CardTitle>
          <Badge variant="outline" className={getPurchaseOrderStatusColor(selectedOrder.status)}>
            {getPurchaseOrderStatusLabel(selectedOrder.status, selectedOrder.status)}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <strong>Nhà cung cấp:</strong> {selectedOrder.supplier?.name || "Nhà cung cấp"}
            </div>
            <div>
              <strong>Nhà hàng:</strong> {selectedOrder.restaurant?.name || "Nhà hàng"}
            </div>
            <div>
              <strong>Ngày đặt:</strong> {formatDateTime({ date: selectedOrder.orderDate })}
            </div>
            <div>
              <strong>Tạo bởi:</strong> {selectedOrder.createdBy?.fullName || selectedOrder.createdBy?.email || "Không rõ"}
            </div>
            <div>
              <strong>Dự kiến nhận:</strong> {selectedOrder.expectedDate ? formatDateTime({ date: selectedOrder.expectedDate }) : "-"}
            </div>
            <div>
              <strong>Ngày nhận:</strong> {selectedOrder.receivedDate ? formatDateTime({ date: selectedOrder.receivedDate }) : "-"}
            </div>
            <div>
              <strong>Tổng tiền:</strong> {formatCurrency({ value: toNumber(selectedOrder.totalAmount) })}
            </div>
            <div>
              <strong>Số mặt hàng:</strong> {selectedOrder._count?.items ?? selectedOrder.items?.length ?? 0}
            </div>
          </div>

          {selectedOrder.notes ? (
            <div className="rounded-md border bg-muted/40 p-3 text-sm">
              <strong>Ghi chú:</strong> {selectedOrder.notes}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <DataTable
        columns={itemColumns}
        data={selectedOrder.items ?? []}
        search={{ column: "name", placeholder: "Tìm kiếm mặt hàng..." }}
        max="name"
      />
    </div>
  )
}
