"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Filter, Grid3X3, List, Plus, Search, Trash2, Pencil } from "lucide-react"
import CandidateFilter from "./candidate-filter"
import { ThemeSwitcher } from "./theme-switcher"
import AddCandidateModal from "./add-candidate-modal"
import EditCandidateModal from "./edit-candidate-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface Candidate {
  id: number
  name: string
  email: string
  phone: string
  qualification: string
  experience: number
  skills: string[]
  gender: string
  avatar: string
}

export default function CandidateTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showFilter, setShowFilter] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null)
  const [filters, setFilters] = useState({
    qualification: "",
    experience: { min: 0, max: 10 },
    skills: [] as string[],
    gender: "",
  })
  const { toast } = useToast()

  // Mock data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // In a real app, this would be an API call
        const mockCandidates: Candidate[] = [
          {
            id: 1,
            name: "John Thompson",
            email: "john@example.com",
            phone: "+91 9789678979",
            qualification: "Bachelor of Arts (BA)",
            experience: 2,
            skills: ["Angular"],
            gender: "Male",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "+91 9789678978",
            qualification: "Master of Commerce (MCom)",
            experience: 1,
            skills: ["HTML"],
            gender: "Female",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            id: 3,
            name: "Michael Chen",
            email: "michael@example.com",
            phone: "+91 9789678977",
            qualification: "Bachelor of Science (BSc)",
            experience: 3,
            skills: ["React", "JavaScript"],
            gender: "Male",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          },
          {
            id: 4,
            name: "Emily Davis",
            email: "emily@example.com",
            phone: "+91 9789678976",
            qualification: "Master of Business Administration (MBA)",
            experience: 4,
            skills: ["Vue", "CSS"],
            gender: "Female",
            avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          },
        ]

        setCandidates(mockCandidates)
        setFilteredCandidates(mockCandidates)
      } catch (error) {
        console.error("Error fetching candidates:", error)
        toast({
          title: "Error",
          description: "Failed to load candidates",
          variant: "destructive",
        })
      }
    }

    fetchCandidates()
  }, [toast])

  // Filter candidates based on search query and filters
  useEffect(() => {
    let result = [...candidates]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.phone.toLowerCase().includes(query),
      )
    }

    // Apply qualification filter
    if (filters.qualification && filters.qualification !== "all") {
      result = result.filter((candidate) => candidate.qualification === filters.qualification)
    }

    // Apply experience filter
    result = result.filter(
      (candidate) => candidate.experience >= filters.experience.min && candidate.experience <= filters.experience.max,
    )

    // Apply skills filter
    if (filters.skills.length > 0) {
      result = result.filter((candidate) => filters.skills.some((skill) => candidate.skills.includes(skill)))
    }

    // Apply gender filter
    if (filters.gender && filters.gender !== "all") {
      result = result.filter((candidate) => candidate.gender === filters.gender)
    }

    setFilteredCandidates(result)
  }, [searchQuery, filters, candidates])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleAddCandidate = (data: any) => {
    const newCandidate: Candidate = {
      id: candidates.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      qualification: data.qualification,
      experience: data.experience,
      skills: data.skills,
      gender: data.gender,
      avatar: `https://randomuser.me/api/portraits/${data.gender === "Male" ? "men" : "women"}/${Math.floor(Math.random() * 70) + 1}.jpg`,
    }

    setCandidates([...candidates, newCandidate])
    toast({
      title: "Success",
      description: "Candidate added successfully",
    })
  }

  const handleEditCandidate = (data: any) => {
    if (!currentCandidate) return

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === currentCandidate.id ? { ...candidate, ...data } : candidate,
    )

    setCandidates(updatedCandidates)
    setCurrentCandidate(null)
    toast({
      title: "Success",
      description: "Candidate updated successfully",
    })
  }

  const handleDeleteCandidate = () => {
    if (!currentCandidate) return

    const updatedCandidates = candidates.filter((candidate) => candidate.id !== currentCandidate.id)

    setCandidates(updatedCandidates)
    setCurrentCandidate(null)
    setShowDeleteDialog(false)
    toast({
      title: "Success",
      description: "Candidate deleted successfully",
    })
  }

  const openEditModal = (candidate: Candidate) => {
    setCurrentCandidate(candidate)
    setShowEditModal(true)
  }

  const openDeleteDialog = (candidate: Candidate) => {
    setCurrentCandidate(candidate)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Candidates</h2>
              <div className="flex items-center space-x-2">
                <ThemeSwitcher />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-muted" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Candidate, Email, Phone..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={toggleFilter}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                {filteredCandidates.length} of {candidates.length} candidates
              </div>
              <div className="flex items-center gap-2">
                <span>1/1</span>
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {viewMode === "list" ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Candidate Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Higher Qualification</th>
                        <th className="text-left p-2">Current Experience</th>
                        <th className="text-left p-2">Skills/Technology</th>
                        <th className="text-left p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={candidate.avatar || "/placeholder.svg"}
                                alt={candidate.name}
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=40&width=40"
                                }}
                              />
                              {candidate.name}
                            </div>
                          </td>
                          <td className="p-2">{candidate.email}</td>
                          <td className="p-2">{candidate.phone}</td>
                          <td className="p-2">{candidate.qualification}</td>
                          <td className="p-2">{candidate.experience}</td>
                          <td className="p-2">{candidate.skills.join(", ")}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEditModal(candidate)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(candidate)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCandidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <img
                              src={candidate.avatar || "/placeholder.svg"}
                              alt={candidate.name}
                              className="w-20 h-20 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=80&width=80"
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.email}</p>
                            <p className="text-sm">{candidate.phone}</p>
                          </div>
                          <div className="w-full text-sm">
                            <div className="flex justify-between py-1">
                              <span className="font-medium">Qualification:</span>
                              <span>{candidate.qualification}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="font-medium">Experience:</span>
                              <span>{candidate.experience} years</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="font-medium">Skills:</span>
                              <span>{candidate.skills.join(", ")}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => openEditModal(candidate)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteDialog(candidate)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {showFilter && (
                <CandidateFilter filters={filters} setFilters={setFilters} onClose={() => setShowFilter(false)} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AddCandidateModal open={showAddModal} onOpenChange={setShowAddModal} onSubmit={handleAddCandidate} />

      {currentCandidate && (
        <EditCandidateModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          candidate={currentCandidate}
          onSubmit={handleEditCandidate}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the candidate
              {currentCandidate && ` ${currentCandidate.name}`} and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCandidate}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
