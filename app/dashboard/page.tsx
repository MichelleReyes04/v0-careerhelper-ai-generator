import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Bookmark, ArrowRight, Clock } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id)
    .single()

  // Get recent saved recommendations
  const { data: recentSaved, count: savedCount } = await supabase
    .from("saved_recommendations")
    .select("id, title, created_at", { count: "exact" })
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(3)

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "there"

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ready to explore new career opportunities? Let&apos;s find your perfect path.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Action Card */}
        <Card className="border-border bg-card md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Generate Career Path</CardTitle>
            <CardDescription>
              Get personalized AI-powered career recommendations based on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/generate">
                Start Generating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bookmark className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Saved Recommendations</CardTitle>
            <CardDescription>
              You have {savedCount || 0} saved career recommendation{savedCount !== 1 ? "s" : ""}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/saved">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recently saved recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentSaved && recentSaved.length > 0 ? (
              <ul className="space-y-2">
                {recentSaved.map((item) => (
                  <li key={item.id} className="text-sm">
                    <Link 
                      href="/dashboard/saved" 
                      className="text-foreground hover:text-primary hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No saved recommendations yet. Generate your first career path!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Getting Started</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-muted/30">
            <CardContent className="pt-6">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-1 font-medium text-foreground">Tell Us About Yourself</h3>
              <p className="text-sm text-muted-foreground">
                Share your year, major, interests, and career goals.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-muted/30">
            <CardContent className="pt-6">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-1 font-medium text-foreground">Generate Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your profile to suggest perfect career paths.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-muted/30">
            <CardContent className="pt-6">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-1 font-medium text-foreground">Save & Explore</h3>
              <p className="text-sm text-muted-foreground">
                Save recommendations you like and revisit them anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
