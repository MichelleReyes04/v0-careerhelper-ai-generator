import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Sparkles, BookOpen, Target, ArrowRight, CheckCircle } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CareerHelper</span>
          </div>
          <Button asChild>
            <Link href="/auth/login">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Guidance
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Navigate Your Career Journey with Confidence
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Get personalized career recommendations tailored to your major, interests, and goals. 
            Our AI analyzes your unique profile to suggest the perfect career paths for you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/auth/login">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to discover your ideal career path</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Share Your Profile</CardTitle>
                <CardDescription>
                  Tell us about your year, major, interests, experience level, and career goals.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. AI Analysis</CardTitle>
                <CardDescription>
                  Our AI processes your information to generate personalized career recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Get Your Path</CardTitle>
                <CardDescription>
                  Receive detailed career suggestions with actionable steps to achieve your goals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Why Choose CareerHelper?
              </h2>
              <ul className="space-y-4">
                {[
                  "Personalized recommendations based on your unique profile",
                  "AI-powered insights from industry trends",
                  "Save and track your favorite career paths",
                  "Actionable steps to reach your goals",
                  "Free for students",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-border bg-muted/30">
              <CardContent className="p-8">
                <blockquote className="text-lg italic text-foreground">
                  {`"CareerHelper helped me discover career paths I never knew existed. 
                  As a computer science student, I found the perfect intersection of 
                  my technical skills and my passion for healthcare."`}
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">
                  - Student, Computer Science
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Find Your Path?</h2>
          <p className="mb-8 text-primary-foreground/80">
            Join thousands of students who have discovered their ideal career with CareerHelper.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="/auth/login">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">CareerHelper</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with AI to help students navigate their careers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
