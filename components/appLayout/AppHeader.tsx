"use client"

import { ChevronLeft, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TopNavProps {
  onMenuClick: () => void
  title?: string // Only added this new prop
}

export default function TopNav({ onMenuClick, title = "Dashboard" }: TopNavProps) { // Added title prop with default
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px]">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5 text-gray-900" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      {/* Left arrow and Dashboard title - only changed the hardcoded text to use the title prop */}
      <div className="hidden items-center gap-2 md:flex">
        <ChevronLeft className="h-5 w-5 text-gray-900" />
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1> {/* Changed here */}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-900">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive p-0" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
          <div className="hidden text-sm md:block">
            <div className="font-medium text-gray-900">Hritik Goyal</div>
          </div>
        </div>
      </div>
    </header>
  )
}