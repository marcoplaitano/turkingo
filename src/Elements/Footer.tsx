import '../style/Footer.css'

import { createRoot } from "react-dom/client"

createRoot(document.getElementById("footer")!).render(
  <>
    <footer>
      <hr />
      <div>
        <span id="footer-logo">
          <img src="/favicon/title-icon.png" alt="icon" id="icon" />
          TürKingo
        </span>
        <span translate="no">© 2026 Marco Plaitano</span>
      </div>
    </footer>
  </>
)
