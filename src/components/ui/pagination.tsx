import * as React from "react";
import { cn } from "@/lib/utils";

type PaginationProps = React.HTMLAttributes<HTMLElement>;

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("text-sm", className)} {...props} />;
}

export interface PaginationLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, isActive, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-sm rounded-md border transition-colors",
        isActive
          ? "bg-primary text-white border-primary"
          : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300",
        className
      )}
      {...props}
    />
  );
});
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm rounded-md border bg-white text-gray-700 hover:bg-gray-100 border-gray-300",
      className
    )}
    {...props}
  >
    ←
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm rounded-md border bg-white text-gray-700 hover:bg-gray-100 border-gray-300",
      className
    )}
    {...props}
  >
    →
  </button>
));
PaginationNext.displayName = "PaginationNext";
