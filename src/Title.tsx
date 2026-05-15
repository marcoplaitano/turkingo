import '../style/Title.css'

import { getStreak, isStreakFreezed } from './globals';

export default function Title() {
  return (
    <div className="title-streak-container">
      <h1 className='title' translate="no" title="TürKingo">TürKingo</h1>
      <p id="streak">
        <span
        className={`fire-icon ${isStreakFreezed() ? 'fire-freezed' : ''}`}
        >🔥</span> <span id="streak-num">{getStreak()}</span>
      </p>
    </div>
  );
}
