const MAX_STREAK_FREEZES = 3;

export function updateStreak() {
    // Only update streak once per day.
    if (getStreakDate() === TODAY_DATE)
        return;
    let streakNum = getStreak() + 1;
    localStorage.setItem("streakNum", streakNum);
    localStorage.setItem("streakLastDate", TODAY_DATE);
    setStreakFreezed(false);
    streakAnimationStart(true);
}

export function getStreak() {
    return parseInt(localStorage.getItem("streakNum")) || 0;
}

export function getStreakDate() {
    return localStorage.getItem("streakLastDate");
}

export function resetStreak() {
    localStorage.setItem("streakNum", 0);
    localStorage.removeItem("streakLastDate");
}

export function getNumFreezes() {
    return parseInt(localStorage.getItem("streakFreezes")) || 0;
}

export function increaseStreakFreezes() {
    const currNumStreakFreezes = getNumFreezes();
    if (currNumStreakFreezes < MAX_STREAK_FREEZES)
        localStorage.setItem("streakFreezes", currNumStreakFreezes + 1);
}

export function decreaseStreakFreezes() {
    const currNumStreakFreezes = getNumFreezes();
    if (currNumStreakFreezes > 0)
        localStorage.setItem("streakFreezes", currNumStreakFreezes - 1);
}

export function setStreakFreezed(freezed) {
    sessionStorage.setItem("freezed", freezed);
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


const TODAY_DATE = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
