import { useState, useRef, useEffect } from "react";
import { LanguageItemData, randomItem, normalizeTurkish, levenshtein } from "./globals";
import type {ExerciseResultType} from './globals';

interface Props {
  inputData: LanguageItemData[];
  onDone: (result: ExerciseResultType, showAnswer: () => string) => void;
}

export function ExerciseTranslation({ inputData, onDone }: Props) {
  const [checked, setChecked] = useState(false);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const exerciseRef = useRef(() => {
    const data = randomItem(inputData);
    const toTurkish = Math.random() > 0.5;
    const question = toTurkish ? data.getLanguageEN() : data.getLanguageTR();
    const answer = data.getTranslation(question).trim().toLowerCase();
    return { question, answer, toTurkish };
  });
  const { question, answer, toTurkish } = exerciseRef.current();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const check = () => {
    if (userInput.trim() === "" || checked) return;
    setChecked(true);
    const norm = normalizeTurkish(userInput.trim().toLowerCase());
    const normAns = normalizeTurkish(answer);
    const dist = levenshtein(norm, normAns);
    const isCorrect = dist === 0 || dist === 1;
    onDone(isCorrect ? "correct" : "failed", () => answer);
  };

  return (
    <div className="exercise-container">
      <h2 className="exercise-title">Translate</h2>
      <p className="exercise-question">{question}</p>
      <div className="exercise-answers">
        <input
          ref={inputRef}
          className={`translation-input ${checked ? (normalizeTurkish(userInput.trim().toLowerCase()) === normalizeTurkish(answer) || levenshtein(normalizeTurkish(userInput.trim().toLowerCase()), normalizeTurkish(answer)) === 1 ? "input-correct" : "input-wrong") : ""}`}
          placeholder="Type your translation..."
          lang={toTurkish ? "tr" : "en"}
          value={userInput}
          disabled={checked}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") check(); }}
        />
      </div>
      {!checked && (
        <div className="exercise-buttons">
          <button
            className="btn-check"
            disabled={userInput.trim() === ""}
            onClick={check}
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
}
