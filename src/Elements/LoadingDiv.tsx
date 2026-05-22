import '../style/LoadingDiv.css'

export default function LoadingDiv() {
  return (
    <div className='Loading'>
      <div id="loader" className="loader">
        <div id="loader-spinner"></div>
        <p id="loader-text"></p>
      </div>
      <p>Loading...</p>
    </div>
  )
}
