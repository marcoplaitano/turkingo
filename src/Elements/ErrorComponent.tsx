import '../style/ErrorDiv.css'

interface PropsError {
  message: string;
  details: string | null;
}

export default function ErrorComponent({message, details}: PropsError) {
  return (
    <div className='Error'>
      <p id="icon">&#x26A0;</p>
      <p>{message}</p>
      {details && <p>{details}</p>}
    </div>
  )
}
