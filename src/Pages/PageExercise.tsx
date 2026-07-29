import '../style/PageExercise.css'

import { useState, useEffect, useMemo } from "react";
import { getStreak, increaseStreakFreezes, LanguageItemData, NUM_EXERCISES_PER_LESSON, updateStreak } from "../globals.tsx";
import { ExerciseResult } from "../globals.tsx";
import { useToast } from "../Elements/Toast.tsx";

import ExerciseTranslation from '../Exercises/ExerciseTranslation.tsx';
import ExerciseMatchPairs from '../Exercises/ExerciseMatchPairs.tsx';
import ExerciseMatchTranslation from '../Exercises/ExerciseMatchTranslation.tsx';
import ExerciseFillBlanks from '../Exercises/ExerciseFillBlanks.tsx';
import ExerciseReorderSentence from '../Exercises/ExerciseReorderSentence.tsx';
import ButtonNext from '../Elements/ButtonNext.tsx';
import ButtonSkip from '../Elements/ButtonSkip.tsx';
import ProgressBar from '../Elements/ProgressBar.tsx';
import EndOfLesson from '../Elements/EndOfLesson.tsx';
import ErrorComponent from '../Elements/ErrorComponent.tsx';

interface PropsPageExercise {
  setStreakTitle: (streakNum: number) => void;
  data: LanguageItemData[];
}

export default function PageExercise({ setStreakTitle, data }: PropsPageExercise) {
  const toast = useToast();
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [skipped, setSkipped] = useState<boolean>(false);
  const [progress, setProgress] = useState<ExerciseResult | null>(null);
  const [exerciseNum, setExerciseNum] = useState<number>(0);
  const [numExercisesCorrect, setNumExercisesCorrect] = useState<number>(0);
  const [numExercisesSkipped, setNumExercisesSkipped] = useState<number>(0);
  const [lessonEnded, setLessonEnded] = useState<boolean>(false);

  // ── Exercise selection ───────────────────────────────────────────────────
  const exercises = [
    ExerciseTranslation,
    ExerciseMatchPairs,
    ExerciseMatchTranslation,
    ExerciseFillBlanks,
    ExerciseReorderSentence
  ];

  // Pick once when the component mounts, re-pick when exerciseNum changes
  const ExerciseComponent = useMemo(() => {
    return exercises[Math.floor(Math.random() * exercises.length)];
  }, [exerciseNum]);

  useEffect(() => {
    if (exerciseNum === NUM_EXERCISES_PER_LESSON) {
      if (numExercisesCorrect / NUM_EXERCISES_PER_LESSON >= 0.7) {
        increaseStreakFreezes();
      }
      if (numExercisesSkipped < NUM_EXERCISES_PER_LESSON) {
        const updated = updateStreak();
        if (updated) {
          const newStreakNum = getStreak();
          setStreakTitle(newStreakNum);
          toast(`Streak increased to 🔥${newStreakNum} days!`, "streak");
        }
      }
      setLessonEnded(true);
    }
  }, [exerciseNum]);

  useEffect(() => {
    if (lessonEnded === false) {
      setExerciseNum(0);
      setNumExercisesCorrect(0);
      setNumExercisesSkipped(0);
      setLessonEnded(false);
    }
  }, [lessonEnded]);


  function skipExercise() {
    setSkipped(true);
    setNumExercisesSkipped((k) => k + 1);
    setResult(ExerciseResult.SKIPPED);
  }

  function nextExercise() {
    setSkipped(false);
    setProgress(result);
    setResult(null);
    setExerciseNum((k) => k + 1);
    if (result === ExerciseResult.CORRECT)
      setNumExercisesCorrect((k) => k + 1);
  }

  if (data.length === 0) {
    return (
      <ErrorComponent message="No input data!" details="Either the database is empty or there was an error during retrieval." />
    );
  }

  else if (lessonEnded) {
    return (
      <main>
        <div className="app">
          <EndOfLesson onDone={setLessonEnded} />
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="app">
          {data && data.length > 0 && (
            <ExerciseComponent key={exerciseNum} inputData={data} onCheck={setResult} skipped={skipped} />
          )
          }
          {result !== null && <ButtonNext status={result} onNext={nextExercise} />}
        </div>
      </main>

      <div id="bottom-menu-container">
        <div id="progress-and-skip-container">
          <ProgressBar exerciseNum={exerciseNum} status={progress} />
          <ButtonSkip enabled={result === null} onSkip={skipExercise} />
        </div>
      </div>
    </>
  );
}
