// Course data for AIED: Prompt Engineering

export type Exercise =
  | {
      type: "multiple-choice";
      question: string;
      options: string[];
      correctIndex: number;
    }
  | {
      type: "fill-blank";
      prompt: string;
      answer: string;
      acceptableAnswers?: string[];
    }
  | {
      type: "drag-drop";
      instruction: string;
      words: string[]; // correct order
    }
  | {
      type: "true-false";
      statement: string;
      answer: boolean;
      explanation?: string;
    }
  | {
      type: "matching";
      instruction: string;
      pairs: { term: string; definition: string }[];
    }
  | {
      type: "short-answer";
      question: string;
      minWords?: number;
      // Optional reference answer used for AI tutor/help only.
      referenceAnswer?: string;
    };

export interface Lesson {
  id: string;
  title: string;
  xp: number;
  content?: string;
  exercises?: Exercise[];
  isQuiz?: boolean;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  title: string;
  tier: "Free" | "Premium" | "Premium + Certificate";
  ageRange: string;
  badge: "Beginner" | "Elementary" | "Intermediate" | "Advanced" | "Master";
  units: Unit[];
}

const lesson = (id: string, title: string, xp = 15): Lesson => ({ id, title, xp });
const quiz = (id: string, title: string): Lesson => ({ id, title, xp: 25, isQuiz: true });

