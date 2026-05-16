import '../style/ProgressBar.css'

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ExerciseResult, ExerciseResultID, NUM_EXERCISES_PER_LESSON } from './globals';

interface PropsProgressBar {
  refreshId: number;
  status: ExerciseResult | null;
}

export default function ProgressBar({ refreshId, status }: PropsProgressBar) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [segWidth, setSegWidth] = useState(0);
  const [STATUSES, addStatus] = useState<ExerciseResult[]>([]);
  const NUM_EXERCISES_DONE = Math.max(0, STATUSES.length);
  const PROGRESS_BAR_GAP = 3 * (NUM_EXERCISES_PER_LESSON - 1);

  useEffect(() => {
    if (status !== null)
      addStatus(prev => [...prev, status]);
  }, [refreshId]);

  useLayoutEffect(() => {
    const updateSegWidth = () => {
      const progressBarEl = progressBarRef.current;
      if (!progressBarEl) return;

      const width = progressBarEl.clientWidth;
      const calculatedWidth = (width - PROGRESS_BAR_GAP) / NUM_EXERCISES_PER_LESSON;
      setSegWidth(Math.max(0, calculatedWidth));
    };

    updateSegWidth();
    window.addEventListener('resize', updateSegWidth);
    return () => window.removeEventListener('resize', updateSegWidth);
  }, [PROGRESS_BAR_GAP]);

  return (
    <div id="progress-container">
      <div id="progress-bar" ref={progressBarRef}>
        {Array.from({ length: NUM_EXERCISES_DONE }).map((_, i) => (
          <div
            key={i}
            className="progress-bar-segment"
            id={ExerciseResultID[STATUSES[i]]}
            style={{
              width: `${segWidth}px`,
              minWidth: `${segWidth}px`,
            }}
          >
          </div>
        ))}
      </div>
      <span id="progress-label">{`${NUM_EXERCISES_DONE}/${NUM_EXERCISES_PER_LESSON}`}</span>
    </div>
  );
}


// const segWidth = (document.getElementById("progress-bar").clientWidth - PROGRESS_BAR_GAP) / NUM_EXERCISES_PER_LESSON;
// seg.style.width = segWidth + "px";
// seg.style.minWidth = segWidth + "px";
