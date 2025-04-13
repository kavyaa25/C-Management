"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterProps {
  filters: {
    qualification: string
    experience: { min: number; max: number }
    skills: string[]
    gender: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      qualification: string
      experience: { min: number; max: number }
      skills: string[]
      gender: string
    }>
  >
  onClose: () => void
}

export default function CandidateFilter({ filters, setFilters, onClose }: FilterProps) {
  // Available options for filters
  const qualifications = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BSc)",
    "Master of Commerce (MCom)",
    "Master of Business Administration (MBA)",
  ]

  const skillOptions = ["Angular", "React", "Vue", "HTML", "CSS", "JavaScript", "TypeScript"]

  const genderOptions = ["Male", "Female", "Other"]

  // Handle qualification change
  const handleQualificationChange = (value: string) => {
    setFilters((prev) => ({ ...prev, qualification: value }))
  }

  // Handle experience change
  const handleExperienceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      experience: { min: value[0], max: value[0] === 10 ? 10 : value[0] + 1 },
    }))
  }

  // Handle skill selection
  const handleSkillChange = (skill: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  // Handle gender change
  const handleGenderChange = (value: string) => {
    setFilters((prev) => ({ ...prev, gender: value }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      qualification: "",
      experience: { min: 0, max: 10 },
      skills: [],
      gender: "",
    })
  }

  return (
    <Card className="absolute right-0 top-0 z-10 w-72 shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filter</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="qualification">Higher Qualification</Label>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Select value={filters.qualification} onValueChange={handleQualificationChange}>
              <SelectTrigger id="qualification">
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Qualifications</SelectItem>
                {qualifications.map((qual) => (
                  <SelectItem key={qual} value={qual}>
                    {qual}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Experience</Label>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="px-2 pt-6 pb-2">
              <Slider
                defaultValue={[filters.experience.min]}
                max={10}
                step={1}
                onValueChange={handleExperienceChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Min: {filters.experience.min}</span>
                <span>Max: {filters.experience.max}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Skills/Technology</Label>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="space-y-2 pt-2">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                  />
                  <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gender">Gender</Label>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Select value={filters.gender} onValueChange={handleGenderChange}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onClose} className="w-full">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
