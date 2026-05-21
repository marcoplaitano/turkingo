import '../style/ButtonNext.css'

import { ExerciseResult, ExerciseResultID } from '../globals';

interface PropsButtonNext {
  status: ExerciseResult;
  onNext: () => void;
}

export default function ButtonNext({status, onNext}: PropsButtonNext) {
  return (
  <div className="exercise-buttons">
    <button
      className="btn btn-next"
      id={ExerciseResultID[status]}
      onClick={() => onNext()}
    >
      Next
    </button>
  </div>
  );
}
