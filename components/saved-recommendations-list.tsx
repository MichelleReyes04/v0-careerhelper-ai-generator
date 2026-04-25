"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Trash2, Eye, Calendar, GraduationCap, Briefcase } from "lucide-react"

interface SavedRecommendation {
  id: string
  title: string
  recommendation: string
  inputs: {
    year: string
    major: string
    interests: string
    experienceLevel: string
    goals: string
  }
  created_at: string
}

interface SavedRecommendationsListProps {
  recommendations: SavedRecommendation[]
}

const yearLabels: Record<string, string> = {
  freshman: "Freshman",
  sophomore: "Sophomore",
  junior: "Junior",
  senior: "Senior",
  graduate: "Graduate",
  recent_grad: "Recent Graduate",
}

const experienceLabels: Record<string, string> = {
  none: "No experience",
  some: "Some experience",
  moderate: "Moderate experience",
  experienced: "Experienced",
}

export function SavedRecommendationsList({ recommendations }: SavedRecommendationsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("saved_recommendations")
        .delete()
        .eq("id", id)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting recommendation:", error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="border-border bg-card flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-2">{rec.title}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3" />
              {new Date(rec.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                <GraduationCap className="mr-1 h-3 w-3" />
                {rec.inputs.major}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Briefcase className="mr-1 h-3 w-3" />
                {experienceLabels[rec.inputs.experienceLevel] || rec.inputs.experienceLevel}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {rec.recommendation.slice(0, 150)}...
            </p>
          </CardContent>
          <div className="flex gap-2 p-4 pt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{rec.title}</DialogTitle>
                  <DialogDescription>
                    Generated on{" "}
                    {new Date(rec.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {yearLabels[rec.inputs.year] || rec.inputs.year}
                    </Badge>
                    <Badge variant="secondary">{rec.inputs.major}</Badge>
                    <Badge variant="outline">
                      {experienceLabels[rec.inputs.experienceLevel] || rec.inputs.experienceLevel}
                    </Badge>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium mb-1">Interests</p>
                    <p className="text-sm text-muted-foreground">{rec.inputs.interests}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium mb-1">Goals</p>
                    <p className="text-sm text-muted-foreground">{rec.inputs.goals}</p>
                  </div>
                  <ScrollArea className="h-[300px] rounded-lg border border-border p-4">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(rec.recommendation),
                      }}
                    />
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  disabled={deletingId === rec.id}
                >
                  {deletingId === rec.id ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Recommendation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this saved recommendation? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(rec.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      ))}
    </div>
  )
}

// Simple markdown formatter
function formatMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-primary">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Bullet points
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc space-y-1 my-2">$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="my-2">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph
    .replace(/^(.*)$/, '<p class="my-2">$1</p>')
}
