"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export interface ConfirmDialogProps {
  trigger?: ReactNode;
  showTrigger?: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => Promise<void> | void;
};

export function ConfirmDialog({
  trigger,
  showTrigger = true,
  title = "Xoá mục này?",
  description = "Hành động này không thể hoàn tác.",
  confirmText = "Xoá",
  cancelText = "Huỷ",
  disabled = false,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isControlled = open !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;

  const setDialogOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm?.();
      setDialogOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {showTrigger && (
        <AlertDialogTrigger asChild>
          {trigger ? (
            trigger
          ) : (
            <Button
              type="button"
              variant="destructive"
              disabled={disabled}
            >
              {confirmText}
            </Button>
          )}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading || disabled}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              className="bg-destructive"
              onClick={handleConfirm}
              disabled={loading || disabled}
            >
              {loading ? "Đang xử lý..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
