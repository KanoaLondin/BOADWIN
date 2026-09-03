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
      /** Optional explicit word bank options (correct answer added automatically). */
      wordBank?: string[];
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
          {
            id: "u5l1",
            title: "Chain of Thought Prompting",
            xp: 20,
            content:
              "Chain-of-thought prompting means asking AI to reason step by step before giving a final answer, instead of jumping straight to a conclusion. Adding a phrase like 'think through this step by step' often produces more accurate, more reliable answers — especially for math, logic, and multi-part problems.",
            exercises: [
              { type: "multiple-choice", question: "What does chain-of-thought prompting ask AI to do?", options: ["Answer as fast as possible", "Show its reasoning step by step before the final answer", "Use only short words", "Skip difficult questions"], correctIndex: 1 },
              { type: "true-false", statement: "Chain-of-thought prompting tends to help most with simple yes/no questions.", answer: false, explanation: "It helps most with multi-step reasoning, like math or logic problems." },
              { type: "fill-blank", prompt: "Adding 'think step by step' to a prompt is an example of ____-of-thought prompting.", answer: "chain" },
              { type: "short-answer", question: "Rewrite this prompt to use chain-of-thought: 'What's 15% of 240?'", minWords: 6 },
            ],
          },
          {
            id: "u5l2",
            title: "Role Playing with AI",
            xp: 20,
            content:
              "Role-play prompting asks AI to respond as a specific character or expert — 'act as a history teacher' or 'respond as a supportive coach.' This shapes vocabulary, tone, and the kind of knowledge AI draws on.",
            exercises: [
              { type: "multiple-choice", question: "Why assign AI a role?", options: ["To make it slower", "To shape its tone, vocabulary, and perspective", "Because it's required", "To confuse it"], correctIndex: 1 },
              {
                type: "matching",
                instruction: "Match each role to its likely effect:",
                pairs: [
                  { term: "Act as a lawyer", definition: "Formal tone, legal reasoning style" },
                  { term: "Act as a 5-year-old's teacher", definition: "Simple words, patient tone" },
                  { term: "Act as a debate opponent", definition: "Challenges your ideas, argues the other side" },
                ],
              },
              { type: "drag-drop", instruction: "Build a role-play prompt in order:", words: ["Act", "as", "a", "personal", "trainer", "and", "design", "a", "beginner", "workout", "plan"] },
            ],
          },
          {
            id: "u5l3",
            title: "Few Shot Prompting",
            xp: 20,
            content:
              "Few-shot prompting means showing AI a couple of examples of exactly what you want before asking for a new one. Examples teach the pattern faster than a long explanation would.",
            exercises: [
              { type: "multiple-choice", question: "What is a 'few-shot' prompt?", options: ["A prompt with no examples", "A prompt that includes a few examples of the desired output", "A very short prompt", "A prompt sent multiple times"], correctIndex: 1 },
              { type: "true-false", statement: "Zero-shot means asking AI to do a task with no examples given.", answer: true },
              { type: "fill-blank", prompt: "Showing AI 2-3 examples before your real request is called ____-shot prompting.", answer: "few" },
              { type: "short-answer", question: "Write a few-shot prompt that teaches AI to turn casual sentences into formal ones (include 2 examples).", minWords: 15 },
            ],
          },
          {
            id: "u5l4",
            title: "Prompt Iteration",
            xp: 20,
            content:
              "Your first prompt is rarely your best one. Iteration means reading AI's response, noticing what's missing or wrong, and rewriting the prompt to fix it — a quick feedback loop that gets you to a great result fast.",
            exercises: [
              { type: "multiple-choice", question: "What should you do if AI's first answer misses the mark?", options: ["Give up", "Refine your prompt with more specific instructions and try again", "Assume AI is broken", "Only ask once, ever"], correctIndex: 1 },
              { type: "true-false", statement: "Most professional prompt writers get the perfect result on the very first try.", answer: false, explanation: "Iteration — refining based on the response — is a normal, expected part of the process." },
              { type: "short-answer", question: "AI gives you a summary that's too long. Write a follow-up prompt to fix it.", minWords: 6 },
            ],
          },
          {
            id: "u5q",
            title: "Unit 5 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "Chain-of-thought prompting is most useful for:", options: ["Yes/no questions", "Multi-step reasoning problems", "One-word answers", "Random topics"], correctIndex: 1 },
              { type: "multiple-choice", question: "Few-shot prompting works by:", options: ["Giving zero examples", "Showing examples of the pattern you want", "Repeating the same word", "Asking many unrelated questions"], correctIndex: 1 },
              { type: "true-false", statement: "Assigning AI a role can change its tone and perspective.", answer: true },
            ],
          },
        ],
      },
      {
        id: "u6",
        title: "Real World Applications",
        description: "Apply prompts to real tasks",
        lessons: [
          {
            id: "u6l1",
            title: "Prompts for School Projects",
            xp: 20,
            content:
              "AI can help you brainstorm, outline, and check your work for school — but the best prompts ask for help thinking, not for AI to do the assignment for you. Try 'quiz me on this chapter' or 'help me outline my essay' instead of 'write my essay.'",
            exercises: [
              { type: "multiple-choice", question: "Which is the most responsible use of AI for school?", options: ["Ask AI to write your entire essay", "Ask AI to quiz you on material you studied", "Copy AI's answer word-for-word", "Skip studying and just submit AI's work"], correctIndex: 1 },
              { type: "true-false", statement: "Using AI to brainstorm ideas is generally more appropriate than having it write your final assignment for you.", answer: true },
              { type: "short-answer", question: "Write a prompt asking AI to help you study for a history exam without just giving you the answers.", minWords: 10 },
            ],
          },
          {
            id: "u6l2",
            title: "Prompts for Creative Writing",
            xp: 20,
            content:
              "For creative writing, give AI a strong creative brief: genre, characters, tone, length, and any constraints. Treat AI like a brainstorming partner — ask for options, then pick and revise the best one.",
            exercises: [
              { type: "multiple-choice", question: "What makes a strong creative writing prompt?", options: ["Just a topic word", "Genre, tone, length, and key details", "No instructions at all", "Only the title"], correctIndex: 1 },
              { type: "fill-blank", prompt: "Asking AI for multiple options and then picking the best one is a form of prompt ____.", answer: "iteration" },
              { type: "short-answer", question: "Write a creative writing prompt for a short mystery story set at a school.", minWords: 12 },
            ],
          },
          {
            id: "u6l3",
            title: "Prompts for Research",
            xp: 20,
            content:
              "AI can help you find angles, summarize sources, and organize notes — but always verify facts, dates, and citations independently, since AI can state incorrect information confidently.",
            exercises: [
              { type: "true-false", statement: "You should always verify factual claims AI gives you, especially for research.", answer: true },
              { type: "multiple-choice", question: "A good research prompt might ask AI to:", options: ["Make up sources", "Summarize a topic and suggest search terms to verify facts", "Skip citations entirely", "Never be questioned"], correctIndex: 1 },
              { type: "fill-blank", prompt: "When AI states something false very confidently, that's sometimes called a ____.", answer: "hallucination" },
            ],
          },
          {
            id: "u6l4",
            title: "Prompts for Coding Help",
            xp: 20,
            content:
              "When asking AI for coding help, include the language, what the code should do, any errors you're seeing, and what you've already tried. Precise prompts get precise, debuggable code.",
            exercises: [
              { type: "multiple-choice", question: "What should a good coding prompt include?", options: ["Just 'fix my code'", "The language, the goal, the error message, and what you tried", "Nothing, AI will guess the language", "Only the error message"], correctIndex: 1 },
              { type: "drag-drop", instruction: "Order the parts of a strong coding prompt:", words: ["Language:", "Python", "goal:", "sort", "a", "list", "error:", "TypeError", "on", "line", "4"] },
              { type: "short-answer", question: "Write a prompt asking AI to help debug a JavaScript function that isn't returning the right value.", minWords: 10 },
            ],
          },
          {
            id: "u6q",
            title: "Unit 6 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "true-false", statement: "It's fine to submit AI-written work as your own for school assignments.", answer: false, explanation: "Using AI to brainstorm or study is different from submitting its work as yours — always follow your school's AI policy." },
              { type: "multiple-choice", question: "When asking for coding help, you should include:", options: ["Nothing but 'help'", "The language, goal, and any error messages", "Only the error code", "Your favorite color"], correctIndex: 1 },
              { type: "fill-blank", prompt: "When AI confidently states something false, it's called a ____.", answer: "hallucination" },
            ],
          },
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
          {
            id: "u7l1",
            title: "System Prompts",
            xp: 20,
            content:
              "A system prompt sets the ground rules for an entire conversation — the AI's role, tone, boundaries, and format — before the user says anything. Where a regular prompt asks for one task, a system prompt shapes how AI behaves across every response.",
            exercises: [
              { type: "multiple-choice", question: "What is a system prompt used for?", options: ["Asking a one-time question", "Setting persistent rules and role for the whole conversation", "Ending a conversation", "Deleting chat history"], correctIndex: 1 },
              { type: "true-false", statement: "A system prompt is typically set once, before the user's messages, rather than repeated every turn.", answer: true },
              { type: "fill-blank", prompt: "A prompt that sets the AI's role and rules for an entire session is called a ____ prompt.", answer: "system" },
            ],
          },
          {
            id: "u7l2",
            title: "Temperature and Parameters",
            xp: 20,
            content:
              "Temperature controls how predictable or creative AI's output is: low temperature gives focused, consistent answers; high temperature gives more varied, surprising ones. Other parameters, like max tokens, control response length.",
            exercises: [
              { type: "multiple-choice", question: "Low temperature settings tend to produce:", options: ["Wild, unpredictable answers", "Focused, consistent answers", "No answers", "Only questions"], correctIndex: 1 },
              { type: "true-false", statement: "High temperature is generally better for tasks needing precise, repeatable answers, like math.", answer: false, explanation: "Low temperature suits precise tasks; high temperature suits creative brainstorming." },
              {
                type: "matching",
                instruction: "Match each setting to its effect:",
                pairs: [
                  { term: "Low temperature", definition: "Consistent, focused output" },
                  { term: "High temperature", definition: "Varied, creative output" },
                  { term: "Max tokens", definition: "Limits response length" },
                ],
              },
            ],
          },
          {
            id: "u7l3",
            title: "Multi-Step Workflows",
            xp: 20,
            content:
              "Complex tasks often work better broken into a sequence of prompts, where each step's output feeds the next — outline, then draft, then revise — rather than asking for everything in one giant prompt.",
            exercises: [
              { type: "multiple-choice", question: "Why break a task into multiple prompt steps?", options: ["It's always required", "Each step can be checked and refined before moving on", "It's faster to write one giant prompt", "AI can't handle two prompts"], correctIndex: 1 },
              { type: "short-answer", question: "Break 'write a blog post about climate change' into a 3-step prompt workflow.", minWords: 12 },
              { type: "true-false", statement: "A multi-step workflow lets you catch and fix errors early instead of only at the very end.", answer: true },
            ],
          },
          {
            id: "u7l4",
            title: "Prompt Optimization",
            xp: 20,
            content:
              "Optimizing a prompt means testing variations to see which produces the most consistent, highest-quality results — trimming ambiguity, reordering instructions, or adding examples until the output reliably meets your bar.",
            exercises: [
              { type: "multiple-choice", question: "Prompt optimization mainly involves:", options: ["Writing a prompt once and never changing it", "Testing and refining variations for consistent quality", "Making prompts as long as possible", "Removing all instructions"], correctIndex: 1 },
              { type: "fill-blank", prompt: "Removing unclear or unnecessary wording from a prompt reduces ____.", answer: "ambiguity" },
              { type: "true-false", statement: "A shorter, clearer prompt is sometimes more effective than a longer, vaguer one.", answer: true },
            ],
          },
          {
            id: "u7q",
            title: "Unit 7 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "A system prompt is best described as:", options: ["A one-time question", "Persistent rules for the whole conversation", "A type of error", "A coding language"], correctIndex: 1 },
              { type: "true-false", statement: "Low temperature produces more consistent output than high temperature.", answer: true },
              { type: "fill-blank", prompt: "Breaking a task into a sequence of connected prompts is called a multi-step ____.", answer: "workflow" },
            ],
          },
        ],
      },
      {
        id: "u8",
        title: "Industry Applications",
        description: "Prompts that drive outcomes",
        lessons: [
          {
            id: "u8l1",
            title: "Prompts for Business",
            xp: 20,
            content:
              "Business prompts should specify audience, goal, and format — a prompt for a client email needs different tone and structure than one for an internal memo. Always state who will read the output.",
            exercises: [
              { type: "multiple-choice", question: "What should a business prompt usually specify?", options: ["Nothing extra", "Audience, goal, and format", "Only the company name", "Random keywords"], correctIndex: 1 },
              { type: "short-answer", question: "Write a prompt asking AI to draft a short client apology email for a shipping delay.", minWords: 12 },
              { type: "true-false", statement: "The same prompt style works equally well for a formal client email and a casual internal Slack message.", answer: false, explanation: "Tone and formality should shift based on audience." },
            ],
          },
          {
            id: "u8l2",
            title: "Prompts for Marketing",
            xp: 20,
            content:
              "Marketing prompts benefit from a clear brand voice, target audience, and call to action. Ask AI for multiple headline or caption options, then pick and refine the strongest one.",
            exercises: [
              { type: "multiple-choice", question: "A strong marketing prompt should include:", options: ["Just a product name", "Brand voice, audience, and call to action", "No details at all", "Only hashtags"], correctIndex: 1 },
              { type: "fill-blank", prompt: "The action you want the reader to take, like 'Shop Now,' is called a ____ to action.", answer: "call" },
              { type: "short-answer", question: "Write a prompt for AI to generate 3 Instagram captions for a new coffee shop opening.", minWords: 12 },
            ],
          },
          {
            id: "u8l3",
            title: "Prompts for Data Analysis",
            xp: 20,
            content:
              "When asking AI to analyze data, describe the data's structure, what you want to learn from it, and how you want the answer presented — a table, a summary, or specific calculations.",
            exercises: [
              { type: "multiple-choice", question: "A good data analysis prompt should describe:", options: ["Nothing about the data", "The data's structure and what insight you want", "Only the file name", "Your opinion of the data"], correctIndex: 1 },
              { type: "true-false", statement: "You should always double-check AI's calculations on important data rather than assume they're correct.", answer: true },
              { type: "short-answer", question: "Write a prompt asking AI to summarize trends in a spreadsheet of monthly sales figures.", minWords: 10 },
            ],
          },
          {
            id: "u8l4",
            title: "Building Prompt Libraries",
            xp: 20,
            content:
              "A prompt library is a saved collection of your best-performing prompts, organized by task, so you (or a team) can reuse and adapt them instead of rewriting from scratch every time.",
            exercises: [
              { type: "multiple-choice", question: "What is a prompt library for?", options: ["Storing unrelated files", "Reusing and adapting proven prompts across a team or workflow", "Deleting old prompts", "Nothing useful"], correctIndex: 1 },
              { type: "true-false", statement: "Saving and organizing effective prompts saves time on repeated tasks.", answer: true },
              { type: "fill-blank", prompt: "A saved, organized collection of reusable prompts is called a prompt ____.", answer: "library" },
            ],
          },
          {
            id: "u8q",
            title: "Unit 8 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "Business and marketing prompts should always specify:", options: ["Nothing", "Audience and goal", "Only keywords", "The weather"], correctIndex: 1 },
              { type: "true-false", statement: "You should verify AI's data calculations before trusting them for important decisions.", answer: true },
              { type: "fill-blank", prompt: "A saved collection of reusable, proven prompts is called a prompt ____.", answer: "library" },
            ],
          },
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
          {
            id: "u9l1",
            title: "Agentic Prompting",
            xp: 20,
            content:
              "Agentic prompting sets up AI to plan and take a sequence of actions toward a goal — using tools, checking results, and deciding next steps — rather than just answering a single question.",
            exercises: [
              { type: "multiple-choice", question: "What distinguishes an 'agentic' AI setup from a simple prompt?", options: ["It only answers once", "It can plan, use tools, and take multiple actions toward a goal", "It never makes mistakes", "It ignores instructions"], correctIndex: 1 },
              { type: "true-false", statement: "An agentic system might check its own work and decide on a next step, rather than stopping after one response.", answer: true },
              { type: "fill-blank", prompt: "AI that plans and takes a sequence of actions toward a goal is described as ____.", answer: "agentic" },
            ],
          },
          {
            id: "u9l2",
            title: "Prompt Chaining",
            xp: 20,
            content:
              "Prompt chaining links prompts together so one response becomes the input to the next — like an assembly line, where each stage refines the work before passing it forward.",
            exercises: [
              { type: "multiple-choice", question: "Prompt chaining works by:", options: ["Repeating the same prompt", "Feeding one prompt's output into the next prompt as input", "Deleting previous responses", "Ignoring context"], correctIndex: 1 },
              { type: "short-answer", question: "Describe a 3-prompt chain for turning a rough idea into a polished product description.", minWords: 15 },
              { type: "true-false", statement: "Prompt chaining can help catch errors earlier by checking output at each stage.", answer: true },
            ],
          },
          {
            id: "u9l3",
            title: "Adversarial Prompting",
            xp: 20,
            content:
              "Adversarial prompting means intentionally trying to break, confuse, or trick an AI system — often to test its safety and reliability before it's used in the real world. This is also called red-teaming.",
            exercises: [
              { type: "multiple-choice", question: "Why do teams use adversarial prompting?", options: ["To make AI fail for fun", "To find and fix weaknesses before real users hit them", "To slow down AI", "It has no real purpose"], correctIndex: 1 },
              { type: "fill-blank", prompt: "Deliberately testing an AI system for weaknesses is also called ____-teaming.", answer: "red" },
              { type: "true-false", statement: "Adversarial testing is typically done to improve safety and reliability, not to cause harm.", answer: true },
            ],
          },
          {
            id: "u9l4",
            title: "Evaluating AI Outputs",
            xp: 20,
            content:
              "Evaluating AI output means checking it against clear criteria — accuracy, relevance, tone, completeness — instead of just accepting the first answer. Strong prompt engineers build a habit of critically reviewing every response.",
            exercises: [
              { type: "multiple-choice", question: "Which is NOT a useful criterion for evaluating AI output?", options: ["Accuracy", "Relevance to the request", "How long it took to type the prompt", "Completeness"], correctIndex: 2 },
              { type: "true-false", statement: "Evaluating AI output means accepting the first response without question.", answer: false, explanation: "Careful evaluation means checking output against clear criteria before trusting it." },
              { type: "short-answer", question: "List 3 criteria you'd use to judge whether an AI-written product description is good.", minWords: 8 },
            ],
          },
          {
            id: "u9q",
            title: "Unit 9 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              { type: "fill-blank", prompt: "AI that plans and takes multiple actions toward a goal is called ____.", answer: "agentic" },
              { type: "multiple-choice", question: "Prompt chaining means:", options: ["Repeating one prompt", "Feeding one prompt's output into the next", "Ignoring all context", "Deleting history"], correctIndex: 1 },
              { type: "true-false", statement: "Adversarial prompting (red-teaming) is used to find weaknesses before real users do.", answer: true },
            ],
          },
        ],
      },
      {
        id: "u10",
        title: "Certification Prep",
        description: "Earn your AIED certificate",
        lessons: [
          {
            id: "u10l1",
            title: "Industry Standards",
            xp: 20,
            content:
              "Professional prompt engineers follow shared practices: documenting what works, testing systematically, and understanding responsible AI use — including bias, privacy, and being transparent about AI's role in a final product.",
            exercises: [
              { type: "multiple-choice", question: "Which is part of responsible, professional prompt engineering practice?", options: ["Hiding that AI was used", "Documenting and testing prompts systematically", "Ignoring bias and privacy", "Never reviewing output"], correctIndex: 1 },
              { type: "true-false", statement: "Being transparent about AI's role in a finished product is considered good professional practice.", answer: true },
              { type: "fill-blank", prompt: "Watching for unfair or skewed AI outputs is part of checking for ____.", answer: "bias" },
            ],
          },
          {
            id: "u10l2",
            title: "Portfolio Building",
            xp: 20,
            content:
              "A prompt engineering portfolio showcases your best work: a few strong before/after prompt examples, the reasoning behind your choices, and measurable results where possible.",
            exercises: [
              { type: "multiple-choice", question: "A strong portfolio piece should show:", options: ["Just a final answer with no context", "The prompt, your reasoning, and the result", "Only your name", "Nothing about the process"], correctIndex: 1 },
              { type: "short-answer", question: "Describe one project you'd feature in a prompt engineering portfolio and why.", minWords: 15 },
            ],
          },
          {
            id: "u10l3",
            title: "Mock Certification Exam",
            xp: 30,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "Which technique asks AI to show its reasoning step by step?", options: ["Few-shot prompting", "Chain-of-thought prompting", "Zero-shot prompting", "Role-play prompting"], correctIndex: 1 },
              { type: "multiple-choice", question: "A system prompt is best used to:", options: ["Ask a single question", "Set persistent rules for a whole conversation", "End the session", "Change the API key"], correctIndex: 1 },
              { type: "true-false", statement: "High temperature settings generally produce more varied, creative output.", answer: true },
              { type: "fill-blank", prompt: "Deliberately testing AI for weaknesses is called ____-teaming.", answer: "red" },
              { type: "multiple-choice", question: "Prompt chaining connects prompts by:", options: ["Feeding one output into the next input", "Repeating the same prompt endlessly", "Randomizing prompts", "Deleting old prompts"], correctIndex: 0 },
            ],
          },
          {
            id: "u10l4",
            title: "Final Project",
            xp: 40,
            content:
              "For your final project, choose a real task — for work, school, or a personal goal — and build a small prompt library for it: at least three prompts, refined through iteration, with notes on why each works.",
            exercises: [
              { type: "short-answer", question: "Describe the real-world task you'll build your final prompt library around, and what your first prompt will be.", minWords: 20 },
              { type: "true-false", statement: "A strong final project should include prompts that were refined through iteration, not just a first draft.", answer: true },
            ],
          },
          {
            id: "final",
            title: "FINAL EXAM: AIED Prompt Engineering Certificate",
            xp: 200,
            isQuiz: true,
            exercises: [
              { type: "multiple-choice", question: "What is a prompt?", options: ["A type of computer", "The message or instruction you send to AI", "A robot", "A file format"], correctIndex: 1 },
              { type: "multiple-choice", question: "Which improves a prompt's clarity most?", options: ["Adding vague words", "Adding specific details and context", "Removing all punctuation", "Making it as short as possible always"], correctIndex: 1 },
              { type: "true-false", statement: "Chain-of-thought prompting asks AI to reason step by step.", answer: true },
              { type: "multiple-choice", question: "Few-shot prompting means:", options: ["Giving zero examples", "Providing a few examples of the desired pattern", "Asking very few questions", "Using very few words"], correctIndex: 1 },
              { type: "multiple-choice", question: "A system prompt is used to:", options: ["Ask one-off questions", "Set persistent rules and role for an entire conversation", "Delete a conversation", "End a session immediately"], correctIndex: 1 },
              { type: "fill-blank", prompt: "AI confidently stating false information is called a ____.", answer: "hallucination" },
              { type: "multiple-choice", question: "Adversarial prompting (red-teaming) is done to:", options: ["Break AI for fun", "Find and fix weaknesses before real users encounter them", "Slow down responses", "Waste time"], correctIndex: 1 },
              { type: "true-false", statement: "Evaluating AI output means accepting the first response without checking it.", answer: false, explanation: "Good practice means checking accuracy, relevance, and completeness before trusting output." },
              { type: "multiple-choice", question: "Prompt chaining connects prompts by:", options: ["Feeding one prompt's output into the next prompt's input", "Repeating the same prompt", "Randomizing word order", "Ignoring previous context"], correctIndex: 0 },
              { type: "short-answer", question: "In 2-3 sentences, explain what makes a prompt effective and give one example.", minWords: 20 },
            ],
          },
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

