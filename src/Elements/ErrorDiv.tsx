import '../style/ErrorDiv.css'

interface PropsErrorDiv {
  message: string;
  details: string | null;
}

export default function ErrorDiv({message, details}: PropsErrorDiv) {
  return (
    <div className='Error'>
      <p id="icon">&#x26A0;</p>
      <p>{message}</p>
      {details && <p>{details}</p>}
    </div>
  )
}
