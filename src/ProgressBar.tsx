import '../style/ProgressBar.css'

interface PropsProgressBar {
  currNum: number;
  result: boolean | null;
}

export default function ProgressBar({ currNum, result }: PropsProgressBar) {
  return (
    <div id="progress-container">
      <div id="progress-bar"></div>
      <span id="progress-label"></span>
    </div>
  );
}
