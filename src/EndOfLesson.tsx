interface PropsEndOfLesson {
  onDone: (done: boolean) => void;
}

export default function EndOfLesson({ onDone }: PropsEndOfLesson) {
  return (
    <>
      <h2>End Of Lesson</h2>
      <button
        className="btn btn-next"
        onClick={() => onDone(false)}
      >
        Next
      </button>
    </>
  );
}
