import '../style/PageHome.css'
import '../style/streak_animation.css'

import { useState } from "react";

export default function PageHome() {
  const [showHint, setShowHint] = useState(false);

  function skipExercise() {

  }

  return (
    <>
      <main>
        <div className="app">
          <h2 id="title">Loading...</h2>
          <p id="question"></p>
          {showHint && <p id="hint"></p>}
          <div id="answers"></div>
          <div id="buttons"></div>
          <p id="feedback"></p>
        </div>
      </main>

      <div id="overlay-container">
        <div id="overlay">
          <span className="fire-icon">🔥</span>
          <div className="text">
            <span id="overlay-num">0</span>
            <span id="overlay-label">days streak</span>
          </div>
        </div>
      </div>

      <div id="bottom-menu-container">
        <div id="progress-and-skip-container">
          <div id="progress-container">
            <div id="progress-bar"></div>
            <span id="progress-label"></span>
          </div>
          <button id="btn-skip" aria-label="Skip exercise" title="Skip exercise" onClick={skipExercise}>»</button>
        </div>
      </div>
    </>
  );
}
