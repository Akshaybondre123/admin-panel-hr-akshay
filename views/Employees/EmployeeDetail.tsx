"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Users,
  PenSquare,
  Upload,
  Download,
  Trash2,
  FileText,
  Plus,
  Search,
  Eye,
  MinusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AppHeader from "@/components/appLayout/AppHeader"
import SideBar from "@/components/appLayout/AppSidebar"

type TeamMember = {
  name: string
  role: string
  avatar: string
}

type EmergencyContact = {
  name: string
  relation: string
  phone: string
  email?: string
  address?: string
}

type Document = {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
}

type LeaveQuota = {
  type: string
  total: number
  used: number
  available: number
  overUtilized: number
  unused: number
}

type Leave = {
  id: string
  startDate: string
  endDate: string
  type: string
  days: number
  appliedOn: string
  paid: number
  unpaid: number
  tlStatus: "Pending" | "Approved" | "Rejected"
  status: "Pending" | "Approved" | "Rejected"
}

type Asset = {
  id: string
  name: string
  type: string
  serialNumber: string
  assignedDate: string
  condition: string
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
  emergencyContacts: EmergencyContact[]
  documents: Document[]
  leaveQuota: LeaveQuota[]
  leaves: Leave[]
  assets: Asset[]
  reportingManager: TeamMember
  team: TeamMember[]
}

interface EmployeeDetailProps {
  employee: Employee
}

