import Link from "next/link"
import { LayoutDashboard, Users, Calendar, DollarSign, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Footer from "@/components/appLayout/AppFooter" 

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
    { icon: Users, label: "Employees", href: "/employees" },
    { icon: Calendar, label: "Leaves", href: "/leaves" },
    { icon: DollarSign, label: "Payroll", href: "/payroll" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/Logo.png" 
            alt="Company Logo"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
        </Link>
      </div>

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

      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
        
       
        <div className="mt-4 pl-0">  
  <Footer />
</div>
      </div>
    </aside>
  )
}