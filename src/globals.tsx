// Just need this as an Enum.
export const ExerciseResult = {
  CORRECT: "correct",
  FAILED: "failed",
  SKIPPED: "skipped"
};

export const MAX_STREAK_FREEZES = 3;

export const TODAY_DATE = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"


export const DB_TABLE_NAME = "languageData";
// export const { createClient } = supabase;
// export const DB_CLIENT = createClient("https://scclxzppjhmznnyvfsdv.supabase.co", "sb_publishable_GVkXjWkNi-yZTN-FSzytXQ_9tXTcoyn");




export function updateStreak() {
  // Only update streak once per day.
  if (getStreakDate() === TODAY_DATE)
    return;
  let streakNum = getStreak() + 1;
  localStorage.setItem("streakNum", String(streakNum));
  localStorage.setItem("streakLastDate", TODAY_DATE);
  setStreakFreezed(false);
  // streakAnimationStart(true);
}

export function getStreak() {
  return parseInt(localStorage.getItem("streakNum") || "") || 0;
}

export function getStreakDate() {
  return localStorage.getItem("streakLastDate");
}

export function resetStreak() {
  localStorage.setItem("streakNum", String(0));
  localStorage.removeItem("streakLastDate");
}

export function getNumFreezes() {
  return parseInt(localStorage.getItem("streakFreezes") || "") || 0;
}

export function increaseStreakFreezes() {
  const currNumStreakFreezes = getNumFreezes();
  if (currNumStreakFreezes < MAX_STREAK_FREEZES)
    localStorage.setItem("streakFreezes", String(currNumStreakFreezes + 1));
}

export function decreaseStreakFreezes() {
  const currNumStreakFreezes = getNumFreezes();
  if (currNumStreakFreezes > 0)
    localStorage.setItem("streakFreezes", String(currNumStreakFreezes - 1));
}

export function setStreakFreezed(freezed: boolean) {
  sessionStorage.setItem("freezed", String(freezed));
  document.querySelectorAll(".fire-icon").forEach(element => {
    if (freezed)
      element.classList.add("fire-freezed");
    else
      element.classList.remove("fire-freezed");
  });
}

export function isStreakFreezed() {
  const isFreezed = sessionStorage.getItem("freezed");
  if (!isFreezed)
    return false;
  return isFreezed === "true";
}

export function useStreakFreeze() {
  setStreakFreezed(true);
  decreaseStreakFreezes();
}
