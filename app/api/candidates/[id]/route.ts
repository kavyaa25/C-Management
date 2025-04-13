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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const candidate = candidates.find((c) => c.id === id)

  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
  }

  return NextResponse.json(candidate)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // In a real application, you would update the database
    // For demo purposes, we're just returning the updated candidate
    return NextResponse.json({ id, ...body })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update candidate" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // In a real application, you would delete from the database
    // For demo purposes, we're just returning a success message
    return NextResponse.json({ message: "Candidate deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete candidate" }, { status: 500 })
  }
}
