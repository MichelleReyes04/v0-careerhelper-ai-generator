"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Sparkles, Save, RotateCcw, CheckCircle } from "lucide-react"

const yearOptions = [
  { value: "freshman", label: "Freshman (1st year)" },
  { value: "sophomore", label: "Sophomore (2nd year)" },
  { value: "junior", label: "Junior (3rd year)" },
  { value: "senior", label: "Senior (4th year)" },
  { value: "graduate", label: "Graduate Student" },
  { value: "recent_grad", label: "Recent Graduate" },
]

const experienceLevels = [
  { value: "none", label: "No experience" },
  { value: "some", label: "Some experience (internships, projects)" },
  { value: "moderate", label: "Moderate experience (1-2 years work)" },
  { value: "experienced", label: "Experienced (2+ years work)" },
]

export default function GeneratePage() {
  const router = useRouter()
  const [year, setYear] = useState("")
  const [major, setMajor] = useState("")
  const [interests, setInterests] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [goals, setGoals] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const { messages, status, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/generate-career" }),
  })

  const isStreaming = status === "streaming" || status === "submitted"
  const hasResponse = messages.length > 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!year || !major || !interests || !experienceLevel || !goals) {
      return
    }

    const userMessage = `I'm a ${yearOptions.find(y => y.value === year)?.label} studying ${major}.

My interests include: ${interests}

Experience level: ${experienceLevels.find(e => e.value === experienceLevel)?.label}

My career goals: ${goals}

Please provide personalized career path recommendations based on this profile.`

    await sendMessage({ text: userMessage })
  }

  const handleReset = () => {
    setMessages([])
    setYear("")
    setMajor("")
    setInterests("")
    setExperienceLevel("")
    setGoals("")
    setSaveSuccess(false)
  }

  const handleSave = async () => {
    if (!hasResponse) return

    setIsSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Get the assistant response
      const assistantMessage = messages.find(m => m.role === "assistant")
      const responseText = assistantMessage?.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map(p => p.text)
        .join("") || ""

      // Create a title from the inputs
      const title = `Career Path: ${major} - ${yearOptions.find(y => y.value === year)?.label}`

      const { error } = await supabase
        .from("saved_recommendations")
        .insert({
          user_id: user.id,
          title,
          recommendation: responseText,
          inputs: {
            year,
            major,
            interests,
            experienceLevel,
            goals,
          },
        })

      if (error) throw error

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving recommendation:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Extract text content from messages
  const getMessageText = (message: typeof messages[0]) => {
    return message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map(p => p.text)
      .join("") || ""
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Generate Career Path</h1>
        <p className="mt-2 text-muted-foreground">
          Fill in your profile and let our AI generate personalized career recommendations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Profile
            </CardTitle>
            <CardDescription>
              Tell us about yourself to get personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={year} onValueChange={setYear} disabled={isStreaming}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major / Field of Study</Label>
                <Input
                  id="major"
                  placeholder="e.g., Computer Science, Business, Psychology"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  disabled={isStreaming}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="e.g., technology, healthcare, entrepreneurship, writing, data analysis"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  disabled={isStreaming}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel} disabled={isStreaming}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Career Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="What do you want to achieve in your career? What kind of work environment do you prefer?"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  disabled={isStreaming}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={isStreaming || !year || !major || !interests || !experienceLevel || !goals}
                  className="flex-1"
                >
                  {isStreaming ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
                {hasResponse && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isStreaming}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Career Recommendations</CardTitle>
                <CardDescription>
                  {hasResponse
                    ? "Your personalized career path suggestions"
                    : "Fill in your profile to generate recommendations"}
                </CardDescription>
              </div>
              {hasResponse && !isStreaming && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving || saveSuccess}
                >
                  {saveSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Saved!
                    </>
                  ) : isSaving ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex h-[400px] items-center justify-center text-center">
                  <div className="max-w-sm">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                    <p className="text-muted-foreground">
                      Your AI-generated career recommendations will appear here after you submit your profile.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages
                    .filter((m) => m.role === "assistant")
                    .map((message) => (
                      <div key={message.id} className="prose prose-sm dark:prose-invert max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formatMarkdown(getMessageText(message)),
                          }}
                        />
                      </div>
                    ))}
                  {isStreaming && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Spinner className="h-4 w-4" />
                      <span className="text-sm">Generating recommendations...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
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
