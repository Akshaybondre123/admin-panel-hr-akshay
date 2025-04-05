"use client"

import { useState } from "react"
import Image from "next/image"
import { MoreVertical, Eye, EyeOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-0 md:gap-32">
      {/* Login Section */}
      <div className="w-full max-w-md rounded-lg p-8 md:ml-[-20px] mt-8 md:mt-[-30px]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-48 mb-4">
            <Image
              src="./Logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="w-full h-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Login to your Account</h1>
          <p className="text-sm text-gray-600 text-center mt-1">Please fill out the following fields to login</p>
        </div>

        <form className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-sm text-gray-700">
              Email
            </Label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm text-gray-700">
              Password
            </Label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium text-gray-700">
              Remember Me
            </label>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-md">Login to your Account</Button>
        </form>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-md mt-20 md:mt-12 relative h-[500px] hidden md:block translate-y-5 -translate-x-5">
      <Card className="p-5 rounded-xl shadow-md bg-black text-white absolute left-4 right-4 top-20 z-0 h-[200px] max-w-[90%] mx-auto">
          <div className="space-y-1">
            <h3 className="font-medium text-white">Total Income</h3>
            <p className="text-gray-400 text-sm">2,635 Successful deals</p>
          </div>
          <div className="flex items-center mt-4">
            <div className="text-2xl font-bold">$256,860</div>
            <div className="ml-2 text-green-400 text-sm">+2.31%</div>
          </div>
          <div className="text-gray-400 text-xs mt-8">Profit is Taken • $236,123 (-20% fees)</div>
          </Card>

        <Card className="p-4 rounded-xl shadow-md bg-white absolute right-0 top-0 z-10 w-3/4 max-w-[250px] translate-x-3 -translate-y-7">
        <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700 font-semibold">10:00 - 07:30</div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={16} />
            </Button>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-1">Promotional Employee</h3>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={`Employee ${i}`}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="bg-black text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium">
              +10
            </div>
          </div>
        </Card>

        <Card className="p-4 rounded-xl shadow-md bg-white absolute left-0 bottom-28 z-10 w-3/4 max-w-[270px] md:-left-36 translate-x-3">
        <div className="relative flex justify-between items-end h-32">
    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
      const heights = [25, 20, 60, 45, 25, 20, 15];
      return (
        <div key={day} className="flex flex-col items-center relative">
          <span className="text-xs text-gray-500 absolute -top-6 left-0">{day}</span>
          <div className="w-6 bg-gray-800 rounded-md" style={{ height: `${heights[i]}px` }} />
        </div>
      );
    })}
  </div>
</Card>

      </div>

      <p className="text-xs text-gray-500 absolute bottom-4 right-0 left-0 md:right-1/3 md:left-auto md:ml-12 text-center max-w-xs mx-auto md:mx-0">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
        layouts and visual mockups.
      </p>
    </div>
  )
}

