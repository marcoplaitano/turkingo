export default function PageScores() {
  return (
    <>
      <main>
        <article>
          <h1>Scores</h1>
          <h2>Streak</h2>
          <p>Complete at least one lesson per day to increase your streak.<br/>
            Right now, your streak is 🔥<span id="curr-streak">0</span>.</p>
          <p>For every lesson completed with an accuracy {'>'}=70%, you earn a streak freeze.<br/>
            Right now, you have <span className="fire-freezed">🔥</span><span id="curr-streak-freezes">0</span>/<span id="max-streak-freezes">0</span> freezes left.</p>

          <h2>Scoreboard</h2>
          <div id="scoreboard">Complete a lesson to see your scores here.</div>
        </article>
      </main></>
  );
}
