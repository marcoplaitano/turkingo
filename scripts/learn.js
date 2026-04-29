INPUT_DATA = []

function showElements(type) {
    let container = document.getElementById("container-" + type);
    console.log("container:", container);
    container.innerHTML = INPUT_DATA
      .filter(item => item.type === type)
      .map(item => `
        <div class="entry">
          <p><strong>Italian:</strong> xCAS</p>
          <p><strong>English:</strong> sa</p>
        </div>
      `)
      .join('');
}

async function showInputData() {
    const dataRes = await fetch("/data/language_data.json");
    INPUT_DATA = await dataRes.json();
    
    data = new LanguageItemData(randomItem(INPUT_DATA));
    showElements("words");
}

console.log("ciao");
showInputData();