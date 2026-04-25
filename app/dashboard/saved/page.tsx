import { createClient } from "@/lib/supabase/server"
import { SavedRecommendationsList } from "@/components/saved-recommendations-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Sparkles } from "lucide-react"
import Link from "next/link"

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

export default async function SavedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: savedRecommendations } = await supabase
    .from("saved_recommendations")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Saved Recommendations</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your saved career path recommendations.
        </p>
      </div>

      {savedRecommendations && savedRecommendations.length > 0 ? (
        <SavedRecommendationsList 
          recommendations={savedRecommendations as SavedRecommendation[]} 
        />
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="mb-2 text-center">No Saved Recommendations</CardTitle>
            <CardDescription className="mb-6 text-center max-w-sm">
              You haven&apos;t saved any career recommendations yet. Generate your first career path to get started!
            </CardDescription>
            <Button asChild>
              <Link href="/dashboard/generate">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Career Path
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