export const levels: Level[] = [
  {
    id: "l1",
    title: "Beginner",
    tier: "Free",
    ageRange: "Ages 6-10",
    badge: "Beginner",
    units: [
      {
        id: "u1",
        title: "What is AI?",
        description: "Meet your friendly AI helper",
        lessons: [
          {
            id: "u1l1",
            title: "Meet Your AI Friend",
            xp: 25,
            content:
              "AI stands for Artificial Intelligence. Think of AI as a very smart helper that learned by reading billions of books, websites, and conversations. When you talk to AI, you use something called a PROMPT — which is just a fancy word for the message or question you send it!",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a prompt?",
                options: [
                  "A type of computer",
                  "The message or question you send to AI",
                  "A robot",
                  "A type of game",
                ],
                correctIndex: 1,
              },
              {
                type: "fill-blank",
                prompt: "AI stands for Artificial ___________",
                answer: "Intelligence",
              },
              {
                type: "drag-drop",
                instruction: "Build your first prompt by dragging words in the right order:",
                words: ["Please", "write", "a", "short", "story", "about", "a", "dragon"],
              },
              {
                type: "multiple-choice",
                question: "How did AI learn to be smart?",
                options: [
                  "It was born smart",
                  "By reading billions of books and websites",
                  "From watching TV",
                  "From going to school",
                ],
                correctIndex: 1,
              },
              {
                type: "true-false",
                statement: "AI can learn from information it has been trained on.",
                answer: true,
                explanation: "Yes! AI learns patterns from huge amounts of training data.",
              },
              {
                type: "matching",
                instruction: "Match each term to its definition:",
                pairs: [
                  { term: "AI", definition: "Artificial Intelligence" },
                  { term: "Prompt", definition: "A message you send to AI" },
                  { term: "Response", definition: "What AI sends back to you" },
                  { term: "Training", definition: "How AI learned information" },
                ],
              },
              {
                type: "short-answer",
                question: "In your own words, what would you use AI to help you with?",
                minWords: 5,
              },
              {
                type: "multiple-choice",
                question: "Which of these is an example of a prompt?",
                options: [
                  "Clicking a button",
                  "Typing a question or instruction to AI",
                  "Drawing a picture",
                  "Watching a video",
                ],
                correctIndex: 1,
              },
              {
                type: "fill-blank",
                prompt: "When you send a message to AI, you are writing a ___________",
                answer: "prompt",
              },
              {
                type: "drag-drop",
                instruction: "Put these steps in the correct order for talking to AI:",
                words: [
                  "Think of what you need help with",
                  "Write a clear prompt",
                  "Send your prompt to AI",
                  "Read the AI response",
                  "Decide if the answer is helpful",
                ],
              },
            ],
          },
          {
            id: "u1l2",
            title: "How Does AI Think?",
            xp: 20,
            content:
              "AI doesn't think like humans. It looks at patterns in the words you give it and predicts what should come next. The more clearly you describe what you want, the better its prediction.",
            exercises: [
              { type: "multiple-choice", question: "How does AI generate answers?", options: ["By guessing randomly", "By predicting patterns from training data", "By searching Google", "By copying other AIs"], correctIndex: 1 },
              { type: "true-false", statement: "AI thinks exactly like a human brain.", answer: false, explanation: "AI predicts patterns — it does not feel or reason like a human." },
              { type: "fill-blank", prompt: "AI predicts the next ____ in a sequence.", answer: "word", acceptableAnswers: ["word", "token"] },
              { type: "multiple-choice", question: "Why are clear prompts important?", options: ["They look nicer", "They help AI predict better answers", "They use less energy", "They are required by law"], correctIndex: 1 },
            ],
          },
          {
            id: "u1l3",
            title: "Talking to AI",
            xp: 20,
            content: "Talking to AI is like texting a helpful friend. Say hi, be polite, and ask for what you actually want.",
            exercises: [
              { type: "multiple-choice", question: "Which is a better prompt?", options: ["stuff about space", "Write 3 fun facts about Mars for a 10-year-old", "space??", "tell me"], correctIndex: 1 },
              { type: "drag-drop", instruction: "Order the parts of a strong request:", words: ["Greeting", "Task", "Details", "Format"] },
              { type: "true-false", statement: "Giving AI more specific details usually leads to better answers.", answer: true },
            ],
          },
          {
            id: "u1l4",
            title: "Your First Prompt",
            xp: 20,
            content: "Now you'll write your own. A great first prompt has 3 parts: who you are, what you want, and how you want it.",
            exercises: [
              { type: "short-answer", question: "Write a prompt asking AI to plan a birthday party for a 9-year-old.", minWords: 8 },
              { type: "multiple-choice", question: "Which detail makes a prompt clearer?", options: ["The color of your screen", "The audience and format", "The time of day", "Your favorite food"], correctIndex: 1 },
              { type: "fill-blank", prompt: "A great prompt tells AI the who, the what, and the ____.", answer: "how" },
            ],
          },
          {
            id: "u1q",
            title: "Unit 1 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "What does AI stand for?", options: ["Automatic Internet", "Artificial Intelligence", "Awesome Info", "Active Interface"], correctIndex: 1 },
              { type: "multiple-choice", question: "A prompt is...", options: ["A button", "The message you send AI", "A robot", "An error"], correctIndex: 1 },
              { type: "true-false", statement: "Clearer prompts get better answers.", answer: true },
              { type: "fill-blank", prompt: "AI predicts the next ____.", answer: "word" },
              { type: "multiple-choice", question: "Which prompt is best?", options: ["help", "explain photosynthesis to a 5th grader in 3 short bullets", "science??", "do it"], correctIndex: 1 },
            ],
          },
        ],
      },
      {
        id: "u2",
        title: "Building Simple Prompts",
        description: "Learn to be clear and specific",
        lessons: [
          {
            id: "u2l1", title: "Ask a Clear Question", xp: 20,
            content: "Vague prompts get vague answers. Clear prompts get clear answers.",
            exercises: [
              { type: "multiple-choice", question: "Which is clearer?", options: ["tell me about dogs", "List 5 facts about Labrador Retrievers", "dogs??", "info"], correctIndex: 1 },
              { type: "true-false", statement: "Adding numbers (like '5 facts') makes prompts clearer.", answer: true },
              { type: "fill-blank", prompt: "Clear prompts get clear ____.", answer: "answers" },
            ],
          },
          { id: "u2l2", title: "Be Specific", xp: 20, content: "Specifics tell AI exactly what you want.", exercises: [
            { type: "multiple-choice", question: "Pick the specific prompt.", options: ["write a poem", "Write a 4-line haiku about autumn leaves", "poem please", "haiku?"], correctIndex: 1 },
            { type: "drag-drop", instruction: "Order from least to most specific:", words: ["story", "fantasy story", "300-word fantasy story", "300-word fantasy story for ages 8-10"] },
          ]},
          { id: "u2l3", title: "Give AI Context", xp: 20, content: "Context is the background info AI needs to help you well.", exercises: [
            { type: "multiple-choice", question: "Why give AI context?", options: ["It looks nice", "So AI knows your situation", "Required by law", "Saves time"], correctIndex: 1 },
            { type: "short-answer", question: "Add context: 'help me write an email'. Rewrite with context.", minWords: 10 },
          ]},
          { id: "u2l4", title: "Check Your Results", xp: 20, content: "Always read AI's answer carefully. AI can be wrong!", exercises: [
            { type: "true-false", statement: "AI is always 100% correct.", answer: false, explanation: "AI can make mistakes — always verify." },
            { type: "multiple-choice", question: "If AI's answer is wrong, you should...", options: ["Trust it anyway", "Refine your prompt and retry", "Give up", "Yell at it"], correctIndex: 1 },
          ]},
          { id: "u2q", title: "Unit 2 Check", xp: 50, isQuiz: true, exercises: [
            { type: "multiple-choice", question: "Best prompt?", options: ["food", "Suggest 3 quick weeknight dinners using chicken", "yum", "?"], correctIndex: 1 },
            { type: "true-false", statement: "Always verify AI's answers.", answer: true },
            { type: "fill-blank", prompt: "Context tells AI your ____.", answer: "situation" },
          ]},
        ],
      },
    ],
  },
  {
    id: "l2",
    title: "Elementary",
    tier: "Free",
    ageRange: "Ages 11-13",
    badge: "Elementary",
    units: [
      {
        id: "u3",
        title: "Prompt Basics",
        description: "What makes a great prompt",
        lessons: [
          {
            id: "u3l1",
            title: "What Makes a Good Prompt?",
            xp: 20,
            content:
              "A good prompt is clear, specific, and gives AI enough information to help you well. Think of it like ordering at a restaurant — 'food' isn't a real order, but 'a medium cheese pizza with extra basil' is something the kitchen can actually make.",
            exercises: [
              { type: "multiple-choice", question: "Which of these is the clearest prompt?", options: ["Tell me stuff", "Write a 100-word summary of the water cycle for a 6th grader", "Water??", "Explain"], correctIndex: 1 },
              { type: "true-false", statement: "A vague prompt usually gets a vague answer.", answer: true },
              { type: "fill-blank", prompt: "A good prompt should be clear and ____.", answer: "specific" },
              {
                type: "matching",
                instruction: "Match each quality to its definition:",
                pairs: [
                  { term: "Clear", definition: "Easy to understand, no confusion" },
                  { term: "Specific", definition: "Gives exact details" },
                  { term: "Vague", definition: "Missing important details" },
                ],
              },
            ],
          },
          {
            id: "u3l2",
            title: "Keywords and Instructions",
            xp: 20,
            content:
              "Keywords tell AI the topic, and instructions tell it what to do with that topic. 'Dogs' is a keyword. 'List 5 fun facts about dogs' combines a keyword with a clear instruction.",
            exercises: [
              { type: "multiple-choice", question: "In the prompt 'Explain photosynthesis in 3 bullet points,' what is the instruction?", options: ["photosynthesis", "Explain ... in 3 bullet points", "3", "bullet"], correctIndex: 1 },
              { type: "drag-drop", instruction: "Build a prompt by putting the words in order:", words: ["Explain", "how", "volcanoes", "form", "in", "two", "sentences"] },
              { type: "fill-blank", prompt: "The topic word in a prompt is called a ____.", answer: "keyword" },
            ],
          },
          {
            id: "u3l3",
            title: "Setting the Scene",
            xp: 20,
            content:
              "Setting the scene means giving AI context — who you are, who the answer is for, or the situation you're in. Context helps AI tailor its response instead of guessing.",
            exercises: [
              { type: "multiple-choice", question: "Which prompt sets the best scene?", options: ["Write about space", "I'm a 6th grader writing a science report — explain black holes in simple terms", "space fact", "tell me"], correctIndex: 1 },
              { type: "true-false", statement: "Telling AI who the answer is for (like 'for a 10-year-old') can change how it responds.", answer: true, explanation: "Context like audience changes vocabulary and tone." },
              { type: "short-answer", question: "Write a prompt that sets the scene for asking AI to help you study for a math test.", minWords: 8 },
            ],
          },
          {
            id: "u3l4",
            title: "Tone and Style",
            xp: 20,
            content:
              "Tone is the mood of the writing — funny, serious, friendly, formal. You can ask AI to write in a specific tone, like 'explain this like I'm 5' or 'write this professionally for my teacher.'",
            exercises: [
              { type: "multiple-choice", question: "Which prompt asks for a specific tone?", options: ["Tell me about recycling", "Explain recycling in a fun, silly way with jokes", "recycling info", "list recycling facts"], correctIndex: 1 },
              {
                type: "matching",
                instruction: "Match each tone to its description:",
                pairs: [
                  { term: "Formal", definition: "Serious and proper, like for a teacher or boss" },
                  { term: "Casual", definition: "Relaxed, like talking to a friend" },
                  { term: "Playful", definition: "Fun and silly" },
                ],
              },
              { type: "fill-blank", prompt: "Asking AI to 'explain this like I'm 5' is a request about ____.", answer: "tone", acceptableAnswers: ["tone", "style"] },
            ],
          },
          {
            id: "u3q",
            title: "Unit 3 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "What makes a prompt 'specific'?", options: ["It's long", "It gives exact details", "It's polite", "It's short"], correctIndex: 1 },
              { type: "true-false", statement: "Context helps AI tailor its answer.", answer: true },
              { type: "fill-blank", prompt: "The mood or style of writing is called ____.", answer: "tone" },
            ],
          },
        ],
      },
      {
        id: "u4",
        title: "Prompt Patterns",
        description: "Reusable prompt frameworks",
        lessons: [
          {
            id: "u4l1",
            title: "The Who-What-Why Pattern",
            xp: 20,
            content:
              "A simple pattern for strong prompts: WHO you are (or who it's for), WHAT you want, and WHY (the goal or purpose). Using all three helps AI give a genuinely useful answer.",
            exercises: [
              { type: "multiple-choice", question: "In 'I'm a beginner cook — give me a simple pasta recipe for a quick weeknight dinner,' what is the WHY?", options: ["I'm a beginner cook", "give me a simple pasta recipe", "for a quick weeknight dinner", "pasta"], correctIndex: 2 },
              { type: "drag-drop", instruction: "Build a Who-What-Why prompt in order:", words: ["I'm", "a", "new", "gamer", "recommend", "a", "beginner-friendly", "video", "game"] },
              { type: "true-false", statement: "The Who-What-Why pattern only works for cooking prompts.", answer: false, explanation: "It works for almost any topic — school, hobbies, work, and more." },
            ],
          },
          {
            id: "u4l2",
            title: "Step by Step Prompts",
            xp: 20,
            content:
              "When a task has many parts, ask AI to work through it step by step. This helps AI (and you!) follow the logic and catch mistakes along the way.",
            exercises: [
              { type: "multiple-choice", question: "Why ask AI to work 'step by step'?", options: ["It's more polite", "It helps break down complex problems clearly", "It makes answers shorter", "It's required"], correctIndex: 1 },
              { type: "fill-blank", prompt: "Asking AI to explain its reasoning one step at a time is called ____ ____ prompting.", answer: "step by step", acceptableAnswers: ["step by step", "step-by-step"] },
              { type: "short-answer", question: "Write a step-by-step prompt asking AI to help you plan a school project.", minWords: 8 },
            ],
          },
          {
            id: "u4l3",
            title: "Creative Prompts",
            xp: 20,
            content:
              "Creative prompts ask AI to imagine, invent, or tell stories. The more vivid detail you give — characters, setting, mood — the more original the result.",
            exercises: [
              { type: "multiple-choice", question: "Which is the most creative prompt?", options: ["Write a story", "Write a 200-word adventure story about a shy dragon who is afraid of fire", "story please", "dragon"], correctIndex: 1 },
              {
                type: "matching",
                instruction: "Match each story ingredient to its meaning:",
                pairs: [
                  { term: "Character", definition: "Who the story is about" },
                  { term: "Setting", definition: "Where and when the story happens" },
                  { term: "Mood", definition: "The feeling of the story" },
                ],
              },
              { type: "true-false", statement: "Adding details like character and setting usually makes creative writing prompts stronger.", answer: true },
            ],
          },
          {
            id: "u4l4",
            title: "Problem Solving Prompts",
            xp: 20,
            content:
              "Problem-solving prompts ask AI to help you think through a challenge — like resolving a disagreement, fixing a mistake, or planning a schedule. Explain the problem clearly and what you've already tried.",
            exercises: [
              { type: "multiple-choice", question: "What should a good problem-solving prompt include?", options: ["Just the problem name", "The problem, background, and what you've tried", "Nothing, AI will guess", "Only emojis"], correctIndex: 1 },
              { type: "fill-blank", prompt: "Explaining what you've already tried helps AI avoid suggesting the ____ thing.", answer: "same" },
              { type: "short-answer", question: "Write a prompt asking AI for help solving a disagreement between two friends over a group project.", minWords: 10 },
            ],
          },
          {
            id: "u4q",
            title: "Unit 4 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "The Who-What-Why pattern includes:", options: ["Who, What, Why", "When, Where, Who", "What, When, Why", "Who, How, When"], correctIndex: 0 },
              { type: "true-false", statement: "Step-by-step prompts help break down complex tasks.", answer: true },
              { type: "fill-blank", prompt: "Creative prompts often include character, setting, and ____.", answer: "mood" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "l3",
    title: "Intermediate",
    tier: "Premium",
    ageRange: "Ages 14-17",
    badge: "Intermediate",
    units: [
      {
        id: "u5",
        title: "Advanced Prompt Techniques",
        description: "Pro-level prompt patterns",
        lessons: [
          lesson("u5l1", "Chain of Thought Prompting"),
          lesson("u5l2", "Role Playing with AI"),
          lesson("u5l3", "Few Shot Prompting"),
          lesson("u5l4", "Prompt Iteration"),
          quiz("u5q", "Unit 5 Check"),
        ],
      },
      {
        id: "u6",
        title: "Real World Applications",
        description: "Apply prompts to real tasks",
        lessons: [
          lesson("u6l1", "Prompts for School Projects"),
          lesson("u6l2", "Prompts for Creative Writing"),
          lesson("u6l3", "Prompts for Research"),
          lesson("u6l4", "Prompts for Coding Help"),
          quiz("u6q", "Unit 6 Check"),
        ],
      },
    ],
  },
  {
    id: "l4",
    title: "Advanced",
    tier: "Premium",
    ageRange: "College / Adult",
    badge: "Advanced",
    units: [
      {
        id: "u7",
        title: "Professional Prompt Engineering",
        description: "System prompts and parameters",
        lessons: [
          lesson("u7l1", "System Prompts"),
          lesson("u7l2", "Temperature and Parameters"),
          lesson("u7l3", "Multi-Step Workflows"),
          lesson("u7l4", "Prompt Optimization"),
          quiz("u7q", "Unit 7 Check"),
        ],
      },
      {
        id: "u8",
        title: "Industry Applications",
        description: "Prompts that drive outcomes",
        lessons: [
          lesson("u8l1", "Prompts for Business"),
          lesson("u8l2", "Prompts for Marketing"),
          lesson("u8l3", "Prompts for Data Analysis"),
          lesson("u8l4", "Building Prompt Libraries"),
          quiz("u8q", "Unit 8 Check"),
        ],
      },
    ],
  },
  {
    id: "l5",
    title: "Master",
    tier: "Premium + Certificate",
    ageRange: "Professional",
    badge: "Master",
    units: [
      {
        id: "u9",
        title: "Expert Techniques",
        description: "Frontier prompt engineering",
        lessons: [
          lesson("u9l1", "Agentic Prompting"),
          lesson("u9l2", "Prompt Chaining"),
          lesson("u9l3", "Adversarial Prompting"),
          lesson("u9l4", "Evaluating AI Outputs"),
          quiz("u9q", "Unit 9 Check"),
        ],
      },
      {
        id: "u10",
        title: "Certification Prep",
        description: "Earn your AIED certificate",
        lessons: [
          lesson("u10l1", "Industry Standards"),
          lesson("u10l2", "Portfolio Building"),
          lesson("u10l3", "Mock Certification Exam"),
          lesson("u10l4", "Final Project"),
          { id: "final", title: "FINAL EXAM: AIED Prompt Engineering Certificate", xp: 200, isQuiz: true },
        ],
      },
    ],
  },
];

export function findLesson(lessonId: string): { lesson: Lesson; unit: Unit; level: Level } | null {
  for (const level of levels) {
    for (const unit of level.units) {
      for (const l of unit.lessons) {
        if (l.id === lessonId) return { lesson: l, unit, level };
      }
    }
  }
  return null;
}

// ---- Fuzzy matching utilities ----

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const v0 = new Array(b.length + 1);
  const v1 = new Array(b.length + 1);
  for (let i = 0; i <= b.length; i++) v0[i] = i;
  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= b.length; j++) v0[j] = v1[j];
  }
  return v1[b.length];
}

export type FuzzyResult = {
  status: "exact" | "close" | "wrong";
  similarity: number;
  correctAnswer: string;
};

/**
 * Fuzzy match a typed answer against one or more accepted answers.
 * - >= 95% similarity (or exact normalized match) -> "exact"
 * - >= 80% similarity -> "close" (counts as correct, show gentle hint)
 * - otherwise -> "wrong"
 */
export function fuzzyMatch(
  input: string,
  accepted: string | string[],
): FuzzyResult {
  const candidates = Array.isArray(accepted) ? accepted : [accepted];
  const a = normalize(input);
  let bestSim = 0;
  let best = candidates[0];
  for (const c of candidates) {
    const b = normalize(c);
    if (!a && !b) return { status: "exact", similarity: 1, correctAnswer: c };
    const dist = levenshtein(a, b);
    const sim = 1 - dist / Math.max(a.length, b.length, 1);
    if (sim > bestSim) {
      bestSim = sim;
      best = c;
    }
  }
  let status: FuzzyResult["status"] = "wrong";
  if (bestSim >= 0.95) status = "exact";
  else if (bestSim >= 0.8) status = "close";
  return { status, similarity: bestSim, correctAnswer: best };
}
