import '../style/PageHome.css'
import '../style/streak_animation.css'

import { useState, useEffect, useCallback } from "react";
import { DB_CLIENT, DB_TABLE_NAME, LanguageItemData, NUM_EXERCISES_PER_LESSON, updateStreak } from "./globals";
import type { RawItem } from "./globals";
import { ExerciseResult } from "./globals";

import ExerciseTranslation from './ExerciseTranslation';
import ExerciseMatchPairs from './ExerciseMatchPairs';
import ButtonNext from './ButtonNext.tsx';
import ButtonSkip from './ButtonSkip.tsx';
import ProgressBar from './ProgressBar.tsx';
import EndOfLesson from './EndOfLesson.tsx';

export default function PageHome() {
  const [data, setData] = useState<LanguageItemData[]>();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [skipped, setSkipped] = useState<boolean>(false);
  const [progress, setProgress] = useState<ExerciseResult | null>(null);
  const [exerciseNum, setExerciseNum] = useState<number>(0);
  const [lessonEnded, setLessonEnded] = useState<boolean>(false);

  // ── Data loading ──────────────────────────────────────────────────────────

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await DB_CLIENT.from(DB_TABLE_NAME).select("*");
      if (res.status !== 200) 
        throw new Error(res.error?.message ?? "DB error");
      setData((res.data as RawItem[]).map((r) => new LanguageItemData(r)));
    } catch (err) {
      setLoadError(String(err));
    } finally {
      setLoading(false);
    }
  }, [DB_CLIENT]);

  useEffect(() => { 
    loadData(); 
  }, [loadData]);

  useEffect(() => {
    if (exerciseNum === NUM_EXERCISES_PER_LESSON) {
      // TODO: Save lesson scores
      updateStreak();
      // TODO: Show streak animation
      setLessonEnded(true);
    }
  }, [exerciseNum]);

  useEffect(() => {
    if (lessonEnded === false) {
      setExerciseNum(0);
      setLessonEnded(false);
    }
  }, [lessonEnded]);


  function skipExercise() {
    setSkipped(true);
    setResult(ExerciseResult.SKIPPED);
  }

  function nextExercise() {
    setSkipped(false);
    setProgress(result);
    setResult(null);
    setExerciseNum((k) => k + 1);
  }

  if (loadError) {
    return (
      <>
        <p className="p-error">{loadError}</p>
      </>
    );
  } 
  else if (loading) {
    return (
      <>
        <p className="p-loading">Loading...</p> // TODO: style
      </>
    );
  }
  else if (lessonEnded) {
    return (
      <>
      <EndOfLesson onDone={setLessonEnded}/>
      </>
    );
  }
  else {
    return (
      <>
        <main>
          <div className="app">
            {/* {data?.length > 0 && <ExerciseTranslation key={exerciseNum} inputData={data} onCheck={setResult} skipped={skipped} />} */}
            {data?.length > 0 && <ExerciseMatchPairs key={exerciseNum} inputData={data} onCheck={setResult} />}
            {result !== null && <ButtonNext status={result} onNext={nextExercise} />}
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
            <ProgressBar exerciseNum={exerciseNum} status={progress} />
            <ButtonSkip enabled={result === null} onSkip={skipExercise}/>
          </div>
        </div>
      </>
    );
  }
}
