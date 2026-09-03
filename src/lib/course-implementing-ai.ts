// Course track 8: "Implementing AI Into Your Life & Business" (Beginner–Intermediate).
// Compiled from the uploaded course outline: 8 modules + a 30-day-plan capstone.
import type { Level } from "./course-data";

export const implementingAiLevels: Level[] = [
  {
    id: "impL1",
    title: "Adoption Foundations",
    tier: "Free",
    ageRange: "All ages",
    badge: "Beginner",
    units: [
      {
        id: "imp1",
        title: "A People Problem, Not a Tech Problem",
        description: "Why AI rollouts really fail",
        lessons: [
          {
            id: "imp1l1",
            title: "Access Is Not Equipment",
            xp: 20,
            content:
              "The central thesis, taken from GitHub's AI Adoption Playbook: companies fail at AI adoption because they treat it like installing software when it is actually rewiring how people work. Buying licences is the easy part; the gap between purchased and used is almost always a change-management gap, not a capability gap. That gives you the diagnostic question used throughout this course: for any AI initiative, ask \"have we equipped people, or just given them access?\"",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why do most organisational AI rollouts fail?",
                options: [
                  "They treat adoption as installing software rather than changing how people work",
                  "The models are not good enough",
                  "Licences are too expensive",
                  "Employees are not technical enough",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The diagnostic question: have we ____ people, or just given them access?",
                answer: "equipped",
                wordBank: ["emailed", "surveyed", "hired"],
              },
              {
                type: "true-false",
                statement: "The gap between AI licences purchased and licences used is usually a capability gap.",
                answer: false,
                explanation: "It is almost always a change-management gap.",
              },
            ],
          },
        ],
      },
      {
        id: "imp2",
        title: "The Eight Pillars",
        description: "An operating model for AI fluency",
        lessons: [
          {
            id: "imp2l1",
            title: "Foundation First, Then Scale",
            xp: 20,
            content:
              "GitHub's operating model has eight pillars: AI Advocates, Clear Policies & Guardrails, Learning & Development, Data-Driven Metrics, a Dedicated Responsible Individual (DRI), Executive Support, Right-Fit Tooling, and Communities of Practice. The framing that matters most: executive support and clear policy are the foundation — nothing else works without safety to experiment — while advocates and communities of practice are what actually scales adoption peer-to-peer once that foundation exists.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each pillar to its role:",
                pairs: [
                  { term: "Executive support", definition: "Makes experimenting safe in the first place" },
                  { term: "Clear policies", definition: "Gives people a rule they can apply in the moment" },
                  { term: "AI advocates", definition: "Volunteer champions who demonstrate real use cases" },
                  { term: "DRI", definition: "One named person accountable for the programme" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "DRI stands for Dedicated Responsible ____.",
                answer: "Individual",
                wordBank: ["Initiative", "Investment", "Infrastructure"],
              },
              {
                type: "multiple-choice",
                question: "Which pillars actually scale adoption peer-to-peer?",
                options: [
                  "Advocates and communities of practice",
                  "Procurement and finance",
                  "Model benchmarking",
                  "Hardware upgrades",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "imp3",
        title: "Policy & Guardrails",
        description: "Rules people will actually follow",
        lessons: [
          {
            id: "imp3l1",
            title: "The Two-Tier Tooling Model",
            xp: 20,
            content:
              "A practical policy uses tiered tooling: Tier 1 covers fully vetted tools that are safe for sensitive data; Tier 2 is everything else — usable, but public data only. The insight worth stealing directly is that a simple two-tier default beats a long list of prohibited actions, because it gives people a rule they can apply in the moment (\"is this tool on the vetted list? No? Public data only.\") instead of a policy document they have to go and consult.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each tier to what it permits:",
                pairs: [
                  { term: "Tier 1", definition: "Fully vetted tools, safe for sensitive data" },
                  { term: "Tier 2", definition: "Everything else — usable, but public data only" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why does a two-tier default beat a long list of prohibited actions?",
                options: [
                  "People can apply it in the moment without consulting a document",
                  "It permits more tools overall",
                  "It removes the need for any policy owner",
                  "Lists of prohibitions are illegal",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "If a tool is not on the vetted list, use it with ____ data only.",
                answer: "public",
                wordBank: ["personal", "financial", "customer"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "impL2",
    title: "Scaling Adoption",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "imp4",
        title: "Advocates & Communities",
        description: "Peer-driven adoption",
        lessons: [
          {
            id: "imp4l1",
            title: "Volunteers Beat Nominees",
            xp: 25,
            content:
              "Build a volunteer network of internal champions — self-selected, not appointed. The playbook is explicit that a company-wide call for volunteers outperforms a formal nomination process. Structure communities of practice by audience (general, developer-focused, function-specific) rather than one undifferentiated channel. The underlying mechanism: peer-driven demonstration of real use cases converts sceptics faster than top-down training ever does.",
            exercises: [
              {
                type: "true-false",
                statement: "A formal nomination process produces stronger advocates than an open call for volunteers.",
                answer: false,
                explanation: "Self-selected volunteers outperform appointed nominees.",
              },
              {
                type: "fill-blank",
                prompt: "Structure communities of practice by ____ rather than as one undifferentiated channel.",
                answer: "audience",
                wordBank: ["seniority", "budget", "timezone"],
              },
              {
                type: "multiple-choice",
                question: "What converts sceptics fastest?",
                options: [
                  "Peers demonstrating real use cases from their own work",
                  "A mandatory training module",
                  "An executive email",
                  "A vendor webinar",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "imp5",
        title: "Measuring What Matters",
        description: "Adoption → engagement → impact",
        lessons: [
          {
            id: "imp5l1",
            title: "Breadth First, Impact Later",
            xp: 25,
            content:
              "The measurement model has three phases. Phase 1 is breadth: monthly active users and monthly engaged users. Phase 2 is depth: segmenting users into dedicated, occasional and \"tire kicker\" groups, with the explicit goal of moving people up that ladder. Phase 3 is business impact: correlating usage with lagging indicators such as cycle time, code churn, or whatever your team's real output metric is. The core lesson: don't try to prove ROI on day one — measure breadth first, impact later, in that order.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the measurement phases in order:",
                words: ["Measure", "breadth", "then", "depth", "then", "business", "impact"],
              },
              {
                type: "matching",
                instruction: "Match each phase to what it measures:",
                pairs: [
                  { term: "Phase 1 — breadth", definition: "Monthly active and engaged users" },
                  { term: "Phase 2 — depth", definition: "Segmenting dedicated, occasional and tire-kicker users" },
                  { term: "Phase 3 — impact", definition: "Correlating usage with real output metrics" },
                ],
              },
              {
                type: "true-false",
                statement: "You should prove ROI on day one of an AI programme.",
                answer: false,
                explanation: "Measure breadth first; impact is a later-phase question.",
              },
            ],
          },
        ],
      },
      {
        id: "imp6",
        title: "The 30/60/90-Day Plan",
        description: "A literal rollout template",
        lessons: [
          {
            id: "imp6l1",
            title: "First 30, First 90, Ongoing",
            xp: 25,
            content:
              "First 30 days: secure an executive sponsor, appoint a DRI, draft a v1 usage policy, instrument basic adoption metrics, announce the programme. First 90 days: launch an advocates programme, stand up communities of practice, build a centralised resource hub, start showcasing early wins, fold AI into new-hire onboarding. Ongoing: train the trainers, build a business-impact dashboard, and run regular qualitative surveys. This is usable as a literal project-planning template.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each activity to its phase:",
                pairs: [
                  { term: "First 30 days", definition: "Sponsor, DRI, v1 policy, metrics, announcement" },
                  { term: "First 90 days", definition: "Advocates, communities, resource hub, early wins" },
                  { term: "Ongoing", definition: "Train the trainers, impact dashboard, surveys" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "In the first 30 days you appoint a ____ so one person is accountable.",
                answer: "DRI",
                acceptableAnswers: ["dri", "dedicated responsible individual"],
                wordBank: ["vendor", "committee", "auditor"],
              },
              {
                type: "multiple-choice",
                question: "Which belongs in the first 90 days rather than the first 30?",
                options: [
                  "Launching an advocates programme and communities of practice",
                  "Drafting a v1 usage policy",
                  "Securing an executive sponsor",
                  "Announcing the programme",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "impL3",
    title: "Personal AI Fluency",
    tier: "Premium + Certificate",
    ageRange: "All ages",
    badge: "Advanced",
    units: [
      {
        id: "imp7",
        title: "Daily-Life Use Cases",
        description: "Building the habit, not just access",
        lessons: [
          {
            id: "imp7l1",
            title: "Moving Up Your Own Ladder",
            xp: 30,
            content:
              "The individual track applies the same \"don't just get access, build the habit\" logic to your own life. Start with concrete, low-stakes uses: AI as a first-pass editor or thinking partner rather than a final authority, and delegating well-scoped research and drafting tasks. Then apply the personal equivalent of user segmentation: notice whether you're a tire-kicker using AI occasionally for novelty, or actually integrating it into a recurring workflow — and decide what it would take to move up that ladder deliberately.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a good low-stakes starting point for personal AI use?",
                options: [
                  "A first-pass editor or thinking partner, not a final authority",
                  "Making high-stakes financial decisions",
                  "Signing legal documents",
                  "Replacing all your own writing unreviewed",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Someone who only uses AI occasionally for novelty is a ____ kicker.",
                answer: "tire",
                wordBank: ["habit", "power", "ladder"],
              },
              {
                type: "true-false",
                statement: "Personal fluency comes from having access to a tool, not from building a recurring habit.",
                answer: false,
                explanation: "Access is the easy half; the habit is what actually creates fluency.",
              },
            ],
          },
        ],
      },
      {
        id: "imp8",
        title: "Judgment & Knowing When Not To",
        description: "The guardrails half of fluency",
        lessons: [
          {
            id: "imp8l1",
            title: "When the Right Call Is No AI",
            xp: 30,
            content:
              "Don't put into a public AI tool anything you wouldn't want stored or reviewed by a third party — personal financial details, health information, confidential work material. \"Public tool, public data only\" is as good a personal rule as it is a corporate one. And there are situations where the right call is not to use AI at all: high-stakes decisions needing accountability, tasks where verification would cost more than doing it yourself, and anything where a wrong answer delivered confidently is more dangerous than no answer.",
            exercises: [
              {
                type: "multiple-choice",
                question: "When is the right call to not use AI at all?",
                options: [
                  "When verifying the answer would cost more than doing the task yourself",
                  "Whenever the task is boring",
                  "Whenever you are in a hurry",
                  "Whenever the tool is free",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The personal version of the corporate rule: public tool, ____ data only.",
                answer: "public",
                wordBank: ["private", "encrypted", "unlimited"],
              },
              {
                type: "true-false",
                statement: "A confidently wrong answer can be more dangerous than no answer at all.",
                answer: true,
                explanation: "Confidence without accuracy is exactly the failure mode judgment guards against.",
              },
            ],
          },
        ],
      },
      {
        id: "impC",
        title: "Capstone",
        description: "Write your own 30-day plan",
        lessons: [
          {
            id: "impCl1",
            title: "Capstone: Your 30-Day Plan",
            xp: 60,
            isQuiz: true,
            content:
              "Whether you are rolling this out for a team or just for yourself, write a one-page 30-day plan using the Module 6 template, scoped to your actual situation. Name one metric you will check in 30 days to know if it worked.",
            exercises: [
              {
                type: "short-answer",
                question: "Write your 30-day plan: what you'll do, in what order, and who is involved.",
                minWords: 40,
                referenceAnswer:
                  "Adapts the 30-day checklist (sponsor/owner, a simple policy, a metric, an announcement or personal commitment) to a real, specific situation.",
              },
              {
                type: "short-answer",
                question: "Name the one metric you'll check in 30 days, and what result would mean it worked.",
                minWords: 20,
                referenceAnswer:
                  "Names a single measurable indicator (weekly active use, tasks delegated, cycle time) with an explicit success threshold.",
              },
            ],
          },
        ],
      },
    ],
  },
];
