"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import Button from "@/components/formField/Button" // Your custom Button
import InputField from "@/components/formField/InputField" // Your custom Input
import SelectField from "@/components/formField/SelectField" // Your custom Select
import DatePicker from "@/components/formField/DatePicker" // Your custom DatePicker

interface EmployeeModalProps {
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  description?: string
  showFooter?: boolean
  submitLabel?: string
  onSubmit?: () => Promise<void> | void // Updated to support async
  size?: "sm" | "md" | "lg" | "xl"
  isLoading?: boolean
  disableSubmit?: boolean
  formId?: string // For form submission
  error?: string // For displaying backend errors
}

const sizeClasses = {
  sm: "max-w-[500px]",
  md: "max-w-[700px]",
  lg: "max-w-[900px]",
  xl: "max-w-[1100px]",
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
  isLoading = false,
  disableSubmit = false,
  formId,
  error,
}: EmployeeModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit()
    } catch (err) {
      // Error handling is managed by your custom components
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`w-[95%] ${sizeClasses[size]} rounded-lg shadow-lg`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto'
        }}
      >
        <DialogHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            <DialogClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} id={formId} className="flex flex-col h-full">
          <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {children}
            
            {/* Backend error display */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}
          </div>

          {showFooter && (
            <div className="p-4 border-t sticky bottom-0 bg-background flex justify-end gap-3">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type={formId ? "submit" : "button"}
                onClick={!formId ? handleSubmit : undefined}
                disabled={disableSubmit || isLoading}
                loading={isLoading}
              >
                {submitLabel}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}