interface PropsEndOfLesson {
  onDone: (done: boolean) => void;
}

export default function EndOfLesson({ onDone }: PropsEndOfLesson) {
  return (
    <>
      <h2>Lesson completed!</h2>
      <div className="exercise-buttons">
        <button
          className="btn btn-next"
          onClick={() => onDone(false)}
        >
          Next lesson
        </button>
      </div>
    </>
  );
}
