import React, { ComponentProps } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HeartPulse, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/element/badge";
import { formatCurrency } from "@/lib/utils/formatters";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export function CartNavItem() { }

type CartItemProps = {
  name: string;
  imageUrl: string;
  quantity: number;
  total: string;
  meta?: string;
  note?: string | null;
  checked?: boolean;
  ariaLabel?: string;
  onToggle?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  variant?: "compact" | "full";
  className?: string;
};

export function CartItem({
  name,
  imageUrl,
  quantity,
  total,
  meta,
  note,
  checked,
  ariaLabel,
  onToggle,
  onIncrease,
  onDecrease,
  onRemove,
  variant = "compact",
  className
}: CartItemProps) {
  const isFull = variant === "full";
  const canDecrease = Boolean(onDecrease);
  const canIncrease = Boolean(onIncrease);
  const buttonClassName = isFull ? "h-9 w-9" : "h-5 w-5 size-5 rounded";
  const iconClassName = isFull ? "h-4 w-4" : "h-3 w-3 size-3";
  const imageSize = variant === "full" ? 96 : 64;
  const boxSize = variant === "full" ? "size-24" : "size-16";

  return (
    <div className={cn("flex gap-3", className)}>
      {onToggle ? (
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          aria-label={ariaLabel ?? "Chọn món"}
          className="w-4.5 h-4.5 self-center"
        />
      ) : null}
      <div className={cn(boxSize, "shrink-0 overflow-hidden rounded-lg bg-slate-100")}>
        <Image className="w-full h-full object-cover" alt={name} src={imageUrl!} width={imageSize} height={imageSize} />
      </div>
      <div className={cn(
        "min-w-0 flex-1 flex flex-col justify-between",
        isFull ? "min-h-24" : "min-h-16"
      )}>
        <div className={cn("flex items-start justify-between gap-3", !isFull && "items-center")}
        >
          <div className="min-w-0">
            <h4 className={cn("truncate font-bold", isFull ? "text-lg" : "text-xs")}>{name}</h4>
            {meta ? (
              <p className={cn("mb-2 text-muted-foreground", isFull ? "text-sm" : "text-[10px]")}>{meta}</p>
            ) : null}
            {note ? (
              <p className="text-xs text-muted-foreground">Ghi chú: {note}</p>
            ) : null}
          </div>
          <div className={cn("text-right", !isFull && "text-primary")}>
            <p className={cn("font-semibold", isFull ? "text-xl" : "text-sm")}>{total}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center border border-border overflow-hidden", isFull ? "rounded-md" : "rounded")}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(buttonClassName, !canDecrease && "cursor-not-allowed opacity-60")}
              disabled={!canDecrease}
              onClick={onDecrease}
            >
              <Minus className={iconClassName} />
            </Button>
            <span className={cn("flex text-center justify-center items-center font-bold", isFull ? "min-w-9 h-9  rounded-md font-medium" : "min-w-5 h-5 text-xs")}>
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className={cn(buttonClassName, !canIncrease && "cursor-not-allowed opacity-60")}
              disabled={!canIncrease}
              onClick={onIncrease}
            >
              <Plus className={iconClassName} />
            </Button>
          </div>
          {onRemove && isFull ? (
            <Button
              variant="ghost"
              size="icon"
              className={cn("mt-1 text-muted-foreground hover:text-destructive", buttonClassName)}
              onClick={onRemove}
            >
              <Trash2 className={iconClassName} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CartCanvas({
  className,
  ...props
}: ComponentProps<"span"> & {
  className?: string
}) {
  const items = [
    {
      id: "salmon-sour-soup",
      name: "Combo Canh Chua Cá Hồi",
      meta: "Sơ chế sẵn • 850g",
      imageUrl:
        "/element/1.png",
      qty: 1,
      unitPrice: 155000
    },
    {
      id: "broccoli",
      name: "Súp lơ xanh Đà Lạt",
      meta: "Hữu cơ • 300g",
      imageUrl:
        "/element/2.png",
      qty: 2,
      unitPrice: 24000
    }
  ];
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  return (
    <>
      <span className={cn("", className)} {...props}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {99}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader className="pb-0">
              <SheetTitle className="flex justify-between items-center">
                Giỏ hàng
                <Badge className="ml-2">{items.length} món</Badge>
              </SheetTitle>
              <SheetDescription className="flex justify-between items-center">
                Chi tiết giỏ hàng
                <Link href="/cart" className="ml-2 text-sm font-medium text-primary hover:underline">
                  Xem tất cả
                </Link>
              </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="flex h-full flex-col">
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    meta={item.meta}
                    quantity={item.qty}
                    total={formatCurrency({ value: item.qty * item.unitPrice })}
                  />
                ))}
              </div>
            </div>
            <Separator />
            <SheetFooter className="space-y-4 p-4 pt-0">
              <Card className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <HeartPulse className="text-primary" size={18} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Ước tính năng lượng
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Tổng Calo dự kiến:</span>
                    <span className="font-bold text-primary">1,150 kcal</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full bg-primary" style={{ width: "45%" }} />
                  </div>
                  <p className="text-center text-[9px] italic text-slate-400">
                    Tương đương 4 khẩu phần ăn tiêu chuẩn
                  </p>
                </div>
              </Card>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Tạm tính:</span>
                  <span>{formatCurrency({ value: subtotal })}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Phí giao hàng:</span>
                  <span className="text-green-500">Miễn phí</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold dark:border-slate-700">
                  <span>Tổng thanh toán:</span>
                  <span className="text-primary">{formatCurrency({ value: subtotal })}</span>
                </div>
              </div>

              <Button className="w-full font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                Thanh toán ngay
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </span>
    </>
  );
}

export function CartButton() {
  const router = useRouter()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
              {99}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Giỏ hàng</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[360px] overflow-auto">
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Message</span>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Message</span>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Message</span>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Message</span>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
            </DropdownMenuItem>
            {/* Add more notification items */}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-9" onClick={() => router.push("/cart")}>
            Xem tất cả
            <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
