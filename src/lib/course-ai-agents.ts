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
];
