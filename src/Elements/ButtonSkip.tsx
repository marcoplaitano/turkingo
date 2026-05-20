import '../style/ButtonSkip.css'

interface PropsButtonSkip {
  enabled: boolean;
  onSkip: () => void;
}

export default function ButtonSkip({enabled, onSkip}: PropsButtonSkip) {
  return (
    <button
      aria-label="Skip exercise" title="Skip exercise"
      className="btn btn-skip"
      onClick={() => onSkip()}
      disabled={!enabled}
    >
      »
    </button>
  );
}
