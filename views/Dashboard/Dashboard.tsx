"use client"

import { useState } from "react"
import Sidebar from "@/components/appLayout/AppSidebar"
import TopNav from "@/components/appLayout/AppHeader"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Sidebar closed by default

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-white">
          
        </main>
      </div>
    </div>
  )
}