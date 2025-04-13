"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react"

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  qualification: z.string().min(1, { message: "Please select a qualification." }),
  experience: z.coerce.number().min(0).max(50),
  skills: z.array(z.string()).min(1, { message: "Please select at least one skill." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
})

type FormValues = z.infer<typeof formSchema>

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

interface EditCandidateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidate: Candidate
  onSubmit: (data: FormValues) => void
}

export default function EditCandidateModal({ open, onOpenChange, candidate, onSubmit }: EditCandidateModalProps) {
  // Available options
  const qualifications = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BSc)",
    "Master of Commerce (MCom)",
    "Master of Business Administration (MBA)",
  ]

  const skillOptions = ["Angular", "React", "Vue", "HTML", "CSS", "JavaScript", "TypeScript"]

  const genderOptions = ["Male", "Female", "Other"]

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      qualification: candidate.qualification,
      experience: candidate.experience,
      skills: candidate.skills,
      gender: candidate.gender,
    },
  })

  // Update form when candidate changes
  useEffect(() => {
    form.reset({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      qualification: candidate.qualification,
      experience: candidate.experience,
      skills: candidate.skills,
      gender: candidate.gender,
    })
  }, [candidate, form])

  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
          <DialogDescription>Update the candidate's information.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter candidate name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Higher Qualification</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {qualifications.map((qual) => (
                        <SelectItem key={qual} value={qual}>
                          {qual}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} max={50} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>Skills/Technology</FormLabel>
                  <div className="space-y-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={form.getValues("skills").includes(skill)}
                            onCheckedChange={(checked) => {
                              const currentSkills = form.getValues("skills")
                              if (checked) {
                                form.setValue("skills", [...currentSkills, skill], {
                                  shouldValidate: true,
                                })
                              } else {
                                form.setValue(
                                  "skills",
                                  currentSkills.filter((s) => s !== skill),
                                  { shouldValidate: true },
                                )
                              }
                            }}
                          />
                        </FormControl>
                        <Label className="font-normal">{skill}</Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
