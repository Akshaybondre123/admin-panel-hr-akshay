"use client"

import { useState } from "react"
import { Search, RefreshCw, Eye, X, Check, ChevronLeft, ChevronRight, Calendar} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppHeader from "@/components/appLayout/AppHeader"
import Sidebar from "@/components/appLayout/AppSidebar"
import { EmployeeModal } from "@/components/appLayout/EmployeeModel"

const leaveRequests = [
  {
    id: 1,
    employeeName: "Aanand Tiwari",
    employeeRole: "Product Designer",
    employeeAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "Nov 20, 2024",
    endDate: "Nov 22, 2024",
    type: "CL",
    days: 3,
    appliedOn: "Nov 16, 2024",
    tlStatus: "Approved",
    status: "Pending",
    reason: "I need to attend a family function in my hometown.",
    tlClarification: "Approved as the team workload is manageable during this period.",
    duration: "Full Day",
    leaveBalance: 4,
  },
  {
    id: 2,
    employeeName: "John Doe",
    employeeRole: "Senior Developer",
    employeeAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "Dec 10, 2024",
    endDate: "Dec 12, 2024",
    type: "SL",
    days: 3,
    appliedOn: "Dec 5, 2024",
    tlStatus: "Pending",
    status: "Pending",
    reason: "I'm feeling unwell and need to rest for a few days.",
    duration: "Full Day",
    leaveBalance: 7,
  },
  {
    id: 3,
    employeeName: "Emily Davis",
    employeeRole: "UI Designer",
    employeeAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "Dec 15, 2024",
    endDate: "Dec 15, 2024",
    type: "CL",
    days: 1,
    appliedOn: "Dec 10, 2024",
    tlStatus: "Approved",
    status: "Approved",
    reason: "I have a doctor's appointment.",
    tlClarification: "Approved as it's just for half a day.",
    duration: "Half Day (First Half)",
    leaveBalance: 6,
  },
  {
    id: 4,
    employeeName: "Michael Brown",
    employeeRole: "DevOps Engineer",
    employeeAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "Jan 5, 2025",
    endDate: "Jan 10, 2025",
    type: "EL",
    days: 6,
    appliedOn: "Dec 20, 2024",
    tlStatus: "Rejected",
    status: "Rejected",
    reason: "I'm planning a vacation with my family.",
    tlClarification: "Rejected due to critical deployment scheduled during this period.",
    duration: "Full Day",
    leaveBalance: 15,
  },
  {
    id: 5,
    employeeName: "Sarah Wilson",
    employeeRole: "QA Engineer",
    employeeAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "Jan 15, 2025",
    endDate: "Jan 16, 2025",
    type: "CL",
    days: 2,
    appliedOn: "Jan 10, 2025",
    tlStatus: "Approved",
    status: "Approved",
    reason: "I need to attend a family event.",
    tlClarification: "Approved as the testing phase will be completed by then.",
    duration: "Full Day",
    leaveBalance: 8,
  },
]

export default function LeavesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [leaveType, setLeaveType] = useState("")
  const [status, setStatus] = useState("")
  const [selectedLeave, setSelectedLeave] = useState<any>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [approverNote, setApproverNote] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [startDate, setStartDate] = useState("");

  const filteredLeaves = leaveRequests.filter(
    (leave) =>
      leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (leaveType === "" || leave.type === leaveType) &&
      (status === "" || leave.status === status),
  )

  const handleViewLeave = (leave: any) => {
    setSelectedLeave(leave)
    setViewModalOpen(true)
  }

  const handleApproveLeave = (leave: any) => {
    setSelectedLeave(leave)
    setApproveModalOpen(true)
  }

  const handleRejectLeave = (leave: any) => {
    setSelectedLeave(leave)
    setRejectModalOpen(true)
  }

  const handleApproveConfirm = () => {
    // Update leave status to approved
    const updatedLeaves = leaveRequests.map(leave => 
      leave.id === selectedLeave.id ? {...leave, status: "Approved"} : leave
    )
    // In a real app, you would update state or make API call here
    console.log("Approved leave:", selectedLeave.id)
    setApproveModalOpen(false)
    setApproverNote("")
  }

  const handleRejectConfirm = () => {
    // Update leave status to rejected
    const updatedLeaves = leaveRequests.map(leave => 
      leave.id === selectedLeave.id ? {...leave, status: "Rejected"} : leave
    )
    // In a real app, you would update state or make API call here
    console.log("Rejected leave:", selectedLeave.id)
    setRejectModalOpen(false)
    setRejectionReason("")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
      <AppHeader 
    title="Leaves" 
    onMenuClick={toggleSidebar} 
  />

        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-4 sm:p-6">
           

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
  <div className="flex flex-wrap items-center gap-2">
    {/* Search */}
    <div className="relative w-40">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
    type="search"
    placeholder="Search"
    className="pl-10 py-2 text-xs w-full" // Increased padding-left to make room for the icon
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>








    {/* Type Dropdown */}
    <Select value={leaveType} onValueChange={setLeaveType}>
      <SelectTrigger className="w-[100px] text-xs h-8">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="text-xs">All Types</SelectItem>
        <SelectItem value="CL" className="text-xs">Casual Leave</SelectItem>
        <SelectItem value="SL" className="text-xs">Sick Leave</SelectItem>
        <SelectItem value="EL" className="text-xs">Earned Leave</SelectItem>
      </SelectContent>
    </Select>

    {/* Status Dropdown */}
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-[100px] text-xs h-8">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="text-xs">All Status</SelectItem>
        <SelectItem value="Pending" className="text-xs">Pending</SelectItem>
        <SelectItem value="Approved" className="text-xs">Approved</SelectItem>
        <SelectItem value="Rejected" className="text-xs">Rejected</SelectItem>
      </SelectContent>
    </Select>
    <Button
              variant="outline"
              className="w-[150px] bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-start gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Select Date</span>
            </Button>

            
          
    {/* Refresh Button */}
    <Button variant="outline" size="sm" className="rounded-full h-8 w-8">
      <RefreshCw className="h-3 w-3" />
      <span className="sr-only">Refresh</span>
    </Button>
  </div>
</div>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Leave Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>TL Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaves.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No leave requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={leave.employeeAvatar} alt={leave.employeeName} />
                              <AvatarFallback>{leave.employeeName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{leave.employeeName}</p>
                              <p className="text-xs text-muted-foreground">{leave.employeeRole}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {leave.startDate} - {leave.endDate}
                        </TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>{leave.appliedOn}</TableCell>
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
  <div className="flex justify-end gap-1 items-center">
    <Button 
      variant="ghost"
      size="icon"
      className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 border border-gray-900"
      onClick={() => handleViewLeave(leave)}
    >
      <Eye className="h-4 w-4 text-black" />
      <span className="sr-only">View</span>
    </Button>

    <Button 
      variant="ghost"
      size="icon"
      className="h-7 w-7 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 border border-green-700"
      onClick={() => handleApproveLeave(leave)}
    >
      <Check className="h-4 w-4 text-black" />
      <span className="sr-only">Approve</span>
    </Button>

    <Button 
      variant="ghost"
      size="icon"
      className="h-7 w-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 border border-red-700"
      onClick={() => handleRejectLeave(leave)}
    >
      <X className="h-4 w-4 text-black" />
      <span className="sr-only">Reject</span>
    </Button>
  </div>
</TableCell>

                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredLeaves.length}</span> of{" "}
                <span className="font-medium">{leaveRequests.length}</span> results
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Leave Modal */}
      <EmployeeModal
  title={`Leave Request for ${selectedLeave?.employeeName}`}
  isOpen={viewModalOpen}
  onOpenChange={setViewModalOpen}
  showFooter={false} // Since you have a custom footer
