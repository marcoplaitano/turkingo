import { useState } from "react";

export default function PageLearn() {
  const [showNoResults, setShowNoResults] = useState(false);
  const [showAddResult, setShowAddResult] = useState(false);

  function search() {

  }

  function addData() {

  }

  return (
    <>
      <main>
        <article>
          <h1>Learn</h1>

          <h2>Add new data</h2>
          <div className="add-item-container">
            <input type="text" id="input-en" placeholder="English..." />
            <input type="text" id="input-tr" placeholder="Turkish..." />
            <div className="radio-container">
              <label className="radio-item"><input type="radio" name="choice" value="word" />Word</label>
              <label className="radio-item"><input type="radio" name="choice" value="phrase" />Phrase</label>
              <label className="radio-item"><input type="radio" name="choice" value="sentence" />Sentence</label>
            </div>
            <button className="btn" id="btn-add" onClick={addData}>Add</button>
            {showAddResult && <p id="add-result-p"></p>}
          </div>

          <h2>Search data</h2>
          <div className="search-container">
            <input type="text" maxLength={40} placeholder="Search..." autoComplete="off" onChange={search} id="search-input" />
          </div>

          {showNoResults && <p id="no-result-p">No results.</p>}

          <div className="section">
            <h3>Words</h3>
            <div className="list-wrapper">
              <table id="list-words">
                <thead><tr><th>English</th><th>Turkish</th></tr></thead>
                <tbody className="list" id="list-words-body"></tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <h3>Phrases</h3>
            <div className="list-wrapper">
              <table id="list-phrases">
                <thead><tr><th>English</th><th>Turkish</th></tr></thead>
                <tbody className="list" id="list-phrases-body"></tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <h3>Sentences</h3>
            <div className="list-wrapper">
              <table id="list-sentences">
                <thead><tr><th>English</th><th>Turkish</th></tr></thead>
                <tbody className="list" id="list-sentences-body"></tbody>
              </table>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
