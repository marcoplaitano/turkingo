/////////////////////// ADD NEW DATA

function showResult(msg) {
    const el = document.getElementById("add-result-p");
    el.innerHTML = msg;
    el.style.display = "";
}

function getSelectedType() {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected)
        return null;
    return selected.value;
}

async function addData() {
    const id = INPUT_DATA.length + 1;
    const langEN = document.getElementById("input-en").value.trim().toLowerCase();
    const langTR = document.getElementById("input-tr").value.trim().toLowerCase();
    const type = getSelectedType();
    if (!type || !langEN || !langTR) {
        showResult("Missing data! Not added.");
        return;
    }
    const item = {id: id, "l-EN": langEN, "l-TR": langTR, type: type};
    let isAlreadyThere = false;
    INPUT_DATA.forEach(data => {
        if (data.langEN == langEN && data.langTR == langTR) {
            isAlreadyThere = true;
            return;
        }
    });
    if (isAlreadyThere) {
        showResult("Item already in the database!");
        return;
    }
    await DB_CLIENT.from(DB_TABLE_NAME).insert(item);
    showResult("Added " + type + " '" + langEN + "' -> '" + langTR + "'.");
    await showInputData();
}


/////////////////////// READ AND SHOW DATA
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

async function loadInputData() {
    const db_data = await DB_CLIENT.from(DB_TABLE_NAME).select("*");
    if (db_data.status !== 200) {
        console.log("STATUS:", db_data.status);
        console.log("ERROR:", db_data.error);
        console.log("STATUS TEXT:", db_data.statusText);
        throw new Error("Could not load data from DB.");
    }
    INPUT_DATA = db_data.data.map(item => new LanguageItemData(item));
}

async function showInputData() {
    document.getElementById("search-input").disabled = true;
    await loadInputData();
    showElements("word");
    showElements("phrase");
    showElements("sentence");
    document.getElementById("search-input").disabled = false;
}

function checkItem(input, item) {
    if (input.length == 0)
        return true;
    let en = normalizeTurkish(item.getElementsByTagName("td")[0].textContent.toLowerCase());
    let tr = normalizeTurkish(item.getElementsByTagName("td")[1].textContent.toLowerCase());
    return en.includes(input) || tr.includes(input);
}

function search() {
    document.getElementById("add-result-p").style.display = "none";
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