// ---- Fill-in-the-blank word bank ----

/** Every fill-blank answer used anywhere in the course (deduped). */
const allBlankAnswers: string[] = (() => {
  const set = new Set<string>();
  for (const lv of levels)
    for (const u of lv.units)
      for (const l of u.lessons)
        for (const ex of l.exercises ?? [])
          if (ex.type === "fill-blank") set.add(ex.answer);
  return [...set];
})();

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic shuffle so the bank stays stable across re-renders. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a word bank for a fill-blank exercise: the correct answer plus
 * plausible distractors (other real answers from the course, preferring
 * similar-length words). Deterministic for a given prompt.
 */
export function wordBankFor(
  exercise: Extract<Exercise, { type: "fill-blank" }>,
  size = 4,
): string[] {
  if (exercise.wordBank?.length) {
    return seededShuffle(
      [...new Set([exercise.answer, ...exercise.wordBank])],
      hash(exercise.prompt),
    );
  }
  const seed = hash(exercise.prompt);
  const exclude = new Set(
    [exercise.answer, ...(exercise.acceptableAnswers ?? [])].map((w) => w.toLowerCase()),
  );
  const target = exercise.answer.length;
  const pool = allBlankAnswers
    .filter((w) => !exclude.has(w.toLowerCase()))
    .map((w) => ({ w, d: Math.abs(w.length - target) }))
    .sort((a, b) => a.d - b.d || hash(a.w + seed) - hash(b.w + seed))
    .slice(0, 12)
    .map((x) => x.w);
  const distractors = seededShuffle(pool, seed).slice(0, Math.max(1, size - 1));
  return seededShuffle([exercise.answer, ...distractors], seed + 7);
}
