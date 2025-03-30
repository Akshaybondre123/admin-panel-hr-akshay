import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    DollarSign, 
    Settings 
  } from "lucide-react"
  
  export const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Users, label: "Employees", href: "/employees" },
    { icon: Calendar, label: "Leaves", href: "/leaves" },
    { icon: DollarSign, label: "Payroll", href: "/payroll" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]