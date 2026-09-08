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
    ],
  },
];
