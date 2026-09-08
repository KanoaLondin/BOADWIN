// Course track 5: "AI Evaluation & Testing" (Intermediate).
// Compiled from the uploaded course outline: 8 modules + a capstone project.
import type { Level } from "./course-data";

export const aiEvaluationLevels: Level[] = [
  {
    id: "evL1",
    title: "Evaluation Foundations",
    tier: "Free",
    ageRange: "Teens & adults",
    badge: "Beginner",
    units: [
      {
        id: "ev0",
        title: "Why AI output needs checking - hallucination & drift",
        description: "Confident answers aren't always correct answers",
        lessons: [
          {
            id: "ev0l1",
            title: "Confidently wrong",
            xp: 20,
            content:
              "AI models can state false things in the exact same calm, certain tone they use for true things. That's a hallucination: a fabricated answer stated with full confidence. The tone is not evidence. Models generate the most statistically likely next words, not verified facts, so confidence is a byproduct of fluency — not truth.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "An AI tells you, without hesitation, that the Eiffel Tower was completed in 1920. What does its confident tone tell you about whether that's true?",
                options: [
                  "Nothing - confidence and accuracy aren't linked in AI output",
                  "It's very likely true, since the AI sounds sure",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Hallucinations only happen when you ask an AI about obscure or unusual topics.",
                answer: false,
                explanation:
                  "Hallucinations can happen on common, everyday questions too. Confidence and topic familiarity don't guarantee accuracy.",
              },
            ],
          },
          {
            id: "ev0l2",
            title: "Where hallucinations sneak in",
            xp: 20,
            content:
              "The usual suspects are invented citations, made-up statistics, wrong dates, and fabricated quotes. The more specific and checkable a claim looks, the more dangerous it can be — because it feels trustworthy even when it isn't. Vague claims are harder to disprove, which is exactly what makes them risky.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each AI answer to the kind of hallucination it shows:",
                pairs: [
                  {
                    term: "A citation to a paper that doesn't exist",
                    definition: "Invented citation",
                  },
                  {
                    term: "A quote someone never actually said",
                    definition: "Fabricated quote",
                  },
                  {
                    term: "A founding date that's wrong by years",
                    definition: "Wrong date",
                  },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which kind of claim is easiest to fact-check on the spot?",
                options: [
                  "A specific number like 'Revenue grew 14% in Q3 2025'",
                  "A vague claim like 'the company has had a strong few years'",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev0l3",
            title: "Drift - when AI gets it right, then wrong",
            xp: 20,
            content:
              "Drift is what happens over a long conversation when the AI loses track of something it said earlier and contradicts itself, even though it started out accurate. Reliability doesn't build up over a conversation — long threads give more room for earlier details to get lost.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "Turn 1: the AI says the return window is 30 days. Turn 12 in the same chat: it says the return window is 14 days and the customer is out of luck. What happened?",
                options: [
                  "Drift - the AI contradicted a fact it stated earlier in the same conversation",
                  "The policy genuinely changed mid-conversation",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "The longer a conversation goes, the more reliable each new answer becomes.",
                answer: false,
                explanation:
                  "Reliability doesn't build up over a conversation. Long threads give more room for earlier details to get lost.",
              },
            ],
          },
          {
            id: "ev0l4",
            title: "Your two-second check",
            xp: 20,
            content:
              "Before using an AI answer, ask two questions: does it contain a specific, checkable detail? And would you bet money on it? If you hesitate on either, verify before you rely on it. That hesitation is your signal that the answer hasn't earned your trust yet.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "An AI summarizing a report says it surveyed 4,200 people across 12 countries and found a 22 percent increase. What should you do before repeating the numbers anywhere that matters?",
                options: [
                  "Check the original report before repeating the numbers anywhere that matters",
                  "Use it as-is, the numbers are specific so they're probably accurate",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "If an AI claim makes you hesitate to bet money on it, you should verify it before relying on it.",
                answer: true,
                explanation:
                  "That hesitation is a useful signal. Verification protects you from confident but wrong answers.",
              },
            ],
          },
          {
            id: "ev0q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "A hallucination is best defined as:",
                options: [
                  "A confident, fabricated answer",
                  "A slow response from the model",
                  "A question the user didn't ask",
                  "A model refusing to answer",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Confident tone in an AI answer means the content is likely accurate.",
                answer: false,
                explanation:
                  "Tone is not evidence. Confidence is a byproduct of fluency, not a guarantee of truth.",
              },
              {
                type: "multiple-choice",
                question: "A fabricated-citation hallucination is:",
                options: [
                  "A paper that doesn't exist, cited as real",
                  "A paper the model summarized too briefly",
                  "A citation with a broken URL",
                  "A paper the user never read",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Drift describes:",
                options: [
                  "Contradicting an earlier fact in the same chat",
                  "A model running slower over time",
                  "A change in the model's training data",
                  "A user switching topics mid-conversation",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "The safest claim to fact-check quickly is one that is:",
                options: [
                  "Specific and numeric",
                  "Vague and general",
                  "Short and friendly",
                  "Written in bullet points",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Before relying on an AI claim that matters, you should verify it independently first.",
                answer: true,
                explanation:
                  "Verification is the practical antidote to both hallucinations and drift.",
              },
            ],
          },
        ],
      },
      {
        id: "ev1",
        title: "Why Evaluate?",
        description: "The cost of shipping blind",
        lessons: [
          {
            id: "ev1l1",
            title: "Vibes Are Not an Eval Strategy",
            xp: 20,
            content:
              "This course exists to prevent one failure mode: a prompt or agent that looks great on the three examples you tried and fails silently on the thousand you didn't. The core vocabulary is evals, benchmarks, regression testing and golden datasets. The key reframing: an eval suite is a specification of what \"good\" means for your specific use case — not a generic score you can borrow from someone else.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is an eval suite best understood as?",
                options: [
                  "A specification of what \"good\" means for your specific use case",
                  "A public ranking of the best models",
                  "A way to make a model train faster",
                  "A replacement for writing prompts",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A small, curated set of trusted examples used to test changes is called a ____ dataset.",
                answer: "golden",
                wordBank: ["random", "synthetic", "public"],
              },
              {
                type: "true-false",
                statement: "If a prompt works on the three examples you tried, it is safe to ship.",
                answer: false,
                explanation: "That is exactly the silent-failure trap structured evals are designed to catch.",
              },
            ],
          },
        ],
      },
      {
        id: "ev2",
        title: "Benchmarks & Leaderboards",
        description: "What they do and don't tell you",
        lessons: [
          {
            id: "ev2l1",
            title: "General Capability ≠ Your Task",
            xp: 20,
            content:
              "Public benchmarks such as MMLU and HumanEval measure general capability, not whether a model is good at your task. Benchmark contamination — models trained on data overlapping the test set — inflates scores. There is also a persistent gap between benchmark performance and production performance. A leaderboard ranking is a starting shortlist, never the sole basis for a model choice in a real application.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "When a model has been trained on data overlapping the test set, the benchmark suffers from ____.",
                answer: "contamination",
                wordBank: ["compression", "regression", "calibration"],
              },
              {
                type: "multiple-choice",
                question: "How should a leaderboard ranking be used?",
                options: [
                  "As a shortlist to test against your own task, not as the final decision",
                  "As proof the top model is best for every use case",
                  "As a replacement for a golden dataset",
                  "As a measure of your own prompt quality",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Strong benchmark performance guarantees strong production performance.",
                answer: false,
                explanation: "The gap between benchmark and production conditions is one of the most common surprises.",
              },
            ],
          },
        ],
      },
      {
        id: "ev3",
        title: "Human Evaluation Design",
        description: "Rubrics, raters and agreement",
        lessons: [
          {
            id: "ev3l1",
            title: "Designing Judgment You Can Trust",
            xp: 20,
            content:
              "Human judgment is the ground truth most evals approximate, so designing it well is critical. Good rubrics produce consistent scores across different raters. Absolute scoring (\"rate this 1-5\") and pairwise comparison (\"which response is better\") answer different questions. Inter-rater agreement is your signal that a rubric is — or isn't — well specified. Long labeling sessions bring rater fatigue and drift, so sessions should be short and periodically re-calibrated.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each human-eval concept to its meaning:",
                pairs: [
                  { term: "Absolute scoring", definition: "Rate a single response on a fixed scale" },
                  { term: "Pairwise comparison", definition: "Choose which of two responses is better" },
                  { term: "Inter-rater agreement", definition: "How consistently different people score the same item" },
                  { term: "Rater drift", definition: "Standards shifting over a long labeling session" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "Low inter-rater agreement usually means your ____ is not specified clearly enough.",
                answer: "rubric",
                wordBank: ["model", "dataset", "budget"],
              },
              {
                type: "multiple-choice",
                question: "Why is human evaluation still central even when automated evals exist?",
                options: [
                  "It is the ground truth most automated evals are built to approximate",
                  "It is always cheaper than automation",
                  "Models cannot produce scores at all",
                  "It removes the need for a rubric",
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
    id: "evL2",
    title: "Scaling Evaluation",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "ev4",
        title: "LLM-as-Judge",
        description: "Promise and pitfalls",
        lessons: [
          {
            id: "ev4l1",
            title: "When a Model Grades a Model",
            xp: 25,
            content:
              "Using one model to grade another's outputs scales evaluation dramatically — and brings its own failure modes: judges that favour longer or more confident-sounding answers regardless of correctness, judges that inherit the same blind spots as the model being judged, and position bias in pairwise comparisons. Practical mitigations: calibrate the judge against human-labelled samples, randomise response order, and use multiple judge models to catch systematic bias.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which is a documented LLM-as-judge failure mode?",
                options: [
                  "Preferring longer or more confident answers regardless of correctness",
                  "Refusing to output any score",
                  "Only working on images",
                  "Being slower than human raters",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Randomising the order of two responses mitigates ____ bias in pairwise judging.",
                answer: "position",
                wordBank: ["length", "sampling", "training"],
              },
              {
                type: "true-false",
                statement: "A judge model can inherit the same blind spots as the model it grades.",
                answer: true,
                explanation: "Which is why calibration against human labels and multiple judges matter.",
              },
            ],
          },
        ],
      },
      {
        id: "ev5",
        title: "Evaluating RAG Systems",
        description: "Retrieval and generation, separately",
        lessons: [
          {
            id: "ev5l1",
            title: "Two Failure Points, Two Metrics",
            xp: 25,
            content:
              "Retrieval-augmented systems fail in two independent places: retrieval (did we find the right documents?) and generation (did the model use them correctly?). Conflating the two hides where the real problem is. Retrieval is measured with metrics like precision and recall at k. Generation is measured with faithfulness — does the answer actually follow from the retrieved context, or did the model hallucinate on top of it — and answer relevance.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each RAG metric to what it measures:",
                pairs: [
                  { term: "Precision @ k", definition: "How many of the retrieved documents were relevant" },
                  { term: "Recall @ k", definition: "How much of the relevant material was actually retrieved" },
                  { term: "Faithfulness", definition: "Whether the answer follows from the retrieved context" },
                  { term: "Answer relevance", definition: "Whether the answer addresses the question asked" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "A RAG system can fail at retrieval or at ____ — measure them separately.",
                answer: "generation",
                wordBank: ["deployment", "tokenization", "annotation"],
              },
              {
                type: "true-false",
                statement: "Good retrieval guarantees a faithful answer.",
                answer: false,
                explanation: "The model can still hallucinate on top of perfectly retrieved context.",
              },
            ],
          },
        ],
      },
      {
        id: "ev6",
        title: "Evaluating Agents",
        description: "Beyond right/wrong answers",
        lessons: [
          {
            id: "ev6l1",
            title: "Outcomes, Trajectories and Efficiency",
            xp: 25,
            content:
              "Agent evaluation is harder than single-turn evaluation because many valid paths reach a correct outcome. Task success rate is the outcome metric. Trajectory evaluation asks whether the process was reasonable, even when you only score the end state. Tool-call accuracy asks whether the agent picked the right tool with the right arguments. Efficiency metrics — steps taken, cost, time — form a second axis alongside correctness.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each agent metric to its question:",
                pairs: [
                  { term: "Task success rate", definition: "Did the agent achieve the goal?" },
                  { term: "Trajectory evaluation", definition: "Was the process it followed reasonable?" },
                  { term: "Tool-call accuracy", definition: "Did it pick the right tool with the right arguments?" },
                  { term: "Efficiency", definition: "How many steps, how much cost and time did it take?" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why is agent evaluation harder than single-turn evaluation?",
                options: [
                  "Many different valid paths can reach a correct outcome",
                  "Agents never produce text",
                  "There is no way to score them at all",
                  "Agents cannot be given test cases",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Scoring the agent's step-by-step process rather than only its end state is called ____ evaluation.",
                answer: "trajectory",
                wordBank: ["pairwise", "adversarial", "offline"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "evL3",
    title: "Evaluation in Practice",
    tier: "Premium + Certificate",
    ageRange: "Teens & adults",
    badge: "Advanced",
    units: [
      {
        id: "ev7",
        title: "Hallucination, Bias & Safety",
        description: "Quality dimensions accuracy hides",
        lessons: [
          {
            id: "ev7l1",
            title: "What an Accuracy Score Misses",
            xp: 30,
            content:
              "Some quality dimensions never show up in a simple accuracy score. Factuality checking compares claims against a source of truth. Bias surfaces when you disaggregate eval results by demographic or topic slice instead of averaging them away. And some categories deserve a dedicated safety eval suite rather than being folded into general quality: harmful content, PII leakage, and refusal appropriateness (refusing what should be refused, and not refusing what shouldn't).",
            exercises: [
              {
                type: "multiple-choice",
                question: "How do you surface bias that an average score hides?",
                options: [
                  "Disaggregate results by demographic or topic slice",
                  "Increase the model temperature",
                  "Only report the mean",
                  "Use fewer examples",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Checking whether a model refuses the right things and only the right things is called refusal ____.",
                answer: "appropriateness",
                wordBank: ["frequency", "latency", "temperature"],
              },
              {
                type: "true-false",
                statement: "PII leakage is best measured as part of a general quality score.",
                answer: false,
                explanation: "Safety categories deserve their own dedicated eval suite so they cannot be averaged away.",
              },
            ],
          },
        ],
      },
      {
        id: "ev8",
        title: "Building an Eval Pipeline",
        description: "A practical checklist",
        lessons: [
          {
            id: "ev8l1",
            title: "Evals as a Regression Gate",
            xp: 30,
            content:
              "Turn the course into a repeatable practice. Build a small golden dataset — twenty to fifty real or realistic examples — before shipping any prompt or agent change. Automate what can be automated (exact-match, LLM-as-judge) and reserve human review for ambiguous cases. Run the eval suite on every meaningful change as a regression gate, the same way you run unit tests before merging code. Track scores over time so a silent quality regression from a model or prompt update is caught immediately instead of arriving as user complaints.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the eval pipeline steps in order:",
                words: ["Build", "a", "golden", "dataset", "automate", "scoring", "review", "ambiguous", "cases", "gate", "every", "change"],
              },
              {
                type: "fill-blank",
                prompt: "Running the eval suite on every meaningful change makes it a ____ gate.",
                answer: "regression",
                wordBank: ["retrieval", "training", "sampling"],
              },
              {
                type: "multiple-choice",
                question: "Why track eval scores over time?",
                options: [
                  "To catch silent quality regressions from model or prompt updates immediately",
                  "To make the dataset larger automatically",
                  "To avoid needing a rubric",
                  "To replace human review entirely",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "evC",
        title: "Capstone Project",
        description: "Build and run a real eval",
        lessons: [
          {
            id: "evCl1",
            title: "Capstone: A 15-Example Golden Dataset",
            xp: 60,
            isQuiz: true,
            content:
              "Take a prompt or agent you have already built — from the Prompt Engineering or AI Agents course — and build a 15-example golden dataset with a scoring rubric. Run it, document where it fails, revise the prompt or agent based on those failures, then re-run the eval to confirm the fix actually worked.",
            exercises: [
              {
                type: "short-answer",
                question: "Describe your golden dataset and the rubric you scored it with.",
                minWords: 40,
                referenceAnswer:
                  "Names the system under test, how the 15 examples were chosen to cover realistic and edge cases, and a rubric with explicit pass/fail or scored criteria.",
              },
              {
                type: "short-answer",
                question: "What failed, what did you change, and did the re-run confirm the fix?",
                minWords: 30,
                referenceAnswer:
                  "Identifies a concrete failure pattern, the specific revision made, and the before/after eval scores showing whether it improved.",
              },
            ],
          },
        ],
      },
    ],
  },
];
