// Course track 2: "How AI Actually Works" — the science behind language models.
// Ordered simplest to hardest. Beginner units use kid-friendly wording;
// advanced units use full technical terminology.
import type { Level } from "./course-data";

export const howAiWorksLevels: Level[] = [
  {
    id: "hl1",
    title: "The Basics of AI Brains",
    tier: "Free",
    ageRange: "Ages 8+",
    badge: "Beginner",
    units: [
      {
        id: "h1",
        title: "What Is a Language Model?",
        description: "The next-word prediction machine",
        lessons: [
          {
            id: "h1l1",
            title: "Predicting the Next Word",
            xp: 20,
            content:
              "A language model is a computer system trained to guess the next word (or word-piece) that should come after the text it has already seen. If you type 'peanut butter and…', it predicts 'jelly' because that word came next most often in the text it learned from. Every AI chatbot, every AI writing helper, every AI code assistant is built on this one simple idea, repeated over and over: predict the next bit of text, add it, then predict again.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a language model trained to do?",
                options: [
                  "Predict the next word or word-piece in a piece of text",
                  "Search the internet for the exact answer",
                  "Store every sentence it has ever read in a big list",
                  "Translate words into pictures",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A language model works by making a ____ about what text should come next.",
                answer: "prediction",
                acceptableAnswers: ["prediction", "guess"],
                wordBank: ["copy", "search", "drawing"],
              },
              {
                type: "true-false",
                statement:
                  "A language model writes a long answer by predicting one piece of text at a time, over and over.",
                answer: true,
                explanation: "It adds a bit, then looks at everything so far and predicts the next bit again.",
              },
            ],
          },
          {
            id: "h1l2",
            title: "Learning From Lots of Text",
            xp: 20,
            content:
              "How does the model learn what to predict? It reads an enormous pile of text — books, websites, articles — and practises the same game millions of times: hide the next word, guess it, then check the real answer and adjust. Over time it picks up grammar, facts, styles and patterns. It never memorises the whole internet in a drawer it can open later; it keeps patterns, not a copy of the pages.",
            exercises: [
              {
                type: "multiple-choice",
                question: "How does a language model learn?",
                options: [
                  "By practising next-word guesses on huge amounts of text and correcting itself",
                  "By being handed a list of every fact a human wrote down",
                  "By asking people questions while it writes",
                  "By copying whole web pages into its memory",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A language model keeps a searchable copy of every page it learned from.",
                answer: false,
                explanation: "It stores patterns learned from the text, not the pages themselves.",
              },
              {
                type: "matching",
                instruction: "Match each word to what it means:",
                pairs: [
                  { term: "Language model", definition: "A system trained to predict text" },
                  { term: "Prediction", definition: "The model's best guess at what comes next" },
                  { term: "Training text", definition: "The huge pile of writing the model practised on" },
                  { term: "Pattern", definition: "A habit in language the model picked up" },
                ],
              },
            ],
          },
          {
            id: "h1l3",
            title: "Why It Feels Like Thinking",
            xp: 20,
            content:
              "Because the model is so good at predicting, its answers feel thoughtful. But underneath, it is not looking things up and it is not deciding what is true — it is choosing text that fits well with what came before. That is why the same idea can be explained brilliantly one moment and confidently wrong the next. Remembering 'it predicts likely text' explains almost everything else about how AI behaves.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why can an AI answer sound smart but still be wrong?",
                options: [
                  "It picks text that fits the pattern, not text it has checked as true",
                  "It gets tired after long conversations",
                  "It only knows facts about computers",
                  "It always copies the last thing you typed",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Every AI text tool is built on one core job: predicting the next ____.",
                answer: "token",
                acceptableAnswers: ["token", "word"],
                wordBank: ["colour", "picture", "answer"],
              },
              {
                type: "true-false",
                statement: "A language model checks each sentence against a fact database before replying.",
                answer: false,
                explanation: "There is no built-in fact checker — it predicts likely text.",
              },
            ],
          },
          {
            id: "h1q",
            title: "Unit 1 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "The core mechanism behind AI text generation is:",
                options: [
                  "Predicting the next token from what came before",
                  "Looking each answer up in an encyclopedia",
                  "Copying the closest sentence it has read",
                  "Asking another AI for the answer",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A system trained to predict text is called a language ____.",
                answer: "model",
                wordBank: ["machine", "browser", "robot"],
              },
              {
                type: "true-false",
                statement: "A language model builds its reply one predicted piece of text at a time.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "Which sentence best describes what the model learned during training?",
                options: [
                  "Patterns in how language is used",
                  "A saved copy of every website",
                  "A list of the user's questions",
                  "The rules of one single language only",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h2",
        title: "Tokens & Embeddings",
        description: "How AI chops up and understands words",
        lessons: [
          {
            id: "h2l1",
            title: "Tokens: Word Pieces",
            xp: 20,
            content:
              "AI does not read whole words the way you do. It reads tokens — small chunks of text. A token is often a piece of a word: 'unhappiness' might become 'un', 'happi', 'ness'. Short common words are usually one token each. A handy rule of thumb: about 100 tokens is roughly 75 English words. Tokens matter because limits and prices are counted in tokens, not in words.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a token?",
                options: [
                  "The basic chunk of text AI reads, often a piece of a word",
                  "Always exactly one whole word",
                  "One single letter",
                  "A password that unlocks the AI",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Roughly 100 tokens is about 75 English ____.",
                answer: "words",
                wordBank: ["letters", "pages", "sentences"],
              },
              {
                type: "true-false",
                statement: "One long word can be split into several tokens.",
                answer: true,
                explanation: "Longer or rarer words are usually broken into word-pieces.",
              },
            ],
          },
          {
            id: "h2l2",
            title: "Embeddings: Meaning as Numbers",
            xp: 20,
            content:
              "Computers only handle numbers, so each token is turned into an embedding: a long list of numbers that stands for that token's meaning. The clever part is where those numbers sit. Words with similar meanings get numbers that are close together, so 'cat' lands near 'kitten' and far from 'bulldozer'. That is how AI can tell that 'happy' and 'cheerful' are related even though the letters are totally different.",
            exercises: [
              {
                type: "multiple-choice",
                question: "An embedding is:",
                options: [
                  "A list of numbers that represents a token's meaning",
                  "A picture of the word",
                  "The spelling rules for a word",
                  "The place a word appears on a web page",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Words with similar meanings end up numerically close together in embedding space.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Turning a token's meaning into numbers creates an ____.",
                answer: "embedding",
                wordBank: ["opinion", "alphabet", "outline"],
              },
            ],
          },
          {
            id: "h2l3",
            title: "Tokens vs Embeddings",
            xp: 20,
            content:
              "These two are easy to mix up. A token is a piece of TEXT. An embedding is the list of NUMBERS that stands for that piece of text's meaning. First the text is split into tokens, then each token is converted into an embedding, and only then can the model do maths with it. Splitting first, meaning-numbers second — always that order.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each term to what it really is:",
                pairs: [
                  { term: "Token", definition: "A chunk of text, often part of a word" },
                  { term: "Embedding", definition: "A list of numbers standing for meaning" },
                  { term: "Tokenizer", definition: "The tool that splits text into chunks" },
                  { term: "Embedding space", definition: "The map where similar meanings sit close together" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which order is correct?",
                options: [
                  "Text is split into tokens, then each token becomes an embedding",
                  "Text becomes embeddings, then embeddings are split into tokens",
                  "Tokens and embeddings are two names for the same thing",
                  "Embeddings are made only after the model finishes answering",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A token and an embedding are two words for exactly the same thing.",
                answer: false,
                explanation: "A token is text; an embedding is the numbers representing its meaning.",
              },
            ],
          },
          {
            id: "h2q",
            title: "Unit 2 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which statement about tokens is true?",
                options: [
                  "A token is often a word-piece rather than a whole word",
                  "A token is always one full word",
                  "A token is always one letter",
                  "Tokens only exist for numbers",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Similar meanings end up numerically ____ together in embedding space.",
                answer: "close",
                wordBank: ["far", "loud", "slow"],
              },
              {
                type: "true-false",
                statement: "About 100 tokens is roughly 75 English words.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "Why does AI need embeddings at all?",
                options: [
                  "Because the maths inside the model works on numbers, not letters",
                  "Because users prefer numbers to words",
                  "Because embeddings make the reply shorter",
                  "Because they store the source web pages",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h3",
        title: "Context Windows & Chatbots",
        description: "What the AI can see, and who taught it to chat",
        lessons: [
          {
            id: "h3l1",
            title: "The Context Window",
            xp: 20,
            content:
              "The context window is the maximum amount of text the model can look at in one go — and it counts BOTH your prompt and the reply it is writing. Think of it as the size of the AI's desk: everything it can currently see has to fit on that desk. Anything pushed off the edge, like the start of a very long chat, is simply gone from view. A bigger context window means more can stay on the desk, not that the model remembers you forever.",
            exercises: [
              {
                type: "multiple-choice",
                question: "The context window is:",
                options: [
                  "The maximum text (prompt plus reply) the model can see at once",
                  "The time limit for an answer",
                  "The window your chat app opens in",
                  "The number of chats you can start per day",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "The reply the AI is writing also takes up room in the context window.",
                answer: true,
                explanation: "Prompt and reply share the same budget.",
              },
              {
                type: "fill-blank",
                prompt: "The most text an AI can see at one time is called its context ____.",
                answer: "window",
                wordBank: ["length", "memory", "limit"],
              },
            ],
          },
          {
            id: "h3l2",
            title: "Base Models vs Chat Models",
            xp: 20,
            content:
              "A base model has only learned to continue text. Give it 'Write a poem about rain' and it might carry on with more instructions rather than actually writing the poem. A chat or instruct model is a base model that got extra training on following instructions and holding a conversation. Same underlying prediction engine, very different behaviour — the chat model was specifically taught that a request should be answered, not continued.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes a chat/instruct model different from a base model?",
                options: [
                  "Extra training that teaches it to follow instructions and converse",
                  "A larger screen in the app",
                  "It predicts letters instead of tokens",
                  "It has internet access built in by default",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A base model and a chat model are exactly the same thing with different names.",
                answer: false,
                explanation: "A chat model has had extra instruction-following training.",
              },
              {
                type: "matching",
                instruction: "Match each model type to how it behaves:",
                pairs: [
                  { term: "Base model", definition: "Just keeps continuing the text you gave it" },
                  { term: "Chat model", definition: "Answers your request and holds a conversation" },
                  { term: "Context window", definition: "How much text it can look at right now" },
                  { term: "Token", definition: "The chunk of text it reads and writes" },
                ],
              },
            ],
          },
          {
            id: "h3l3",
            title: "Why Chats Forget",
            xp: 20,
            content:
              "Chat apps re-send the earlier conversation with every new message so the model looks like it remembers. But once the conversation grows past the context window, the oldest parts get trimmed away and the model genuinely cannot see them any more. That is why very long chats start losing details you mentioned at the beginning. Restating important facts is not rude — it is exactly how the system is designed to work.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why does an AI 'forget' things from very early in a long chat?",
                options: [
                  "Those messages no longer fit inside the context window",
                  "It deliberately ignores older users",
                  "Its training data expired",
                  "It only stores the first message",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A model that only continues text, without instruction training, is called a ____ model.",
                answer: "base",
                wordBank: ["chat", "safe", "wide"],
              },
              {
                type: "true-false",
                statement: "Chat apps usually re-send the earlier conversation with each new message.",
                answer: true,
              },
            ],
          },
          {
            id: "h3q",
            title: "Unit 3 Check",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which pair of things shares the context window budget?",
                options: [
                  "Your prompt and the model's reply",
                  "Your prompt and your username",
                  "The reply and the app's theme",
                  "Your prompt and yesterday's chat",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "A base model has been specially trained to follow instructions and chat.",
                answer: false,
                explanation: "That extra training is what turns a base model into a chat/instruct model.",
              },
              {
                type: "fill-blank",
                prompt: "Text pushed out of the context ____ can no longer be seen by the model.",
                answer: "window",
                wordBank: ["screen", "folder", "page"],
              },
              {
                type: "multiple-choice",
                question: "A bigger context window means:",
                options: [
                  "More text can be looked at in a single turn",
                  "The model permanently remembers every user",
                  "The model is always more accurate",
                  "Replies are always shorter",
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
    id: "hl2",
    title: "Inside the Machine",
    tier: "Premium",
    ageRange: "Ages 13+",
    badge: "Intermediate",
    units: [
      {
        id: "h4",
        title: "Transformers & Attention",
        description: "The architecture behind every modern LLM",
        lessons: [
          {
            id: "h4l1",
            title: "The Transformer Architecture",
            xp: 25,
            content:
              "The transformer is the neural-network design behind virtually every modern large language model. Before transformers, models such as RNNs processed text one word at a time, in order, which made long-range context hard to keep and training slow. Transformers process a whole sequence in parallel and let every position pull information from every other position, which is why they scale so well.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is a transformer in the context of LLMs?",
                options: [
                  "The neural-network architecture used by virtually every modern LLM",
                  "The program that splits text into tokens",
                  "A database of training documents",
                  "A setting that controls reply length",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Transformers process the tokens of a sequence in parallel rather than strictly one by one.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "The neural-network design behind modern LLMs is the ____.",
                answer: "transformer",
                wordBank: ["tokenizer", "classifier", "scheduler"],
              },
            ],
          },
          {
            id: "h4l2",
            title: "Self-Attention",
            xp: 25,
            content:
              "Self-attention is the core operation: for every token, the model weighs how relevant every other token in the sequence is, and blends in the information it needs. In 'The trophy did not fit in the suitcase because it was too big', attention is what lets 'it' draw on 'trophy'. Because all these comparisons happen at once, long-range dependencies are handled far better than in older word-by-word models.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Self-attention lets the model:",
                options: [
                  "Let each token weigh and use information from every other token at once",
                  "Read the sentence strictly left to right, one word at a time",
                  "Search the web for the missing word",
                  "Shorten the input so it fits the context window",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Self-attention is the main reason transformers handle long-range context better than RNNs.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Self-____ lets every token draw on information from every other token.",
                answer: "attention",
                wordBank: ["encoding", "training", "sampling"],
              },
            ],
          },
          {
            id: "h4l3",
            title: "Positional Encoding",
            xp: 25,
            content:
              "Attention compares tokens to each other, but by itself it has no sense of order — 'dog bites man' and 'man bites dog' would look identical. Positional encoding fixes that by adding order information to each token's representation before attention runs, so the model knows which token came first, second, third. Attention supplies relevance; positional encoding supplies sequence.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why do transformers need positional encoding?",
                options: [
                  "Attention alone does not track the order the tokens came in",
                  "It compresses the tokens to save memory",
                  "It replaces the need for embeddings",
                  "It sets the temperature for sampling",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each transformer part to its job:",
                pairs: [
                  { term: "Self-attention", definition: "Weighs how relevant other tokens are" },
                  { term: "Positional encoding", definition: "Tells the model what order tokens came in" },
                  { term: "Embedding layer", definition: "Turns tokens into meaning vectors" },
                  { term: "Parallel processing", definition: "Handles the whole sequence at once" },
                ],
              },
              {
                type: "true-false",
                statement: "Without positional encoding, a transformer could confuse 'dog bites man' with 'man bites dog'.",
                answer: true,
              },
            ],
          },
          {
            id: "h4q",
            title: "Unit 4 Check",
            xp: 60,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which describes the key advantage of transformers over older sequential models?",
                options: [
                  "Every position can attend to every other position in parallel",
                  "They store the training corpus for lookup",
                  "They never hallucinate",
                  "They use one token per whole word",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Order information is injected into a transformer through ____ encoding.",
                answer: "positional",
                wordBank: ["numerical", "temporal", "semantic"],
              },
              {
                type: "true-false",
                statement: "Self-attention by itself already encodes the order of the tokens.",
                answer: false,
                explanation: "Order comes from positional encoding, not attention.",
              },
              {
                type: "multiple-choice",
                question: "In 'The trophy didn't fit in the suitcase because it was too big', what resolves 'it'?",
                options: [
                  "Self-attention weighting earlier tokens",
                  "Positional encoding alone",
                  "The tokenizer",
                  "The context window size",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h5",
        title: "Pretraining vs Fine-Tuning",
        description: "Two very different training phases",
        lessons: [
          {
            id: "h5l1",
            title: "Pretraining",
            xp: 25,
            content:
              "Pretraining is phase one and by far the most expensive. The model learns general language ability by predicting the next token across an enormous, broad corpus of text. This is where grammar, world knowledge, reasoning habits and writing style come from. A pretrained model can already produce fluent language before anyone specialises it for a task.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What happens during pretraining?",
                options: [
                  "The model learns general language patterns by predicting the next token over a massive corpus",
                  "The model is taught one narrow task with a small labelled dataset",
                  "Humans rank pairs of answers to build a reward model",
                  "Documents are retrieved and pasted into the prompt",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "The first, largest training phase, where general language ability is learned, is ____.",
                answer: "pretraining",
                wordBank: ["retrieval", "alignment", "inference"],
              },
              {
                type: "true-false",
                statement: "Pretraining is where a model gains its broad ability to produce fluent language.",
                answer: true,
              },
            ],
          },
          {
            id: "h5l2",
            title: "Fine-Tuning",
            xp: 25,
            content:
              "Fine-tuning is a second, much smaller round of training on a more specific dataset — legal summaries, medical notes, your company's support tone. It adjusts an already-capable model's behaviour. The commonly confused point: fine-tuning does NOT teach a model to speak in the first place. Language ability comes from pretraining; fine-tuning specialises what already exists.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which statement about fine-tuning is correct?",
                options: [
                  "It specialises an already-pretrained model using a smaller, specific dataset",
                  "It is how a model first learns to produce language",
                  "It happens automatically during every conversation",
                  "It only changes the prompt, never the weights",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Fine-tuning is what teaches a model to speak language in the first place.",
                answer: false,
                explanation: "Language ability comes from pretraining; fine-tuning specialises behaviour.",
              },
              {
                type: "matching",
                instruction: "Match each phase to its description:",
                pairs: [
                  { term: "Pretraining", definition: "Huge broad corpus, learns general language" },
                  { term: "Fine-tuning", definition: "Smaller specific dataset, specialises behaviour" },
                  { term: "Corpus", definition: "The body of text used for training" },
                  { term: "Weights", definition: "The learned numbers inside the model that training changes" },
                ],
              },
            ],
          },
          {
            id: "h5l3",
            title: "PEFT and LoRA",
            xp: 25,
            content:
              "Full fine-tuning updates every weight in the model, which is costly in compute and storage. Parameter-efficient fine-tuning (PEFT) instead freezes the original model and trains a small set of added parameters. LoRA is the best-known PEFT method: it learns small low-rank adapter matrices alongside the frozen weights. You get most of the specialisation benefit for a tiny fraction of the cost, and you can swap adapters per task.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does parameter-efficient fine-tuning (PEFT) do?",
                options: [
                  "Trains a small added set of parameters instead of updating the whole model",
                  "Retrains the model from scratch on cheaper hardware",
                  "Adds documents to the prompt at query time",
                  "Reduces the context window to save memory",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "____ is the best-known parameter-efficient fine-tuning method, training small adapter matrices.",
                answer: "LoRA",
                wordBank: ["RLHF", "RAG", "ReAct"],
              },
              {
                type: "true-false",
                statement: "PEFT is generally much cheaper than full fine-tuning.",
                answer: true,
              },
            ],
          },
          {
            id: "h5q",
            title: "Unit 5 Check",
            xp: 60,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "A team wants a model to adopt their support team's tone. The model already writes fluently. What do they need?",
                options: [
                  "Fine-tuning on their own support transcripts",
                  "Pretraining a new model from scratch",
                  "A larger tokenizer",
                  "Positional encoding",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Pretraining uses a far larger and broader dataset than fine-tuning.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "PEFT freezes the original weights and trains a small set of added ____.",
                answer: "parameters",
                wordBank: ["documents", "prompts", "tokens"],
              },
              {
                type: "multiple-choice",
                question: "Which is the clearest difference between pretraining and fine-tuning?",
                options: [
                  "Pretraining builds general ability; fine-tuning specialises existing ability",
                  "Pretraining is cheaper and quicker than fine-tuning",
                  "Fine-tuning happens before pretraining",
                  "Only fine-tuning changes the model's weights",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h6",
        title: "In-Context Learning",
        description: "Learning from the prompt, not from training",
        lessons: [
          {
            id: "h6l1",
            title: "Learning Inside the Prompt",
            xp: 25,
            content:
              "In-context learning is the striking ability of a large model to change its behaviour based purely on what you put in the prompt. Show it three examples of the output format you want and it follows that format — with zero permanent change to the model's weights. Nothing is saved. Start a new conversation and the model is exactly as it was before.",
            exercises: [
              {
                type: "multiple-choice",
                question: "In-context learning means:",
                options: [
                  "The model adapts its behaviour from examples in the prompt, with no weight changes",
                  "The model is retrained on your examples overnight",
                  "The model stores your examples for future users",
                  "The model downloads a new dataset",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "In-context learning permanently updates the model's weights.",
                answer: false,
                explanation: "Nothing is saved — the effect lasts only for that context.",
              },
              {
                type: "fill-blank",
                prompt: "In-context learning changes behaviour without changing the model's ____.",
                answer: "weights",
                wordBank: ["prompt", "examples", "tokens"],
              },
            ],
          },
          {
            id: "h6l2",
            title: "Few-Shot in Practice",
            xp: 25,
            content:
              "The everyday form of in-context learning is few-shot prompting: zero-shot gives no examples, one-shot gives exactly one, few-shot gives several (typically three to five). Examples are most useful when the FORMAT or the edge cases are hard to describe in words — labelling tricky sentiment, matching a specific JSON shape, or copying a house style. More examples cost more tokens, so there is a real trade-off.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Your prompt includes four labelled examples before the real question. That is:",
                options: ["Few-shot prompting", "Zero-shot prompting", "One-shot prompting", "Fine-tuning"],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each approach to what it involves:",
                pairs: [
                  { term: "Zero-shot", definition: "No examples in the prompt" },
                  { term: "One-shot", definition: "Exactly one example in the prompt" },
                  { term: "Few-shot", definition: "Several examples, usually three to five" },
                  { term: "Fine-tuning", definition: "Actually retraining the model's weights" },
                ],
              },
              {
                type: "true-false",
                statement: "Adding more examples to a prompt uses more of the context window.",
                answer: true,
              },
            ],
          },
          {
            id: "h6l3",
            title: "In-Context Learning vs Training",
            xp: 25,
            content:
              "This is one of the most commonly confused distinctions in the whole field. Examples in a prompt are temporary and local to that conversation; training changes the weights and affects the model for everyone, permanently. So 'I taught ChatGPT my writing style yesterday' is not true in the training sense — you conditioned it inside one context, and the effect vanished when the conversation ended.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the key difference between in-context learning and fine-tuning?",
                options: [
                  "In-context learning is temporary and prompt-only; fine-tuning permanently updates weights",
                  "In-context learning is permanent; fine-tuning is temporary",
                  "They are the same, only the names differ",
                  "In-context learning requires a GPU cluster; fine-tuning does not",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Examples you pasted yesterday still influence the model in a brand-new conversation today.",
                answer: false,
                explanation: "In-context effects disappear once the context is gone.",
              },
              {
                type: "fill-blank",
                prompt: "In-context learning is ____ — it lasts only for that conversation.",
                answer: "temporary",
                wordBank: ["permanent", "expensive", "supervised"],
              },
            ],
          },
          {
            id: "h6q",
            title: "Unit 6 Check",
            xp: 60,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "A user says 'I trained the chatbot by giving it examples in my message.' What actually happened?",
                options: [
                  "In-context learning — behaviour changed for that conversation only",
                  "Fine-tuning — the weights were updated",
                  "Pretraining — a new corpus was learned",
                  "RLHF — a reward model was built",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Giving several examples in the prompt is called ____-shot prompting.",
                answer: "few",
                wordBank: ["zero", "one", "cold"],
              },
              {
                type: "true-false",
                statement: "In-context learning makes zero permanent changes to the model.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "When are in-prompt examples most valuable?",
                options: [
                  "When the exact output format is hard to describe in words",
                  "When you want to shrink the token count",
                  "When you need the model to browse the web",
                  "When you want the change to apply to all users",
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
    id: "hl3",
    title: "Frontier Topics",
    tier: "Premium + Certificate",
    ageRange: "Ages 15+",
    badge: "Advanced",
    units: [
      {
        id: "h7",
        title: "Alignment & RLHF",
        description: "Making model behaviour match human intent",
        lessons: [
          {
            id: "h7l1",
            title: "What Alignment Means",
            xp: 30,
            content:
              "Alignment is the broad goal of making a model's behaviour match what humans actually want: helpful, honest, and refusing genuinely harmful requests. It is a goal, not a single technique. Instruction tuning, RLHF, constitutional methods, safety filters and evaluation are all tools used in service of alignment. Confusing the goal with one of its techniques is a classic mistake.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Alignment is best described as:",
                options: [
                  "The general goal of making model behaviour match human intent",
                  "One specific training algorithm",
                  "A way to compress model weights",
                  "The process of tokenizing text",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "RLHF is one technique used to pursue alignment, not a synonym for alignment.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Making a model's behaviour match what humans actually want is called ____.",
                answer: "alignment",
                wordBank: ["inference", "tokenizing", "retrieval"],
              },
            ],
          },
          {
            id: "h7l2",
            title: "RLHF Step by Step",
            xp: 30,
            content:
              "RLHF — Reinforcement Learning from Human Feedback — is a three-step pipeline. Step 1: collect human data, including demonstrations and rankings of good versus bad responses. Step 2: train a separate reward model that learns to score responses the way the human rankers did. Step 3: use reinforcement learning to optimise the language model against that reward model. The key structural difference from ordinary fine-tuning is the learned reward model in the middle — supervised fine-tuning simply imitates a fixed dataset of correct answers.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What sits at the heart of RLHF that plain supervised fine-tuning does not have?",
                options: [
                  "A separately trained reward model learned from human rankings",
                  "A tokenizer",
                  "A retrieval index of documents",
                  "A larger context window",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put the three RLHF stages in the correct order:",
                words: ["Collect human rankings", "Train a reward model", "Optimise with reinforcement learning"],
              },
              {
                type: "true-false",
                statement: "In RLHF, humans directly write the final answer for every prompt the model will ever see.",
                answer: false,
                explanation: "Humans rank a sample of responses; the reward model then generalises that judgement.",
              },
            ],
          },
          {
            id: "h7l3",
            title: "Instruction Tuning vs RLHF",
            xp: 30,
            content:
              "Instruction tuning is supervised fine-tuning on (instruction, good response) pairs — it teaches the model the shape of following an instruction. RLHF goes further: instead of copying one written answer, it learns human PREFERENCES between candidate answers, which captures fuzzy qualities such as tone, helpfulness and refusal behaviour that are hard to write down. Most modern chat models use instruction tuning first, then preference-based training.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each term to its precise meaning:",
                pairs: [
                  { term: "Alignment", definition: "The overall goal of matching human intent" },
                  { term: "Instruction tuning", definition: "Supervised training on instruction and response pairs" },
                  { term: "Reward model", definition: "A model that scores responses like human rankers would" },
                  { term: "RLHF", definition: "Optimising the model against a learned reward signal" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why use preference rankings instead of only written example answers?",
                options: [
                  "They capture qualities like tone and helpfulness that are hard to specify in writing",
                  "They are the only way to change model weights",
                  "They remove the need for pretraining",
                  "They shrink the model's size",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "RLHF trains a separate ____ model from human rankings before reinforcement learning begins.",
                answer: "reward",
                wordBank: ["language", "vision", "reward-free"],
              },
            ],
          },
          {
            id: "h7q",
            title: "Unit 7 Check",
            xp: 70,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which sequence correctly describes RLHF?",
                options: [
                  "Human rankings → reward model → reinforcement learning on the LLM",
                  "Reward model → human rankings → pretraining",
                  "Reinforcement learning → tokenization → fine-tuning",
                  "Retrieval → ranking → summarisation",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Alignment and RLHF mean exactly the same thing.",
                answer: false,
                explanation: "Alignment is the goal; RLHF is one technique for reaching it.",
              },
              {
                type: "fill-blank",
                prompt: "Supervised training on instruction and response pairs is called instruction ____.",
                answer: "tuning",
                wordBank: ["ranking", "sampling", "pruning"],
              },
              {
                type: "multiple-choice",
                question: "Simple supervised fine-tuning differs from RLHF because it:",
                options: [
                  "Imitates a fixed dataset of correct answers with no learned reward signal",
                  "Requires human rankings of every candidate answer",
                  "Always uses reinforcement learning",
                  "Cannot change the model's weights",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h8",
        title: "Hallucination & RAG",
        description: "Why models invent facts, and how grounding helps",
        lessons: [
          {
            id: "h8l1",
            title: "Why Hallucination Happens",
            xp: 30,
            content:
              "Hallucination is fluent, confident-sounding output that is factually wrong. The cause is structural: the model is sampling statistically likely continuations, not querying a verified database, and it has no built-in fact-checker to catch itself. A plausible-looking citation is generated exactly the same way as a true one, which is why hallucinations read so convincingly.",
            exercises: [
              {
                type: "multiple-choice",
                question: "The root cause of hallucination is that the model:",
                options: [
                  "Predicts statistically likely text rather than looking facts up",
                  "Runs out of context window",
                  "Uses too few tokens per word",
                  "Was fine-tuned instead of pretrained",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Modern LLMs contain a built-in fact-checker that verifies claims before replying.",
                answer: false,
                explanation: "There is no internal verification step — that is why grounding matters.",
              },
              {
                type: "fill-blank",
                prompt: "Fluent but factually wrong AI output is called a ____.",
                answer: "hallucination",
                wordBank: ["truncation", "refusal", "compression"],
              },
            ],
          },
          {
            id: "h8l2",
            title: "Retrieval-Augmented Generation",
            xp: 30,
            content:
              "RAG fetches relevant real documents — usually via semantic search over an embedding index — and inserts them into the prompt as grounding context before the model answers. Crucially, the model itself is never retrained: RAG changes what is IN the prompt, not what is in the weights. That makes it fast to update (add a document and it is available immediately) and easy to cite sources from.",
            exercises: [
              {
                type: "multiple-choice",
                question: "How does RAG reduce hallucination?",
                options: [
                  "It retrieves real documents and puts them in the prompt as grounding context",
                  "It retrains the model on verified facts each night",
                  "It lowers the temperature to zero",
                  "It shortens the model's answers",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "RAG requires retraining the model's weights.",
                answer: false,
                explanation: "RAG only changes the prompt contents; the weights stay untouched.",
              },
              {
                type: "matching",
                instruction: "Match each approach to what it actually changes:",
                pairs: [
                  { term: "RAG", definition: "Adds retrieved documents to the prompt" },
                  { term: "Fine-tuning", definition: "Updates the model's weights on a dataset" },
                  { term: "Few-shot prompting", definition: "Adds worked examples to the prompt" },
                  { term: "Pretraining", definition: "Builds general language ability from scratch" },
                ],
              },
            ],
          },
          {
            id: "h8l3",
            title: "RAG vs a Bigger Context Window",
            xp: 30,
            content:
              "A common confusion: 'why not just paste everything into a huge context window?' A long context lets you include more text, but you still have to know which text to include, you pay for every token, and quality can drop when key facts are buried in a wall of material. RAG is the selection step — it decides which few passages are relevant right now. The two are complements: retrieval chooses, context holds.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does RAG give you that simply having a larger context window does not?",
                options: [
                  "A way to select which relevant documents to include for this specific question",
                  "A guarantee that the answer is correct",
                  "Permanently updated model weights",
                  "Faster token generation",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "RAG can still produce a wrong answer if it retrieves the wrong documents.",
                answer: true,
                explanation: "Grounding is only as good as what was retrieved.",
              },
              {
                type: "fill-blank",
                prompt: "RAG grounds the answer by adding retrieved ____ to the prompt.",
                answer: "documents",
                wordBank: ["weights", "rankings", "adapters"],
              },
            ],
          },
          {
            id: "h8q",
            title: "Unit 8 Check",
            xp: 70,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "A legal team needs answers grounded in their own contract library, updated daily. Best fit?",
                options: [
                  "RAG over the contract library",
                  "Pretraining a new model on contracts",
                  "Raising the temperature",
                  "Switching to a base model",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Hallucinations happen because the model predicts likely text, not because it looked a fact up wrongly.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt: "Retrieval-____ generation fetches real documents before the model answers.",
                answer: "augmented",
                wordBank: ["adjusted", "assisted", "automated"],
              },
              {
                type: "multiple-choice",
                question: "Which statement about RAG is accurate?",
                options: [
                  "It changes the prompt contents, not the model's weights",
                  "It replaces the need for a context window",
                  "It removes all possibility of a wrong answer",
                  "It is a type of fine-tuning",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h9",
        title: "Real-World Applications",
        description: "Agents, search, classification and multimodal models",
        lessons: [
          {
            id: "h9l1",
            title: "Agents and Tool Use",
            xp: 30,
            content:
              "An AI agent does more than answer once: it plans, calls external tools or APIs — search, a calculator, a database, a code runner — reads the results, and takes the next step in a loop until the task is finished. The defining feature is real tool access plus multiple steps. A single clever prompt with no tools and no loop is not an agent, however impressive the answer.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What distinguishes an AI agent from a normal single-turn chatbot reply?",
                options: [
                  "It calls external tools and takes multiple steps toward a goal",
                  "It writes longer answers",
                  "It uses a bigger tokenizer",
                  "It always runs at temperature zero",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Adding the phrase 'act as an agent' to a prompt gives the model real tool access.",
                answer: false,
                explanation: "Tools must actually be wired up; wording alone changes nothing.",
              },
              {
                type: "fill-blank",
                prompt: "An agent calls external ____ and loops through several steps to finish a task.",
                answer: "tools",
                wordBank: ["fonts", "layers", "prompts"],
              },
            ],
          },
          {
            id: "h9l2",
            title: "Classification, Search and Summarisation",
            xp: 30,
            content:
              "Three workhorse applications. Text classification sorts text into categories — spam or not, ticket priority, sentiment. Semantic search uses embeddings to find results by MEANING rather than exact keywords, so 'how do I return a jumper' matches a page titled 'refund policy'. Summarisation condenses long text while keeping the key points; the ever-present risk is that details are dropped or subtly changed.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each application to what it does:",
                pairs: [
                  { term: "Text classification", definition: "Sorts text into predefined categories" },
                  { term: "Semantic search", definition: "Finds results by meaning, not exact keywords" },
                  { term: "Summarisation", definition: "Condenses long text while keeping key points" },
                  { term: "Agent", definition: "Plans and calls tools across multiple steps" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Why does semantic search beat keyword search for 'how do I send this jumper back'?",
                options: [
                  "Embeddings match the meaning, so a 'refund policy' page still ranks",
                  "It searches more websites",
                  "It reads the page titles only",
                  "It uses a longer context window",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Summarisation can drop or subtly change important details, so it needs checking.",
                answer: true,
              },
            ],
          },
          {
            id: "h9l3",
            title: "Multimodal Models",
            xp: 30,
            content:
              "A multimodal model handles more than one kind of input. Vision-Language Models (VLMs) take text and images together, so you can show a photo of a broken appliance and ask what part is missing. They work by projecting images into the same representation space as text tokens, letting attention operate across both. Same core prediction mechanism — wider set of inputs.",
            exercises: [
              {
                type: "multiple-choice",
                question: "A Vision-Language Model is one that:",
                options: [
                  "Understands text and images together",
                  "Generates only images",
                  "Translates between spoken languages only",
                  "Runs entirely without embeddings",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A model that handles both text and images is called ____.",
                answer: "multimodal",
                wordBank: ["monolingual", "generative", "recursive"],
              },
              {
                type: "true-false",
                statement: "Multimodal models abandon the next-token prediction mechanism entirely.",
                answer: false,
                explanation: "They extend the same mechanism to more input types.",
              },
            ],
          },
          {
            id: "h9q",
            title: "Unit 9 Check",
            xp: 70,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which task most clearly needs an agent rather than a single prompt?",
                options: [
                  "Check today's prices on three sites, compare them, then book the cheapest",
                  "Rewrite this paragraph in a friendly tone",
                  "Label this review positive or negative",
                  "Summarise this article",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Searching by meaning rather than exact keywords is called ____ search.",
                answer: "semantic",
                wordBank: ["literal", "boolean", "shallow"],
              },
              {
                type: "true-false",
                statement: "Semantic search relies on embeddings.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "Which pairing is correct?",
                options: [
                  "VLM → understands images and text together",
                  "VLM → sorts text into categories",
                  "Classification → calls external APIs in a loop",
                  "Summarisation → retrieves documents from an index",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "h10",
        title: "Evaluation & Model Security",
        description: "Benchmarks, contamination and attacks on models",
        lessons: [
          {
            id: "h10l1",
            title: "Benchmarks and Contamination",
            xp: 30,
            content:
              "Benchmarks are standard test sets used to compare models. Benchmark contamination happens when the test questions leak into the training data, so the model has effectively seen the exam. Its score rises without its real understanding improving. That is why a high benchmark number alone does not prove capability — held-out, fresh or private evaluations matter far more.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Benchmark contamination means:",
                options: [
                  "Test questions leaked into the training data, inflating the score",
                  "The benchmark file was corrupted on disk",
                  "The model refused to answer the benchmark",
                  "The benchmark was written by an AI",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A high benchmark score by itself proves a model genuinely understands the subject.",
                answer: false,
                explanation: "Contamination and overfitting can inflate scores without real ability.",
              },
              {
                type: "fill-blank",
                prompt: "When test questions leak into training data, the benchmark is ____.",
                answer: "contaminated",
                wordBank: ["encrypted", "randomised", "published"],
              },
            ],
          },
          {
            id: "h10l2",
            title: "Attacks on the Model Itself",
            xp: 30,
            content:
              "Models are assets, and they can be attacked directly. Data poisoning corrupts the training data so the model learns bad or backdoored behaviour. Model extraction queries a deployed model heavily to reverse-engineer a copy of it. Membership inference tries to work out whether a specific record was in the training set. These are a different risk category from someone simply misusing text a model produced — they target the model, not the output.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each attack to what it targets:",
                pairs: [
                  { term: "Data poisoning", definition: "Corrupts the training data so behaviour is learned wrong" },
                  { term: "Model extraction", definition: "Queries a deployed model to reverse-engineer a copy" },
                  { term: "Membership inference", definition: "Tests whether a specific record was in the training set" },
                  { term: "Misuse of output", definition: "A person abuses text the model produced" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which is an attack on the model itself rather than misuse of its output?",
                options: [
                  "Data poisoning during training",
                  "Someone posting AI-written spam",
                  "A user copying an answer into an essay",
                  "Sharing a screenshot of a reply",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Attacking a model and misusing its output are the same risk category.",
                answer: false,
                explanation: "One targets the system; the other is about how a person uses the text.",
              },
            ],
          },
          {
            id: "h10l3",
            title: "Evaluating Responsibly",
            xp: 30,
            content:
              "Good evaluation mixes methods: held-out benchmarks the model has not seen, task-specific tests that match your real use case, human review for tone and helpfulness, and red-teaming to probe for failures. Report what was tested and what was not. A model can be excellent at your benchmark and unusable in your product — measure the thing you actually care about.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the strongest sign an evaluation is trustworthy?",
                options: [
                  "It uses held-out data and tests the real task the model will do",
                  "It reports a single very high score",
                  "It uses the largest public benchmark available",
                  "It was run by the model's own developer",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Deliberately probing a model for failures and unsafe behaviour is called ____-teaming.",
                answer: "red",
                wordBank: ["blue", "green", "cross"],
              },
              {
                type: "true-false",
                statement: "Human review is still useful even when benchmark scores are high.",
                answer: true,
              },
            ],
          },
          {
            id: "h10q",
            title: "Final Exam — How AI Actually Works",
            xp: 120,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "The core mechanism of every LLM is:",
                options: [
                  "Predicting the next token given the preceding context",
                  "Retrieving the closest stored sentence",
                  "Searching a verified fact database",
                  "Translating text into images",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "Self-____ lets every token in a sequence weigh information from every other token.",
                answer: "attention",
                wordBank: ["encoding", "pooling", "tuning"],
              },
              {
                type: "true-false",
                statement: "Fine-tuning, not pretraining, is what first gives a model general language ability.",
                answer: false,
                explanation: "Pretraining builds general ability; fine-tuning specialises it.",
              },
              {
                type: "multiple-choice",
                question: "In-context learning differs from training because it:",
                options: [
                  "Changes behaviour for one conversation with no weight updates",
                  "Permanently rewrites the model for all users",
                  "Requires a reward model",
                  "Needs a retrieval index",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each concept to its precise meaning:",
                pairs: [
                  { term: "Alignment", definition: "The goal of matching model behaviour to human intent" },
                  { term: "RLHF", definition: "Reward model learned from rankings, then RL optimisation" },
                  { term: "RAG", definition: "Retrieved documents added to the prompt as grounding" },
                  { term: "Hallucination", definition: "Fluent output that is confidently factually wrong" },
                ],
              },
              {
                type: "multiple-choice",
                question: "Which is TRUE about the context window?",
                options: [
                  "Prompt and reply share the same limit",
                  "Only the prompt counts toward it",
                  "It is the same as the training corpus",
                  "It grows automatically during a chat",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "PEFT methods such as LoRA train a small set of added ____ instead of the whole model.",
                answer: "parameters",
                wordBank: ["examples", "documents", "benchmarks"],
              },
              {
                type: "true-false",
                statement: "Benchmark contamination can make a model look stronger than it really is.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "Which correctly separates two commonly confused ideas?",
                options: [
                  "RAG selects relevant documents; a big context window only makes room for text",
                  "RAG and fine-tuning both update weights",
                  "Positional encoding and attention both track word order",
                  "Alignment and instruction tuning are identical",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Data poisoning is best described as:",
                options: [
                  "An attack that corrupts training data so the model learns bad behaviour",
                  "A user misusing an AI-written article",
                  "A prompt that exceeds the context window",
                  "A benchmark reporting error",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];
