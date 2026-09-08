// Course track 9: "Spotting AI Fakes & Media Literacy" (Beginner).
import type { Level } from "./course-data";

export const mediaLiteracyLevels: Level[] = [
  {
    id: "mlL1",
    title: "Media Literacy Basics",
    tier: "Free",
    ageRange: "Ages 10+",
    badge: "Beginner",
    units: [
      {
        id: "ml0",
        title: "Seeing the seams",
        description: "How to tell real from AI-generated images, video, and voice",
        lessons: [
          {
            id: "ml0l1",
            title: "Why it looks real isn't proof anymore",
            xp: 20,
            content:
              "AI-generated images, video, and voice are realistic enough now that visual polish alone tells you nothing about whether something is real. That shift is recent: just a few years ago, rough edges and obvious glitches gave fakes away. Today, smooth lighting, natural-sounding speech, and high resolution can still be produced by AI. That means your eyes and ears are no longer enough — you need to look at context and source, too.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A video looks completely smooth and high-quality with no visible glitches. What does that tell you about whether it's real?",
                options: [
                  "Very little - high production quality no longer rules out AI generation",
                  "It's almost certainly real, since fakes still look rough",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "Synthetic media is mostly a problem for celebrities and public figures.",
                answer: false,
                explanation:
                  "Scam calls using a cloned voice or fake job postings can target anyone, not just famous people.",
              },
            ],
          },
          {
            id: "ml0l2",
            title: "Tells in images",
            xp: 20,
            content:
              "Current tells worth checking are hands and fingers, text rendered inside the image, lighting and shadows that don't agree with each other, and background details that repeat unnaturally. These tells are useful as a first pass, but they fade as the tools improve. A clean image isn't proof of authenticity, and a single odd detail isn't always proof of AI — it just means you should look closer.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which detail is most often distorted in an AI-generated image?",
                options: [
                  "Hands, fingers, and small embedded text",
                  "Overall color balance",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "You spot a photo where the shadows on a person's face fall in a different direction than the shadows in the background. What does that suggest?",
                options: [
                  "Worth a closer look - inconsistent lighting is a common generation artifact",
                  "Nothing unusual - real photos vary like this too",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml0l3",
            title: "Tells in video & voice",
            xp: 20,
            content:
              "Watch for lip-sync that's slightly off, unnatural or absent blinking, and audio that's a little too smooth, missing the breaths and pacing variation of a real recording. A cloned voice can sound urgent and emotional while staying oddly flat and evenly paced. These signs are clues, not guarantees — the best generators are already fixing many of them.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A voicemail from a family member sounds urgent but oddly flat and evenly paced, with no breathing sounds. That's most consistent with:",
                options: ["A synthetic voice clone", "A bad phone connection"],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "Unnatural blinking patterns are a tell that has become more useful over time as AI video improves.",
                answer: false,
                explanation:
                  "Visual tells generally get less reliable as the tools improve, so they should prompt further checking rather than certainty.",
              },
            ],
          },
          {
            id: "ml0l4",
            title: "Verify beyond the pixels",
            xp: 20,
            content:
              "As visual tells fade, context does the real work. Ask who posted the media and whether they are credible, run a reverse image search to find the original, and look for independent sources that corroborate the story. If a dramatic claim only exists in one place and comes from an unknown source, the safest move is to wait before sharing.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A dramatic breaking-news video is posted by a brand-new anonymous account with no other posts, and no major outlet has picked it up. What's the move?",
                options: [
                  "Treat it as unverified - check the source and look for corroboration before sharing",
                  "Share it - if it were fake, someone would have said so already",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml0q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A photo or video looks polished and professional. What does that prove about whether it's real?",
                options: [
                  "Very little - high visual polish is no longer proof of authenticity",
                  "It is almost certainly real",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Which of these is a common image-generation tell?",
                options: [
                  "Distortion in hands and embedded text",
                  "A slightly oversaturated sky",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "A voice message sounds urgent but is perfectly even, with no breathing or natural pauses. What is the most likely explanation?",
                options: [
                  "A synthetic voice clone",
                  "A poor cellular connection",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "As AI tools improve, visual and audio tells become more reliable for spotting fakes.",
                answer: false,
                explanation:
                  "Tells generally become less reliable as generators improve, so verification matters more than ever.",
              },
              {
                type: "multiple-choice",
                question:
                  "What is the most durable way to verify a surprising image or video?",
                options: [
                  "Check the source's credibility and look for independent corroboration",
                  "Zoom in and look for any single glitch",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "Synthetic media risk is mostly limited to celebrities and public figures.",
                answer: false,
                explanation:
                  "Scams and fakes can target anyone, including ordinary people and their families.",
              },
            ],
          },
        ],
      },
      {
        id: "ml1",
        title: "Deepfakes and voice cloning scams",
        description: "How scammers use cloned voices and fake video, and how to respond safely",
        lessons: [
          {
            id: "ml1l1",
            title: "What a deepfake actually is",
            xp: 20,
            content:
              "A deepfake is media, usually video or audio, generated or altered by AI to make someone appear to say or do something they never did. Voice cloning only needs a short audio sample, sometimes just a few seconds pulled from a social media video, to produce a convincing fake of a person's voice. Scammers use these tools to impersonate a boss, a grandchild, or a coworker in distress. The goal is almost always the same: create panic or urgency so the target acts fast, sends money, or shares private information before thinking it through.",
            exercises: [
              {
                type: "multiple-choice",
                question: "How much audio does a scammer typically need to clone someone's voice?",
                options: [
                  "As little as a few seconds from an existing video or voicemail",
                  "Several hours of studio-quality recording",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Deepfake scams work mainly by creating urgency and panic so the target doesn't stop to think.",
                answer: true,
                explanation: "Urgency is the core tactic: it pressures people to act before they verify what's happening.",
              },
            ],
          },
          {
            id: "ml1l2",
            title: "The classic voice clone scam",
            xp: 20,
            content:
              "In a typical scam, you get a call and hear what sounds exactly like a family member, crying or panicked, saying they've been in an accident, arrested, or kidnapped, and need money sent immediately, often through gift cards or a wire transfer. The caller may add a second voice pretending to be a lawyer or officer to sound official. The details are usually vague on purpose, and the caller pushes hard against hanging up to check. Recognizing this pattern is the first defense, because once you know the script, the fear it relies on loses some of its power.",
            exercises: [
              {
                type: "fill-blank",
                prompt:
                  "Voice clone scams create ____ so that the target sends money before verifying the story.",
                answer: "urgency",
                acceptableAnswers: ["panic", "fear"],
              },
              {
                type: "multiple-choice",
                question:
                  "A caller who sounds like your cousin says she's been arrested and needs gift cards sent right now, and gets angry when you say you want to call her back. This pattern is:",
                options: [
                  "A classic sign of a voice clone or impersonation scam",
                  "Normal behavior for someone in a real emergency",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml1l3",
            title: "Verify by callback and code words",
            xp: 20,
            content:
              "The single most reliable defense against a voice clone is to hang up and call the person back on a number you already know is theirs, not one the caller gives you. If they don't answer, contact another family member to check. Many families also set up a private code word in advance, something only real family members would know, to say during a real emergency call. If the caller can't give the code word, or refuses to wait while you check, treat that as a serious warning sign rather than proof of urgency.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put these steps in the safest order when you get a suspicious emergency call.",
                words: ["Hang up", "Call back", "known", "number", "and", "check", "the", "code", "word"],
              },
              {
                type: "true-false",
                statement: "You should trust the phone number a suspicious caller gives you and call that number back to verify.",
                answer: false,
                explanation: "Always use a number you already know is correct, never one provided by the caller themselves.",
              },
            ],
          },
          {
            id: "ml1l4",
            title: "Never act on urgency alone",
            xp: 20,
            content:
              "Scammers, human or AI-powered, rely on speed to stop you from thinking clearly. A safe rule is: no matter how real or urgent a call, message, or video seems, never send money, gift cards, or personal information until you've verified through a separate, trusted channel. This applies to voice clones, but also to fake texts from a 'boss' asking for a wire transfer or a cloned video of a coworker requesting login details. Slowing down for even five extra minutes to verify costs almost nothing, while acting on a fake instantly can cost everything.",
            exercises: [
              {
                type: "short-answer",
                question:
                  "Describe a safe way to respond if you get an urgent message from your 'boss' asking you to buy gift cards immediately and not tell anyone.",
                minWords: 15,
                referenceAnswer:
                  "Pause, do not act immediately, and verify the request through a separate trusted channel like calling your boss directly or checking with a coworker before doing anything.",
              },
              {
                type: "multiple-choice",
                question: "What do almost all deepfake and voice clone scams have in common?",
                options: [
                  "They pressure the target to act immediately without verifying",
                  "They always ask for cryptocurrency specifically",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml1q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "How much sample audio can be enough to clone a voice convincingly?",
                options: ["Just a few seconds", "Multiple hours"],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Voice clone scams typically rely on creating panic to prevent verification.",
                answer: true,
                explanation: "Urgency and fear are the core tools scammers use to stop people from checking facts.",
              },
              {
                type: "multiple-choice",
                question: "What is the safest way to verify a suspicious emergency call from a 'family member'?",
                options: [
                  "Hang up and call back on a number you already know is theirs",
                  "Ask them to describe the emergency in more detail over the same call",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "A private ____ word can help families confirm a real emergency call is genuine.",
                answer: "code",
              },
              {
                type: "true-false",
                statement: "You should trust a callback number provided by the suspicious caller.",
                answer: false,
                explanation: "Only use a number you already know is correct, not one given by the caller.",
              },
              {
                type: "multiple-choice",
                question: "What should you do before sending money in response to an urgent, emotional request?",
                options: [
                  "Verify the request through a separate, trusted channel first",
                  "Send a small amount first to see what happens",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "ml2",
        title: "Provenance and verification tools",
        description: "Practical tools for checking where media really came from",
        lessons: [
          {
            id: "ml2l1",
            title: "Reverse image search",
            xp: 20,
            content:
              "Reverse image search lets you upload or paste an image into a tool and find other places online where that image, or a similar one, has appeared. This is one of the fastest ways to catch old photos being recirculated as if they were breaking news, or to find the original, unedited version of a picture. If a dramatic photo supposedly from today actually shows up in an article from three years ago, that's a strong sign it's being used misleadingly. Reverse image search doesn't detect AI generation directly, but it's excellent at catching reused and mislabeled real photos.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What is reverse image search most useful for?",
                options: [
                  "Finding other places online where an image has appeared, including its original source",
                  "Automatically detecting if an image was made by AI",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Reverse image search can prove an image is AI-generated.",
                answer: false,
                explanation: "It finds where an image has appeared before; it doesn't analyze whether the image itself was AI-made.",
              },
            ],
          },
          {
            id: "ml2l2",
            title: "Metadata and what it tells you",
            xp: 20,
            content:
              "Metadata is hidden information saved inside a file, such as the camera model, date, and sometimes location for a photo, or the software used to create a document. Checking metadata can reveal when a photo was actually taken or if it was edited with image-generation software. However, metadata is easy to strip or fake: uploading an image to social media often removes it automatically, and a determined faker can edit it too. Metadata is a useful clue when present, but its absence proves nothing on its own.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "____ is hidden information inside a file, like the camera and date a photo was taken.",
                answer: "Metadata",
              },
              {
                type: "multiple-choice",
                question: "An image has no metadata at all. What does that tell you?",
                options: [
                  "Very little on its own - social media often strips metadata automatically",
                  "It's definitely fake",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml2l3",
            title: "C2PA and content credentials",
            xp: 20,
            content:
              "Content credentials, based on a standard called C2PA, work like a digital nutrition label attached to a file. They can show how an image or video was created or edited, whether AI tools were involved, and who published it, all cryptographically signed so the label is hard to fake or remove without notice. Several camera makers, news organizations, and AI companies have started adding these credentials. The catch is that adoption is still uneven: plenty of real media has no credentials at all, and their absence doesn't automatically mean something is fake.",
            exercises: [
              {
                type: "matching",
                instruction: "Match each verification concept to what it does.",
                pairs: [
                  { term: "Reverse image search", definition: "Finds other places online where an image has appeared" },
                  { term: "Metadata", definition: "Hidden file details like camera model and date" },
                  { term: "Content credentials (C2PA)", definition: "A signed record of how media was created or edited" },
                ],
              },
              {
                type: "true-false",
                statement: "Content credentials are cryptographically signed to make them hard to tamper with unnoticed.",
                answer: true,
                explanation: "That signing is the core idea behind the C2PA standard for content credentials.",
              },
            ],
          },
          {
            id: "ml2l4",
            title: "Watermarking and its limits",
            xp: 20,
            content:
              "Some AI companies add watermarks, visible or invisible, to content their tools generate, so it can later be identified as AI-made. Invisible watermarks are embedded in the pixel or audio data itself and can survive some edits. But watermarking has real limits: not every AI tool adds one, watermarks can sometimes be removed or damaged by cropping, screenshotting, or converting the file, and there's no universal standard that all generators follow. Watermarking helps but isn't a complete solution, which is why it works best alongside other checks like source verification rather than as a single fix.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why can't watermarking alone solve the problem of identifying AI-generated content?",
                options: [
                  "Not all tools add watermarks, and existing ones can be removed or damaged",
                  "Watermarks make files too large to share",
                ],
                correctIndex: 0,
              },
              {
                type: "short-answer",
                question: "Why is it better to combine watermarking with other verification methods rather than rely on it alone?",
                minWords: 12,
                referenceAnswer:
                  "Because watermarks can be missing, removed, or damaged, so combining them with source checks and metadata gives a more reliable picture.",
              },
            ],
          },
          {
            id: "ml2q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "What does reverse image search help you find?",
                options: [
                  "Other places online where an image has appeared before",
                  "Whether an image was generated by AI",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "____ inside a file can include the camera model, date, and edit history.",
                answer: "Metadata",
              },
              {
                type: "true-false",
                statement: "The absence of metadata proves an image is fake.",
                answer: false,
                explanation: "Metadata is often stripped automatically by social platforms, so its absence proves little.",
              },
              {
                type: "multiple-choice",
                question: "What do content credentials based on C2PA provide?",
                options: [
                  "A signed record of how a file was created or edited",
                  "An automatic block on sharing AI content",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Every AI-generated image and video currently includes a reliable watermark.",
                answer: false,
                explanation: "Watermark adoption is uneven, and watermarks can be removed or damaged.",
              },
              {
                type: "multiple-choice",
                question: "What's the best approach to verifying media?",
                options: [
                  "Combine multiple tools, like source checks, metadata, and content credentials",
                  "Rely on a single tool like watermark detection",
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "ml3",
        title: "AI-generated text and misinformation at scale",
        description: "How AI changes the scale of fake reviews, bots, and misleading news",
        lessons: [
          {
            id: "ml3l1",
            title: "Bot accounts and fake engagement",
            xp: 20,
            content:
              "A bot account is a social media profile run automatically by software instead of a real person. AI text generation lets bot networks post realistic-sounding comments, replies, and posts at massive scale, making a fringe opinion look like a widespread trend or making a product look more popular than it is. Signs of bot activity include accounts created recently, posting at an inhuman rate, or using near-identical wording across many posts. A single suspicious account doesn't prove much, but coordinated, repetitive patterns across many accounts are a strong signal that engagement is manufactured rather than genuine.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes AI-powered bot networks especially effective at misleading people?",
                options: [
                  "They can produce realistic text at a scale no group of humans could match",
                  "They only work on very old social media platforms",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "One suspicious-looking account is usually enough to prove a coordinated bot campaign.",
                answer: false,
                explanation: "It takes a pattern across many accounts, like similar wording and timing, to indicate coordination.",
              },
            ],
          },
          {
            id: "ml3l2",
            title: "Fake reviews written by AI",
            xp: 20,
            content:
              "AI can generate large batches of product or service reviews that sound personal and specific, even though no one involved ever used the product. This is different from older fake reviews, which were often short, generic, and easy to spot. AI-written reviews can vary in tone, mention plausible details, and appear over time instead of all at once, making them blend in better. Useful checks include looking at a reviewer's full history for other unrelated five-star reviews posted in a short window, and being wary of many reviews that repeat similar unusual phrases.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "AI-written fake reviews are harder to spot because they can vary in ____ and mention plausible details.",
                answer: "tone",
              },
              {
                type: "multiple-choice",
                question: "A product has dozens of five-star reviews posted within the same day, many using similar unusual phrases. This pattern suggests:",
                options: [
                  "Possible coordinated or AI-generated fake reviews",
                  "Normal organic customer feedback",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "ml3l3",
            title: "AI-written news sites",
            xp: 20,
            content:
              "Some websites are built to look like legitimate news outlets but are actually run with little to no human oversight, publishing large volumes of AI-generated articles, some accurate, some fabricated, often optimized to attract clicks and ad revenue rather than to inform. These sites can mimic real news formatting closely, including bylines and dates. Warning signs include no clear author information or physical address, articles published at an unusually high rate, and content that closely mirrors other AI-written sites word for word. Checking whether a source has an established reputation and editorial standards remains one of the best defenses.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which is a warning sign of a low-quality AI-generated news site?",
                options: [
                  "No clear author information and an unusually high publishing rate",
                  "A small number of well-researched articles per month",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "AI-generated news sites always look obviously different from real news outlets.",
                answer: false,
                explanation: "Many closely mimic real news formatting, making them harder to distinguish at a glance.",
              },
            ],
          },
          {
            id: "ml3l4",
            title: "Why volume is the real change",
            xp: 20,
            content:
              "Misinformation itself isn't new, but AI changes its scale and speed. A single person with an AI tool can now generate thousands of fake reviews, comments, or articles in the time it once took to write a handful by hand. This flood makes it harder to trust that popularity, repetition, or sheer volume of similar-sounding content means something is true or genuine. The core lesson is to treat volume with suspicion rather than confidence: seeing the same claim repeated in a hundred places is no longer strong evidence that it's real, especially if those places can't be traced to independent, credible sources.",
            exercises: [
              {
                type: "drag-drop",
                instruction: "Put these words in order to complete the key idea.",
                words: ["Volume", "no", "longer", "proves", "truth"],
              },
              {
                type: "short-answer",
                question: "Explain why seeing a claim repeated across many accounts or sites is weaker evidence today than it used to be.",
                minWords: 15,
                referenceAnswer:
                  "Because AI tools let one person or a small group generate huge volumes of repetitive content cheaply, so repetition alone no longer signals that many independent people agree or that something is true.",
              },
            ],
          },
          {
            id: "ml3q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "What makes AI-powered bots especially effective at spreading a message?",
                options: [
                  "They can post realistic content at massive scale",
                  "They can only post on one platform at a time",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "A pattern of similar wording across many accounts posting at once suggests coordination.",
                answer: true,
                explanation: "Coordinated, repetitive patterns are a strong signal of manufactured engagement.",
              },
              {
                type: "multiple-choice",
                question: "What makes modern AI-written fake reviews harder to spot than older fake reviews?",
                options: [
                  "They vary in tone and include plausible specific details",
                  "They are always posted in a foreign language",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Which is a warning sign of an AI-generated news site?",
                options: [
                  "No clear author info and an unusually high article publishing rate",
                  "A well-known author with a long publishing history",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt: "AI mainly changes the ____ and speed at which misinformation can be produced.",
                answer: "scale",
                acceptableAnswers: ["volume"],
              },
              {
                type: "true-false",
                statement: "Seeing a claim repeated across many places today is strong evidence it's true.",
                answer: false,
                explanation: "AI can cheaply generate repetitive content at scale, so repetition alone is weak evidence.",
              },
            ],
          },
        ],
      },
      {
        id: "ml4",
        title: "Building a personal verification habit",
        description: "Practical habits for checking sources and talking to family about scams",
        lessons: [
          {
            id: "ml4l1",
            title: "Lateral reading",
            xp: 20,
            content:
              "Lateral reading means leaving a page or post to check what other, independent sources say about it, instead of only studying the page itself for clues. Professional fact-checkers rely on this technique more than any single trick for spotting fakes. Rather than staring at a suspicious article looking for typos or bad formatting, open a few new tabs and search for the claim, the source's name, or the organization behind it. If credible outlets are reporting the same thing, that's reassuring; if nobody else can confirm it, that's a signal to slow down.",
            exercises: [
              {
                type: "fill-blank",
                prompt: "____ reading means checking other independent sources instead of just studying the page itself.",
                answer: "Lateral",
              },
              {
                type: "true-false",
                statement: "Professional fact-checkers rely heavily on lateral reading rather than only examining a page itself.",
                answer: true,
                explanation: "Leaving the page to check independent sources is one of the most effective fact-checking habits.",
              },
            ],
          },
          {
            id: "ml4l2",
            title: "Checking the source itself",
            xp: 20,
            content:
              "Before trusting a claim, it helps to ask a few quick questions about where it came from: Who published this, and what's their track record? Do they have editorial standards or corrections when they get things wrong? Is there a clear author, and can you find other work by them? Is the site or account new, anonymous, or designed mainly to provoke strong reactions? None of these questions alone proves something is true or false, but together they build a quick picture of how much trust a source has earned.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which question is most useful when quickly evaluating an unfamiliar source?",
                options: [
                  "Does it have a track record, editorial standards, and identifiable authors?",
                  "Does the website use a professional-looking color scheme?",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each verification habit to its main purpose.",
                pairs: [
                  { term: "Lateral reading", definition: "Checking independent sources away from the original page" },
                  { term: "Source check", definition: "Evaluating a publisher's track record and editorial standards" },
                  { term: "Reverse image search", definition: "Finding where an image has previously appeared" },
                ],
              },
            ],
          },
          {
            id: "ml4l3",
            title: "The pause-before-sharing rule",
            xp: 20,
            content:
              "A simple, powerful habit is to pause before sharing anything that makes you feel a strong emotion, especially outrage, fear, or urgency. Content designed to spread quickly is often engineered to trigger exactly those feelings, which short-circuit careful thinking. Before hitting share, ask: have I checked another source, do I actually know this is true, and would I still share it if it turned out to be false? Waiting even a few minutes gives your judgment time to catch up with your emotions, and it costs nothing if the story turns out to be true.",
            exercises: [
              {
                type: "true-false",
                statement: "Content that triggers strong emotions like outrage or fear should be trusted more, since it's clearly important.",
                answer: false,
                explanation: "Strong emotional reactions are often exactly what makes people skip verification, so they call for more caution, not less.",
              },
              {
                type: "short-answer",
                question: "Describe the pause-before-sharing rule and why it helps reduce the spread of misinformation.",
                minWords: 15,
                referenceAnswer:
                  "It means stopping to verify a claim before sharing it, especially when it triggers strong emotion, because that pause gives you time to check sources rather than spreading something false in the heat of the moment.",
              },
            ],
          },
          {
            id: "ml4l4",
            title: "Talking to family about scams",
            xp: 20,
            content:
              "Many scams succeed because people, especially those less familiar with AI tools, don't know these tricks exist yet. A caring, non-judgmental conversation with family members, particularly older relatives, can make a real difference: explain that voices and videos can now be convincingly faked, agree on a callback habit and a family code word, and make clear that they can always call you to check a suspicious request, no matter the time. Frame it as protecting each other rather than assuming anyone is careless, since anyone, at any age, can be caught off guard by a well-timed fake.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What's an effective way to help family members avoid falling for AI scams?",
                options: [
                  "Explain the risk calmly and agree on habits like callbacks and a code word",
                  "Avoid the topic so they don't get anxious about it",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction: "Put these steps in order for helping a family member prepare for scam calls.",
                words: ["Explain", "the", "risk", "agree", "on", "a", "code", "word"],
              },
            ],
          },
          {
            id: "ml4q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "fill-blank",
                prompt: "____ reading means checking independent sources instead of only studying the original page.",
                answer: "Lateral",
              },
              {
                type: "true-false",
                statement: "Fact-checkers rely heavily on lateral reading as a core verification technique.",
                answer: true,
                explanation: "Leaving the page to check what independent sources say is a cornerstone fact-checking habit.",
              },
              {
                type: "multiple-choice",
                question: "Which is a useful quick check when evaluating an unfamiliar source?",
                options: [
                  "Whether it has a track record, editorial standards, and identifiable authors",
                  "Whether the website loads quickly",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement: "Content that triggers strong outrage or fear deserves more caution before sharing, not less.",
                answer: true,
                explanation: "Strong emotional reactions are often used to bypass careful thinking, so they call for a pause.",
              },
              {
                type: "multiple-choice",
                question: "What should you do before sharing something that makes you feel strong emotion?",
                options: [
                  "Pause and verify it through another source first",
                  "Share it immediately so others can see it too",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "What's an effective way to help family members avoid AI-powered scams?",
                options: [
                  "Calmly explain the risk and agree on verification habits like a code word",
                  "Assume they already know and never bring it up",
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
