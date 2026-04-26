import Link from "next/link"
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  ChevronRight,
  Compass,
  FileText,
  GitBranch,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react"

const pathCards = [
  {
    title: "Hackathons",
    description:
      "Find beginner-friendly events that help you build, ship, and talk about real work.",
    tag: "Fast win",
    icon: Trophy,
  },
  {
    title: "Open Source",
    description:
      "Discover contribution paths that strengthen Git, teamwork, and engineering credibility.",
    tag: "Portfolio-ready",
    icon: GitBranch,
  },
  {
    title: "Research",
    description:
      "Explore lab-ready ideas and ways to turn your interests into guided technical work.",
    tag: "High signal",
    icon: GraduationCap,
  },
  {
    title: "Resume Projects",
    description:
      "Get practical project ideas that look stronger than tutorial clones and filler work.",
    tag: "Stand out",
    icon: FileText,
  },
  {
    title: "Career Roadmaps",
    description:
      "Break big goals into concrete next steps based on your background and time available.",
    tag: "Clear direction",
    icon: Compass,
  },
  {
    title: "Job Matches",
    description:
      "See roles, tracks, and skill gaps that fit where you are now and where you want to go.",
    tag: "AI ranked",
    icon: BriefcaseBusiness,
  },
]

const tracks = [
  {
    title: "AI / Machine Learning",
    description: "Project ideas, skill progression, and job paths for students breaking into AI.",
    step: "Start with one data project and one beginner-friendly applied ML build.",
  },
  {
    title: "Full-Stack Engineering",
    description: "Build stronger web app experience, stronger repos, and better technical range.",
    step: "Ship a polished full-stack app with auth, CRUD, and real deployment.",
  },
  {
    title: "Product + Startup",
    description: "For students who like building fast, validating ideas, and shipping useful tools.",
    step: "Launch one focused user-facing app and collect demo-ready feedback.",
  },
  {
    title: "Cybersecurity",
    description: "Map out hands-on skill development and practical portfolio work beyond coursework.",
    step: "Build a lab workflow and document security exercises clearly.",
  },
  {
    title: "Research / Grad School",
    description: "Find ways to build credibility through reading, experiments, and faculty outreach.",
    step: "Turn one technical interest into a mini research-style project and summary.",
  },
  {
    title: "Data / Analytics",
    description: "Create project-based evidence that you can clean, analyze, and communicate insights.",
    step: "Publish one polished dashboard or case study with measurable takeaways.",
  },
]

