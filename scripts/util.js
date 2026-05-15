//////////////////////////////////////////////////
// UTILITY FUNCTIONS
//////////////////////////////////////////////////

function randomItem(INPUT_DATA) {
    return INPUT_DATA[Math.floor(Math.random() * INPUT_DATA.length)];
}

function randomSentence(INPUT_DATA) {
    const samples = INPUT_DATA.filter(item => item.type === "sentence");
    return samples[Math.floor(Math.random() * samples.length)];
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Calculate levenshtein distance between 2 words.
function levenshtein(a, b) {
    const matrix = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + cost);
        }
    }
    return matrix[b.length][a.length];
}

function pickRandomMessage(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Because the language data in my JSON can be both an array or a single string.
function getLanguageValue(value) {
    if (Array.isArray(value))
        return value[Math.floor(Math.random() * value.length)];
    else
        return value;
}

// Choose which end-of-lesson message to display based on number of failed and skipped exercises.
function getEndMessage(MESSAGES_DATA, mistakes, skips, total) {
    const ratioMistake = mistakes / total;
    const ratioSkip = skips / total;

    if (ratioSkip >= 0.5) return pickRandomMessage(MESSAGES_DATA.skipped_most);
    if (ratioSkip >= 0.2) return pickRandomMessage(MESSAGES_DATA.skipped_some);
    if (ratioMistake === 0)  return pickRandomMessage(MESSAGES_DATA.lesson_perfect);
    if (ratioMistake <= 0.1) return pickRandomMessage(MESSAGES_DATA.lesson_excellent);
    if (ratioMistake <= 0.3) return pickRandomMessage(MESSAGES_DATA.lesson_great);
    if (ratioMistake <= 0.5) return pickRandomMessage(MESSAGES_DATA.lesson_okay);
    if (ratioMistake <= 0.7) return pickRandomMessage(MESSAGES_DATA.lesson_poor);
    else return pickRandomMessage(MESSAGES_DATA.lesson_terrible);
}
