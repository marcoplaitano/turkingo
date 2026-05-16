import '../style/Exercise.css'

import { useState, useRef } from "react";
import { LanguageItemData, shuffle, getLanguageValue, ExerciseResult } from './globals';

interface PropsExerciseMatchPairs {
  inputData: LanguageItemData[];
  onCheck: (result: ExerciseResult) => void;
}

type Side = "left" | "right";

interface Selection { word: string; side: Side }

export default function MatchPairsExercise({ inputData, onCheck }: PropsExerciseMatchPairs) {
  const exerciseRef = useRef<{
    sample: any;
    leftWords: any;
    rightWords: any;
    correct: Record<string, string>;
  } | null>(null);

  
  if (!exerciseRef.current) {
    const s = shuffle([...inputData]).filter((i) => i.getType() !== "sentence").slice(0, 4);
    const leftWords = s.map((i) => getLanguageValue(i.getLanguageTR()));
    const rightWords = shuffle(s.map((i) => getLanguageValue(i.getLanguageEN())));
    const correct: Record<string, string> = {};
    s.forEach((i) => { correct[getLanguageValue(i.getLanguageTR())] = getLanguageValue(i.getLanguageEN()); });
    exerciseRef.current = { sample: s, leftWords, rightWords, correct };
  }
  const { leftWords, rightWords, correct } = exerciseRef.current;

  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Selection | null>(null);
  const [disabled, setDisabled] = useState<Set<string>>(new Set());
  const [correctSet, setCorrectSet] = useState<Set<string>>(new Set());
  const [wrongSet, setWrongSet] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const handleClick = (word: string, side: Side) => {
    if (done || disabled.has(word)) return;

    if (!selected || selected.side === side) {
      setSelected({ word, side });
      return;
    }

    const left = side === "left" ? word : selected.word;
    const right = side === "right" ? word : selected.word;

    const newPairs = { ...pairs };
    // Remove any existing mapping to this right word
    Object.keys(newPairs).forEach((k) => { if (newPairs[k] === right) delete newPairs[k]; });
    newPairs[left] = right;
    setPairs(newPairs);
    setSelected(null);

    const newCorrect = new Set<string>();
    const newWrong = new Set<string>();
    const newDisabled = new Set<string>(disabled);
    let correctCount = 0;

    for (const [l, r] of Object.entries(newPairs)) {
      const isCorrect = correct[l] === r;
      if (isCorrect) {
        newCorrect.add(l);
        newCorrect.add(r);
        newDisabled.add(l);
        newDisabled.add(r);
        correctCount++;
      } else {
        newWrong.add(l);
        newWrong.add(r);
      }
    }

    setCorrectSet(newCorrect);
    setWrongSet(newWrong);
    setDisabled(newDisabled);

    if (correctCount === leftWords.length) {
      setDone(true);
      onCheck(ExerciseResult.CORRECT);
    }
  };

  const btnClass = (word: string, side: Side) => {
    let cls = "btn-match";
    if (selected?.word === word && selected?.side === side) cls += " selected";
    if (correctSet.has(word)) cls += " correct";
    else if (wrongSet.has(word)) cls += " wrong";
    return cls;
  };

  return (
    <div className="exercise-container">
      <h2 className="exercise-title">Match the pairs</h2>
      <div id='answers'>
        <div className='pairs-grid'>
        <div className="match-col">
          {leftWords.map((word: string) => (
            <button
              key={word}
              className={btnClass(word, "left")}
              disabled={disabled.has(word)}
              onClick={() => handleClick(word, "left")}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rightWords.map((word: string) => (
            <button
              key={word}
              className={btnClass(word, "right")}
              disabled={disabled.has(word)}
              onClick={() => handleClick(word, "right")}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
