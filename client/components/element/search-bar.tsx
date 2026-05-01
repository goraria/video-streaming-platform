"use client"

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/element/badge";
import { Search, History, FileText, User, Settings, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarHolderProps {
  placeholder?: string;
  onPress?: () => void;
}

export function SearchMarket({
  placeholder,
  onPress
}: SearchBarHolderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const q = searchQuery.trim();
    router.push(`/result?q=${encodeURIComponent(q)}`);
    onPress?.();
  };

  return (
    <>
      <form
        className="flex-1 relative bg-white rounded-lg"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}>
        <Search
          className="absolute left-4.5 top-4.5 size-4 z-10  text-muted-foreground"
        />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="h-13 pl-12 pr-37 text-black border-muted-foreground rounded-lg"
        />
        <div className="absolute right-2 top-2 h-9 bg-primary rounded-md items-center justify-center">
          <Button
            onClick={handleSearch}
            variant="default"
            type="submit"
            className="hover:bg-primary/90 font-bold transition-all shadow-lg shadow-primary/25 active:scale-95">
            Tìm kiếm
          </Button>
        </div>
      </form>
    </>
  )
}


// export function SearchBar({
//   ref,
//   placeholder,
//   value,
//   onChangeText,
//   keyType = "search",
//   disabled = false,
//   onSearchPress,
//   ...props
// }: SearchBarProps) {
//   return (
//     <div className="flex-1 relative">
//       <Search
//         className="absolute left-2.5 top-2.5 size-4 z-10 text-muted-foreground"
//       />
//       <Input
//         ref={ref}
//         placeholder={placeholder}
//         value={value}
//         onChange={() => onChangeText}
//         className={`h-9 pl-8 border-muted-foreground ${onSearchPress ? 'pr-12' : ''}`}
//         // editable={!disabled}
//       />
//       {onSearchPress && (
//         <div
//           onClick={onSearchPress}
//           className="absolute right-1 top-1 h-7 w-7 bg-primary rounded-md items-center justify-center"
//           activeOpacity={0.7}
//         >
//           <Search
//             className="size-4 text-primary-foreground"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

export function SearchBarHolder({
  placeholder = "Tìm kiếm...",
  onPress
}: SearchBarHolderProps) {
  return (
    <div
      className="flex-1 opacity-[0.7]"
      // onPress={onPress}
      // activeOpacity={0.7}
    >
      <div className="h-9 relative justify-center rounded-md border border-muted-foreground">
        <Search
          className="absolute left-2.5 top-2.5 size-4 text-muted-foreground"
        />
        <span className="pl-8 text-muted-foreground text-sm">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

// Demo data
type LinkItem = { label: string; href: string; icon?: React.ElementType; meta?: string };
const RECENT: LinkItem[] = [
  { label: "Đơn hàng #SO-10234", href: "/orders/so-10234", icon: History, meta: "1 giờ trước" },
  { label: "Bài viết: Mẹo SEO 2025", href: "/blog/seo-2025", icon: History, meta: "Hôm qua" },
];

const PAGES: LinkItem[] = [
  { label: "Bảng điều khiển", href: "/dashboard", icon: FileText },
  { label: "Sản phẩm", href: "/products", icon: ShoppingCart },
  { label: "Cài đặt", href: "/setting", icon: Settings },
];

const USERS: LinkItem[] = [
  { label: "Nguyễn Văn A", href: "/users/1", icon: User },
  { label: "Trần Thị B", href: "/users/2", icon: User },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  // Debounce gõ phím cho mượt
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 120);
    return () => clearTimeout(t);
  }, [query]);

  // Shortcut Ctrl/⌘ + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const filtered = useMemo(() => {
    const all = [
      { heading: "Gần đây", items: RECENT },
      { heading: "Trang", items: PAGES },
      { heading: "Người dùng", items: USERS },
    ];
    if (!debounced) return all;
    const match = (s: string) => s.toLowerCase().includes(debounced);
    return [
      {
        heading: "Kết quả",
        items: [...RECENT, ...PAGES, ...USERS].filter((i) => match(i.label)),
      },
    ];
  }, [debounced]);

  const handleSelect = (href: string) => {
    const external = /^https?:\/\//.test(href);
    if (external) window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-0 p-0 overflow-hidden",
          "sm:max-w-2xl sm:rounded-lg"
        )}
      >
        <DialogHeader className="p-1.5 pr-8">
          <DialogTitle className="sr-only">Tìm kiếm</DialogTitle>

          {/* Thanh tìm kiếm */}
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              type="search"
              placeholder="Search..."
              className="w-full pl-8 !bg-transparent shadow-none !border-none focus-visible:ring-0"
              // className="w-[200px] pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* hint phím tắt */}
            <div className="hidden md:flex items-center gap-1 absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> <span>+</span> <Kbd>K</Kbd>
            </div>
          </div>
        </DialogHeader>
        <Separator className="" />
        {/* Kết quả */}
        <ScrollArea
          className="h-[36vh] px-4 py-0"
          // className="max-h-[36vh]"
        >
          <div className="py-4">
            {filtered.map((sec, i) => (
              <div key={sec.heading + i} className="">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  {sec.heading}
                </div>
                <ul className="">
                  {sec.items.length === 0 && (
                    <li className="px-2 py-6 text-sm text-muted-foreground">Không tìm thấy kết quả.</li>
                  )}
                  {sec.items.map((it) => (
                    <li key={it.href}>
                      <button
                        onClick={() => handleSelect(it.href)}
                        className={cn(
                          "w-full px-2 py-2 rounded-md text-left text-sm",
                          "flex items-center gap-2",
                          "hover:bg-accent hover:text-accent-foreground transition-colors"
                        )}
                      >
                        {it.icon ? <it.icon className="h-4 w-4 text-muted-foreground" /> : null}
                        <span className="flex-1">{it.label}</span>
                        {it.meta ? <span className="text-xs text-muted-foreground">{it.meta}</span> : null}
                      </button>
                    </li>
                  ))}
                </ul>
                {i < filtered.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <DialogFooter className="flex items-center justify-between border-t p-2.5 text-xs text-muted-foreground">
          <span>Gõ để tìm • ↑↓ để chọn • Enter để mở</span>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Kbd>Esc</Kbd><span>đóng</span>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="secondary"
      className=""
      // className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium border-border text-foreground/80"
    >
      <kbd>
        {children}
      </kbd>
    </Badge>
  );
}
