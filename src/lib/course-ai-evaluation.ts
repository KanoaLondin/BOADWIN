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
          {
            id: "ev1l2",
            title: "The Silent Failure Trap",
            xp: 20,
            content:
              "Most eval work exists to catch failures that never announce themselves. A model can be wrong ninety percent as often as it's right and still sound identical in tone across both. Without a structured eval, the only failures you notice are the ones a user complains about loudly enough to reach you, and by then the damage is already done. The long tail is the danger zone: rare inputs, edge-case phrasing, unusual formats. Most of your eval effort should target that long tail, not the easy cases you already know work.",
            exercises: [
              {
                type: "true-false",
                statement: "If no users have complained about a prompt, it is probably working correctly on all common inputs.",
                answer: false,
                explanation: "Silent failures don't generate complaints by definition. Absence of complaints is not evidence of correctness.",
              },
              {
                type: "multiple-choice",
                question: "Where should most eval effort be concentrated?",
                options: [
                  "The long tail of rare, edge-case inputs",
                  "The handful of examples that already work well",
                  "Whatever input is fastest to test",
                  "Only the inputs a competitor uses",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A failure that never surfaces as a complaint or error message is called a ____ failure.",
                answer: "silent",
                wordBank: ["loud", "logged", "scheduled"],
              },
            ],
          },
          {
            id: "ev1l3",
            title: "Regression Testing, Borrowed From Software",
            xp: 20,
            content:
              "Software engineers have run regression tests for decades: rerun the old test suite after every change to prove you didn't break something that used to work. AI evaluation borrows this idea directly. Every time you edit a prompt, swap a model, or change a retrieval step, you rerun your eval suite against the same fixed set of cases and compare scores before and after. A prompt change that improves one metric while quietly breaking another is exactly what regression testing is built to catch, and it is nearly impossible to catch by eyeballing a few outputs.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the core idea behind regression testing, applied to AI systems?",
                options: [
                  "Rerun the same fixed test cases after every change and compare scores",
                  "Only test brand-new prompts, never old ones",
                  "Ask a user whether the new version feels better",
                  "Retrain the model from scratch each time",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A prompt edit that improves one metric can still break something else that used to work.",
                answer: true,
                explanation: "This is exactly why regression testing compares full eval scores before and after, not a single metric.",
              },
            ],
          },
          {
            id: "ev1l4",
            title: "Building Your First Golden Dataset",
            xp: 20,
            content:
              "A golden dataset is a small, deliberately curated set of examples that represent the real range of inputs your system will face, each paired with a known-good expected answer or scoring criteria. It should include the easy, obvious cases, the tricky edge cases, and at least a few cases you already know are hard. Twenty to fifty examples is enough to start catching regressions long before you need hundreds. The dataset should stay fixed over time so scores are comparable across changes - if you keep swapping which examples you test, you lose the ability to compare today's score to last week's.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each golden dataset property to why it matters:",
                pairs: [
                  { term: "Covers easy and hard cases", definition: "Represents the real range of inputs the system faces" },
                  { term: "Stays fixed over time", definition: "Keeps scores comparable across changes" },
                  { term: "Twenty to fifty examples", definition: "Enough to catch regressions without huge overhead" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "A golden dataset should stay ____ over time so scores remain comparable across changes.",
                answer: "fixed",
                wordBank: ["random", "growing", "hidden"],
              },
            ],
          },
          {
            id: "ev1q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "An eval suite is best described as:",
                options: [
                  "A specification of what \"good\" means for your specific use case",
                  "A generic score borrowed from a leaderboard",
                  "A way to make a model faster",
                  "A replacement for writing prompts",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Silent failures generate complaints just as reliably as loud, obvious failures do.",
                answer: false,
                explanation: "Silent failures don't announce themselves, which is exactly why structured evals are needed to catch them.",
              },
              {
                type: "multiple-choice",
                question: "Regression testing for AI systems means:",
                options: [
                  "Rerunning a fixed set of test cases after every change and comparing scores",
                  "Only testing the newest version of a prompt",
                  "Asking users to vote on which version they like",
                  "Increasing the model's temperature setting",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Where should most eval effort go?",
                options: [
                  "The long tail of rare, edge-case inputs",
                  "The cases you already know work well",
                  "The shortest possible prompts",
                  "Whatever the model vendor recommends",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A golden dataset should be reshuffled with new examples every time you test, to keep things fresh.",
                answer: false,
                explanation: "Keeping the dataset fixed is what makes scores comparable across changes over time.",
              },
              {
                type: "fill-blank",
                prompt: "A small, curated set of trusted examples used to test changes is called a ____ dataset.",
                answer: "golden",
                wordBank: ["random", "synthetic", "public"],
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
          {
            id: "ev2l2",
            title: "Reading a Benchmark Table",
            xp: 20,
            content:
              "Different benchmarks test different things, and mixing them up leads to bad conclusions. MMLU tests broad factual and reasoning knowledge across dozens of subjects. HumanEval and similar coding benchmarks test whether generated code actually passes hidden test cases. GSM8K tests multi-step arithmetic reasoning. A model can top one and lag badly on another, so a single headline score hides more than it reveals. Always ask which specific benchmark a claimed score comes from, and whether that benchmark resembles your actual task before drawing any conclusion from it.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each benchmark to what it primarily tests:",
                pairs: [
                  { term: "MMLU", definition: "Broad factual and reasoning knowledge across subjects" },
                  { term: "HumanEval", definition: "Whether generated code passes hidden test cases" },
                  { term: "GSM8K", definition: "Multi-step arithmetic reasoning" },
                ],
              },
              {
                type: "true-false",
                statement: "A model that tops one benchmark will automatically top every other benchmark too.",
                answer: false,
                explanation: "A model can lead on one benchmark and lag on another, since each measures a different capability.",
              },
            ],
          },
          {
            id: "ev2l3",
            title: "Contamination in Depth",
            xp: 20,
            content:
              "Benchmark contamination happens when test questions, or close paraphrases of them, end up in a model's training data. The model then appears to reason its way to the right answer when it may simply be recalling it. Contamination is hard to detect from the outside since training data isn't public, but warning signs include suspiciously perfect scores on older, widely-circulated benchmarks and a model doing far worse on a freshly written variant of the same questions. This is one reason serious evaluators keep a private, unpublished test set alongside any public benchmark.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "A model doing much worse on a freshly written variant of familiar questions is a warning sign of ____.",
                answer: "contamination",
                wordBank: ["latency", "drift", "sampling"],
              },
              {
                type: "multiple-choice",
                question: "Why do serious evaluators keep a private, unpublished test set?",
                options: [
                  "Public benchmarks can leak into training data and inflate scores",
                  "Private tests are always shorter",
                  "Public benchmarks are illegal to use",
                  "Private tests don't require any rubric",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev2l4",
            title: "From Shortlist to Decision",
            xp: 20,
            content:
              "The right way to use leaderboards is as a filter, not a verdict. Start with benchmark rankings to build a shortlist of two or three candidate models, then run each candidate against your own golden dataset and your own rubric. The model that wins on your task-specific eval is the one you ship, even if it isn't the leaderboard leader. Cost and latency belong in this decision too: a slightly lower-scoring model that is five times cheaper and twice as fast is often the better real-world choice.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the model-selection steps in order:",
                words: ["Shortlist", "from", "leaderboard", "test", "on", "your", "own", "dataset", "pick", "the", "winner"],
              },
              {
                type: "true-false",
                statement: "Cost and latency are irrelevant once you know which model scores highest on your eval.",
                answer: false,
                explanation: "A cheaper, faster model with a slightly lower score is often the better real-world choice.",
              },
            ],
          },
          {
            id: "ev2q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Public benchmarks like MMLU and HumanEval primarily measure:",
                options: [
                  "General capability, not performance on your specific task",
                  "Exactly how your production system will behave",
                  "How much a model costs to run",
                  "How fast a model responds",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "When a model has been trained on data overlapping the test set, the benchmark suffers from ____.",
                answer: "contamination",
                wordBank: ["compression", "regression", "calibration"],
              },
              {
                type: "multiple-choice",
                question: "GSM8K is a benchmark primarily focused on:",
                options: [
                  "Multi-step arithmetic reasoning",
                  "Code generation correctness",
                  "Image classification",
                  "Speech recognition",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A suspiciously perfect score on an old, widely-circulated benchmark can be a sign of contamination.",
                answer: true,
                explanation: "This is one of the classic warning signs evaluators watch for.",
              },
              {
                type: "multiple-choice",
                question: "The right way to use a leaderboard when picking a model is to:",
                options: [
                  "Build a shortlist, then test each candidate on your own golden dataset",
                  "Always pick the top-ranked model outright",
                  "Ignore leaderboards entirely",
                  "Use it in place of a rubric",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Cost and latency should factor into a real-world model choice, not just the eval score.",
                answer: true,
                explanation: "A cheaper or faster model with a slightly lower score is often the better practical choice.",
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
          {
            id: "ev3l2",
            title: "Writing Rubrics That Hold Up",
            xp: 20,
            content:
              "A strong rubric turns a vague quality judgment into a repeatable decision. It defines each score level with concrete, observable criteria instead of adjectives like \"good\" or \"bad\" that mean different things to different raters. Good rubrics also specify edge cases in advance: what score does a technically correct but unhelpfully verbose answer get? What about a response that's correct but in the wrong format? Writing these decisions down before rating begins is what makes two different raters land on the same score for the same response.",
            exercises: [
              {
                type: "true-false",
                statement: "Describing a score level with the word \"good\" is specific enough for a rubric.",
                answer: false,
                explanation: "Vague adjectives mean different things to different raters. Rubrics need concrete, observable criteria.",
              },
              {
                type: "multiple-choice",
                question: "Why should a rubric address edge cases before rating begins?",
                options: [
                  "So different raters land on the same score for the same response",
                  "So raters can skip unclear cases entirely",
                  "So the rubric can be shorter",
                  "So only one rater is ever needed",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev3l3",
            title: "Choosing and Calibrating Raters",
            xp: 20,
            content:
              "Not every task needs subject-matter experts, but some do: rating medical or legal answers without relevant background produces unreliable scores no matter how good the rubric is. Before raters start scoring for real, run a calibration round: give everyone the same handful of examples, compare their scores, and discuss disagreements until the group converges on how the rubric should be applied. Recalibrate periodically during long projects, since standards can quietly shift over weeks even with a fixed rubric in hand.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "A round where raters score the same examples and discuss disagreements before real work begins is called ____.",
                answer: "calibration",
                wordBank: ["contamination", "regression", "sampling"],
              },
              {
                type: "true-false",
                statement: "Once a group of raters is calibrated, their standards will never drift again on a long project.",
                answer: false,
                explanation: "Standards can quietly shift over weeks, which is why periodic recalibration matters.",
              },
            ],
          },
          {
            id: "ev3l4",
            title: "Sampling: What to Actually Show Raters",
            xp: 20,
            content:
              "Human review doesn't scale to every output, so sampling strategy matters as much as rubric design. Random sampling gives an unbiased read on overall quality but can miss rare, important failure types. Stratified sampling deliberately includes a fixed share of known-hard categories, edge cases, and past failure types alongside the random draw, so rare but serious problems still get seen. A good practice is to combine both: mostly random sampling for a fair overall picture, plus a guaranteed slice of the categories you already know are risky.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each sampling approach to what it's good for:",
                pairs: [
                  { term: "Random sampling", definition: "An unbiased read on overall quality" },
                  { term: "Stratified sampling", definition: "Guaranteeing rare but risky categories get reviewed" },
                  { term: "Combining both", definition: "A fair overall picture plus coverage of known risk areas" },
                ],
              },
              {
                type: "multiple-choice",
                question: "What is the main weakness of pure random sampling for human review?",
                options: [
                  "It can miss rare, important failure types",
                  "It always costs more than stratified sampling",
                  "It requires no rubric at all",
                  "It cannot be combined with any other method",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev3q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Absolute scoring and pairwise comparison differ in that:",
                options: [
                  "Absolute scoring rates one response alone; pairwise compares two responses",
                  "Pairwise comparison never involves a rubric",
                  "Absolute scoring only works for code",
                  "They always produce identical rankings",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Low inter-rater agreement usually means your ____ is not specified clearly enough.",
                answer: "rubric",
                wordBank: ["model", "dataset", "budget"],
              },
              {
                type: "true-false",
                statement: "A rubric that uses only adjectives like \"good\" or \"bad\" is specific enough for consistent scoring.",
                answer: false,
                explanation: "Rubrics need concrete, observable criteria; vague adjectives mean different things to different raters.",
              },
              {
                type: "multiple-choice",
                question: "A calibration round for raters is best described as:",
                options: [
                  "Scoring the same examples together and discussing disagreements before real work begins",
                  "A one-time test that never needs repeating",
                  "A way to avoid writing a rubric",
                  "A survey sent only to end users",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Stratified sampling deliberately guarantees coverage of known-hard or risky categories.",
                answer: true,
                explanation: "This is what makes it useful alongside random sampling, which can miss rare failure types.",
              },
              {
                type: "multiple-choice",
                question: "Why is rater fatigue a concern in long labeling sessions?",
                options: [
                  "It can cause scoring standards to drift over the course of a session",
                  "It makes raters type faster",
                  "It has no effect on scores",
                  "It only affects automated judges",
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
          {
            id: "ev4l2",
            title: "Writing a Judge Prompt",
            xp: 25,
            content:
              "A judge prompt needs the same rigor as a human rubric, because a vague judge prompt produces vague, inconsistent grades. Give the judge model the original question, the response being graded, explicit scoring criteria, and, where possible, a reference answer to compare against. Ask for a short written rationale before the final score, not just a number. Forcing the rationale first tends to produce more consistent scores, since it makes the judge actually engage with the specific reasons a response succeeds or fails rather than pattern-matching to a vibe.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why ask a judge model for a written rationale before its final score?",
                options: [
                  "It forces engagement with specific reasons, producing more consistent scores",
                  "It makes the judge run faster",
                  "It removes the need for scoring criteria",
                  "It guarantees a perfect score every time",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Giving the judge a ____ answer to compare against improves the reliability of its grading.",
                answer: "reference",
                wordBank: ["random", "hidden", "shorter"],
              },
            ],
          },
          {
            id: "ev4l3",
            title: "Calibrating a Judge Against Humans",
            xp: 25,
            content:
              "Before trusting an LLM judge at scale, check it against a set of examples humans have already scored. Run the judge on the same examples and compare its scores to the human labels. High agreement means the judge can be trusted to handle the bulk of grading, with humans spot-checking a smaller sample. Low agreement means the judge prompt needs revision, not that you should just accept the mismatch. This calibration step should be repeated whenever you change the judge prompt, swap the judge model, or notice something seems off in production.",
            exercises: [
              {
                type: "true-false",
                statement: "If a judge model disagrees often with human scores, the fix is to accept the judge's scores as the new ground truth.",
                answer: false,
                explanation: "Low agreement signals the judge prompt likely needs revision, not that the mismatch should simply be accepted.",
              },
              {
                type: "multiple-choice",
                question: "When should judge calibration against human labels be repeated?",
                options: [
                  "Whenever the judge prompt or judge model changes, or something seems off",
                  "Only once, at the very start of a project",
                  "Never, once it's been done",
                  "Only if the human raters ask for it",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev4l4",
            title: "Multiple Judges and Ensembles",
            xp: 25,
            content:
              "A single judge model carries a single set of blind spots. Using two or three different judge models and looking at where they agree and disagree surfaces bias that a lone judge would hide. Disagreement between judges is itself useful information: it flags exactly the responses that deserve human review, rather than making you review everything or nothing. This ensemble approach costs more per graded example, so it's often reserved for high-stakes categories like safety or factuality, while cheaper single-judge grading handles routine quality checks.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each judging approach to its main advantage:",
                pairs: [
                  { term: "Single judge", definition: "Cheap and fast for routine quality checks" },
                  { term: "Multiple judges", definition: "Surfaces bias a single judge would hide" },
                  { term: "Judge disagreement", definition: "Flags exactly which responses deserve human review" },
                ],
              },
              {
                type: "true-false",
                statement: "Ensemble judging with multiple models is typically reserved for high-stakes categories because it costs more.",
                answer: true,
                explanation: "Routine checks can use a cheaper single judge; ensembles are worth the extra cost for safety and factuality.",
              },
            ],
          },
          {
            id: "ev4q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
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
                statement: "Asking a judge model for a written rationale before its score tends to produce more consistent grades.",
                answer: true,
                explanation: "Forcing the rationale first makes the judge engage with specific reasons rather than pattern-matching a vibe.",
              },
              {
                type: "multiple-choice",
                question: "Judge calibration against human labels should happen:",
                options: [
                  "Whenever the judge prompt or model changes",
                  "Only once, and never again",
                  "Only after a public complaint",
                  "Never, since judges are always accurate",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Disagreement between multiple judge models is useless noise that should be ignored.",
                answer: false,
                explanation: "Disagreement flags exactly the responses that deserve closer human review.",
              },
              {
                type: "multiple-choice",
                question: "A judge model can inherit the same blind spots as the model it grades because:",
                options: [
                  "Both may share similar training data and failure patterns",
                  "Judges are always a different type of system entirely",
                  "Judges never see the model's actual output",
                  "Judges cannot be calibrated at all",
                ],
                correctIndex: 0,
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
          {
            id: "ev5l2",
            title: "Precision, Recall and Chunking",
            xp: 25,
            content:
              "Retrieval quality depends heavily on how documents are chunked before indexing. Chunks that are too large bury the relevant sentence in irrelevant context, hurting the model's ability to use it. Chunks that are too small lose surrounding context needed to interpret them correctly. Precision at k measures how many of the top-k retrieved chunks are actually relevant; recall at k measures how much of all the relevant material in the corpus got retrieved at all. Tuning chunk size, overlap, and k together, and measuring both metrics, usually beats guessing at any one setting in isolation.",
            exercises: [
              {
                type: "true-false",
                statement: "Chunks that are too large tend to bury relevant content inside irrelevant context.",
                answer: true,
                explanation: "Oversized chunks dilute the useful sentence with surrounding noise, hurting generation quality.",
              },
              {
                type: "fill-blank",
                prompt: "Precision at k measures how many of the top-k retrieved chunks are actually ____.",
                answer: "relevant",
                wordBank: ["indexed", "chunked", "embedded"],
              },
            ],
          },
          {
            id: "ev5l3",
            title: "Faithfulness, Measured Properly",
            xp: 25,
            content:
              "Faithfulness asks a narrow, checkable question: does every claim in the generated answer actually follow from the retrieved context, or did the model add something not supported by it? This is different from correctness in general, since an answer can be faithful to a wrong or outdated retrieved document and still be factually wrong overall. A common way to measure faithfulness is to break the answer into individual claims and check each one against the retrieved context, either with human review or an LLM judge, rather than scoring the whole answer as one unit.",
            exercises: [
              {
                type: "multiple-choice",
                question: "An answer can be faithful to its retrieved context and still be factually wrong. Why?",
                options: [
                  "The retrieved document itself might be wrong or outdated",
                  "Faithfulness always guarantees correctness",
                  "Faithfulness only applies to code generation",
                  "Retrieved context is never used for grading",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A common way to measure faithfulness is to break the answer into individual ____ and check each against the context.",
                answer: "claims",
                wordBank: ["chunks", "embeddings", "tokens"],
              },
            ],
          },
          {
            id: "ev5l4",
            title: "Building an End-to-End RAG Test Set",
            xp: 25,
            content:
              "A complete RAG eval needs question-answer pairs plus, for each question, the specific documents that should be retrieved to answer it correctly. This lets you score retrieval and generation separately on the same test set: check whether the right documents came back, then, using only those correct documents, check whether the generated answer is faithful and relevant. Include questions with no good answer in the corpus at all, to verify the system says so rather than fabricating one, and questions that require combining facts from two different retrieved chunks.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put the RAG eval construction steps in order:",
                words: ["Write", "questions", "with", "known", "correct", "documents", "score", "retrieval", "then", "score", "generation", "separately"],
              },
              {
                type: "true-false",
                statement: "A good RAG test set should include questions that have no correct answer available in the corpus at all.",
                answer: true,
                explanation: "This checks whether the system correctly says it doesn't know instead of fabricating an answer.",
              },
            ],
          },
          {
            id: "ev5q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
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
                prompt: "A RAG system can fail at retrieval or at ____ - measure them separately.",
                answer: "generation",
                wordBank: ["deployment", "tokenization", "annotation"],
              },
              {
                type: "true-false",
                statement: "Chunks that are too small can lose the surrounding context needed to interpret them correctly.",
                answer: true,
                explanation: "Undersized chunks strip away context, which is the opposite problem from oversized chunks.",
              },
              {
                type: "multiple-choice",
                question: "An answer can be faithful to its retrieved context yet still be wrong overall when:",
                options: [
                  "The retrieved document itself is wrong or outdated",
                  "The answer is too short",
                  "The question was ambiguous",
                  "The judge model disagrees with a human",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A complete RAG test set should include questions with no correct answer available in the corpus.",
                answer: true,
                explanation: "This verifies the system says it doesn't know rather than fabricating an answer.",
              },
              {
                type: "multiple-choice",
                question: "Good retrieval guarantees a faithful generated answer.",
                options: [
                  "False - the model can still hallucinate on top of correctly retrieved context",
                  "True - retrieval and generation always succeed or fail together",
                  "True - faithfulness only depends on retrieval quality",
                  "False - faithfulness has nothing to do with retrieval",
                ],
                correctIndex: 0,
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
          {
            id: "ev6l2",
            title: "Scoring Multi-Step Tasks Fairly",
            xp: 25,
            content:
              "A single pass/fail label undersells most agent tasks, because partial progress matters. A booking agent that correctly finds a flight but fails at payment has done real work that a binary score erases. Better scoring breaks the task into checkpoints - understood the request, gathered the right information, took the correct actions, produced the right final result - and scores each one. This also makes debugging far easier: instead of just knowing the run failed, you know exactly which checkpoint it failed at, which points directly at what to fix.",
            exercises: [
              {
                type: "true-false",
                statement: "A binary pass/fail score captures everything useful about how an agent performed on a multi-step task.",
                answer: false,
                explanation: "It erases partial progress and gives no signal about where in the task the agent actually failed.",
              },
              {
                type: "multiple-choice",
                question: "Why break a multi-step agent task into checkpoints for scoring?",
                options: [
                  "It shows exactly where a run failed, pointing directly at what to fix",
                  "It makes the task run faster",
                  "It removes the need for a golden dataset",
                  "It guarantees the agent will succeed next time",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev6l3",
            title: "Tool Use and Error Recovery",
            xp: 25,
            content:
              "Beyond picking the right tool with the right arguments, a strong agent eval checks what happens when a tool call fails, returns an error, or times out. Does the agent retry sensibly, try an alternate approach, or ask a clarifying question, or does it hallucinate a plausible-looking result instead of admitting the tool failed? This is one of the highest-value things to test deliberately, because tool failures are common in production and an agent's behavior under failure often matters more to the user than its behavior on the easy path where everything works.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "Testing how an agent behaves when a tool call fails or times out is called testing its ____ behavior.",
                answer: "error",
                wordBank: ["success", "training", "baseline"],
              },
              {
                type: "true-false",
                statement: "An agent that hallucinates a plausible result after a tool call fails is behaving safely.",
                answer: false,
                explanation: "Fabricating a result after a failure is worse than admitting the failure, since it hides the problem from the user.",
              },
            ],
          },
          {
            id: "ev6l4",
            title: "Cost, Latency and the Efficiency Axis",
            xp: 25,
            content:
              "Two agents can reach the same correct outcome by very different routes: one in three tool calls, another in fifteen, with a proportional difference in cost and time. Efficiency metrics capture this second axis alongside correctness, since a technically successful agent that is slow or expensive may not be viable in production even though it passes every accuracy check. Track steps taken, total tokens or API cost, and wall-clock time per task, and treat unusually high values as a signal worth investigating even when the final outcome was correct.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why measure efficiency alongside correctness for agents?",
                options: [
                  "A correct but slow or expensive agent may not be viable in production",
                  "Efficiency always matters more than correctness",
                  "Efficiency metrics replace the need for task success rate",
                  "Cost is impossible to measure for agents",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "An unusually high number of steps on a task that still ended correctly is worth investigating.",
                answer: true,
                explanation: "It can signal an inefficient path even though the outcome metric alone looks fine.",
              },
            ],
          },
          {
            id: "ev6q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
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
                type: "true-false",
                statement: "A single pass/fail score fully captures how well an agent performed on a multi-step task.",
                answer: false,
                explanation: "Breaking the task into checkpoints reveals partial progress and points at exactly what failed.",
              },
              {
                type: "multiple-choice",
                question: "A strong agent eval should specifically test what happens when:",
                options: [
                  "A tool call fails, errors out, or times out",
                  "Every tool call succeeds on the first try",
                  "The user never asks a follow-up question",
                  "The agent is given unlimited time",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "An agent hallucinating a plausible result after a tool failure is preferable to admitting the failure.",
                answer: false,
                explanation: "Fabricating a result hides the real problem from the user, which is worse than an honest failure.",
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
          {
            id: "ev7l2",
            title: "Detecting Hallucination Systematically",
            xp: 20,
            content:
              "Hallucination detection means checking each claim in a response against a trusted source rather than judging the response as a whole. Break the output into individual factual claims, then verify each one against the retrieved context, a knowledge base, or a ground-truth document. A claim with no support in the source is a hallucination even if it sounds fluent and confident. Automated claim-checking with an LLM judge can scale this process, but it works best when the judge is given the source text directly rather than relying on its own parametric knowledge, since the goal is grounding, not general correctness.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the best unit to check when detecting hallucination?",
                options: [
                  "Individual factual claims within the response",
                  "The response's overall tone",
                  "The length of the response",
                  "The number of words used",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A fluent, confident-sounding claim with no support in the source text can still be a hallucination.",
                answer: true,
                explanation: "Fluency and confidence say nothing about whether a claim is actually grounded in the source.",
              },
              {
                type: "fill-blank",
                prompt: "An LLM judge checking hallucination should be given the ____ text directly rather than relying on its own knowledge.",
                answer: "source",
                wordBank: ["shortest", "translated", "random"],
              },
            ],
          },
          {
            id: "ev7l3",
            title: "Finding Bias Through Slicing",
            xp: 20,
            content:
              "An overall accuracy score can look excellent while the system performs badly for a specific group. Slicing means splitting eval results by attributes like demographic group, language, topic, or query type and comparing scores across slices instead of only looking at the average. A large gap between slices signals bias even when the aggregate number looks fine. Building a bias-aware eval means deliberately constructing test examples that cover the slices you care about, since a golden dataset with no representation of a group cannot reveal problems affecting that group. Slicing turns a single blurry number into a diagnostic tool.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "Splitting eval results by group or topic and comparing scores across groups is called ____.",
                answer: "slicing",
                wordBank: ["sampling", "training", "tokenizing"],
              },
              {
                type: "multiple-choice",
                question: "Why can an excellent overall accuracy score hide bias?",
                options: [
                  "Averaging can mask a large performance gap for a specific slice",
                  "Accuracy scores are always wrong",
                  "Bias never affects accuracy",
                  "Overall scores are calculated randomly",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev7l4",
            title: "Designing a Safety Eval Suite",
            xp: 20,
            content:
              "A safety eval suite is a dedicated test set separate from general quality checks, built specifically to probe harmful content, PII leakage, and refusal behavior. Harmful content tests use prompts designed to elicit dangerous, illegal, or abusive output and check that the model declines appropriately. PII tests check whether the model repeats or infers sensitive personal information it should not disclose. Refusal tests cut both ways: the model should refuse genuinely harmful requests but should not over-refuse benign ones, since excessive refusal is its own quality failure that frustrates real users trying to get legitimate help.",
            exercises: [
              {
                type: "true-false",
                statement: "A safety eval suite should only check that the model refuses as much as possible.",
                answer: false,
                explanation: "Over-refusing benign requests is also a failure; refusal tests must check both directions.",
              },
              {
                type: "multiple-choice",
                question: "What does a PII leakage test check?",
                options: [
                  "Whether the model repeats or infers sensitive personal information it should not disclose",
                  "Whether the model responds quickly",
                  "Whether the model uses correct grammar",
                  "Whether the model cites its sources",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Excessive refusal of benign requests is itself a quality failure.",
                answer: true,
                explanation: "It frustrates users trying to get legitimate help and is measured separately from harmful-content handling.",
              },
            ],
          },
          {
            id: "ev7q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
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
                type: "true-false",
                statement: "PII leakage is best measured as part of a general quality score.",
                answer: false,
                explanation: "Safety categories deserve their own dedicated eval suite so they cannot be averaged away.",
              },
              {
                type: "multiple-choice",
                question: "What is the best unit to check when detecting hallucination?",
                options: [
                  "Individual factual claims within the response",
                  "The response's overall tone",
                  "The length of the response",
                  "The number of words used",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Splitting eval results by group or topic and comparing scores across groups is called ____.",
                answer: "slicing",
                wordBank: ["sampling", "training", "tokenizing"],
              },
              {
                type: "true-false",
                statement: "A safety eval suite should only check that the model refuses as much as possible.",
                answer: false,
                explanation: "Over-refusing benign requests is also a failure; refusal tests must check both directions.",
              },
              {
                type: "multiple-choice",
                question: "What does a PII leakage test check?",
                options: [
                  "Whether the model repeats or infers sensitive personal information it should not disclose",
                  "Whether the model responds quickly",
                  "Whether the model uses correct grammar",
                  "Whether the model cites its sources",
                ],
                correctIndex: 0,
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
          {
            id: "ev8l2",
            title: "Choosing Your Golden Dataset",
            xp: 20,
            content:
              "A golden dataset is the backbone of every eval pipeline, and building a good one is mostly about coverage, not size. Twenty to fifty examples is often enough if they span the real distribution of inputs: typical cases, known edge cases, past failures worth guarding against, and adversarial inputs designed to probe weak points. Pull examples from real production traffic when you can, since synthetic examples tend to cluster around what you already expect and miss the messy cases users actually send. Keep the dataset under version control and update it whenever a new failure mode is discovered, so it grows to reflect the system's real history.",
            exercises: [
              {
                type: "true-false",
                statement: "A larger golden dataset is always better than a smaller one that covers more of the real input distribution.",
                answer: false,
                explanation: "Coverage of typical cases, edge cases, and past failures matters more than raw size.",
              },
              {
                type: "multiple-choice",
                question: "Why pull golden dataset examples from real production traffic when possible?",
                options: [
                  "Synthetic examples tend to miss the messy cases users actually send",
                  "Production traffic is always smaller",
                  "It removes the need for human review",
                  "It guarantees perfect model performance",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A golden dataset should be updated whenever a new ____ mode is discovered.",
                answer: "failure",
                wordBank: ["training", "sampling", "deployment"],
              },
            ],
          },
          {
            id: "ev8l3",
            title: "Automating Scoring Without Losing Signal",
            xp: 20,
            content:
              "Automation makes an eval pipeline sustainable, but it only works if the automated scorer actually agrees with human judgment. Exact-match and rule-based checks work well for tasks with a single correct answer, like structured extraction. LLM-as-judge handles open-ended quality but needs a clear rubric and periodic calibration against human ratings to catch drift. A practical pipeline routes clear-cut cases to cheap automated checks and reserves human review for ambiguous or high-stakes cases, rather than trying to automate everything or reviewing everything by hand. Recalibrate the automated scorer whenever the task or model changes meaningfully.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What keeps an LLM-as-judge scorer trustworthy over time?",
                options: [
                  "Periodic calibration against human ratings",
                  "Never changing the rubric",
                  "Removing all human review permanently",
                  "Using the largest model available regardless of rubric",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A practical eval pipeline should try to automate every single case, including ambiguous or high-stakes ones.",
                answer: false,
                explanation: "Ambiguous or high-stakes cases are better routed to human review rather than fully automated scoring.",
              },
            ],
          },
          {
            id: "ev8l4",
            title: "Wiring Evals Into CI/CD",
            xp: 20,
            content:
              "An eval pipeline delivers the most value when it runs automatically rather than depending on someone remembering to run it. Wiring the eval suite into continuous integration means every pull request that touches a prompt, model choice, or retrieval step triggers an automatic run against the golden dataset, with results posted alongside the code review. Set a threshold that blocks merging on a meaningful score drop, the same way a failing unit test blocks a merge. Store historical scores so you can see trends across weeks and months, not just pass or fail on the latest run, since gradual drift is easy to miss without a visible trend line.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "Running the eval suite automatically on every pull request means wiring it into ____.",
                answer: "CI/CD",
                wordBank: ["QA", "UX", "DNS"],
              },
              {
                type: "true-false",
                statement: "Storing only the pass or fail result of the latest eval run is enough to catch gradual quality drift.",
                answer: false,
                explanation: "Gradual drift is easy to miss without a historical trend line across many runs.",
              },
              {
                type: "multiple-choice",
                question: "What should happen when a pull request causes a meaningful eval score drop?",
                options: [
                  "The merge should be blocked, similar to a failing unit test",
                  "The score should be hidden from reviewers",
                  "The golden dataset should be deleted",
                  "The pipeline should stop running entirely",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ev8q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
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
                type: "true-false",
                statement: "A larger golden dataset is always better than a smaller one that covers more of the real input distribution.",
                answer: false,
                explanation: "Coverage of typical cases, edge cases, and past failures matters more than raw size.",
              },
              {
                type: "multiple-choice",
                question: "What keeps an LLM-as-judge scorer trustworthy over time?",
                options: [
                  "Periodic calibration against human ratings",
                  "Never changing the rubric",
                  "Removing all human review permanently",
                  "Using the largest model available regardless of rubric",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Running the eval suite automatically on every pull request means wiring it into ____.",
                answer: "CI/CD",
                wordBank: ["QA", "UX", "DNS"],
              },
              {
                type: "multiple-choice",
                question: "What should happen when a pull request causes a meaningful eval score drop?",
                options: [
                  "The merge should be blocked, similar to a failing unit test",
                  "The score should be hidden from reviewers",
                  "The golden dataset should be deleted",
                  "The pipeline should stop running entirely",
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
