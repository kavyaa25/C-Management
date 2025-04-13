import { NextResponse } from "next/server"

// Mock data for candidates
const candidates = [
  {
    id: 1,
    name: "JT",
    email: "jt@gmail.com",
    phone: "+91 9789678979",
    qualification: "Bachelor of Arts (BA)",
    experience: 1,
    skills: ["Angular"],
    gender: "Male",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "John",
    email: "john@gmail.com",
    phone: "+91 9789678978",
    qualification: "Master of Commerce (MCom)",
    experience: 1,
    skills: ["HTML"],
    gender: "Male",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export async function GET() {
  return NextResponse.json(candidates)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real application, you would validate the data and save to a database
    const newCandidate = {
      id: candidates.length + 1,
      ...body,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    // For demo purposes, we're just returning the new candidate
    return NextResponse.json(newCandidate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create candidate" }, { status: 500 })
  }
}
