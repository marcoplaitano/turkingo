INPUT_DATA = []

function showElements(type) {
    let tableContainer = document.getElementById("table-" + type + "s-body");
    tableContainer.innerHTML = INPUT_DATA
        .filter(item => item.getType() === type)
        .map(item => `<tr class="entry">
    <td class="l-en">${item.getLanguageEN()}</td> <td class="l-tr">${item.getLanguageTR()}</td></p>
</tr>`)
        .join('');
}

async function showInputData() {
    const dataRes = await fetch("/data/language_data.json");
    jsonData = await dataRes.json();
    INPUT_DATA = jsonData.map(item => new LanguageItemData(item));
    showElements("word");
    showElements("phrase");
    showElements("sentence");
}

showInputData();