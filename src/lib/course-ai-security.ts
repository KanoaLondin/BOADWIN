// Course track 6: "AI Security & Red-Teaming" (Advanced).
// Compiled from the uploaded course outline: 8 modules + a capstone exercise.
import type { Level } from "./course-data";

export const aiSecurityLevels: Level[] = [
  {
    id: "secL1",
    title: "Attack Surface Basics",
    tier: "Free",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "sec1",
        title: "The Threat Landscape",
        description: "Why AI security is its own discipline",
        lessons: [
          {
            id: "sec1l1",
            title: "When Data Becomes Instructions",
            xp: 20,
            content:
              "AI security is a new discipline rather than a subset of application security because the input to a language model is unstructured natural language — which means the line between data and instructions, sacred in traditional security, collapses. The field references a few standard threat-modelling frameworks: OWASP's GenAI/LLM Top 10, MITRE ATLAS (an ATT&CK-style taxonomy for AI-specific attacks), and the NIST AI Risk Management Framework. The stakes rise with agents: they don't just output bad text, they take real actions — booking, buying, deploying code — turning a bad response into a real-world consequence.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes LLM security fundamentally different from classic app security?",
                options: [
                  "The boundary between data and instructions collapses in natural language input",
                  "Language models cannot be attacked at all",
                  "There are no threat-modelling frameworks",
                  "Attackers must have physical access",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each framework to what it provides:",
                pairs: [
                  { term: "OWASP GenAI/LLM Top 10", definition: "A ranked list of common LLM application risks" },
                  { term: "MITRE ATLAS", definition: "An ATT&CK-style taxonomy of AI-specific attacks" },
                  { term: "NIST AI RMF", definition: "A risk-management framework for AI systems" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "Agentic systems raise the stakes because they take real ____, not just produce text.",
                answer: "actions",
                acceptableAnswers: ["actions", "action"],
                wordBank: ["tokens", "guesses", "scores"],
              },
            ],
          },
        ],
      },
      {
        id: "sec2",
        title: "Prompt Injection",
        description: "Direct and indirect",
        lessons: [
          {
            id: "sec2l1",
            title: "The Attacker Never Has to Talk to You",
            xp: 20,
            content:
              "Direct injection is a user trying to override the system prompt (\"ignore previous instructions\"). Indirect injection hides malicious instructions inside content the model retrieves — a webpage, a document, an email — that the model treats as data but that is engineered to be read as commands. Indirect injection is the more dangerous category for agentic systems specifically, because the attacker never has to interact with your system directly; they just have to get their content into something your agent will read. Current best-known mitigations include input/output boundary marking and privilege separation between trusted instructions and untrusted content.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each injection type to its description:",
                pairs: [
                  { term: "Direct injection", definition: "The user themselves tries to override the system prompt" },
                  { term: "Indirect injection", definition: "Hidden instructions inside content the model retrieves" },
                  { term: "Boundary marking", definition: "Clearly separating untrusted content from instructions" },
                  { term: "Privilege separation", definition: "Untrusted content cannot access trusted capabilities" },
                ],
              },
              {
                type: "true-false",
                statement: "Indirect injection requires the attacker to interact with your system directly.",
                answer: false,
                explanation: "They only need their content to end up somewhere your agent will read.",
              },
              {
                type: "fill-blank",
                prompt: "Malicious instructions hidden in retrieved content are called ____ prompt injection.",
                answer: "indirect",
                wordBank: ["direct", "reverse", "passive"],
              },
            ],
          },
        ],
      },
      {
        id: "sec3",
        title: "Jailbreaking & Defenses",
        description: "Why single guardrails fail",
        lessons: [
          {
            id: "sec3l1",
            title: "Defense in Depth",
            xp: 20,
            content:
              "Common jailbreak families include role-play framing, hypothetical or fictional framing, encoding tricks, and multi-turn erosion of a model's guardrails. Single-turn defenses often fail against multi-turn attacks because each individual message looks harmless. The practical answer is defense in depth: no single guardrail is sufficient, so production systems layer input filtering, output filtering and monitoring rather than relying on the base model's training alone.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why do single-turn defenses often fail against multi-turn jailbreaks?",
                options: [
                  "Each individual message looks harmless; the attack builds across turns",
                  "Models forget the system prompt after one turn by design",
                  "Filters cannot read text",
                  "Multi-turn conversations are never logged",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Layering input filtering, output filtering and monitoring is called defense in ____.",
                answer: "depth",
                wordBank: ["place", "training", "context"],
              },
              {
                type: "true-false",
                statement: "The base model's safety training alone is enough for a production system.",
                answer: false,
                explanation: "It is one layer; production systems layer several controls around it.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "secL2",
    title: "System-Level Attacks",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Advanced",
    units: [
      {
        id: "sec4",
        title: "Data Leakage & Model Extraction",
        description: "Getting secrets out of a model",
        lessons: [
          {
            id: "sec4l1",
            title: "Two Kinds of Extraction",
            xp: 25,
            content:
              "There are two distinct risks. First, extracting sensitive data the model was trained on or given in context — system prompt leakage and training data regurgitation. Second, extracting the model's behaviour itself, by querying it repeatedly to approximate or steal its capabilities. Practical tests for system-prompt leakage should be part of any assessment, and \"just tell it not to reveal the prompt\" is a weak control on its own: treat the system prompt as something that may leak, and keep real secrets out of it.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each risk to what an attacker gains:",
                pairs: [
                  { term: "System prompt leakage", definition: "The hidden instructions configuring your app" },
                  { term: "Training data regurgitation", definition: "Sensitive content the model memorised" },
                  { term: "Model extraction", definition: "An approximation of the model's own behaviour" },
                ],
              },
              {
                type: "true-false",
                statement: "Instructing the model not to reveal its system prompt is a sufficient control.",
                answer: false,
                explanation: "It is a weak control alone — never place real secrets in the system prompt.",
              },
              {
                type: "fill-blank",
                prompt: "Querying a model repeatedly to approximate its capabilities is called model ____.",
                answer: "extraction",
                wordBank: ["alignment", "evaluation", "compression"],
              },
            ],
          },
        ],
      },
      {
        id: "sec5",
        title: "RAG & Supply Chain",
        description: "You inherit what you retrieve",
        lessons: [
          {
            id: "sec5l1",
            title: "Poisoned Documents and Unvetted Tools",
            xp: 25,
            content:
              "Retrieval-augmented systems inherit the trust level of everything they retrieve — a poisoned document in a knowledge base becomes an attack vector the moment it is retrieved into context. This covers RAG-specific injection and vector store poisoning, plus the broader supply-chain risk of unvetted third-party tools, plugins and MCP servers. An agent is only as trustworthy as every tool it has been given permission to call.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does a RAG system inherit from the documents it retrieves?",
                options: [
                  "Their trust level — a poisoned document becomes an attack vector",
                  "Their file format only",
                  "Nothing; retrieved text is inert",
                  "Their authorship metadata only",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "An agent is only as trustworthy as every ____ it has permission to call.",
                answer: "tool",
                wordBank: ["prompt", "user", "token"],
              },
              {
                type: "true-false",
                statement: "Adding an unvetted third-party plugin or MCP server is a supply-chain risk.",
                answer: true,
                explanation: "Its capabilities and its returned content both become part of your trust boundary.",
              },
            ],
          },
        ],
      },
      {
        id: "sec6",
        title: "MCP & Tool-Protocol Exploits",
        description: "The newest attack surface",
        lessons: [
          {
            id: "sec6l1",
            title: "Confused Deputies and Crafted Tool Descriptions",
            xp: 25,
            content:
              "As MCP standardises how agents connect to tools, it also standardises how a malicious or compromised tool server can attack an agent: through crafted tool descriptions that steer the model, unexpected return values that carry instructions, or confused-deputy scenarios where an agent is tricked into using a legitimate tool for an illegitimate purpose. This complements the MCP module in the AI Agents course — same protocol, viewed from the attacker's side.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a confused-deputy scenario in an agentic system?",
                options: [
                  "The agent is tricked into using a legitimate tool for an illegitimate purpose",
                  "Two agents refuse to talk to each other",
                  "A tool server crashes under load",
                  "The user forgets which tool to use",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A malicious tool server can attack an agent through crafted tool ____ and return values.",
                answer: "descriptions",
                acceptableAnswers: ["descriptions", "description"],
                wordBank: ["licenses", "icons", "hashes"],
              },
              {
                type: "true-false",
                statement: "Standardising tool access with MCP also standardises part of the attack surface.",
                answer: true,
                explanation: "A shared protocol means a shared set of exploit patterns.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "secL3",
    title: "Professional Red-Teaming",
    tier: "Premium + Certificate",
    ageRange: "Adults",
    badge: "Master",
    units: [
      {
        id: "sec7",
        title: "Red Team Methodology",
        description: "Structured engagements, not random pokes",
        lessons: [
          {
            id: "sec7l1",
            title: "Scope, Model, Test, Prioritise",
            xp: 30,
            content:
              "A structured red-team engagement means scoping the work, threat-modelling the specific system rather than attacks in general, combining manual and automated testing, and classifying severity so findings become a prioritised fix list instead of an undifferentiated pile of \"vulnerabilities\". Open-source tooling in this space (frameworks such as PyRIT, Garak and promptfoo are commonly cited for automated adversarial testing) should be evaluated for current version and maintenance status before you adopt any specific tool.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the red-team engagement steps in order:",
                words: ["Scope", "the", "engagement", "threat", "model", "the", "system", "run", "tests", "classify", "severity"],
              },
              {
                type: "multiple-choice",
                question: "Why classify severity of findings?",
                options: [
                  "So results become a prioritised fix list rather than an undifferentiated pile",
                  "So the report is longer",
                  "So low-severity findings can be hidden",
                  "So the tooling runs faster",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Threat model the ____ system, not attacks in general.",
                answer: "specific",
                wordBank: ["fastest", "cheapest", "public"],
              },
            ],
          },
        ],
      },
      {
        id: "sec8",
        title: "Governance & Disclosure",
        description: "The professional container",
        lessons: [
          {
            id: "sec8l1",
            title: "Authorised Testing Only",
            xp: 30,
            content:
              "The professional and legal container around everything else in this course: authorised-testing-only ethics, responsible disclosure norms when a real vulnerability is found, and the emerging regulatory landscape — the EU AI Act's risk-tiered obligations being the most concrete example so far. Red-teaming without explicit authorisation is not a grey area; it is the line between security research and unauthorised access.",
            exercises: [
              {
                type: "true-false",
                statement: "Testing a system you are not authorised to test is a grey area.",
                answer: false,
                explanation: "It is the line between security research and unauthorised access.",
              },
              {
                type: "fill-blank",
                prompt: "Reporting a real vulnerability through agreed channels is called responsible ____.",
                answer: "disclosure",
                wordBank: ["deployment", "escalation", "monitoring"],
              },
              {
                type: "multiple-choice",
                question: "What does the EU AI Act's approach illustrate?",
                options: [
                  "Risk-tiered regulatory obligations for AI systems",
                  "A ban on all AI research",
                  "A single global AI licence",
                  "A benchmark leaderboard",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "secC",
        title: "Capstone Exercise",
        description: "Write a threat model",
        lessons: [
          {
            id: "secCl1",
            title: "Capstone: Threat Model an Agent",
            xp: 60,
            isQuiz: true,
            content:
              "Pick a system from your AI Agents capstone, or a public demo agent. Write a threat model: list its tools, what each tool can do, and for each one, one plausible way it could be misused via prompt injection or tool misuse. You are not expected to actually attack anything — the deliverable is the threat model itself.",
            exercises: [
              {
                type: "short-answer",
                question: "List the agent's tools and what each one is able to do.",
                minWords: 40,
                referenceAnswer:
                  "Enumerates each tool with its real capability and blast radius (read-only vs. write vs. irreversible/external side effects).",
              },
              {
                type: "short-answer",
                question: "For each tool, give one plausible misuse via prompt injection or tool misuse.",
                minWords: 40,
                referenceAnswer:
                  "Pairs each tool with a concrete abuse path — e.g. injected content in a retrieved page instructing the file writer to overwrite config — and notes a mitigation.",
              },
            ],
          },
        ],
      },
    ],
  },
];
