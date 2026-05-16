import '../style/ButtonSkip.css'

interface PropsButtonSkip {
  onSkip: () => void;
}

export default function ButtonSkip({onSkip}: PropsButtonSkip) {
  return (
    <button
      aria-label="Skip exercise" title="Skip exercise"
      className="btn btn-skip"
      onClick={() => onSkip()}
    >
      »
    </button>
  );
}
