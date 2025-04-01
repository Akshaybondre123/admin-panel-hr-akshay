"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
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
        return "max-w-[700px]"
      default:
        return "max-w-[550px]"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`w-[90%] ${getMaxWidth()} rounded-lg shadow-lg overflow-y-auto max-h-[85vh]`}>
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-4">{children}</div>

        {showFooter && (
          <DialogFooter className="p-4 border-t">
            <Button type="button" onClick={onSubmit}>
              {submitLabel}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

