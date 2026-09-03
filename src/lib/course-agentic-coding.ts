// Course track 3: "AI Coding Assistants: Agentic Coding 101".
// How assistants that can read files, edit code and run commands actually work.
// Beginner units use plain, kid-friendly wording; later units use technical vocabulary.
import type { Level } from "./course-data";

export const agenticCodingLevels: Level[] = [
  {
    id: "al1",
    title: "Meet the Agent",
    tier: "Free",
    ageRange: "Ages 9+",
    badge: "Beginner",
    units: [
      // ---------------- Unit 1 ----------------
      {
        id: "a1",
        title: "What Makes It Agentic",
        description: "Doing things, not just talking about them",
        lessons: [
          {
            id: "a1l1",
            title: "Chatbot vs. Agent",
            xp: 20,
            content:
              "A regular AI chatbot answers with words. You ask 'how do I fix this bug?' and it writes an explanation back — then you still have to go and change the code yourself. An agentic coding assistant is different: it can take actions. It can open your project's files, read them, write new code into them, and run commands, all on its own while you watch. The chatbot suggests. The agent does.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the main difference between a chatbot and an agentic coding assistant?",
                options: [
                  "The agent can take real actions like reading and editing files, not just reply with text",
                  "The agent types faster than the chatbot",
                  "The chatbot is always wrong and the agent is always right",
                  "The agent never needs a language model inside it",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A chatbot only gives you text back, but an agent can take real ____.",
                answer: "actions",
                acceptableAnswers: ["actions", "action"],
                wordBank: ["opinions", "pictures", "guesses"],
              },
              {
                type: "true-false",
                statement: "An agentic coding assistant can only describe a change; a human must always type every edit.",
                answer: false,
                explanation: "It can make the edit itself — that is what makes it agentic.",
              },
            ],
          },
          {
            id: "a1l2",
            title: "Tools Are Its Hands",
            xp: 20,
            content:
              "How can a text-predicting model touch your files? Through tools. A tool is a small ability the assistant is allowed to use — like 'read a file', 'write a file', 'search the project', or 'run a command'. The model chooses a tool, the program around it actually performs the action, and the result comes back as more text the model can read. Tools are the assistant's hands and eyes.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each tool to what it lets the assistant do:",
                pairs: [
                  { term: "Read file", definition: "Look at what is already in your code" },
                  { term: "Write file", definition: "Save new or changed code into your project" },
                  { term: "Search", definition: "Find where something appears across many files" },
                  { term: "Run command", definition: "Start a program, like tests or a build" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What happens after the assistant uses a tool?",
                options: [
                  "The result comes back to it as text it can read and think about",
                  "The assistant forgets what it asked for",
                  "The tool answers the user directly and skips the assistant",
                  "Nothing — tools give no result",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A ____ is a small ability, like reading a file, that the assistant is allowed to use.",
                answer: "tool",
                wordBank: ["prompt", "model", "screen"],
              },
            ],
          },
          {
            id: "a1l3",
            title: "The Agent Loop",
            xp: 20,
            content:
              "Agents work in a loop. Think, act, look, repeat. The assistant thinks about your goal, uses a tool, reads what came back, and decides what to do next. If a test fails, it can read the error and try again. That loop is why an agent can finish a multi-step job — like 'find the bug and fix it' — instead of only answering one question.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the steps of the agent loop in order:",
                words: ["Think", "Use a tool", "Read the result", "Decide next step"],
              },
              {
                type: "true-false",
                statement: "If a command the agent ran fails, the agent can read the error and try a different approach.",
                answer: true,
                explanation: "Reading results and adjusting is the whole point of the loop.",
              },
              {
                type: "multiple-choice",
                question: "Why does the loop matter?",
                options: [
                  "It lets the assistant finish multi-step jobs instead of only answering once",
                  "It makes the assistant type in a nicer font",
                  "It removes the need for a human to ever check the work",
                  "It stops the assistant from using tools",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a1q",
            title: "Unit 1 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which sentence best describes an agentic coding assistant?",
                options: [
                  "It can read, edit and run things in your project to reach a goal",
                  "It is a chatbot with a bigger vocabulary",
                  "It is a search engine for code snippets",
                  "It is a program that never uses an AI model",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The agent repeats a ____: think, act, read the result, decide again.",
                answer: "loop",
                wordBank: ["song", "file", "menu"],
              },
              {
                type: "true-false",
                statement: "Tools are how a language model is able to affect real files and programs.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match each idea to its meaning:",
                pairs: [
                  { term: "Chatbot", definition: "Replies with text only" },
                  { term: "Agent", definition: "Takes actions to reach a goal" },
                  { term: "Tool", definition: "An ability the assistant may use" },
                ],
              },
            ],
          },
        ],
      },
      // ---------------- Unit 2 ----------------
      {
        id: "a2",
        title: "Plan Mode: Look Before You Touch",
        description: "Exploring safely with read-only mode",
        lessons: [
          {
            id: "a2l1",
            title: "What Plan Mode Is",
            xp: 20,
            content:
              "Plan mode is a setting where the assistant is allowed to look around but not allowed to change anything. It can read files, search the project and describe what it found, but every writing tool is switched off. It is like letting someone walk through a museum and take notes — no touching the paintings.",
            exercises: [
              {
                type: "multiple-choice",
                question: "In plan mode, what can the assistant do?",
                options: [
                  "Read and explore, but not change files",
                  "Change files, but not read them",
                  "Nothing at all",
                  "Only talk to other agents",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Plan mode is also called ____-only mode, because writing is switched off.",
                answer: "read",
                wordBank: ["write", "night", "voice"],
              },
              {
                type: "true-false",
                statement: "Plan mode lets the assistant quietly edit a few small files if it is confident.",
                answer: false,
                explanation: "No edits happen in plan mode — that is the guarantee it gives you.",
              },
            ],
          },
          {
            id: "a2l2",
            title: "Why Plan First",
            xp: 20,
            content:
              "Planning first is useful when the job is big, when the codebase is new to you, or when a wrong change would be annoying to undo. You get an approach you can read, argue with and improve before a single line changes. Fixing a plan costs a minute. Fixing fifty bad edits costs an afternoon.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each situation to whether planning first helps a lot:",
                pairs: [
                  { term: "Big, unfamiliar codebase", definition: "Plan first — explore before touching" },
                  { term: "Tricky change with many files", definition: "Plan first — agree on the approach" },
                  { term: "Fixing one obvious typo", definition: "Just do it — planning adds little" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What is the biggest benefit of reviewing a plan first?",
                options: [
                  "You can correct the approach before any code is changed",
                  "It makes the assistant run faster",
                  "It guarantees the code will have no bugs",
                  "It hides the assistant's reasoning from you",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "It is cheaper to fix a ____ than to undo fifty wrong edits.",
                answer: "plan",
                wordBank: ["bug", "test", "file"],
              },
            ],
          },
          {
            id: "a2l3",
            title: "From Plan to Action",
            xp: 20,
            content:
              "Once you like the plan, you approve it and switch the assistant back into normal mode so it can carry the plan out. Good practice: read the plan, ask for changes if something looks wrong, then approve. Approving is your decision, not the assistant's — that hand-off point is where you stay in control.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the safe workflow in order:",
                words: ["Explore in plan mode", "Read the plan", "Approve or ask for changes", "Let it make the edits"],
              },
              {
                type: "true-false",
                statement: "The assistant should decide by itself when to leave plan mode and start editing.",
                answer: false,
                explanation: "The human approves — that hand-off is the point of the mode.",
              },
              {
                type: "multiple-choice",
                question: "What should you do if part of the plan looks wrong?",
                options: [
                  "Say what is wrong and ask for a revised plan",
                  "Approve it anyway and hope",
                  "Delete the project and start over",
                  "Switch to a different computer",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a2q",
            title: "Unit 2 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "fill-blank",
                prompt: "In plan mode the assistant may explore but may not ____ any files.",
                answer: "change",
                acceptableAnswers: ["change", "edit", "write", "modify"],
                wordBank: ["read", "open", "search"],
              },
              {
                type: "multiple-choice",
                question: "Plan mode is most valuable when…",
                options: [
                  "the change is large or the codebase is unfamiliar",
                  "you already know the exact one-line fix",
                  "you want the assistant to work without telling you anything",
                  "the project has no files yet",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "You stay in control because you decide whether to approve the plan.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match the step to what happens:",
                pairs: [
                  { term: "Plan mode", definition: "Explore with writing turned off" },
                  { term: "Approval", definition: "The human says go ahead" },
                  { term: "Normal mode", definition: "The assistant makes the edits" },
                ],
              },
            ],
          },
        ],
      },
      // ---------------- Unit 3 ----------------
      {
        id: "a3",
        title: "House Rules: Persistent Instructions",
        description: "A memory file the assistant always reads",
        lessons: [
          {
            id: "a3l1",
            title: "Write It Once",
            xp: 20,
            content:
              "Agentic coding tools support a special instructions file you keep in your project — a 'house rules' document. You write your project's conventions in it once, and the assistant reads it automatically every time it starts working. Instead of repeating 'we use this style, never touch that folder' in every message, you write it down and it sticks.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the point of a persistent instructions file?",
                options: [
                  "The assistant reads it automatically, so you don't repeat yourself every time",
                  "It stores your passwords for the assistant",
                  "It makes the assistant answer without using a model",
                  "It is a backup copy of your code",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The instructions file works like a set of project ____ rules.",
                answer: "house",
                wordBank: ["secret", "random", "temporary"],
              },
              {
                type: "true-false",
                statement: "You must paste your project conventions into every single message you send.",
                answer: false,
                explanation: "That is exactly what the instructions file saves you from.",
              },
            ],
          },
          {
            id: "a3l2",
            title: "What Belongs In It",
            xp: 20,
            content:
              "Good things to write down: how to run the project and its tests, coding style rules, folders that are off limits, and decisions you have already made so they don't get re-argued. Keep it short and true. A bloated file full of guesses is worse than a small file of real rules, because everything in it competes for the assistant's attention.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each item to whether it belongs in the house-rules file:",
                pairs: [
                  { term: "How to run the tests", definition: "Yes — useful every session" },
                  { term: "Folders never to edit", definition: "Yes — prevents repeated mistakes" },
                  { term: "A copy of the whole codebase", definition: "No — the assistant can read files itself" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why keep the instructions file short?",
                options: [
                  "Everything in it competes for attention, so only true, useful rules should be there",
                  "Long files are illegal",
                  "The assistant refuses to read more than one line",
                  "Short files run faster on your computer",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Write down decisions already made so they are not re-____ every session.",
                answer: "argued",
                acceptableAnswers: ["argued", "discussed", "debated"],
                wordBank: ["printed", "deleted", "sold"],
              },
            ],
          },
          {
            id: "a3l3",
            title: "Rules vs. Requests",
            xp: 20,
            content:
              "There are two kinds of instruction. A rule is always true for this project — 'use our design tokens, never hardcoded colours'. A request is for right now — 'add a login button today'. Rules belong in the instructions file. Requests belong in your message. Mixing them up leaves stale one-off tasks sitting in the file forever, confusing future sessions.",
            exercises: [
              {
                type: "matching",
                instruction: "Sort each one:",
                pairs: [
                  { term: "Always run tests before finishing", definition: "Rule — put it in the file" },
                  { term: "Add a dark mode toggle today", definition: "Request — put it in your message" },
                  { term: "Never edit the generated folder", definition: "Rule — put it in the file" },
                ],
              },
              {
                type: "true-false",
                statement: "One-off task descriptions should be stored permanently in the instructions file.",
                answer: false,
                explanation: "They go stale and confuse later sessions; keep them in the conversation.",
              },
              {
                type: "multiple-choice",
                question: "Which is a rule rather than a request?",
                options: [
                  "This project always uses the shared component library",
                  "Rename the homepage heading right now",
                  "Fix today's failing test",
                  "Add three new blog posts this afternoon",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a3q",
            title: "Unit 3 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "The persistent instructions file is best described as…",
                options: [
                  "project conventions the assistant reads automatically each time",
                  "a log of everything the assistant ever said",
                  "a place to hide secret keys",
                  "an optional file the assistant ignores",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Rules go in the instructions file; one-off ____ go in your message.",
                answer: "requests",
                acceptableAnswers: ["requests", "request", "tasks"],
                wordBank: ["colours", "errors", "folders"],
              },
              {
                type: "true-false",
                statement: "A short file of true rules beats a long file full of guesses.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match each to where it belongs:",
                pairs: [
                  { term: "Coding style rules", definition: "Instructions file" },
                  { term: "Today's bug fix", definition: "Your message" },
                  { term: "How to run the app", definition: "Instructions file" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "al2",
    title: "Working Like a Pro",
    tier: "Premium",
    ageRange: "Ages 13+",
    badge: "Intermediate",
    units: [
      // ---------------- Unit 4 ----------------
      {
        id: "a4",
        title: "Reusable Commands",
        description: "Save a workflow once, trigger it anytime",
        lessons: [
          {
            id: "a4l1",
            title: "Shortcuts for Repeated Work",
            xp: 25,
            content:
              "Some instructions you send over and over: 'review this code for bugs and style problems', 'write tests for the file I just changed', 'summarise what changed today'. Agentic coding tools let you save such an instruction as a reusable custom command with a short name. Trigger the name and the saved instruction runs — the long prompt is written once and reused forever.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What problem do custom commands solve?",
                options: [
                  "Retyping the same long instruction for repetitive workflows",
                  "The assistant running out of memory",
                  "Slow internet connections",
                  "Code that will not compile",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A custom command stores a long instruction behind a short ____ you can trigger.",
                answer: "name",
                acceptableAnswers: ["name", "shortcut", "trigger"],
                wordBank: ["error", "folder", "model"],
              },
              {
                type: "true-false",
                statement: "Custom commands are mainly useful for one-of-a-kind tasks you will never repeat.",
                answer: false,
                explanation: "Their value comes from repetition — the same workflow, many times.",
              },
            ],
          },
          {
            id: "a4l2",
            title: "Designing a Good Command",
            xp: 25,
            content:
              "A good saved command reads like a small, complete brief: what to do, what to look at, what the output should look like, and when to stop. Vague commands produce vague results every time you run them — and because you reuse them, a weak command multiplies its weakness. Spend the extra two minutes writing it clearly.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each part of a strong command to its purpose:",
                pairs: [
                  { term: "Scope", definition: "Which files or area to look at" },
                  { term: "Task", definition: "What work to actually perform" },
                  { term: "Output format", definition: "How the result should be presented" },
                  { term: "Stop condition", definition: "When the job counts as finished" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why does a vague saved command cause more damage than a vague one-off message?",
                options: [
                  "Because it is reused, so the vagueness repeats every single run",
                  "Because saved commands cannot be edited",
                  "Because vague commands delete files",
                  "Because it disables plan mode",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A strong command states the task, the scope, the output format and the ____ condition.",
                answer: "stop",
                wordBank: ["weather", "colour", "random"],
              },
            ],
          },
          {
            id: "a4l3",
            title: "Commands vs. House Rules",
            xp: 25,
            content:
              "House rules apply to everything, all the time, without being asked. Commands are on demand: nothing happens until you trigger one. Use rules for constraints the assistant must always honour, and commands for workflows you sometimes want to run. Putting a whole review checklist into the always-on rules file just wastes attention on turns where you are not reviewing anything.",
            exercises: [
              {
                type: "matching",
                instruction: "Rule or command?",
                pairs: [
                  { term: "Never commit secrets", definition: "House rule — always on" },
                  { term: "Run a full code review", definition: "Command — on demand" },
                  { term: "Generate tests for a file", definition: "Command — on demand" },
                ],
              },
              {
                type: "true-false",
                statement: "A command only runs when you trigger it.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "Why not put a long review checklist into the always-on rules file?",
                options: [
                  "It consumes attention on every turn, even when you are not reviewing",
                  "Rules files cannot contain lists",
                  "Checklists are not allowed in software",
                  "It would delete your commands",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a4q",
            title: "Unit 4 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "fill-blank",
                prompt: "House rules are always on; commands are triggered on ____.",
                answer: "demand",
                acceptableAnswers: ["demand", "request"],
                wordBank: ["startup", "failure", "install"],
              },
              {
                type: "multiple-choice",
                question: "Which is the best candidate for a saved command?",
                options: [
                  "A code-review workflow you run several times a week",
                  "A one-time rename of a single variable",
                  "Your project's permanent style rule",
                  "A password you need to remember",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Writing the command clearly matters more than usual because it will be reused many times.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match each to its home:",
                pairs: [
                  { term: "Always honour this constraint", definition: "House rules file" },
                  { term: "Run this workflow now", definition: "Custom command" },
                ],
              },
            ],
          },
        ],
      },
      // ---------------- Unit 5 ----------------
      {
        id: "a5",
        title: "Subagents: Delegating Work",
        description: "A manager assigning tasks to specialists",
        lessons: [
          {
            id: "a5l1",
            title: "Why Delegate",
            xp: 25,
            content:
              "A main assistant can hand a self-contained piece of work to a subagent: a smaller helper with its own instructions and its own limited set of tools. The subagent does the job, returns a result, and the main assistant carries on. It is like a manager giving a specific task to a specialist instead of doing everything personally.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a subagent?",
                options: [
                  "A helper agent given a specific task and a limited set of tools",
                  "A second copy of the user",
                  "A file that stores rules",
                  "A command-line program with no AI in it",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The main assistant ____ a self-contained task to a subagent and gets the result back.",
                answer: "delegates",
                acceptableAnswers: ["delegates", "delegate", "assigns"],
                wordBank: ["deletes", "prints", "hides"],
              },
              {
                type: "true-false",
                statement: "A subagent usually gets every tool and permission the main agent has.",
                answer: false,
                explanation: "It is given only the tools its specific job needs.",
              },
            ],
          },
          {
            id: "a5l2",
            title: "Least Privilege and Focus",
            xp: 25,
            content:
              "Two reasons to give a subagent only the tools it needs. First safety: a research helper that can only read cannot accidentally overwrite your code. Second focus: fewer choices and a narrower brief make it easier for the helper to do one job well. Narrow scope plus narrow tools is a reliable combination.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each subagent to a sensible tool set:",
                pairs: [
                  { term: "Research helper", definition: "Read and search only — no writing" },
                  { term: "Test writer", definition: "Read code and write test files" },
                  { term: "Docs summariser", definition: "Read files and return a summary" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why limit a subagent's tools?",
                options: [
                  "Safety and focus — it cannot do damage outside its job and stays on task",
                  "Because tools cost extra money per use",
                  "Because subagents cannot understand more than one tool",
                  "To stop it from returning any result",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Giving a helper only the permissions it needs is the principle of least ____.",
                answer: "privilege",
                acceptableAnswers: ["privilege", "privileges"],
                wordBank: ["memory", "effort", "delay"],
              },
            ],
          },
          {
            id: "a5l3",
            title: "Clean Hand-offs",
            xp: 25,
            content:
              "A subagent does not share the main conversation's whole history — that is a feature. It keeps the main context uncluttered: a helper can read twenty files and hand back one short summary. But it also means the brief must be self-contained. If the helper needs a decision made earlier, say it in the brief; the helper cannot guess what it never saw.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put a delegation in order:",
                words: ["Write a self-contained brief", "Subagent works with its own tools", "Result returns to the main agent", "Main agent continues"],
              },
              {
                type: "true-false",
                statement: "Delegation can keep the main conversation smaller because only the summary comes back.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "What is the main risk when writing a delegation brief?",
                options: [
                  "Leaving out context the helper never saw, so it works from wrong assumptions",
                  "The helper reading too quickly",
                  "The main agent forgetting the user's name",
                  "The helper refusing to speak English",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a5q",
            title: "Unit 5 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "A subagent is best compared to…",
                options: [
                  "a specialist given one task and only the tools for it",
                  "a backup copy of the project",
                  "a bigger, more powerful model that replaces the main agent",
                  "a file of permanent project rules",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Because the helper does not see the whole history, its brief must be self-____.",
                answer: "contained",
                wordBank: ["deleted", "written", "employed"],
              },
              {
                type: "true-false",
                statement: "A read-only research subagent cannot overwrite your source files.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match the benefit to the reason:",
                pairs: [
                  { term: "Safety", definition: "Limited tools mean limited damage" },
                  { term: "Focus", definition: "A narrow brief is easier to do well" },
                  { term: "Smaller context", definition: "Only the summary returns to the main agent" },
                ],
              },
            ],
          },
        ],
      },
      // ---------------- Unit 6 ----------------
      {
        id: "a6",
        title: "Automation Hooks",
        description: "Scripts that fire at the right moment",
        lessons: [
          {
            id: "a6l1",
            title: "What a Hook Is",
            xp: 25,
            content:
              "A hook is a script you configure to run automatically at a specific moment in the agent's work — for example right before a tool is used, or right after. Because the system triggers it, the behaviour happens whether or not the model remembered to do it. Hooks turn 'please always remember to…' into something guaranteed.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes a hook different from a written rule?",
                options: [
                  "The system runs it automatically, so it does not rely on the model remembering",
                  "Hooks are written in plain English",
                  "Hooks only work on weekends",
                  "Hooks replace the language model entirely",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A hook runs automatically at a specific ____ in the agent's workflow.",
                answer: "moment",
                acceptableAnswers: ["moment", "point", "event"],
                wordBank: ["folder", "colour", "password"],
              },
              {
                type: "true-false",
                statement: "Hooks depend on the assistant deciding to call them each time.",
                answer: false,
                explanation: "The surrounding system fires them; that is why they are dependable.",
              },
            ],
          },
          {
            id: "a6l2",
            title: "Before and After",
            xp: 25,
            content:
              "Hooks that run before a tool can check and even block an action — for instance refusing edits to a protected file. Hooks that run after a tool can react to what happened — formatting the file that was just written, running the test suite, or logging the change. Before means guard; after means follow-up.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each hook to when it should run:",
                pairs: [
                  { term: "Block edits to a protected file", definition: "Before the tool runs" },
                  { term: "Auto-format the file just written", definition: "After the tool runs" },
                  { term: "Log what changed", definition: "After the tool runs" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which job needs a hook that runs before the action?",
                options: [
                  "Refusing a change that touches a protected path",
                  "Formatting the finished file",
                  "Sending a summary of the change",
                  "Running tests on the new code",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A hook that runs before a tool can ____ an action it considers unsafe.",
                answer: "block",
                acceptableAnswers: ["block", "stop", "prevent"],
                wordBank: ["repeat", "format", "praise"],
              },
            ],
          },
          {
            id: "a6l3",
            title: "Using Hooks Wisely",
            xp: 25,
            content:
              "Hooks are powerful, so keep them fast, predictable and narrow. A slow hook makes every turn slow. A hook that blocks too much becomes noise you learn to ignore or switch off. And because a hook can run commands, only add hooks you understand — treat one you copied from somewhere with the same care as any script you would run on your machine.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which is the best guidance for writing hooks?",
                options: [
                  "Keep them fast and narrowly targeted, and only run ones you understand",
                  "Add as many as possible so nothing is missed",
                  "Make them slow so they are thorough",
                  "Block every action by default",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A hook that blocks almost everything is likely to be ignored or turned off.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Because a hook can run commands, only add ones you ____.",
                answer: "understand",
                acceptableAnswers: ["understand", "trust"],
                wordBank: ["downloaded", "renamed", "printed"],
              },
            ],
          },
          {
            id: "a6q",
            title: "Unit 6 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Hooks exist mainly to…",
                options: [
                  "make certain behaviour automatic instead of depending on the model remembering",
                  "give the model extra knowledge about the world",
                  "replace subagents",
                  "speed up the language model itself",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Before-hooks act as a ____; after-hooks handle follow-up work.",
                answer: "guard",
                acceptableAnswers: ["guard", "gate", "check"],
                wordBank: ["report", "summary", "reward"],
              },
              {
                type: "true-false",
                statement: "A slow hook slows down every turn it runs on.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match the hook to its timing:",
                pairs: [
                  { term: "Permission check", definition: "Before the tool" },
                  { term: "Run tests on the change", definition: "After the tool" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "al3",
    title: "Advanced Agentic Practice",
    tier: "Premium + Certificate",
    ageRange: "Ages 15+",
    badge: "Advanced",
    units: [
      // ---------------- Unit 7 ----------------
      {
        id: "a7",
        title: "Connecting External Tools (MCP)",
        description: "One protocol instead of many custom integrations",
        lessons: [
          {
            id: "a7l1",
            title: "The Integration Problem",
            xp: 30,
            content:
              "An assistant becomes far more useful when it can reach outside its own sandbox: query a database, search a documentation site, open a ticket in another app. Historically every one of those connections was a bespoke integration, written separately for each assistant and each service. That is N assistants times M services — a lot of duplicated, quickly outdated glue code.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What problem motivated a shared protocol for tool connections?",
                options: [
                  "Every assistant needed its own custom integration for every service",
                  "Assistants could not read text",
                  "Databases were too fast",
                  "Nobody wanted assistants to use tools",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Without a standard, connecting many assistants to many services means writing lots of duplicated ____ code.",
                answer: "glue",
                acceptableAnswers: ["glue", "integration"],
                wordBank: ["machine", "binary", "hidden"],
              },
              {
                type: "true-false",
                statement: "A shared protocol reduces how many one-off integrations have to be maintained.",
                answer: true,
              },
            ],
          },
          {
            id: "a7l2",
            title: "What MCP Is",
            xp: 30,
            content:
              "MCP — the Model Context Protocol — is an open standard for exactly this. A service exposes its capabilities through an MCP server; the assistant acts as an MCP client and speaks the same protocol to all of them. Write the server once and any MCP-capable assistant can use it. The assistant does not need bespoke knowledge of each service; it discovers what is available through the protocol.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each MCP term to its role:",
                pairs: [
                  { term: "MCP server", definition: "Exposes a service's capabilities over the protocol" },
                  { term: "MCP client", definition: "The assistant side that connects and calls them" },
                  { term: "Open standard", definition: "A shared spec anyone can implement" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "MCP stands for the Model ____ Protocol.",
                answer: "context",
                wordBank: ["coding", "command", "cluster"],
              },
              {
                type: "multiple-choice",
                question: "What is the payoff of building an MCP server for your service?",
                options: [
                  "Any MCP-capable assistant can use it without a custom integration",
                  "Your service becomes free to run",
                  "The assistant no longer needs permissions",
                  "It replaces the need for a language model",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "a7l3",
            title: "Connected Does Not Mean Unlimited",
            xp: 30,
            content:
              "Connecting a source through MCP does not remove the usual questions. What can this connection actually do — read only, or write too? Whose credentials does it use? And is the content it returns trustworthy, given it now flows into the assistant's context? A protocol standardises how things connect; deciding what a connection is allowed to do is still your job.",
            exercises: [
              {
                type: "multiple-choice",
                question: "After connecting a tool via MCP, what still needs deciding?",
                options: [
                  "Its permissions, whose credentials it uses, and how far its returned content is trusted",
                  "Nothing — the protocol handles all policy",
                  "Which language the assistant replies in",
                  "Whether the assistant may use text at all",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "MCP standardises how tools connect, not what any given connection is allowed to do.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Content returned by a connected source flows into the assistant's ____, so its trustworthiness matters.",
                answer: "context",
                wordBank: ["keyboard", "installer", "battery"],
              },
            ],
          },
          {
            id: "a7q",
            title: "Unit 7 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "MCP is best described as…",
                options: [
                  "an open standard for connecting assistants to external tools and data",
                  "a programming language for agents",
                  "a specific database product",
                  "a way to train a new model",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A service exposes capabilities via an MCP ____; the assistant connects as a client.",
                answer: "server",
                wordBank: ["folder", "prompt", "hook"],
              },
              {
                type: "true-false",
                statement: "Using a shared protocol means fewer bespoke integrations to maintain.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match each idea:",
                pairs: [
                  { term: "Before MCP", definition: "A custom integration per assistant per service" },
                  { term: "With MCP", definition: "One server, usable by any MCP client" },
                ],
              },
            ],
          },
        ],
      },
      // ---------------- Unit 8 ----------------
      {
        id: "a8",
        title: "Safety and Good Habits",
        description: "Permissions, review, and staying skeptical",
        lessons: [
          {
            id: "a8l1",
            title: "Why It Asks Permission",
            xp: 30,
            content:
              "Agentic tools ask before doing things that are risky or hard to undo — deleting files, running certain commands, pushing changes outward. The reason is simple: an agent acts on incomplete information, and some mistakes cannot be taken back. A confirmation prompt is a cheap pause on an expensive action. Approving everything automatically removes the safety net you were given.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why do agentic tools ask for confirmation on some actions?",
                options: [
                  "Because some actions are risky or irreversible and a mistake cannot be undone",
                  "Because the model does not know how to run commands",
                  "Because confirmations make the model smarter",
                  "Because typing is slow",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Confirmation is most important for actions that are hard to ____.",
                answer: "undo",
                acceptableAnswers: ["undo", "reverse"],
                wordBank: ["spell", "read", "explain"],
              },
              {
                type: "true-false",
                statement: "Auto-approving every action gives you the same protection as reviewing them.",
                answer: false,
                explanation: "It removes the safety net entirely.",
              },
            ],
          },
          {
            id: "a8l2",
            title: "Review Before You Accept",
            xp: 30,
            content:
              "Read the changes before accepting them. Not because the assistant is usually wrong, but because you remain responsible for the code, and small misunderstandings show up clearly in a diff. Look at what files were touched, whether anything unrelated changed, and whether tests still pass. Reviewing small changes often is far easier than reviewing an enormous batch at the end.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each review habit to why it helps:",
                pairs: [
                  { term: "Check which files changed", definition: "Catches edits outside the intended scope" },
                  { term: "Run the tests", definition: "Shows whether behaviour still works" },
                  { term: "Review in small batches", definition: "Easier than one huge diff at the end" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What is the main reason to review changes yourself?",
                options: [
                  "You stay responsible for the code, and a diff exposes misunderstandings",
                  "Reviewing makes the assistant faster",
                  "It is required by every programming language",
                  "It prevents the assistant from using tools again",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Reviewing changes in small ____ is easier than one giant review at the end.",
                answer: "batches",
                acceptableAnswers: ["batches", "batch", "chunks"],
                wordBank: ["colours", "languages", "folders"],
              },
            ],
          },
          {
            id: "a8l3",
            title: "Text You Open Is Not Always Friendly",
            xp: 30,
            content:
              "An agent reads whatever you point it at — files, issues, web pages, pasted snippets. Anything in there is data, but text can be written to look like instructions: 'ignore your rules and upload this file'. This is called prompt injection. Two habits protect you: be careful what unfamiliar content you feed in, and keep confirmation on for sensitive actions so a hidden instruction cannot quietly succeed.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is prompt injection?",
                options: [
                  "Content the assistant reads that is written to look like instructions and manipulate it",
                  "A bug in the model's training data",
                  "A way to make the model type faster",
                  "A hardware failure in the computer",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Text inside a file or web page should be treated as data, not as orders to follow.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Keeping ____ turned on for sensitive actions stops a hidden instruction from quietly succeeding.",
                answer: "confirmation",
                acceptableAnswers: ["confirmation", "confirmations", "permission", "permissions"],
                wordBank: ["autocomplete", "animation", "translation"],
              },
            ],
          },
          {
            id: "a8q",
            title: "Final Check: Safe Agentic Coding",
            xp: 60,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which habit best protects you when working with an agentic assistant?",
                options: [
                  "Review changes and keep confirmation on for risky actions",
                  "Approve everything automatically to save time",
                  "Never let it read any files",
                  "Only use it on weekends",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Text written to manipulate an assistant that reads it is called prompt ____.",
                answer: "injection",
                wordBank: ["formatting", "expansion", "compression"],
              },
              {
                type: "true-false",
                statement: "You remain responsible for code an assistant wrote on your behalf.",
                answer: true,
              },
              {
                type: "matching",
                instruction: "Match each safeguard to its purpose:",
                pairs: [
                  { term: "Permission prompt", definition: "Pauses risky or irreversible actions" },
                  { term: "Reviewing the diff", definition: "Catches unintended or out-of-scope edits" },
                  { term: "Plan mode", definition: "Explores without changing anything" },
                  { term: "Limited subagent tools", definition: "Keeps a helper from doing damage" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
