import type { ProfileBg } from "./app-state";

export type Friend = {
  id: string;
  name: string;
  xp: number;
  streak: number;
  ageGroup: "kids" | "tweens" | "teens" | "adults" | "pro";
  outfit: string;
  profileBg: ProfileBg;
  bio?: string;
};

export const FRIENDS: Friend[] = [
  { id: "maya",  name: "Maya P.",  xp: 4820, streak: 32, ageGroup: "teens",  outfit: "wizard",    profileBg: "galaxy",    bio: "Prompt engineer in training ✨" },
  { id: "diego", name: "Diego R.", xp: 4310, streak: 18, ageGroup: "teens",  outfit: "astronaut", profileBg: "mountains", bio: "Reaching for the stars 🚀" },
  { id: "aisha", name: "Aisha K.", xp: 3990, streak: 25, ageGroup: "tweens", outfit: "scientist", profileBg: "ocean",     bio: "Curiosity > everything 🔬" },
  { id: "liam",  name: "Liam T.",  xp: 1120, streak: 4,  ageGroup: "kids",   outfit: "ninja",     profileBg: "forest",    bio: "Sneaky smart 🥷" },
  { id: "sofia", name: "Sofia M.", xp: 980,  streak: 11, ageGroup: "tweens", outfit: "teacher",   profileBg: "city",      bio: "Teaching AL the ropes 🎓" },
  { id: "noah",  name: "Noah J.",  xp: 720,  streak: 2,  ageGroup: "kids",   outfit: "classic",   profileBg: "abstract",  bio: "Just getting started 💡" },
  { id: "ivy",   name: "Ivy W.",   xp: 510,  streak: 5,  ageGroup: "teens",  outfit: "wizard",    profileBg: "galaxy",    bio: "Magic prompts incoming 🪄" },
];

export function getFriend(id: string): Friend | undefined {
  return FRIENDS.find((f) => f.id === id);
}

export function friendIdByName(name: string): string | undefined {
  return FRIENDS.find((f) => f.name === name)?.id;
}