const jobCards = [
  {
    title: "AI Research Assistant",
    company: "University Lab",
    match: "92% Match",
    reason: "Strong fit for AI interest and beginner research path.",
    type: "Part-time",
  },
  {
    title: "Junior Full-Stack Developer",
    company: "Startup Internship Track",
    match: "88% Match",
    reason: "Great for students building project-based experience.",
    type: "Remote",
  },
  {
    title: "Open Source Contributor",
    company: "OSS Community",
    match: "84% Match",
    reason: "Improves Git collaboration and public proof of work.",
    type: "Flexible",
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081120] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.18]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-40 -mx-4 border-b border-white/10 bg-[#081120]/80 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(124,58,237,0.25)]">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white">CareerHelper</p>
                <p className="text-xs text-slate-400">AI Career Copilot</p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm text-slate-300 transition hover:text-white">
                Features
              </a>
              <a href="#paths" className="text-sm text-slate-300 transition hover:text-white">
                Paths
              </a>
              <a href="#dashboard" className="text-sm text-slate-300 transition hover:text-white">
                Preview
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/auth"
                className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 sm:inline-flex"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section className="relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-wrap gap-3">
              {["AI-Powered", "Student-First", "Beyond Internships"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur"
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Career guidance for students who need{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                real next steps
              </span>
              , not vague advice.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover jobs, projects, hackathons, research directions, and resume-ready actions
              based on your background, interests, and goals.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(34,211,238,0.24)]"
              >
                Generate My Path
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Explore Demo
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">3x</p>
                <p className="mt-1 text-sm text-slate-400">More ways to build experience</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">AI</p>
                <p className="mt-1 text-sm text-slate-400">Resume-aware recommendations</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">1 plan</p>
                <p className="mt-1 text-sm text-slate-400">Clear next move in minutes</p>
              </div>
            </div>
          </div>

          <div id="dashboard" className="relative">
            <div className="absolute -left-12 top-10 h-36 w-36 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(2,6,23,0.6)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                    AI Career Plan
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Student Profile Analysis</h2>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live Preview
                </span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-[#0c172b] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Profile Snapshot
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Sophomore", "CS Major", "Interested in AI", "No internship experience"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-200"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-2xl bg-violet-400/12 p-2">
                      <Target className="h-4 w-4 text-violet-300" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Recommended Next Step
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">
                        Build one beginner ML project, apply to 2 beginner-friendly hackathons,
                        and reach out to one campus research lab this month.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-[#0c172b] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Best-Fit Opportunities
                    </p>
                    <div className="mt-3 space-y-3">
                      {[
                        "AI Research Assistant",
                        "Open Source ML Project",
                        "Campus Tech Fellowship",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-3 py-3"
                        >
                          <p className="text-sm text-slate-100">{item}</p>
                          <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                            Strong fit
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#0c172b] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Skill Gaps</p>
                    <div className="mt-3 space-y-3">
                      {[
                        "Python data workflows",
                        "Model evaluation basics",
                        "Git collaboration",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-sm text-slate-200"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0c172b] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    This Week&apos;s Focus
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[
                      "Finish one portfolio-ready project",
                      "Apply to 2 beginner-friendly hackathons",
                      "Improve resume bullets for AI-related work",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/5 p-3 text-sm text-slate-200"
                      >
                        <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-6 md:py-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
              Beyond internships
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Build experience in more than one way
            </h2>
            <p className="mt-4 text-slate-300">
              CareerHelper helps students uncover stronger, more realistic paths to growth based on
              where they are right now.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pathCards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="group rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                      <Icon className="h-5 w-5 text-violet-300" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-300">
              Profile to plan
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Show the app what you want. Let AI organize the next move.
            </h2>
            <p className="mt-4 text-slate-300">
              Instead of generic job advice, CareerHelper turns your interests, experience level,
              and goals into a clearer action path.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Tell us your background and target role",
                "Upload a resume or complete your profile",
                "Get ranked opportunities and skill guidance",
                "Save a plan you can actually follow",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-sm font-semibold text-white ring-1 ring-white/10">
                    0{index + 1}
                  </div>
                  <div className="pt-1 text-sm leading-6 text-slate-200">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-[#0c172b] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Input</p>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                “I’m a sophomore CS major interested in AI, but I don’t have internship
                experience.”
              </p>
            </div>

            <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Output</p>
              <div className="mt-4 space-y-3">
                {[
                  "Start with a beginner ML project",
                  "Apply to 2 beginner-friendly hackathons",
                  "Improve resume bullets with stronger outcomes",
                  "Follow a 4-week career roadmap",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0c172b] p-5 md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <Brain className="h-5 w-5 text-violet-300" />
                <p className="text-sm font-medium text-white">Why this feels different</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Recommendations feel tailored, not random.",
                  "The UI focuses on next actions, not just inspiration.",
                  "Career guidance becomes scannable, concrete, and useful.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-6 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="paths" className="py-6 md:py-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
              Career tracks
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore paths tailored to how you want to grow
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-400/25 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{track.title}</h3>
                  <Lightbulb className="h-4 w-4 text-cyan-300" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{track.description}</p>
                <div className="mt-5 rounded-2xl border border-white/8 bg-[#0c172b] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Suggested first move
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{track.step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-300">
              AI-ranked opportunities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Make recommendations feel useful at a glance
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {jobCards.map((job) => (
              <div
                key={job.title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{job.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{job.company}</p>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {job.match}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
                    {job.type}
                  </span>
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
                    AI insight
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-white/8 bg-[#0c172b] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Why it matches
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{job.reason}</p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                    Save
                  </button>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-cyan-300">
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.18),rgba(34,211,238,0.08),rgba(255,255,255,0.04))] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
                  Final CTA
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Get a clearer career direction in minutes
                </h2>
                <p className="mt-4 text-slate-200">
                  Stop guessing what to build next. Let CareerHelper turn your experience,
                  interests, and goals into a focused action plan.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-slate-100"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  View Demo Plan
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}