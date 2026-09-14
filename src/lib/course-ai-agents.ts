// Course track 4: "AI Agents & Agentic Workflows" (Intermediate).
// Compiled from the uploaded course outline: 8 modules + a capstone reflection.
import type { Level } from "./course-data";

export const aiAgentsLevels: Level[] = [
  {
    id: "agL1",
    title: "Agent Foundations",
    tier: "Free",
    ageRange: "Teens & adults",
    badge: "Beginner",
    units: [
      {
        id: "ag1",
        title: "What Is an Agent?",
        description: "From chatbots to autonomous systems",
        lessons: [
          {
            id: "ag1l1",
            title: "From Chatbots to Autonomous Systems",
            xp: 20,
            content:
              "A chatbot answers; an agent does. The defining feature of an agent isn't intelligence, it's a loop: the system observes its environment, decides on an action, executes it through a tool, and observes the result — repeating until the goal is met or it gives up. There is a spectrum here: a \"workflow\" is a fixed sequence a model fills in, while an \"autonomous agent\" decides the sequence itself. Key idea: more autonomy means more capability AND more ways to fail. Managing that trade-off is what the rest of this course is about.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What actually defines an agent, according to this module?",
                options: [
                  "A loop of observing, deciding, acting and observing again",
                  "Being a bigger model than a chatbot",
                  "Never needing a language model",
                  "Answering in longer paragraphs",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A fixed sequence that a model simply fills in is called a ____, not an autonomous agent.",
                answer: "workflow",
                wordBank: ["benchmark", "rubric", "protocol"],
              },
              {
                type: "true-false",
                statement: "More autonomy gives an agent more capability without adding new ways to fail.",
                answer: false,
                explanation: "Autonomy adds capability and failure modes together — that trade-off is the core theme.",
              },
            ],
          },
        ],
      },
      {
        id: "ag2",
        title: "The Agent Loop",
        description: "Perceive → Plan → Act → Observe",
        lessons: [
          {
            id: "ag2l1",
            title: "ReAct: Reason and Act",
            xp: 20,
            content:
              "The ReAct pattern (Reason + Act) is the backbone of most agents: the model narrates its reasoning, chooses a tool call, receives the result, and reasons again. Planning strategies vary — a single-shot plan made up front, versus re-planning after every step. You also have to decide when to let an agent run long chains autonomously and when to checkpoint with a human. Once loops get long, context window management becomes the central engineering problem: every round-trip adds to the context, and stale or irrelevant history degrades decision quality.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each stage of the agent loop to what happens there:",
                pairs: [
                  { term: "Perceive", definition: "Take in the current state of the environment" },
                  { term: "Plan", definition: "Reason about which step to take next" },
                  { term: "Act", definition: "Execute a tool call in the real system" },
                  { term: "Observe", definition: "Read the result and feed it back into reasoning" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "The ____ pattern interleaves the model's reasoning with its tool calls.",
                answer: "ReAct",
                acceptableAnswers: ["react", "reason and act"],
                wordBank: ["RAG", "RLHF", "MCP"],
              },
              {
                type: "multiple-choice",
                question: "Why does context management become the central problem in long agent loops?",
                options: [
                  "Each round-trip adds context, and stale history degrades decision quality",
                  "Models refuse to answer after ten turns",
                  "Tools stop returning results after a while",
                  "Long loops always cost nothing extra",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "ag3",
        title: "Tool Use & Function Calling",
        description: "Giving a model hands",
        lessons: [
          {
            id: "ag3l1",
            title: "Designing Tools a Model Can Use",
            xp: 20,
            content:
              "Giving a model tools means defining a tool schema — a name, a description, and parameters — clear enough that the model can reliably choose between them. Tool errors should be handled gracefully: a failed tool call is not a wasted turn if the agent knows how to recover. Write tool descriptions as carefully as you would write documentation for a new hire, because the description is the model's only way to understand what a tool does. Ambiguous tool definitions are one of the most common causes of an agent picking the wrong action.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why should a tool description be written as carefully as onboarding documentation?",
                options: [
                  "It is the model's only source of understanding about what the tool does",
                  "Users read tool descriptions more than the app itself",
                  "Long descriptions make the model faster",
                  "Descriptions replace the need for parameters",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A tool ____ defines the tool's name, description and parameters.",
                answer: "schema",
                wordBank: ["hook", "trace", "policy"],
              },
              {
                type: "true-false",
                statement: "A failed tool call is always a wasted turn.",
                answer: false,
                explanation: "Not if the agent can read the error and recover — graceful error handling is part of tool design.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agL2",
    title: "Building Real Agents",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "ag4",
        title: "Model Context Protocol (MCP)",
        description: "Standardizing tool access",
        lessons: [
          {
            id: "ag4l1",
            title: "One Protocol, Many Tools",
            xp: 25,
            content:
              "MCP is to AI tools what HTTP was to documents — a common protocol so any model can talk to any tool server without custom integration work. It uses a client/server architecture. MCP emerged because every AI product was building bespoke integrations to the same handful of services. An MCP server exposes resources, tools and prompts. When deciding whether to build one for your own internal systems, the question is whether more than one AI client will ever need that access.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What problem does MCP primarily solve?",
                options: [
                  "Every AI product having to build its own bespoke integration for the same services",
                  "Models being too slow at generating text",
                  "Training data being too small",
                  "Users forgetting their passwords",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each MCP concept to its meaning:",
                pairs: [
                  { term: "MCP server", definition: "Exposes resources, tools and prompts to clients" },
                  { term: "MCP client", definition: "The AI application that connects and calls them" },
                  { term: "Resource", definition: "Data the server makes readable to the model" },
                  { term: "Tool", definition: "An action the model can ask the server to perform" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "MCP is a common ____ so any model can talk to any tool server.",
                answer: "protocol",
                wordBank: ["dataset", "checkpoint", "rubric"],
              },
            ],
          },
        ],
      },
      {
        id: "ag5",
        title: "Memory & Context",
        description: "Remembering across sessions",
        lessons: [
          {
            id: "ag5l1",
            title: "Three Kinds of Agent Memory",
            xp: 25,
            content:
              "Long-running agents need memory that outlives a single context window. Working memory is what is in-context right now. Episodic memory is logs of past sessions the agent can retrieve. Persistent memory is durable material — an instructions file or a vector store — that shapes every session. This is also where context engineering separates from prompt engineering: deciding WHAT enters the context window at each step, not just how it is phrased.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each memory type to its description:",
                pairs: [
                  { term: "Working memory", definition: "What is in the context window right now" },
                  { term: "Episodic memory", definition: "Retrievable logs of past sessions" },
                  { term: "Persistent memory", definition: "Durable files or stores that shape every session" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "Deciding what enters the context window at each step is called ____ engineering.",
                answer: "context",
                wordBank: ["prompt", "reverse", "feature"],
              },
              {
                type: "true-false",
                statement: "Context engineering is just another name for prompt engineering.",
                answer: false,
                explanation: "Prompt engineering is how something is phrased; context engineering is what gets included at all.",
              },
            ],
          },
        ],
      },
      {
        id: "ag6",
        title: "Multi-Agent Orchestration",
        description: "When one agent isn't enough",
        lessons: [
          {
            id: "ag6l1",
            title: "Orchestrators, Critics and Fan-Out",
            xp: 25,
            content:
              "Multi-agent patterns include orchestrator/worker (a lead agent delegates subtasks to specialized subagents), debate or critique (one agent's output is reviewed by another before acting), and parallel fan-out (independent subagents work simultaneously and results are merged). These come at a real cost: coordination overhead, compounding error rates and token spend. Often a single well-prompted agent beats a complex multi-agent pipeline — reach for multiple agents when the subtasks are genuinely independent or need different tools.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each orchestration pattern to what it does:",
                pairs: [
                  { term: "Orchestrator/worker", definition: "A lead agent delegates subtasks to specialists" },
                  { term: "Debate / critique", definition: "One agent reviews another's output before acting" },
                  { term: "Parallel fan-out", definition: "Independent subagents run at once and results merge" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which is a real cost of multi-agent systems?",
                options: [
                  "Coordination overhead, compounding errors and token cost",
                  "Losing the ability to use tools",
                  "Making context windows infinite",
                  "Removing the need for evaluation",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A complex multi-agent pipeline is always better than one well-prompted agent.",
                answer: false,
                explanation: "Often the single agent wins once you account for coordination cost and error compounding.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agL3",
    title: "Shipping Agents Safely",
    tier: "Premium + Certificate",
    ageRange: "Teens & adults",
    badge: "Advanced",
    units: [
      {
        id: "ag7",
        title: "Build Your First Agent",
        description: "A guided hands-on project",
        lessons: [
          {
            id: "ag7l1",
            title: "Two or Three Tools, One Real Task",
            xp: 30,
            content:
              "A guided project: build a small agent with two or three tools — for example web search, a calculator and a file writer — that completes a multi-step research task end to end. You define the system prompt, the tool schemas, the loop itself and a stopping condition so the agent cannot spin forever. The deliverable is a working agent plus a short trace review where you identify where it made good decisions and where its choices were questionable.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the build steps in order:",
                words: ["Define", "the", "system", "prompt", "then", "tool", "schemas", "then", "the", "loop", "then", "a", "stopping", "condition"],
              },
              {
                type: "fill-blank",
                prompt: "Without a ____ condition, an agent loop can run forever.",
                answer: "stopping",
                wordBank: ["scoring", "training", "sampling"],
              },
              {
                type: "multiple-choice",
                question: "What is a trace review for?",
                options: [
                  "Inspecting the agent's step-by-step decisions to judge its process, not just the answer",
                  "Making the agent run faster",
                  "Replacing the system prompt",
                  "Deleting the agent's memory",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "ag8",
        title: "Reliability & Human-in-the-Loop",
        description: "Guardrails for autonomous action",
        lessons: [
          {
            id: "ag8l1",
            title: "Permission Tiers and Graceful Failure",
            xp: 30,
            content:
              "Autonomous action means autonomous mistakes. Practical guardrails include permission tiers (what an agent may do without asking versus what requires confirmation), rollback and undo design, rate-limiting destructive actions, and designing for graceful degradation when a tool is unavailable. Everything that makes an agent more capable also widens its attack surface — which is exactly where the AI Security & Red-Teaming course picks up.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the point of permission tiers?",
                options: [
                  "Separating low-risk actions an agent may take freely from risky ones needing confirmation",
                  "Ranking agents by intelligence",
                  "Charging users different prices",
                  "Deciding which model to fine-tune",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Designing an agent to keep working sensibly when a tool is unavailable is called graceful ____.",
                answer: "degradation",
                wordBank: ["retrieval", "alignment", "delegation"],
              },
              {
                type: "true-false",
                statement: "Every new capability you give an agent also enlarges its attack surface.",
                answer: true,
                explanation: "That is the bridge from this course into AI Security & Red-Teaming.",
              },
            ],
          },
        ],
      },
      {
        id: "agC",
        title: "Capstone Reflection",
        description: "Design an agent you'd actually build",
        lessons: [
          {
            id: "agCl1",
            title: "Capstone: Agent Design Doc",
            xp: 60,
            isQuiz: true,
            content:
              "Write a one-page design doc for an agent you would actually want to build, for yourself or your organization. Specify its goal, its tools, its memory strategy, and — critically — the one failure mode you are most worried about and how you would guard against it.",
            exercises: [
              {
                type: "short-answer",
                question:
                  "Describe your agent: its goal, its tools, and its memory strategy.",
                minWords: 40,
                referenceAnswer:
                  "A strong answer names a concrete goal, 2-4 specific tools with what each can do, and which memory patterns (working, episodic, persistent) it relies on and why.",
              },
              {
                type: "short-answer",
                question:
                  "What is the single failure mode you are most worried about, and how would you guard against it?",
                minWords: 30,
                referenceAnswer:
                  "Names one plausible failure (destructive tool misuse, injected instructions, runaway loops) and a matching guardrail: permission tiers, human confirmation, rate limits, rollback, or a stopping condition.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agL4",
    title: "Agent Anatomy & Patterns",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "ag9",
        title: "What Makes Something an \"Agent\"?",
        description: "Workflows, tools and knowing when not to",
        lessons: [
          {
            id: "ag9l1",
            title: "Workflow vs. Agent",
            xp: 25,
            content:
              "Anthropic's \"Building Effective Agents\" draws one line that matters: a workflow follows a fixed path you designed in advance, while an agent decides its own path step by step based on what it sees. A workflow is a recipe — the steps are written down, and the model just fills in the blanks at each step. An agent is a chef who tastes the sauce and adjusts: it looks at the current situation, picks the next action itself, runs it, looks again. Both are useful. The difference is who chooses the order of steps — you, or the model.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the real difference between a workflow and an agent?",
                options: [
                  "Who decides the order of the steps — the designer or the model",
                  "Whether a language model is used at all",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A workflow is a recipe; an agent is a ____ who tastes and adjusts.",
                answer: "chef",
                wordBank: ["waiter", "farmer", "critic"],
              },
              {
                type: "true-false",
                statement: "In a workflow, the model chooses which step comes next.",
                answer: false,
                explanation: "The path is fixed by the designer; the model only fills in each step.",
              },
            ],
          },
          {
            id: "ag9l2",
            title: "The Augmented LLM",
            xp: 25,
            content:
              "The building block of every agent is what Anthropic calls the augmented LLM: a language model plus three additions. Tools it can call — search, a calculator, a calendar, code execution. Retrieval, so it can pull in information it was not given up front. And memory of what has happened so far in the task. On its own a model can only produce text. Augmented, it can look things up, do things, and remember what it already tried. Every pattern later in this unit is built out of this one piece repeated.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each part of the augmented LLM to what it adds:",
                pairs: [
                  { term: "Tools", definition: "The ability to take actions like search or calculate" },
                  { term: "Retrieval", definition: "Pulling in information it was not given up front" },
                  { term: "Memory", definition: "Keeping track of what has happened so far" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What can a plain language model do without augmentation?",
                options: [
                  "Only produce text",
                  "Search the web and run code",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ag9l3",
            title: "Tools: How an Agent Acts",
            xp: 25,
            content:
              "A tool is the agent's hand. Tool design decides both how well an agent works and how much damage it can do. The safer approach is narrow and specific: a tool called \"check inventory for a product ID\" does exactly one thing, takes one kind of input, and cannot be talked into anything else. Open-ended access — \"run any database query\" — is more flexible but hands the model far more reach than the task needs. Narrow tools are also easier for the model to choose correctly, because the name and description leave less room for doubt.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why is a narrow tool like \"check inventory\" safer than open database access?",
                options: [
                  "It does one thing only, so the model's reach is limited to the task",
                  "Narrow tools run faster on the server",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Narrow tools are also easier for the model to ____ correctly, because the description is unambiguous.",
                answer: "choose",
                wordBank: ["compile", "encrypt", "translate"],
              },
              {
                type: "true-false",
                statement: "Giving an agent the broadest possible tool access is the safest default.",
                answer: false,
                explanation: "Give the narrowest access that still completes the job.",
              },
            ],
          },
          {
            id: "ag9l4",
            title: "When NOT to Use an Agent",
            xp: 25,
            content:
              "Anthropic's own advice is to find the simplest thing that works and stop there. For a well-defined, repeatable task — reformat this file, send this weekly summary, classify these tickets into three buckets — a fixed workflow beats an autonomous agent every time: it is cheaper, faster, and you can predict exactly what it will do. Agents cost more tokens, take more steps, and can go sideways. They earn that complexity only when the path genuinely cannot be predicted in advance, because the right next step depends on what the previous step found.",
            exercises: [
              {
                type: "multiple-choice",
                question: "When does an agent earn its extra complexity?",
                options: [
                  "When the path can't be predicted ahead of time",
                  "Whenever the task involves more than one step",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each task to the better fit:",
                pairs: [
                  { term: "Reformat a file the same way every week", definition: "Fixed workflow" },
                  { term: "Research a question where each finding changes the next search", definition: "Agent" },
                ],
              },
              {
                type: "true-false",
                statement: "A fixed workflow is cheaper, faster and more predictable than an agent for a repeatable task.",
                answer: true,
                explanation: "That is exactly why you should reach for the workflow first.",
              },
            ],
          },
        ],
      },
      {
        id: "ag10",
        title: "Five Patterns Agents Use",
        description: "The Anthropic playbook, in plain language",
        lessons: [
          {
            id: "ag10l1",
            title: "Prompt Chaining",
            xp: 25,
            content:
              "Prompt chaining breaks one big task into an ordered sequence of smaller AI calls, where each output feeds the next. Write an outline, then write the draft from the outline, then tighten the draft. The power comes from the checkpoints between the steps: you can test the outline before any drafting happens, and stop early if it is wrong. Each call is easier and more accurate than one giant request, and a mistake is caught at the step where it was made instead of showing up buried in the final answer.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes prompt chaining more reliable than one giant request?",
                options: [
                  "Each smaller step can be checked before the next one runs",
                  "It uses a larger model for the final step",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put a chain in order:",
                words: ["Write", "the", "outline", "then", "draft", "from", "it", "then", "tighten", "the", "draft"],
              },
            ],
          },
          {
            id: "ag10l2",
            title: "Routing",
            xp: 25,
            content:
              "Routing classifies the input first, then sends it down a specialized path. A support system reads an incoming message and decides: is this a refund question, a technical problem, or a sales lead? Each route then gets its own prompt, its own tools, and sometimes its own model. This beats one generic prompt trying to handle everything, because each path can be tuned for its own job without weakening the others. The one thing routing depends on is accurate classification — a message sent down the wrong path is handled well by the wrong specialist.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does routing do first?",
                options: [
                  "Classify the input, then send it to a specialized path",
                  "Run every path and compare the answers",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Routing only works if the first-step ____ is accurate.",
                answer: "classification",
                acceptableAnswers: ["classifier"],
                wordBank: ["compression", "translation", "encryption"],
              },
              {
                type: "true-false",
                statement: "With routing, every path can use the same prompt and tools.",
                answer: false,
                explanation: "The point is that each route is specialized for its own kind of request.",
              },
            ],
          },
          {
            id: "ag10l3",
            title: "Parallelization",
            xp: 25,
            content:
              "Parallelization runs several AI tasks at the same time and combines the results, instead of waiting for one after another. It comes in two flavours. Sectioning splits a task into independent pieces — review this document for tone, for accuracy, and for legal risk, all at once — and merges the findings. Voting runs the same task several times and compares, which is useful when you want more confidence in a judgement call. Parallelization saves time when the pieces genuinely do not depend on each other; if step two needs step one's answer, chain them instead.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each flavour of parallelization to what it does:",
                pairs: [
                  { term: "Sectioning", definition: "Split into independent pieces and merge the findings" },
                  { term: "Voting", definition: "Run the same task several times and compare answers" },
                ],
              },
              {
                type: "multiple-choice",
                question: "When should you NOT parallelize?",
                options: [
                  "When one step needs the previous step's answer",
                  "When the task has more than two parts",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ag10l4",
            title: "Orchestrator-Workers",
            xp: 25,
            content:
              "In the orchestrator-workers pattern, one lead model breaks a task into pieces, hands each piece to a worker model, and then assembles the results into a final answer. The key difference from parallelization is that nobody decides the subtasks in advance — the orchestrator decides them at run time, based on the task in front of it. That makes it the right fit for work like \"change this feature across however many files it touches\", where you cannot know the list of pieces until you look. The cost is coordination: more calls, more tokens, and more chances for one bad subtask to pollute the assembled result.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What separates orchestrator-workers from plain parallelization?",
                options: [
                  "The subtasks are decided at run time by the lead model, not fixed in advance",
                  "The workers never use tools",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The orchestrator breaks up the task, delegates it, and then ____ the results.",
                answer: "assembles",
                acceptableAnswers: ["combines", "merges"],
                wordBank: ["deletes", "encrypts", "ignores"],
              },
              {
                type: "true-false",
                statement: "Orchestrator-workers is free of extra cost compared with a single call.",
                answer: false,
                explanation: "It adds coordination overhead, more calls and more tokens.",
              },
            ],
          },
          {
            id: "ag10l5",
            title: "Evaluator-Optimizer",
            xp: 25,
            content:
              "In the evaluator-optimizer loop, one model drafts and a second model critiques the draft against clear written criteria — then the first revises, and the loop repeats until the draft passes or the attempt limit is reached. It mirrors how a writer improves with an editor. It works best in exactly the situations where a human reviewer would also help: when you can state what \"good\" means, and when feedback measurably improves the next attempt. Two things make or break it — criteria specific enough to act on, and a stopping rule so the loop cannot run forever.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does the evaluator model do?",
                options: [
                  "Critique the draft against clear criteria so it can be revised",
                  "Rewrite the draft itself in one pass",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Every evaluator-optimizer loop needs a ____ rule so it cannot run forever.",
                answer: "stopping",
                wordBank: ["scoring", "routing", "sampling"],
              },
              {
                type: "matching",
                instruction: "Match each pattern to its one-line summary:",
                pairs: [
                  { term: "Prompt chaining", definition: "Ordered steps, each checked before the next" },
                  { term: "Routing", definition: "Classify first, then use a specialized path" },
                  { term: "Parallelization", definition: "Run tasks at once and combine results" },
                  { term: "Evaluator-optimizer", definition: "Draft, critique, revise until it passes" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agL5",
    title: "Agents in the Real World",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "ag11",
        title: "Agents at Work",
        description: "Where they already run, and what the data shows",
        lessons: [
          {
            id: "ag11l1",
            title: "Where Agents Already Show Up",
            xp: 25,
            content:
              "Agents are not hypothetical. Four places you can already point at: coding assistants that read a repository, edit several files and run the tests; customer-support triage that reads an incoming ticket, looks up the account, and either answers or escalates; research assistants that search, read, and compile a sourced summary; and scheduling or operations agents that juggle calendars, bookings and reminders. What these share is a task with a verifiable result — code that compiles, a ticket that is resolved — which is exactly the kind of work agents handle best.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each agent to the job it does:",
                pairs: [
                  { term: "Coding assistant", definition: "Edits files across a project and runs the tests" },
                  { term: "Support triage agent", definition: "Reads a ticket, looks up the account, answers or escalates" },
                  { term: "Research assistant", definition: "Searches, reads and compiles a sourced summary" },
                  { term: "Scheduling agent", definition: "Juggles calendars, bookings and reminders" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What do today's most successful agent use cases have in common?",
                options: [
                  "The result can be verified — tests pass, the ticket is resolved",
                  "They never need any tools",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ag11l2",
            title: "What the Data Says",
            xp: 25,
            content:
              "Two findings are worth knowing. Gallup's workplace research has tracked AI use at work climbing steeply — frequent use by employees has roughly doubled in two years, while the share of workers who say their employer has actually given them guidance on it lags far behind. The Anthropic Economic Index, built from anonymized usage of Claude, adds the shape of that use: it concentrates heavily in software and writing tasks, and it is shifting from asking the model for help toward handing it whole tasks to complete. Read together: adoption is running ahead of the rules, and the work being delegated is getting bigger.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the headline tension in the adoption data?",
                options: [
                  "Everyday use is growing much faster than workplace guidance about it",
                  "Almost nobody at work uses AI yet",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The Anthropic Economic Index shows use shifting from asking for help toward ____ whole tasks to the model.",
                answer: "delegating",
                acceptableAnswers: ["handing", "handing off"],
                wordBank: ["hiding", "banning", "translating"],
              },
              {
                type: "true-false",
                statement: "Most workplaces have clear, communicated guidance on AI use.",
                answer: false,
                explanation: "Guidance consistently lags behind how many people are already using it.",
              },
            ],
          },
          {
            id: "ag11l3",
            title: "A Day With an Email-Triage Agent",
            xp: 25,
            content:
              "Here is one agent end to end. Morning: it reads the overnight inbox. It classifies each message — needs a reply, just filing, or urgent. For the replies it can handle, it drafts an answer using the account history it retrieved. Anything it is unsure about, it flags with a short note explaining why. Nothing sends until a human opens the queue and approves. Notice the shape: the agent did the reading, sorting and drafting — the slow, repetitive part — and the irreversible part, actually sending, stayed with the person.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the triage agent's day in order:",
                words: ["Read", "the", "inbox", "then", "classify", "then", "draft", "replies", "then", "flag", "the", "unsure", "ones", "then", "a", "human", "approves"],
              },
              {
                type: "multiple-choice",
                question: "Which step stays with the human in this design?",
                options: [
                  "Approving before anything actually sends",
                  "Classifying each message",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ag11l4",
            title: "Multi-Agent Systems, Briefly",
            xp: 25,
            content:
              "Sometimes agents hand work to other agents. This is the orchestrator-workers idea from Unit 3 scaled up: a lead agent holds the goal, spins up subagents for pieces of it, and merges what comes back. It genuinely helps when the pieces are independent and need different tools — one subagent searching the web while another reads internal documents. But every handoff is a place for meaning to get lost, error rates compound across agents, and token cost multiplies. Start with one well-built agent; add more only when the work is clearly separable.",
            exercises: [
              {
                type: "multiple-choice",
                question: "When is a multi-agent system actually worth it?",
                options: [
                  "When the pieces are independent and need different tools",
                  "Whenever a task takes more than one step",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Every handoff between agents is a place where meaning can be lost.",
                answer: true,
                explanation: "Handoffs add coordination cost and compound errors across agents.",
              },
            ],
          },
        ],
      },
      {
        id: "ag12",
        title: "Using Agents Responsibly",
        description: "Approval, verification and scope",
        lessons: [
          {
            id: "ag12l1",
            title: "Human-in-the-Loop",
            xp: 30,
            content:
              "The rule of thumb is simple: a human approves anything risky or irreversible. Sending money. Sending a message on your behalf. Deleting data. Publishing something public. An agent can prepare all of it — draft the payment, write the message, list the files — and then stop and ask. This costs you very little, because the slow part of the work was the preparation, not the click. And it keeps the worst outcome recoverable, which is the whole point: a mistake you can still catch is not really a disaster.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which kind of action should wait for human approval?",
                options: [
                  "Anything risky or irreversible, like sending money or deleting data",
                  "Anything that takes the agent more than one step",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Human approval keeps the worst outcome ____.",
                answer: "recoverable",
                acceptableAnswers: ["reversible"],
                wordBank: ["invisible", "profitable", "automatic"],
              },
              {
                type: "true-false",
                statement: "Adding an approval step throws away most of the agent's time savings.",
                answer: false,
                explanation: "The preparation was the slow part; approving takes a moment.",
              },
            ],
          },
          {
            id: "ag12l2",
            title: "Verifying Agent Output",
            xp: 30,
            content:
              "An agent can be confidently wrong. Fluent writing, a clear explanation and a decisive tone are not evidence that the work is correct. So spot-check before you trust: pick the claims that would hurt most if they were wrong and verify those against the original source. Re-run any calculation. Read the trace — the agent's step-by-step record — and ask whether each step actually supports the conclusion. Confidence tells you nothing about accuracy. Give an agent's output the same check you would give a capable new colleague's first week of work.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What should you spot-check first in an agent's output?",
                options: [
                  "The claims that would cause the most harm if they were wrong",
                  "Whichever paragraph is longest",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Reading the agent's step-by-step ____ shows you how it reached its answer.",
                answer: "trace",
                wordBank: ["banner", "license", "avatar"],
              },
              {
                type: "true-false",
                statement: "A confident, fluent answer from an agent is good evidence that it is correct.",
                answer: false,
                explanation: "Confidence and accuracy are unrelated — verify the load-bearing claims.",
              },
            ],
          },
          {
            id: "ag12l3",
            title: "Guardrails and Scope",
            xp: 30,
            content:
              "Scope is your main safety dial: give an agent the narrowest tool access that still gets the job done. Read-only where reading is enough. One account, not the whole system. A spending cap, a rate limit on destructive actions, and a clear stopping condition. Because an agent reads outside text — emails, web pages, documents — anything it reads can try to steer it, which is what the AI Security & Red-Teaming course covers in depth under prompt injection. The link between the two courses is a single sentence: every capability you add is also something an attacker can aim at.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the guiding rule for an agent's tool access?",
                options: [
                  "The narrowest access that still completes the job",
                  "As much access as the platform allows, for flexibility",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each guardrail to what it limits:",
                pairs: [
                  { term: "Read-only access", definition: "The agent can look but not change anything" },
                  { term: "Rate limit", definition: "How often a destructive action can happen" },
                  { term: "Stopping condition", definition: "How long the loop is allowed to run" },
                ],
              },
              {
                type: "true-false",
                statement: "Every capability you give an agent is also something an attacker can aim at.",
                answer: true,
                explanation: "That is the bridge into the AI Security & Red-Teaming course.",
              },
            ],
          },
        ],
      },
    ],
  },
];
