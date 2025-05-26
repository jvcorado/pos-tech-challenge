import React from "react";
import * as DialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

function Dialog({
  open,
  onOpenChange,
  actionComponent,
  cancelComponent,
  children,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionComponent?: React.ReactNode;
  cancelComponent?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}> 
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30" />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          )}
        >
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="text-lg font-medium text-gray-900">
              {title}
            </DialogPrimitive.Title>
          </div>
          {description && (
            <DialogPrimitive.Description className="mt-2 text-sm text-gray-500">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          <div className="flex items-center justify-between mt-4">
            {cancelComponent && (
              <DialogPrimitive.Cancel asChild>
                {cancelComponent}
              </DialogPrimitive.Cancel>
            )}
            {actionComponent && (
              <DialogPrimitive.Action asChild>{actionComponent}</DialogPrimitive.Action>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export default Dialog;
