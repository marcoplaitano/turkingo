import '../style/Loader.css'

interface LoaderProps {
  text?: string;
}

export default function Loader({ text }: LoaderProps) {
  return (
    <div className="Loader">
      <div id="spinner"></div>
      <p id="loader-text">{text}</p>
    </div>
  )
}
