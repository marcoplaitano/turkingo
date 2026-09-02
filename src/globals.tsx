import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://scclxzppjhmznnyvfsdv.supabase.co"; //import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = "sb_publishable_GVkXjWkNi-yZTN-FSzytXQ_9tXTcoyn"; // import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const DB_TABLE_NAME = "languageData"; // import.meta.env.VITE_DB_TABLE_NAME as string ?? "";

export const DB_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const MAX_STREAK_FREEZES = 3;

export const TODAY_DATE = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

export const NUM_EXERCISES_PER_LESSON = 10;

export const BLANK_STR = "______";



//////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////

export type ItemType = "word" | "phrase" | "sentence";

export const ExerciseResult = {
  CORRECT: "correct",
  FAILED: "failed",
  SKIPPED: "skipped"
} as const;
// Create a type from the object values
export type ExerciseResult = typeof ExerciseResult[keyof typeof ExerciseResult];
export const ExerciseResultID = {
  [ExerciseResult.CORRECT]: "correct",
  [ExerciseResult.FAILED]: "failed",
  [ExerciseResult.SKIPPED]: "skipped"
};

export interface RawItem {
  id: number;
  "l-EN": string;
  "l-TR": string;
  type: ItemType;
}

export class LanguageItemData {
  private raw: RawItem;
  constructor(raw: RawItem) {
    this.raw = raw;
  }
  getId(): number { return this.raw.id; }
  getType(): ItemType { return this.raw.type; }
  getLanguageEN(): string { return this.raw["l-EN"]; }
  getLanguageTR(): string { return this.raw["l-TR"]; }
  getTranslation(str: string): string { return str === this.getLanguageEN() ? this.getLanguageTR() : this.getLanguageEN(); }
}



//////////////////////////////////////////////////
// UTIL FUNCTIONS
//////////////////////////////////////////////////

export function normalizeTurkish(s: string): string {
  return s
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ü/g, "u").replace(/Ü/g, "U")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ç/g, "c").replace(/Ç/g, "C");
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randomItem(data: LanguageItemData[]): LanguageItemData {
  return data[Math.floor(Math.random() * data.length)];
}

export function randomItemNotSentence(data: LanguageItemData[]): LanguageItemData {
  const items = data.filter((i) => i.getType() !== "sentence");
  return randomItem(items.length > 0 ? items : data);
}

export function randomSentence(data: LanguageItemData[]): LanguageItemData {
  const sentences = data.filter((i) => i.getType() === "sentence");
  return randomItem(sentences.length > 0 ? sentences : data);
}

export function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}



//////////////////////////////////////////////////
// STREAK FUNCTIONS
//////////////////////////////////////////////////

export function updateStreak(): boolean {
  if (getStreakDate() === TODAY_DATE)
    return false;
  const streakNum = getStreak() + 1;
  setStreak(streakNum);
  setStreakDate(TODAY_DATE);
  setStreakFreezed(false);
  return true;
}

function setStreak(num: number): void {
  localStorage.setItem("streakNum", String(num));
}

function setStreakDate(date: string): void {
  localStorage.setItem("streakLastDate", date);
}

export function getStreak(): number {
  return parseInt(localStorage.getItem("streakNum") ?? "0") || 0;
}

export function getStreakDate(): string | null {
  return localStorage.getItem("streakLastDate");
}

function resetStreak(): void {
  localStorage.setItem("streakNum", "0");
  localStorage.removeItem("streakLastDate");
  setStreakFreezed(false);
  localStorage.removeItem("freezeDate");
  setNumFreezes(0);
}

export function getNumFreezes(): number {
  return parseInt(localStorage.getItem("streakFreezes") ?? "0") || 0;
}

function setNumFreezes(num: number) {
  localStorage.setItem("streakFreezes", String(num));
}

export function increaseStreakFreezes(delta: number = 1): void {
  const curr = getNumFreezes();
  if (curr + delta <= MAX_STREAK_FREEZES)
    localStorage.setItem("streakFreezes", String(curr + delta));
}

function decreaseStreakFreezes(delta: number = 1): void {
  const curr = getNumFreezes();
  if (curr - delta > 0)
    localStorage.setItem("streakFreezes", String(curr - delta));
  else
    localStorage.setItem("streakFreezes", "0");
}

export function isStreakFreezed(): boolean {
  return localStorage.getItem("freezed") === "true";
}

function getFreezeDate(): string | null {
  return localStorage.getItem("freezeDate");
}

function setFreezeDate(date: string) {
  localStorage.setItem("freezeDate", date);
}

function setStreakFreezed(freezed: boolean): void {
  localStorage.setItem("freezed", String(freezed));
  const streakDiv = document.getElementById("streak");
  if (!streakDiv)
    return;
  if (freezed)
    streakDiv.classList.add("freezed");
  else
    streakDiv.classList.remove("freezed");
}

function useStreakFreeze(howMany: number = 1): void {
  setStreakFreezed(true);
  setFreezeDate(TODAY_DATE);
  decreaseStreakFreezes(howMany);
}

export function initStreak(): boolean {
  const lastStreakDate = getStreakDate();
  const lastFreezeDate = getFreezeDate();

  // Never completed a lesson until now so there's no streak.
  if (lastStreakDate === null) {
    resetStreak();
    return isStreakFreezed();
  }

  // Get yesterday date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split("T")[0];

  if (lastStreakDate < yesterdayDate) {
    // Count how many days have passed since the last freeze (or streak)
    // If I have enough freezes left, i use them and freeze
    const beginDate = lastFreezeDate !== null ? lastFreezeDate : lastStreakDate;
    const numDaysPassed = daysBetween(beginDate, TODAY_DATE);
    if (numDaysPassed > 0 && numDaysPassed <= getNumFreezes())
      useStreakFreeze(numDaysPassed);
    else
      resetStreak();
  }

  return isStreakFreezed();
}

function daysBetween(dateA: string, dateB: string) {
  const a = new Date(dateA + "T00:00:00Z");
  const b = new Date(dateB + "T00:00:00Z");
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}
