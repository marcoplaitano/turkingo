const MAX_STREAK_FREEZES = 3;

function updateStreak() {
    // Only update streak once per day.
    if (getStreakDate() === TODAY_DATE)
        return;
    let streakNum = getStreak() + 1;
    localStorage.setItem("streakNum", streakNum.toString());
    localStorage.setItem("streakLastDate", TODAY_DATE);
    setFireFreezed(false);
    streakAnimationStart(streakNum);
}

function getStreak() {
    console.log("STREAK NUM:", localStorage.getItem("streakNum"));
    return parseInt(localStorage.getItem("streakNum")) || 0;
}

function getStreakDate() {
    console.log("STREAK DATE:", localStorage.getItem("streakLastDate"));
    return localStorage.getItem("streakLastDate");
}

function resetStreak() {
    localStorage.setItem("streakNum", "0");
    localStorage.removeItem("streakLastDate");
}

function getNumFreezes() {
    return parseInt(localStorage.getItem("streakFreezes")) || 0;
}

function increaseStreakFreezes() {
    const currNumStreakFreezes = getNumFreezes();
    if (currNumStreakFreezes < MAX_STREAK_FREEZES)
        localStorage.setItem("streakFreezes", currNumStreakFreezes + 1);
}

function decreaseStreakFreezes() {
    const currNumStreakFreezes = getNumFreezes();
    if (currNumStreakFreezes > 0)
        localStorage.setItem("streakFreezes", currNumStreakFreezes - 1);
}