export default function EmployeeDetailView({ employee }: EmployeeDetailProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [personalModalOpen, setPersonalModalOpen] = useState(false)
  const [professionalModalOpen, setProfessionalModalOpen] = useState(false)
  const [emergencyContactModalOpen, setEmergencyContactModalOpen] = useState(false)
  const [documentUploadModalOpen, setDocumentUploadModalOpen] = useState(false)

  // Sample emergency contacts data
  const emergencyContacts = employee.emergencyContacts || [
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+91 - 9876543211",
      relation: "Spouse",
      address: "123 Main Street, Bangalore",
    },
    {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+91 - 9876543212",
      relation: "Brother",
      address: "456 Park Avenue, Mumbai",
    },
    {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+91 - 9876543213",
      relation: "Father",
      address: "789 Tech Park, Delhi",
    },
  ]

  // Sample documents data
  const documents = employee.documents || [
    {
      id: "doc1",
      name: "Aadharcard PDF",
      type: "Aadhar Card",
      size: "294kb",
      uploadDate: "15 Jan 2023",
    },
    {
      id: "doc2",
      name: "PAN Card PDF",
      type: "Pan Card",
      size: "156kb",
      uploadDate: "20 Feb 2023",
    },
    {
      id: "doc3",
      name: "Degree Certificate",
      type: "Education Degree",
      size: "1.2MB",
      uploadDate: "10 Mar 2023",
    },
  ]

  // Sample leave quota data
  const leaveQuota = employee.leaveQuota || [
    {
      type: "Casual Leave (CL)",
      total: 12,
      used: 5,
      available: 7,
      overUtilized: 0,
      unused: 7,
    },
    {
      type: "Sick Leave (SL)",
      total: 10,
      used: 3,
      available: 7,
      overUtilized: 0,
      unused: 7,
    },
    {
      type: "Earned Leave (EL)",
      total: 15,
      used: 0,
      available: 15,
      overUtilized: 0,
      unused: 15,
    },
  ]

  // Sample leaves data
  const leaves = employee.leaves || [
    {
      id: "leave1",
      startDate: "Nov 20, 2024",
      endDate: "Nov 22, 2024",
      type: "CL",
      days: 3,
      appliedOn: "Nov 15, 2024",
      paid: 3,
      unpaid: 0,
      tlStatus: "Approved",
      status: "Approved",
    },
    {
      id: "leave2",
      startDate: "Dec 10, 2024",
      endDate: "Dec 12, 2024",
      type: "SL",
      days: 3,
      appliedOn: "Dec 5, 2024",
      paid: 3,
      unpaid: 0,
      tlStatus: "Pending",
      status: "Pending",
    },
    {
      id: "leave3",
      startDate: "Jan 5, 2025",
      endDate: "Jan 10, 2025",
      type: "EL",
      days: 6,
      appliedOn: "Dec 20, 2024",
      paid: 6,
      unpaid: 0,
      tlStatus: "Rejected",
      status: "Rejected",
    },
  ]

  // Sample assets data
  const assets = employee.assets || [
    {
      id: "asset1",
      name: "MacBook Pro",
      type: "Laptop",
      serialNumber: "MBP2023001",
      assignedDate: "15 Jan 2023",
      condition: "Good",
    },
    {
      id: "asset2",
      name: "iPhone 13",
      type: "Mobile",
      serialNumber: "IP13001",
      assignedDate: "20 Feb 2023",
      condition: "Excellent",
    },
    {
      id: "asset3",
      name: "Dell Monitor",
      type: "Monitor",
      serialNumber: "DM2023001",
      assignedDate: "10 Mar 2023",
      condition: "Good",
    },
  ]

  
   
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBar />
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AppHeader />
  
          {/* Content Area */}
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 flex flex-wrap">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="leaves">Leaves</TabsTrigger>
              </TabsList>
               
              <TabsContent value="profile" className="mt-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Profile Card - Full width on mobile, 2/3 width on larger screens */}
                  <div className="md:col-span-2">
                    <Card className="w-full">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Profile</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setProfileModalOpen(true)} className="h-8 w-8">
                          <PenSquare className="h-4 w-4" />
                          <span className="sr-only">Edit Profile</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
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
                  </div>
                  <div className="md:col-span-2">
                    <Card className="w-full">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Personal Information</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setPersonalModalOpen(true)} className="h-8 w-8">
                          <PenSquare className="h-4 w-4" />
                          <span className="sr-only">Edit Personal Information</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="md:col-span-2">
                <Card className="w-full">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>Professional Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setProfessionalModalOpen(true)}
                      className="h-8 w-8"
                    >
                      <PenSquare className="h-4 w-4" />
                      <span className="sr-only">Edit Professional Information</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
           

  
                  {/* Team Hierarchy Card - Full width on mobile, 1/3 width on larger screens */}
                  <div className="lg:row-span-3">
                    <Card className="w-full h-full">
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
  
                  
            </TabsContent>
  
              {/* Emergency Contact Tab */}
              <TabsContent value="emergency" className="mt-0">

            <Card className="w-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle>Emergency Contact</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEmergencyContactModalOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Emergency Contact
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Relationship</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emergencyContacts.map((contact, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.relation}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <PenSquare className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

  
              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-0">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardTitle>List of Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Aadhar Card
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Pan Card
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Education Degree
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Last Company Salary Slip
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Experience Letter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Relieving Letter
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div></div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDocumentUploadModalOpen(true)}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose a file
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-md p-4 flex items-start gap-3">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

  
              {/* Leaves Tab */}
              <TabsContent value="leaves" className="mt-0">
                <Card className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Leaves</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Showing leave quota records From 1st April 2025 To 31st Mar 2026
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
                      <div className="relative w-full md:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search" className="pl-8" />
                      </div>
  
                      <div className="flex flex-wrap gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
  
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Leave Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="cl">Casual Leave</SelectItem>
                            <SelectItem value="sl">Sick Leave</SelectItem>
                            <SelectItem value="el">Earned Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
  
                    <div className="bg-muted/30 p-3 rounded-md mb-4">
                      <p className="text-sm font-medium">Available Leaves: 4</p>
                    </div>
  
                    {/* Leave Quota Table */}
                    <div className="rounded-md border mb-6 overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Number of Leaves</TableHead>
                            <TableHead>Leaves Used</TableHead>
                            <TableHead>Available Leaves</TableHead>
                            <TableHead>Over Utilized</TableHead>
                            <TableHead>Unused Leaves</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaveQuota.map((quota, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{quota.type}</TableCell>
                              <TableCell>{quota.total}</TableCell>
                              <TableCell>{quota.used}</TableCell>
                              <TableCell>{quota.available}</TableCell>
                              <TableCell>{quota.overUtilized}</TableCell>
                              <TableCell>{quota.unused}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
  
                    {/* Leave Data Table */}
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Leave Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead>Applied On</TableHead>
                            <TableHead>Paid</TableHead>
                            <TableHead>Unpaid</TableHead>
                            <TableHead>TL Status</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaves.map((leave) => (
                            <TableRow key={leave.id}>
                              <TableCell>
                                {leave.startDate} - {leave.endDate}
                              </TableCell>
                              <TableCell>{leave.type}</TableCell>
                              <TableCell>{leave.days}</TableCell>
                              <TableCell>{leave.appliedOn}</TableCell>
                              <TableCell>{leave.paid}</TableCell>
                              <TableCell>{leave.unpaid}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    leave.tlStatus === "Approved"
                                      ? "success"
                                      : leave.tlStatus === "Rejected"
                                        ? "destructive"
                                        : "outline"
                                  }
                                >
                                  {leave.tlStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    leave.status === "Approved"
                                      ? "success"
                                      : leave.status === "Rejected"
                                        ? "destructive"
                                        : "outline"
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                    <MinusCircle className="h-4 w-4" />
                                    <span className="sr-only">Cancel</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
  
        {/* Profile Edit Modal */}
        <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>Edit employee profile information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2 mb-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Profile Picture
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={employee.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input id="employeeId" defaultValue={employee.employeeId} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Select defaultValue={employee.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={employee.role}>{employee.role}</SelectItem>
                    <SelectItem value="Sales Executive">Sales Executive</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                    <SelectItem value="Software Developer">Software Developer</SelectItem>
                    <SelectItem value="HR Manager">HR Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userRole">User Role</Label>
                <Input id="userRole" defaultValue="Employee" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="punchAt">Punch at</Label>
                <Input id="punchAt" defaultValue="10:00 AM" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

  
        {/* Personal Information Edit Modal */}
        <Dialog open={personalModalOpen} onOpenChange={setPersonalModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Personal Information</DialogTitle>
            <DialogDescription>Edit employee personal information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" defaultValue={employee.mobile.replace("+91 - ", "")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue={employee.gender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  defaultValue={employee.dateOfBirth.split(" ").reverse().join("-")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select defaultValue={employee.maritalStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panCard">Pan Card</Label>
                <Input id="panCard" defaultValue="XY10009034P" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadharCard">Aadhar Card</Label>
                <Input id="aadharCard" defaultValue="3266 5656 9656" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea id="permanentAddress" defaultValue={employee.address} rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Textarea id="currentAddress" defaultValue={employee.address} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

  
        {/* Professional Information Edit Modal */}
        <Dialog open={professionalModalOpen} onOpenChange={setProfessionalModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Professional Information</DialogTitle>
            <DialogDescription>Edit employee professional information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue={employee.department}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={employee.department}>{employee.department}</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input id="joiningDate" type="date" defaultValue="2023-05-20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeEmail">Employee Email</Label>
                <Input id="employeeEmail" type="email" defaultValue={employee.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="probationEndDate">Probation End Date</Label>
                <Input id="probationEndDate" type="date" defaultValue="2023-05-20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noticePeriodStartDate">Notice Period Start Date</Label>
                <Input id="noticePeriodStartDate" type="date" defaultValue="2023-05-20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resignationDate">Resignation Date</Label>
                <Input id="resignationDate" type="date" defaultValue="2023-05-20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select defaultValue="Day">
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Day</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                    <SelectItem value="Rotating">Rotating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedCV">Updated CV</Label>
              <div className="flex items-center gap-2">
                <Input id="updatedCV" type="file" className="cursor-pointer" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

  
        {/* Emergency Contact Modal */}
        <Dialog open={emergencyContactModalOpen} onOpenChange={setEmergencyContactModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>Add a new emergency contact for this employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name</Label>
                <Input id="contactName" placeholder="eg. John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" placeholder="eg. john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input id="contactPhone" placeholder="eg. 1234567890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactRelationship">Relationship</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactAddress">Address</Label>
              <Textarea
                id="contactAddress"
                placeholder="eg. 01, B/15, Apart. Name, Street, City, State, Pincode"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

  
        {/* Document Upload Modal */}
        <Dialog open={documentUploadModalOpen} onOpenChange={setDocumentUploadModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Upload a new document for this employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="pan">Pan Card</SelectItem>
                  <SelectItem value="education">Education Degree</SelectItem>
                  <SelectItem value="salary">Last Company Salary Slip</SelectItem>
                  <SelectItem value="experience">Experience Letter</SelectItem>
                  <SelectItem value="relieving">Relieving Letter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentFile">Document File</Label>
              <Input id="documentFile" type="file" className="cursor-pointer" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentDescription">Description (Optional)</Label>
              <Textarea id="documentDescription" placeholder="Add a description for this document" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>
    )
  }