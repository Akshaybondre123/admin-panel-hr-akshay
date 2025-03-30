"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Mail, Phone, MapPin, Calendar, User, Briefcase, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AppHeader from "@/components/appLayout/AppHeader"
import AppSidebar from "@/components/appLayout/AppSidebar"

type TeamMember = {
  name: string
  role: string
  avatar: string
}

type EmergencyContact = {
  name: string
  relation: string
  phone: string
}

type Employee = {
  id: number
  name: string
  email: string
  mobile: string
  reportingTo: string
  status: string
  avatar: string
  role: string
  employeeId: string
  dateOfJoining: string
  department: string
  location: string
  gender: string
  dateOfBirth: string
  maritalStatus: string
  bloodGroup: string
  address: string
  emergencyContact: EmergencyContact
  reportingManager: TeamMember
  team: TeamMember[]
}

export default function EmployeeDetailView({ employee }: { employee: Employee }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
      <AppHeader 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Aaand Tiwari Overview"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6">
        

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="bank">Bank & Statutory</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-0">
              <div className="flex gap-6">
                {/* Left Column - 60% width for all cards */}
                <div className="w-[90%] space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{employee.name}</h3>
                          <p className="text-muted-foreground">{employee.role}</p>
                          <p className="text-sm">Employee ID: {employee.employeeId}</p>
                          <Badge variant={employee.status === "Active" ? "success" : "destructive"} className="mt-1">
                            {employee.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Mobile</p>
                            <p className="text-sm text-muted-foreground">{employee.mobile}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Gender</p>
                            <p className="text-sm text-muted-foreground">{employee.gender}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Date of Birth</p>
                            <p className="text-sm text-muted-foreground">{employee.dateOfBirth}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Marital Status</p>
                            <p className="text-sm text-muted-foreground">{employee.maritalStatus}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Blood Group</p>
                            <p className="text-sm text-muted-foreground">{employee.bloodGroup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">{employee.address}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Professional Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Briefcase className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Department</p>
                            <p className="text-sm text-muted-foreground">{employee.department}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Joining Date</p>
                            <p className="text-sm text-muted-foreground">{employee.dateOfJoining}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Employee Email</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">{employee.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - 40% width for Team Hierarchy */}
                <div className="w-[40%]">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle>Team Hierarchy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Reporting To</h4>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.reportingManager.avatar} alt={employee.reportingManager.name} />
                              <AvatarFallback>{employee.reportingManager.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{employee.reportingManager.name}</p>
                              <p className="text-xs text-muted-foreground">{employee.reportingManager.role}</p>
                            </div>
                          </div>
                        </div>

                        {employee.team.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Reporting Team</h4>
                            <div className="space-y-3">
                              {employee.team.map((member, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{employee.emergencyContact.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Relationship</p>
                        <p className="text-sm text-muted-foreground">{employee.emergencyContact.relation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{employee.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No documents available.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bank" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Bank & Statutory Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No bank details available.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No assets assigned.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}