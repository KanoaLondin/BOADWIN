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
  {
    id: "impL4",
    title: "Choosing & Assisting",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "imp9",
        title: "Finding What's Worth Automating",
        description: "Map and score before you build",
        lessons: [
          {
            id: "imp9l1",
            title: "Map Your Repetitive Work",
            xp: 25,
            content:
              "Adoption starts with an inventory, not a tool. Spend a week writing down every task you do at least weekly, then sort each one into six recurring shapes: collecting information, checking something against a rule, writing a response, updating a record, notifying someone, and preparing a decision for another person. Almost every automatable task is one of those six wearing different clothes. The Anthropic Economic Index makes the same point from the data side — AI usage clusters heavily in these information-handling shapes rather than in whole job titles. Map first; you cannot score or pilot work you have never written down.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the first step of the adoption framework?",
                options: [
                  "Listing the tasks you do at least weekly",
                  "Buying licences for a promising tool",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each task to its recurring shape:",
                pairs: [
                  { term: "Pulling numbers from three reports", definition: "Collecting information" },
                  { term: "Answering a routine customer email", definition: "Writing a response" },
                  { term: "Logging an expense in the system", definition: "Updating a record" },
                  { term: "Confirming a request meets policy", definition: "Checking against a rule" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "Write down every task you do at least ____ before scoring anything.",
                answer: "weekly",
                wordBank: ["yearly", "hourly", "once"],
              },
            ],
          },
          {
            id: "imp9l2",
            title: "Score Before You Automate",
            xp: 25,
            content:
              "Score each mapped task on five dimensions: frequency (how often it happens), time cost (how long it takes each time), delay cost (what it costs when it waits), reviewability (how easily a human can check the output), and data readiness (whether the information it needs is already accessible). The counter-intuitive result is that your best first candidate is not the biggest or scariest task. It is frequent, visible, and moderate risk — frequent so you learn fast, visible so the win is obvious to others, moderate risk so a mistake is recoverable. The GitHub AI Adoption Playbook makes the same argument about early wins: a small proven success buys permission for the larger ones.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes the best first automation candidate?",
                options: [
                  "Frequent, visible and moderate risk",
                  "The largest and riskiest task you have",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each scoring dimension to what it asks:",
                pairs: [
                  { term: "Frequency", definition: "How often does this happen?" },
                  { term: "Delay cost", definition: "What does it cost when this waits?" },
                  { term: "Reviewability", definition: "Can a human easily check the output?" },
                  { term: "Data readiness", definition: "Is the needed information already accessible?" },
                ],
              },
              {
                type: "true-false",
                statement: "You should automate your single biggest, most complex task first.",
                answer: false,
                explanation: "Start frequent, visible and moderate risk — big and scary comes later.",
              },
            ],
          },
          {
            id: "imp9l3",
            title: "This Works at Home Too",
            xp: 25,
            content:
              "Map-and-score is not an office-only technique. Run the identical five scores over personal life and the same pattern appears: replying to routine email, planning meals for the week, categorising spending, and coordinating family schedules are all frequent, moderate risk and easy to review. A wrong meal suggestion costs you nothing; a wrong tax filing costs a lot — so the first one is a good pilot and the second one is not. The scoring language is what transfers. Treat the personal version as practice: it teaches you what AI is reliable at before you stake work outcomes on the answer.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why is weekly meal planning a good personal pilot?",
                options: [
                  "It is frequent, low stakes and easy to review",
                  "It is the most complicated thing in the house",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "The five scoring dimensions only apply to workplace tasks.",
                answer: false,
                explanation: "The same scores apply to email, meals, budgeting and scheduling.",
              },
              {
                type: "fill-blank",
                prompt: "A task with a high cost of being wrong, like a tax filing, is a poor first ____.",
                answer: "pilot",
                wordBank: ["record", "score", "habit"],
              },
            ],
          },
          {
            id: "imp9l4",
            title: "Start With One Thing",
            xp: 25,
            content:
              "The most common way adoption dies is enthusiasm: ten tasks started at once, none finished. Ten parallel pilots split your attention ten ways, and when results are mixed you cannot tell which change caused which outcome. Salesforce Ventures' AI Implementation Playbook and GitHub's playbook converge here — a single narrow pilot with a named task, a named owner and a visible result outperforms a broad rollout every time. Pick one task from your scored list. Finish it. Then let the second one borrow the credibility the first one earned.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why does automating ten tasks at once usually fail?",
                options: [
                  "Attention is split and you cannot tell which change caused which result",
                  "AI tools charge extra for parallel tasks",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put the opening sequence in order:",
                words: ["Map", "the", "tasks", "score", "them", "then", "pilot", "one"],
              },
              {
                type: "fill-blank",
                prompt: "A single narrow pilot beats a ____ rollout.",
                answer: "broad",
                wordBank: ["paid", "slow", "quiet"],
              },
            ],
          },
        ],
      },
      {
        id: "imp10",
        title: "Assist, Don't Automate Yet",
        description: "Draft-and-approve before autonomy",
        lessons: [
          {
            id: "imp10l1",
            title: "Human-Reviewed AI First",
            xp: 25,
            content:
              "Step three of the framework is the one people skip: assist, don't automate yet. In the assist stage AI drafts and a person approves — nothing leaves, sends, pays or deletes without a human pressing the button. This is not timidity, it is data collection. Every approval or correction tells you where the system is trustworthy, and you get that information without paying for the mistakes. Autonomy is something a process earns after weeks of clean drafts, not something you grant on day one.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does the assist stage actually give you?",
                options: [
                  "Evidence about where the AI is trustworthy, without paying for mistakes",
                  "A faster way to skip human review entirely",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "In the draft-and-approve model, AI drafts and a person ____.",
                answer: "approves",
                wordBank: ["watches", "ignores", "pays"],
              },
              {
                type: "true-false",
                statement: "Autonomy should be granted on day one so the pilot moves quickly.",
                answer: false,
                explanation: "Autonomy is earned after the assist stage shows consistently clean output.",
              },
            ],
          },
          {
            id: "imp10l2",
            title: "Reliable Here, Guardrails There",
            xp: 25,
            content:
              "You cannot predict the edges of reliability from a product page; you learn them by watching. Across the assist stage a consistent shape appears: AI is strong at summarising, restructuring, drafting, classifying and extracting from text you supply, and weak at anything needing a fact it was never given, a current number, or accountability for a judgement call. Keep a running note of every correction you make. After two weeks that note is your real guardrail policy — written from observed behaviour rather than guesswork, and specific to your own work.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each task to how much oversight it needs:",
                pairs: [
                  { term: "Summarising a document you supplied", definition: "Generally reliable" },
                  { term: "Quoting a current price from memory", definition: "Needs verification" },
                  { term: "Reformatting notes into bullets", definition: "Generally reliable" },
                  { term: "Making an accountable final decision", definition: "Needs a human" },
                ],
              },
              {
                type: "multiple-choice",
                question: "How do you learn where the AI needs guardrails?",
                options: [
                  "By logging corrections during the assist stage",
                  "By guessing upfront from the vendor's description",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Your running note of ____ becomes your real guardrail policy.",
                answer: "corrections",
                wordBank: ["licences", "prompts", "meetings"],
              },
            ],
          },
          {
            id: "imp10l3",
            title: "Everyday Assist Use Cases",
            xp: 25,
            content:
              "Four personal assist patterns are worth building first because they repeat and are easy to check. Meeting summaries: paste the notes or transcript, get a draft summary with action items, and correct it before circulating. First-pass email replies: AI writes the obvious response, you edit tone and facts. Quick research: use it to orient and generate leads, then verify anything you would be embarrassed to repeat. Scheduling suggestions: let it propose slots and sequencing while you confirm. In all four, the human step is deliberate, not decorative.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the right way to use AI for quick research?",
                options: [
                  "Use it to orient, then verify anything you would repeat to someone",
                  "Take the answer as final since it sounds confident",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each everyday assist case to its human step:",
                pairs: [
                  { term: "Meeting summary", definition: "Correct the action items before circulating" },
                  { term: "First-pass email reply", definition: "Edit tone and check the facts" },
                  { term: "Scheduling suggestion", definition: "Confirm the proposed slot" },
                ],
              },
              {
                type: "true-false",
                statement: "In assist use cases the human review step is optional decoration.",
                answer: false,
                explanation: "The review step is the mechanism — it is what makes assist safe.",
              },
            ],
          },
          {
            id: "imp10l4",
            title: "Work Assist Use Cases",
            xp: 25,
            content:
              "The workplace equivalents share one trait: high volume, structured input, reviewable output. Support-ticket triage — AI classifies and suggests a category and draft reply, an agent approves. Invoice and receipt extraction — AI pulls amounts, dates and vendors into fields a person confirms before posting. SOP documentation — AI turns a subject-matter expert's messy explanation into a structured first draft the expert then edits. Notice that none of these replace a role; each removes the dull first eighty per cent of a task and leaves the judgement with the person.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each work assist case to its output:",
                pairs: [
                  { term: "Support-ticket triage", definition: "A suggested category and draft reply" },
                  { term: "Invoice extraction", definition: "Amounts, dates and vendors in fields to confirm" },
                  { term: "SOP documentation", definition: "A structured first draft an expert edits" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What do good work assist cases have in common?",
                options: [
                  "High volume, structured input and reviewable output",
                  "They fully replace a job role",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Assist removes the dull first part of a task and leaves the ____ with the person.",
                answer: "judgement",
                wordBank: ["typing", "software", "budget"],
              },
            ],
          },
          {
            id: "imp10l5",
            title: "When Assist Isn't Enough",
            xp: 25,
            content:
              "Some tasks are not one draft waiting for approval. If the work needs several steps in sequence, a decision about which path to take, or calls out to live systems before an answer exists, draft-and-approve is the wrong shape — you need a workflow or an agent. The signals are concrete: you find yourself pasting the output of one prompt into the next, the right next step depends on what the last step returned, or the task cannot start until something is looked up. That is agent territory, and it is taught properly in the AI Agents & Agentic Workflows course rather than repeated here. Recognising the boundary is the skill this lesson gives you.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which signal means a task has outgrown draft-and-approve?",
                options: [
                  "The right next step depends on what the previous step returned",
                  "The draft is longer than one paragraph",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Repeatedly pasting one prompt's output into the next prompt is a sign you need a workflow.",
                answer: true,
                explanation: "Manual chaining is exactly the job a workflow or agent should hold.",
              },
              {
                type: "fill-blank",
                prompt: "Multi-step, path-choosing work belongs to a workflow or an ____.",
                answer: "agent",
                wordBank: ["email", "invoice", "owner"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "impL5",
    title: "Rollout & Routine",
    tier: "Premium + Certificate",
    ageRange: "Teens & adults",
    badge: "Advanced",
    units: [
      {
        id: "imp11",
        title: "Rolling It Out",
        description: "From pilot to proven process",
        lessons: [
          {
            id: "imp11l1",
            title: "Add Integration Gradually",
            xp: 30,
            content:
              "Step four is integration, and its rule is one connection at a time. Wiring the calendar, the inbox, the CRM and the billing system together on day one is the most common failure mode in the Salesforce Ventures playbook, because when something breaks you have no idea which connection broke it. Get the core workflow trustworthy in isolation first. Then add a single system, watch it for a week, and only then add the next. Slow integration is not caution for its own sake — it is what keeps every failure diagnosable.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why connect one system at a time?",
                options: [
                  "So every failure stays diagnosable",
                  "Because tools charge per connection",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Connecting every system on day one is the recommended approach.",
                answer: false,
                explanation: "It is the most common failure mode — integrate gradually instead.",
              },
              {
                type: "fill-blank",
                prompt: "Make the core workflow ____ before adding any integration.",
                answer: "trustworthy",
                wordBank: ["public", "automatic", "cheaper"],
              },
            ],
          },
          {
            id: "imp11l2",
            title: "The 30-Day Pilot",
            xp: 30,
            content:
              "A pilot with no end date is not a pilot, it is a hobby. Use four weeks. Week 1: select the task and document exactly how it is done today, so you have a baseline to compare against. Week 2: run it AI-assisted with a human reviewing every single output. Week 3: collect feedback from everyone touched by the change, including the people downstream of the output. Week 4: measure against the week-1 baseline and make an explicit decision — adopt, adjust, or abandon. Naming \"abandon\" as a legitimate outcome is what keeps the other two honest.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each pilot week to its job:",
                pairs: [
                  { term: "Week 1", definition: "Select the task and document the baseline" },
                  { term: "Week 2", definition: "Run it assisted, reviewing every output" },
                  { term: "Week 3", definition: "Collect feedback from everyone affected" },
                  { term: "Week 4", definition: "Measure and decide: adopt, adjust or abandon" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why name 'abandon' as a legitimate week-4 outcome?",
                options: [
                  "It keeps the adopt and adjust decisions honest",
                  "It lets you skip measuring altogether",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put the pilot weeks in order:",
                words: ["Document", "then", "test", "then", "feedback", "then", "decide"],
              },
            ],
          },
          {
            id: "imp11l3",
            title: "Remove the Old Step",
            xp: 30,
            content:
              "Step five is the one almost everyone forgets: once the AI-assisted way is proven, retire the manual process. Teams that keep both running get the worst of both worlds — the new work of reviewing AI output stacked on top of the old work it was meant to replace — and then conclude that AI did not save any time. Of course it did not; nothing was removed. Removal needs to be explicit and dated: this spreadsheet stops being maintained on the fifteenth. Until an old step is actually retired, the savings exist only on paper.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What happens when you run the old and new processes forever?",
                options: [
                  "You double the work instead of saving time",
                  "You halve the review burden",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Savings are real as soon as the AI-assisted version works, even if the manual step continues.",
                answer: false,
                explanation: "Until the old step is retired, the saving exists only on paper.",
              },
              {
                type: "fill-blank",
                prompt: "Retiring the manual process should be explicit and ____.",
                answer: "dated",
                wordBank: ["private", "optional", "reversible"],
              },
            ],
          },
          {
            id: "imp11l4",
            title: "Give It an Owner",
            xp: 30,
            content:
              "Every AI-assisted process needs one named person responsible for reviewing its output and maintaining it — the same Dedicated Responsible Individual idea from Module 5, applied at the level of a single workflow. Without an owner, drift is silent: the prompt stops matching a changed policy, the source data moves, quality slips a little each month and nobody is watching the trend. Ownership does not mean doing the work; it means someone checks a sample regularly and has the authority to pause the process when it goes wrong.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does owning an AI-assisted process mean?",
                options: [
                  "Checking a sample regularly and being able to pause it",
                  "Personally doing every step by hand",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Without an owner, quality problems appear as silent ____.",
                answer: "drift",
                wordBank: ["profit", "consent", "backup"],
              },
              {
                type: "true-false",
                statement: "A shared, unnamed responsibility is enough to keep a process healthy.",
                answer: false,
                explanation: "One named individual is accountable — that is the DRI principle.",
              },
            ],
          },
        ],
      },
      {
        id: "imp12",
        title: "Making It Stick",
        description: "Measure, pull back, routinise",
        lessons: [
          {
            id: "imp12l1",
            title: "Track What's Actually Working",
            xp: 30,
            content:
              "Measurement should cost less than the thing it measures. For a one-person task, two honest numbers are enough: minutes spent before versus after, and how often the output needed correction. Write them on the same page as the process. For a team, GitHub's playbook order still applies — breadth first, then depth, then business impact — but do not build a dashboard for a task that takes fifteen minutes a week. The failure mode here is over-instrumentation: the metrics project becomes bigger than the saving it was meant to track.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What are two honest measures for a one-person task?",
                options: [
                  "Minutes before versus after, and how often output needed correction",
                  "Total tokens consumed and licences purchased",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A full metrics dashboard is warranted for a task that takes fifteen minutes a week.",
                answer: false,
                explanation: "Measurement should cost less than the thing it measures.",
              },
              {
                type: "fill-blank",
                prompt: "For teams the order is breadth, then depth, then business ____.",
                answer: "impact",
                wordBank: ["licences", "meetings", "hiring"],
              },
            ],
          },
          {
            id: "imp12l2",
            title: "Know When to Pull Back",
            xp: 30,
            content:
              "Sometimes the right move is more human oversight, not less. The signals are visible if you are watching: corrections becoming more frequent rather than less, complaints arriving from the people downstream, the underlying policy or data changing, or an error class you have never seen before. When those appear, put the process back into assist mode and review every output again until it settles. Pulling back is not a failed rollout — it is the review system doing exactly the job you built it for, and it is far cheaper than discovering the same drift three months later.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which signal means a process needs more oversight again?",
                options: [
                  "Corrections becoming more frequent rather than less",
                  "The process has been running for a long time",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Returning a process to human review is a sign the rollout failed.",
                answer: false,
                explanation: "It is the review system working as designed.",
              },
              {
                type: "fill-blank",
                prompt: "When warning signs appear, put the process back into ____ mode.",
                answer: "assist",
                wordBank: ["silent", "auto", "demo"],
              },
            ],
          },
          {
            id: "imp12l3",
            title: "Make It Routine",
            xp: 30,
            content:
              "The final move is to stop treating AI-assisted work as a project. A project has a launch, a champion and an end; a routine has a slot in your week. Fold the review into an existing rhythm — the Monday planning block, the weekly team check-in — so it happens without anyone deciding to make it happen. That is also where the whole framework closes its loop: map, score, assist, integrate, remove the old step, and then quietly run the next candidate from your list through the same five steps. Adoption is not an event; it is the habit of doing that repeatedly.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What distinguishes a routine from a project?",
                options: [
                  "A routine has a recurring slot; a project has an end",
                  "A routine needs a bigger budget",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put the five framework steps in order:",
                words: ["Map", "score", "assist", "integrate", "remove"],
              },
              {
                type: "fill-blank",
                prompt: "Fold the review into an existing weekly ____ so it happens automatically.",
                answer: "rhythm",
                wordBank: ["budget", "contract", "survey"],
              },
            ],
          },
        ],
      },
    ],
  },
];
