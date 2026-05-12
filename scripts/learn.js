INPUT_DATA = []

function showElements(type) {
    let listContainer = document.getElementById("list-" + type + "s-body");
    listContainer.innerHTML = INPUT_DATA
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

function checkItem(input, item) {
    if (input.length == 0)
        return true;
    let en = normalizeTurkish(item.getElementsByTagName("td")[0].textContent.toLowerCase());
    let tr = normalizeTurkish(item.getElementsByTagName("td")[1].textContent.toLowerCase());
    return en.includes(input) || tr.includes(input);
}

function search() {
    const searchString = normalizeTurkish(document.getElementById("search-input").value.toLowerCase());
    const lists = document.querySelectorAll(".list");
    const numLists = lists.length;
    let numListsHidden = 0;
    for (list of lists) {
        const listID = list.id;
        const items = list.getElementsByTagName("tr");
        let foundAtLeastOne = false;
        for (item of items) {
            if (checkItem(searchString, item)) {
                item.style.display = "";
                foundAtLeastOne = true;
            }
            else {
                item.style.display = "none";
            }
        }
        // Hide empty lists.
        if (!foundAtLeastOne) {
            list.closest(".section").style.display = "none";
            numListsHidden++;
        }
        else {
            list.closest(".section").style.display = "";
        }
    }
    if (numListsHidden == numLists) {
        document.getElementById("no-result-p").style.display = "";
    } else {
        document.getElementById("no-result-p").style.display = "none";
    }
}

// Listen ENTER key press: hide keyboard on mobile.
document.getElementById("search-input").addEventListener("keypress", function (event) {
    const query = this.value.trim();
    const key = event.code || event.keyCode;
    if (key === "Enter" || key === 13)
        this.blur();
});

showInputData();
