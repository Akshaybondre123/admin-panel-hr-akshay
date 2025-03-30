import { notFound } from "next/navigation"
import EmployeeDetailView from "@/views/Employees/EmployeeDetail"

// This would typically come from a database
const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 - 9876543210",
    reportingTo: "Jay Patel",
    status: "Active",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Senior Developer",
    employeeId: "EMP-001",
    dateOfJoining: "15 Jan 2020",
    department: "Engineering",
    location: "Bangalore",
    gender: "Male",
    dateOfBirth: "12 Apr 1990",
    maritalStatus: "Single",
    bloodGroup: "O+",
    address: "123 Main Street, Bangalore",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Spouse",
      phone: "+91 - 9876543211",
    },
    reportingManager: {
      name: "Jay Patel",
      role: "Engineering Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    team: [
      {
        name: "Rohit Patel",
        role: "Junior Developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Arvind Patel",
        role: "Junior Developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Rahul Patel",
        role: "QA Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: 2,
    name: "Aanand Tiwari",
    email: "aanand.tiwari@example.com",
    mobile: "+91 - 9876543212",
    reportingTo: "Jay Patel",
    status: "Active",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Product Designer",
    employeeId: "EMP-002",
    dateOfJoining: "05 Mar 2021",
    department: "Design",
    location: "Mumbai",
    gender: "Male",
    dateOfBirth: "23 Jun 1992",
    maritalStatus: "Married",
    bloodGroup: "B+",
    address: "456 Park Avenue, Mumbai",
    emergencyContact: {
      name: "Priya Tiwari",
      relation: "Spouse",
      phone: "+91 - 9876543213",
    },
    reportingManager: {
      name: "Jay Patel",
      role: "Design Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    team: [],
  },
]

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employeeId = Number.parseInt(params.id)
  const employee = employees.find((emp) => emp.id === employeeId)

  if (!employee) {
    notFound()
  }

  return <EmployeeDetailView employee={employee} />
}

