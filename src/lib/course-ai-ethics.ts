// Course track 7: "AI Ethics & Responsible AI" (Intermediate).
// Compiled from the uploaded course outline: 8 modules + a socio-technical capstone.
import type { Level } from "./course-data";

export const aiEthicsLevels: Level[] = [
  {
    id: "ethL1",
    title: "Ethical Foundations",
    tier: "Free",
    ageRange: "Teens & adults",
    badge: "Beginner",
    units: [
      {
        id: "eth1",
        title: "What Makes a System \"Ethical\"?",
        description: "Ethics as a socio-technical property",
        lessons: [
          {
            id: "eth1l1",
            title: "The Socio-Technical Frame",
            xp: 20,
            content:
              "Ethical AI isn't a property of a model in isolation — it is a property of a socio-technical system: the model, the data, the deployment context, and the people affected by its decisions, together. Several ethical lenses get applied to AI: consequentialist harm/benefit analysis, rights-based framing, and justice or fairness framing. This course doesn't pick a winner, because different problems call for different lenses.",
            exercises: [
              {
                type: "multiple-choice",
                question: "According to this module, ethical AI is a property of what?",
                options: [
                  "The whole socio-technical system: model, data, context and affected people",
                  "The model weights alone",
                  "The training hardware",
                  "The user interface",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each ethical lens to its central question:",
                pairs: [
                  { term: "Consequentialist", definition: "Do the benefits outweigh the harms produced?" },
                  { term: "Rights-based", definition: "Are anyone's fundamental rights being violated?" },
                  { term: "Justice / fairness", definition: "Are burdens and benefits distributed fairly?" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "A system's ethics depend on its deployment ____, not just its model.",
                answer: "context",
                wordBank: ["latency", "budget", "license"],
              },
            ],
          },
        ],
      },
      {
        id: "eth2",
        title: "Bias & Fairness",
        description: "Where bias actually enters",
        lessons: [
          {
            id: "eth2l1",
            title: "Data, Proxies and Feedback Loops",
            xp: 20,
            content:
              "Bias enters through skewed training data, through proxy variables that correlate with protected attributes even when those attributes are excluded, and through feedback loops where a biased model's outputs become tomorrow's training data. There are competing formal definitions of fairness — demographic parity, equal opportunity, individual fairness — and an uncomfortable mathematical result: several reasonable definitions cannot all be satisfied at once. Fairness work therefore always involves an explicit choice about which harms you prioritise avoiding.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "A variable that correlates with a protected attribute even when that attribute is excluded is a ____ variable.",
                answer: "proxy",
                wordBank: ["latent", "target", "control"],
              },
              {
                type: "multiple-choice",
                question: "What does the impossibility result about fairness definitions imply?",
                options: [
                  "You must explicitly choose which harms to prioritise avoiding",
                  "Fairness is impossible, so don't try",
                  "Demographic parity is always correct",
                  "Bias only comes from data",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Removing protected attributes from the data removes bias from the model.",
                answer: false,
                explanation: "Proxy variables can reintroduce the same correlations.",
              },
            ],
          },
        ],
      },
      {
        id: "eth3",
        title: "Transparency & Explainability",
        description: "And the limits of interpretability",
        lessons: [
          {
            id: "eth3l1",
            title: "Two Different Questions",
            xp: 20,
            content:
              "Explainability asks whether a human can understand why a specific decision was made. Transparency asks whether a human can understand how the system works in general. A system can have one without the other. Current interpretability techniques have honest limits: post-hoc explanations of a large model's output are approximations, not a window into \"true\" reasoning. Explainability is a hard legal and ethical requirement in some settings — adverse decisions affecting people — and a nice-to-have in others.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each term to its question:",
                pairs: [
                  { term: "Explainability", definition: "Why was this specific decision made?" },
                  { term: "Transparency", definition: "How does this system work in general?" },
                  { term: "Post-hoc explanation", definition: "An after-the-fact approximation of the reasoning" },
                ],
              },
              {
                type: "true-false",
                statement: "A post-hoc explanation is a direct window into a model's true reasoning.",
                answer: false,
                explanation: "It is an approximation produced after the fact.",
              },
              {
                type: "multiple-choice",
                question: "Where is explainability closest to a hard requirement?",
                options: [
                  "Adverse decisions that affect people, such as denials of credit or employment",
                  "Choosing a chatbot's tone of voice",
                  "Picking a font for the UI",
                  "Selecting a model's temperature",
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
    id: "ethL2",
    title: "Governance & Impact",
    tier: "Premium",
    ageRange: "Teens & adults",
    badge: "Intermediate",
    units: [
      {
        id: "eth4",
        title: "Privacy & Data Protection",
        description: "Risks beyond traditional data protection",
        lessons: [
          {
            id: "eth4l1",
            title: "Memorisation, Inference and Linkage",
            xp: 25,
            content:
              "LLMs introduce privacy risks beyond traditional data protection: training-data memorisation and regurgitation, inference of sensitive attributes from seemingly innocuous inputs, and the compounding risk of agentic systems that can access and combine data across multiple sources a user never intended to be linked. The regulatory baseline — GDPR-style principles of purpose limitation, data minimisation and the right to explanation — is the practical floor for responsible data handling, not the ceiling.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each privacy principle to its meaning:",
                pairs: [
                  { term: "Purpose limitation", definition: "Use data only for the purpose it was collected for" },
                  { term: "Data minimisation", definition: "Collect only what you actually need" },
                  { term: "Right to explanation", definition: "People can learn why a decision about them was made" },
                ],
              },
              {
                type: "fill-blank",
                prompt: "When a model reproduces sensitive text it saw in training, that is training-data ____.",
                answer: "memorisation",
                acceptableAnswers: ["memorisation", "memorization"],
                wordBank: ["augmentation", "normalisation", "sampling"],
              },
              {
                type: "true-false",
                statement: "Agentic systems can create new privacy risk by linking data sources a user never meant to combine.",
                answer: true,
                explanation: "Combination across sources is itself a privacy harm, even when each source was permitted.",
              },
            ],
          },
        ],
      },
      {
        id: "eth5",
        title: "Accountability & Governance",
        description: "Who signs off, and what do they check?",
        lessons: [
          {
            id: "eth5l1",
            title: "Frameworks and the Practical Question",
            xp: 25,
            content:
              "Who is responsible when an AI system causes harm — the developer, the deployer, the user, or the model provider? Governance frameworks such as the NIST AI RMF, the EU AI Act's risk-tiered approach and sector-specific rules are living, evolving structures rather than settled law. Underneath them sits a practical question every organisation must answer regardless of jurisdiction: who signs off before an AI system goes into production, and what exactly do they check?",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the practical governance question every organisation must answer?",
                options: [
                  "Who signs off before production, and what do they check?",
                  "Which model has the best benchmark score?",
                  "How many GPUs to buy",
                  "Which cloud region to deploy in",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The EU AI Act takes a risk-____ approach, imposing heavier obligations on higher-risk uses.",
                answer: "tiered",
                wordBank: ["neutral", "blind", "free"],
              },
              {
                type: "true-false",
                statement: "AI governance frameworks are settled, finished law.",
                answer: false,
                explanation: "They are living, evolving structures.",
              },
            ],
          },
        ],
      },
      {
        id: "eth6",
        title: "Societal Impact",
        description: "Labor, misinformation and autonomy",
        lessons: [
          {
            id: "eth6l1",
            title: "Second-Order Effects",
            xp: 25,
            content:
              "A broader lens on second-order effects. On labor: AI automates tasks, not jobs wholesale — so the honest conversation with a workforce is about role evolution, not blanket reassurance. On information: AI-generated misinformation and synthetic media are a fairness and trust issue, not only a technical one. On autonomy: as recommendation and agentic systems increasingly shape the choices people see, the question of how much human choice remains genuinely free becomes a design question, not a philosophical one.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the honest framing of AI's labor impact given here?",
                options: [
                  "AI automates tasks, so the conversation should be about role evolution",
                  "AI replaces whole jobs instantly",
                  "AI has no labor impact at all",
                  "Workers should simply be reassured their jobs are safe",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "AI automates ____, not jobs wholesale.",
                answer: "tasks",
                acceptableAnswers: ["tasks", "task"],
                wordBank: ["careers", "salaries", "teams"],
              },
              {
                type: "true-false",
                statement: "Systems that shape which choices people see raise a question about human autonomy.",
                answer: true,
                explanation: "Recommendation and agentic systems narrow the option set people ever encounter.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ethL3",
    title: "Applied Responsible AI",
    tier: "Premium + Certificate",
    ageRange: "Adults",
    badge: "Advanced",
    units: [
      {
        id: "eth7",
        title: "Case Studies",
        description: "Real harms, analysed",
        lessons: [
          {
            id: "eth7l1",
            title: "Socio-Technical Analysis in Practice",
            xp: 30,
            content:
              "Following the Stanford CS281 model, this module is built around analysing real, documented cases — biased hiring algorithms, contested facial recognition deployments, content moderation failures — rather than hypotheticals. For each case you identify what went wrong, at which stage of the system's lifecycle it originated (data, model, deployment or monitoring), and what intervention — technical, procedural or regulatory — would plausibly have prevented it.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each lifecycle stage to a failure that originates there:",
                pairs: [
                  { term: "Data", definition: "The training set under-represents an affected group" },
                  { term: "Model", definition: "The objective optimises for a harmful proxy metric" },
                  { term: "Deployment", definition: "The system is used in a context it was never validated for" },
                  { term: "Monitoring", definition: "Degrading real-world performance goes unnoticed for months" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why analyse documented cases instead of hypotheticals?",
                options: [
                  "Real cases show where in the lifecycle failures actually originate",
                  "Hypotheticals are illegal to discuss",
                  "Real cases are always simpler",
                  "Hypotheticals have no ethical content",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "For each case, identify the lifecycle ____ where the failure originated.",
                answer: "stage",
                wordBank: ["budget", "vendor", "author"],
              },
            ],
          },
        ],
      },
      {
        id: "eth8",
        title: "Building a Responsible AI Practice",
        description: "From frameworks to a checklist",
        lessons: [
          {
            id: "eth8l1",
            title: "Ethics Needs an Enforcement Mechanism",
            xp: 30,
            content:
              "The applied closing module: translate frameworks into an actual checklist — a pre-deployment review process, a bias-testing step before shipping a model or prompt-based feature, an incident response plan for when something goes wrong anyway, and a plain-language policy employees can actually follow. Ethics without an enforcement mechanism is a poster on the wall.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Order the pieces of a responsible AI practice:",
                words: ["Write", "a", "plain", "language", "policy", "add", "bias", "testing", "run", "pre", "deployment", "review", "prepare", "incident", "response"],
              },
              {
                type: "multiple-choice",
                question: "What makes an ethics policy more than \"a poster on the wall\"?",
                options: [
                  "An enforcement mechanism: reviews, tests and named sign-off",
                  "Publishing it on the company website",
                  "Making it longer and more detailed",
                  "Having a lawyer write it",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A plan for what to do when something goes wrong anyway is an ____ response plan.",
                answer: "incident",
                wordBank: ["audience", "invoice", "interface"],
              },
            ],
          },
        ],
      },
      {
        id: "ethC",
        title: "Capstone",
        description: "Socio-technical analysis",
        lessons: [
          {
            id: "ethCl1",
            title: "Capstone: Analyse a Real AI Harm",
            xp: 60,
            isQuiz: true,
            content:
              "Choose one real, documented AI harm case — not a hypothetical. Write a short analysis: what happened, which stage of the system lifecycle (data, model, deployment or monitoring) the failure originated in, and one concrete change — technical or governance — that would have caught it earlier.",
            exercises: [
              {
                type: "short-answer",
                question: "What happened in your chosen case, and who was affected?",
                minWords: 40,
                referenceAnswer:
                  "Describes a real, documented case with the affected group named and the harm stated concretely.",
              },
              {
                type: "short-answer",
                question: "Which lifecycle stage did it originate in, and what one change would have caught it earlier?",
                minWords: 30,
                referenceAnswer:
                  "Names data, model, deployment or monitoring, and proposes one specific technical or governance intervention tied to that stage.",
              },
            ],
          },
        ],
      },
    ],
  },
];