>
  {selectedLeave && (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Leave Type</Label>
        <p className="font-medium">
          {selectedLeave.type === "CL" ? "Casual" : selectedLeave.type === "SL" ? "Sick" : "Earned"} Leave
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Date of Application</Label>
        <p className="font-medium">{selectedLeave.appliedOn}</p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Leave Date</Label>
        <p className="font-medium">
          {selectedLeave.startDate} - {selectedLeave.endDate}
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Days</Label>
        <p className="font-medium">{selectedLeave.days}</p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Duration</Label>
        <p className="font-medium">{selectedLeave.duration}</p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">TL Status</Label>
        <div>
          <Badge
            variant={
              selectedLeave.tlStatus === "Approved"
                ? "success"
                : selectedLeave.tlStatus === "Rejected"
                ? "destructive"
                : "outline"
            }
          >
            {selectedLeave.tlStatus}
          </Badge>
        </div>
      </div>
      <div className="col-span-2 space-y-1">
        <Label className="text-sm text-muted-foreground">TL Clarification</Label>
        <p className="text-sm">{selectedLeave.tlClarification || "No clarification provided"}</p>
      </div>
      <div className="col-span-2 space-y-1">
        <Label className="text-sm text-muted-foreground">Reason for Leave</Label>
        <p className="text-sm">{selectedLeave.reason}</p>
      </div>
    </div>
  )}
  <DialogFooter>
    <DialogClose asChild>
      <Button type="button" variant="outline">
        Close
      </Button>
    </DialogClose>
  </DialogFooter>
</EmployeeModal>


      {/* Approve Leave Modal */}
      <EmployeeModal
  title={`Approve Leave for ${selectedLeave?.employeeName}`}
  isOpen={approveModalOpen}
  onOpenChange={setApproveModalOpen}
  showFooter={false} // Since we're adding a custom footer
>
  {selectedLeave && (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Type</Label>
        <p className="font-medium">
          {selectedLeave.type === "CL" ? "Casual" : selectedLeave.type === "SL" ? "Sick" : "Earned"} Leave
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Date of Application</Label>
        <p className="font-medium">{selectedLeave.appliedOn}</p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Leave Date</Label>
        <p className="font-medium">
          {selectedLeave.startDate} - {selectedLeave.endDate}
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Number of Days</Label>
        <p className="font-medium">{selectedLeave.days}</p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">Leave Balance</Label>
        <p className="font-medium">{selectedLeave.leaveBalance}</p>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="approverNote">Approver Note</Label>
        <Textarea
          id="approverNote"
          placeholder="Enter any additional notes or comments for the employee."
          value={approverNote}
          onChange={(e) => setApproverNote(e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )}
  <DialogFooter>
    <Button variant="default" onClick={handleApproveConfirm}>
      Confirm Approval
    </Button>
    <DialogClose asChild>
      <Button type="button" variant="outline">
        Cancel
      </Button>
    </DialogClose>
  </DialogFooter>
</EmployeeModal>

      {/* Reject Leave Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reject Leave for {selectedLeave?.employeeName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Reason for Rejection</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Please provide a reason for rejecting this leave request."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Confirm Rejection
            </Button>
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