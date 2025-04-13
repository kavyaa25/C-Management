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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""

  if (!query) {
    return NextResponse.json(candidates)
  }

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.phone.toLowerCase().includes(query),
  )

  return NextResponse.json(filteredCandidates)
}
