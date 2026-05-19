import { LanguageItemData, ExerciseResult } from "../globals";

interface PropsExerciseMatchTranslation {
  inputData: LanguageItemData[];
  onCheck: (result: ExerciseResult) => void;
  skipped: boolean;
}

export default function ExerciseMatchTranslation({ inputData, onCheck, skipped }: PropsExerciseMatchTranslation) {
  return (<>
    <div className="exercise-container">
      <h2 className="exercise-title">Match Translation</h2>
    </div>
  </>);
}
