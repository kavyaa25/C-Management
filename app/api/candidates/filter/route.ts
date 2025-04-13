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

  // Get filter parameters
  const qualification = searchParams.get("qualification") || ""
  const minExperience = Number.parseInt(searchParams.get("minExperience") || "0")
  const maxExperience = Number.parseInt(searchParams.get("maxExperience") || "10")
  const skills = searchParams.get("skills")?.split(",") || []
  const gender = searchParams.get("gender") || ""

  let filteredCandidates = [...candidates]

  // Apply qualification filter
  if (qualification) {
    filteredCandidates = filteredCandidates.filter((candidate) => candidate.qualification === qualification)
  }

  // Apply experience filter
  filteredCandidates = filteredCandidates.filter(
    (candidate) => candidate.experience >= minExperience && candidate.experience <= maxExperience,
  )

  // Apply skills filter
  if (skills.length > 0 && skills[0] !== "") {
    filteredCandidates = filteredCandidates.filter((candidate) =>
      skills.some((skill) => candidate.skills.includes(skill)),
    )
  }

  // Apply gender filter
  if (gender) {
    filteredCandidates = filteredCandidates.filter((candidate) => candidate.gender === gender)
  }

  return NextResponse.json(filteredCandidates)
}
