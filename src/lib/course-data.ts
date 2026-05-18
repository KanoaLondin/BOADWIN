// Course data for AIED: Prompt Engineering

export type ExerciseType = "multiple-choice" | "fill-blank" | "drag-drop";

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
    }
  | {
      type: "drag-drop";
      instruction: string;
      words: string[]; // correct order
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
            xp: 20,
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
            ],
          },
          lesson("u1l2", "How Does AI Think?"),
          lesson("u1l3", "Talking to AI"),
          lesson("u1l4", "Your First Prompt"),
          quiz("u1q", "Unit 1 Check"),
        ],
      },
      {
        id: "u2",
        title: "Building Simple Prompts",
        description: "Learn to be clear and specific",
        lessons: [
          lesson("u2l1", "Ask a Clear Question"),
          lesson("u2l2", "Be Specific"),
          lesson("u2l3", "Give AI Context"),
          lesson("u2l4", "Check Your Results"),
          quiz("u2q", "Unit 2 Check"),
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
          lesson("u3l1", "What Makes a Good Prompt?"),
          lesson("u3l2", "Keywords and Instructions"),
          lesson("u3l3", "Setting the Scene"),
          lesson("u3l4", "Tone and Style"),
          quiz("u3q", "Unit 3 Check"),
        ],
      },
      {
        id: "u4",
        title: "Prompt Patterns",
        description: "Reusable prompt frameworks",
        lessons: [
          lesson("u4l1", "The Who-What-Why Pattern"),
          lesson("u4l2", "Step by Step Prompts"),
          lesson("u4l3", "Creative Prompts"),
          lesson("u4l4", "Problem Solving Prompts"),
          quiz("u4q", "Unit 4 Check"),
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
