import { LanguageItemData, ExerciseResult } from "../globals";

interface PropsExerciseReorderSentence {
  inputData: LanguageItemData[];
  onCheck: (result: ExerciseResult) => void;
  skipped: boolean;
}

export default function ExerciseReorderSentence({ inputData, onCheck, skipped }: PropsExerciseReorderSentence) {
  return (<>
    <div className="exercise-container">
      <h2 className="exercise-title">Reorder Sentence</h2>
    </div>
  </>);
}
