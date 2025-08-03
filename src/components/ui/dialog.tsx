import React from "react";
import * as DialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function Dialog({
  open,
  onOpenChange,
  actionComponent,
  cancelComponent,
  children,
  title,
  description,
  isFullScreen = false,
  showCloseButton = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionComponent?: React.ReactNode;
  cancelComponent?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description?: string;
  isFullScreen?: boolean;
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 z-9990" />
        <DialogPrimitive.Content
          className={cn(
            "z-9999 fixed bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            "flex flex-col",
            isFullScreen
              ? "top-1/2 left-1/2 w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-4xl rounded-lg transform -translate-x-1/2 -translate-y-1/2 p-6"
              : "top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-md p-6 rounded-lg transform -translate-x-1/2 -translate-y-1/2"
          )}
        >
          <div className="flex-1 overflow-auto">
            <div className="flex items-center justify-between">
              <DialogPrimitive.Title className="text-lg font-medium text-gray-900">
                {title}
              </DialogPrimitive.Title>
              {showCloseButton && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="ml-4 text-gray-500 hover:text-black cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {description && (
              <DialogPrimitive.Description className="mt-2 text-sm text-gray-500">
                {description}
              </DialogPrimitive.Description>
            )}
            <div className="mt-4">{children}</div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            {cancelComponent && (
              <DialogPrimitive.Cancel asChild>
                {cancelComponent}
              </DialogPrimitive.Cancel>
            )}
            {actionComponent && (
              <DialogPrimitive.Action asChild>
                {actionComponent}
              </DialogPrimitive.Action>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default Dialog;
