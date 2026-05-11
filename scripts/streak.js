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



const formatDate = (date) => date.toISOString().split('T')[0];

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const dayBeforeYesterday = new Date(today);
dayBeforeYesterday.setDate(today.getDate() - 2);

const TODAY_DATE = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
const YESTERDAY_DATE = formatDate(yesterday);
const DAY_BEFORE_YESTERDAY_DATE = formatDate(dayBeforeYesterday);

console.log(TODAY_DATE);
console.log(YESTERDAY_DATE);
console.log(DAY_BEFORE_YESTERDAY_DATE);


increaseStreakFreezes();
