interface PropsEndOfLesson {
  onDone: (done: boolean) => void;
}

export default function EndOfLesson({ onDone }: PropsEndOfLesson) {
  return (
    <>
      <h2 className="exercise-title">Lesson completed!</h2>
      <p className="exercise-question">Be a great man. Practice makes perfect!</p>
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
