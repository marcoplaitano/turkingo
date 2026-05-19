import { LanguageItemData, ExerciseResult } from "../globals";

interface PropsExerciseFillBlanks {
  inputData: LanguageItemData[];
  onCheck: (result: ExerciseResult) => void;
  skipped: boolean;
}

export default function ExerciseFillBlanks({ inputData, onCheck, skipped }: PropsExerciseFillBlanks) {
  return (<>
    <div className="exercise-container">
      <h2 className="exercise-title">Fill in the blanks</h2>
    </div>
  </>);
}
