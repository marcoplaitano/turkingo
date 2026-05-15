import '../style/PageScores.css'

import { MAX_STREAK_FREEZES, getStreak, getNumFreezes } from './globals'

interface Score {
  date: string;
  correct: number;
  failed: number;
  skipped: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function readScores(): Score[] {
  try {
    return JSON.parse(localStorage.getItem("lessonScores") || "[]") || [];
  } catch {
    return [];
  }
}

function EntryBar({ correct, failed, skipped }: { correct: number; failed: number; skipped: number }) {
  const total = correct + failed + skipped;
  return (
    <div className="scorebar">
      {correct > 0 && <div className="scorebar-correct" style={{ width: `${(correct / total) * 100}%` }} />}
      {failed > 0  && <div className="scorebar-failed"  style={{ width: `${(failed  / total) * 100}%` }} />}
      {skipped > 0 && <div className="scorebar-skipped" style={{ width: `${(skipped / total) * 100}%` }} />}
    </div>
  );
}

function Entry({ correct, failed, skipped }: { correct: number; failed: number; skipped: number }) {
  return (
    <div className="scoreboard-entry">
      <EntryBar correct={correct} failed={failed} skipped={skipped} />
      <p>
        <span className="scoreboard-text-correct">{correct}</span>
        {" "}
        <span className="scoreboard-text-failed">{failed}</span>
        {"  "}
        <span className="scoreboard-text-skipped">{skipped}</span>
      </p>
    </div>
  );
}

function Scoreboard({ scores }: { scores: Score[] }) {
  if (scores.length === 0)
    return <p>Complete a lesson to see your scores here.</p>;

  const items: React.ReactNode[] = [];
  let lastDate: string | null = null;
  scores.forEach((score, i) => {
    if (score.date !== lastDate) {
      lastDate = score.date;
      items.push(<h3 key={`date-${score.date}`}>{formatDate(score.date)}</h3>);
    }
    items.push(<Entry key={i} correct={score.correct} failed={score.failed} skipped={score.skipped} />);
  });
  return <div id="scoreboard">{items}</div>;
}

export default function PageScores() {
  const scores = readScores();
  return (
    <main>
      <article>
        <h1>Scores</h1>
        <h2>Streak</h2>
        <p>
          Complete at least one lesson per day to increase your streak.<br />
          Right now, your streak is 🔥{getStreak()}.
        </p>
        <p>
          For every lesson completed with an accuracy &gt;=70%, you earn a streak freeze.<br />
          Right now, you have <span className="fire-freezed">🔥</span>{getNumFreezes()}/{MAX_STREAK_FREEZES} freezes left.
        </p>
        <h2>Scoreboard</h2>
        <Scoreboard scores={scores} />
      </article>
    </main>
  );
}
