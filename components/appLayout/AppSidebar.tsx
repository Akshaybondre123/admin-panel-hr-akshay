"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Calendar, DollarSign, Settings, LogOut, Car, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Footer from "@/components/appLayout/AppFooter"
import { navItems } from "../../constant" // Import from constants file

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter()
  const handleLogout = () => {
    
    router.push("/login")
  }
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen w-56 flex-col border-r bg-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:h-full md:translate-x-0"
      )}
    >
      {/* Logo Header */}
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/Logo.png" 
            alt="Company Logo"
            width={28}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Navigation Items - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                item.active 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Fixed Position */}
      <div className="shrink-0 border-t bg-white p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50" onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
        
        <div className="mt-4">
          <Footer />
        </div>
      </div>
    </aside>
  )
}