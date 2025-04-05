"use client"

import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface EmployeeModalProps {
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  description?: string
  showFooter?: boolean
  submitLabel?: string
  onSubmit?: () => void
  size?: "sm" | "md" | "lg"
}

export function EmployeeModal({
  title,
  isOpen,
  onOpenChange,
  children,
  description,
  showFooter = true,
  submitLabel = "Submit",
  onSubmit = () => {},
  size = "md",
}: EmployeeModalProps) {
  const getMaxWidth = () => {
    switch (size) {
      case "sm":
        return "max-w-[400px]"
      case "lg":
        return "max-w-[950px]"
      default:
        return "max-w-[900px]"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`!w-full ${getMaxWidth()} mt-[-40px] rounded-lg shadow-lg overflow-y-auto`}
      >
        <DialogHeader className="p-1 border-b">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>

        <div className="p-4">{children}</div>

        {showFooter && (
          <DialogFooter className="-mt-10 border-t pt-2 flex justify-start space-x-2 !justify-start">
            <Button type="button" onClick={onSubmit}>
              {submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
