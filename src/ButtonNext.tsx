import '../style/ButtonNext.css'

interface PropsButtonNext {
  correct: boolean;
  onNext: () => void;
}

export default function ButtonNext({correct, onNext}: PropsButtonNext) {
  return (
    <button
      className="btn btn-next"
      id={correct && "correct" || "failed"}
      onClick={() => onNext()}
    >
      Next
    </button>
  );
}
