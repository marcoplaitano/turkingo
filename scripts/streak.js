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
    return parseInt(localStorage.getItem("streakNum")) || 0;
}

function getStreakDate() {
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
    localStorage.setItem("streakFreezes", getNumFreezes() + 1);
}

function decreaseStreakFreezes() {
    let currNum = getNumFreezes();
    if (currNum > 0) {
        localStorage.setItem("streakFreezes", currNum - 1);
    }
}


const TODAY_DATE = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
