// Course track 10: "No-Code AI Data Analysis" (Beginner, Free for now — re-gate
// as Premium once more units exist).
import type { Level } from "./course-data";

export const noCodeDataLevels: Level[] = [
  {
    id: "ncL1",
    title: "No-Code Data Analysis",
    tier: "Free",
    ageRange: "Ages 13+",
    badge: "Beginner",
    units: [
      {
        id: "nc0",
        title: "Ask your spreadsheet a question",
        description: "Use plain-English questions to explore data without writing formulas",
        lessons: [
          {
            id: "nc0l1",
            title: "You don't need formulas anymore",
            xp: 20,
            content:
              "Newer AI tools let you type a plain-English question about your data, like \"what were our top 3 products last month,\" and get an answer or chart back. You don't have to write a formula, build a pivot table by hand, or remember which function does what. The main shift is from telling the computer exactly how to calculate something to describing what you want to know.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What's the main shift these tools make?",
                options: [
                  "You describe what you want to know instead of writing the steps to get it",
                  "They eliminate the need to have any data at all",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l2",
            title: "Asking a good question",
            xp: 20,
            content:
              "Vague questions get vague, unreliable answers. \"How's business?\" invites the tool to guess what you mean. A better question names the metric, the time period, and how you want it sorted: \"What was revenue by region last quarter, highest to lowest?\" The more specific you are, the less the AI has to fill in on its own.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which question is more likely to get a trustworthy answer?",
                options: [
                  "What was total revenue by region in Q3, sorted highest to lowest?",
                  "How are we doing overall?",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Pick the better rewrite of \"Are sales good this year?\"",
                options: [
                  "What is total sales this year compared to the same period last year, as a percentage change?",
                  "Tell me about sales",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l3",
            title: "Reading what it gives you back",
            xp: 20,
            content:
              "Before trusting a generated chart or summary, do a quick sanity check. Does the total roughly match what you already know? Are the units and time period clearly labeled? Could the tool have grabbed the wrong column or counted something twice? A small mismatch is often a sign that the question was interpreted differently than you intended.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A tool reports total customers as 40,000 but your raw spreadsheet only has 4,200 rows. What likely happened?",
                options: [
                  "It probably summed the wrong column, or double-counted rows",
                  "Nothing - spreadsheets often undercount",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l4",
            title: "When to trust it, when to double-check",
            xp: 20,
            content:
              "These tools are great for a first pass and for exploring data quickly. But before a generated number drives a real decision — like pricing, headcount, or a public report — verify it the same way you'd verify any other AI claim. Treat the output as a starting point, not the final word.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "An AI tool suggests raising prices 8% based on a demand analysis it ran. What's the right next step?",
                options: [
                  "Check the underlying numbers and methodology before acting on it",
                  "Implement it - the analysis came with a specific number, so it's solid",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "What do no-code AI data tools let you do?",
                options: [
                  "Ask questions about your data in plain language instead of writing formulas",
                  "Replace the need to ever collect or clean data",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Which question is more likely to produce a trustworthy answer?",
                options: [
                  "What was total revenue by region in Q3, sorted highest to lowest?",
                  "How are we doing overall?",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "If a generated total doesn't match what you already know, what should you do?",
                options: [
                  "Investigate before trusting it",
                  "Assume your own records are wrong",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "A wildly wrong total is most likely caused by:",
                options: [
                  "The tool summed the wrong column or double-counted rows",
                  "The spreadsheet being too small",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "These tools are best used for:",
                options: [
                  "First-pass exploration, verified before big decisions",
                  "Final decisions without any extra checking",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "A specific number from an AI analysis is automatically decision-ready.",
                answer: false,
                explanation:
                  "Specific numbers can still come from wrong assumptions or columns, so verify before acting.",
              },
            ],
          },
        ],
      },
    ],
  },
];
