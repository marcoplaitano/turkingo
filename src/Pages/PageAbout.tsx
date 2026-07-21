import '../style/PageAbout.css'

import { getStreak, getNumFreezes, MAX_STREAK_FREEZES, getStreakDate } from "../globals";

export default function PageAbout() {
  const streak = getStreak();
  const streakDate = getStreakDate();
  const numFreezes = getNumFreezes();

  return (
    <>
      <main>
        <article>
          <p>A no-subscription alternative to Duolingo for English–Turkish language exercises.<br />
            I built it because I wanted to practice more without paying for Premium.</p>
          <p>The source code is available on <a href="https://github.com/marcoplaitano/turkingo">Github</a>.</p>

          <h2>Streak</h2>
          <p>
            Complete at least one lesson per day to increase your streak.<br />
            Right now, your streak is 🔥{streak}{streakDate && " (last updated on " + streakDate + ")"}.
          </p>
          <p>
            For every lesson completed with an accuracy &gt;=70%, you earn a streak freeze.<br />
            Right now, you have <span id="fire-freezed">🔥</span>{numFreezes}/{MAX_STREAK_FREEZES} freezes left.
          </p>

          <h2>Input data</h2>
          <p>Asked a LLM model to give some examples that I then collected in a SQL database.<br/>
          The user can also add more data in the Learn page.</p>
        </article>
      </main>
    </>
  );
}
