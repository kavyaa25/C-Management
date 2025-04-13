import CandidateTable from "@/components/candidate-table"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Candidate Management System",
  description: "A full-stack candidate management system",
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <CandidateTable />
      <Toaster />
    </main>
  )
}
