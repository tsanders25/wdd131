const sheetInput = document.getElementById("sheet-title");
const createStudyBuddyBtn = document.getElementById("add-study-buddy-btn");
const listElement = document.getElementById("list");

let studyBuddySheet = getStudyBuddyList() || [];

/*---Local storage creator---*/
function setStudyBuddyList() {
    localStorage.setItem("savedSheets", JSON.stringify(studyBuddySheet));
}

/*---Local storage retriever---*/
function getStudyBuddyList() {
    return JSON.parse(localStorage.getItem("savedSheets"));
}

/*--- Creates a Loop to see sheets; prevents crash---*/
studyBuddySheet.forEach(sheet => {
    if (sheet) {
        displayList(sheet);
    }
});

createStudyBuddyBtn.addEventListener("click", () => {
    const userTypedName = sheetInput.value.trim();
    if (userTypedName === "") {
        alert("Please enter Study Buddy title!")
        return
    }

    const uniqueSheet = {
        id: Date.now(),
        name: userTypedName,
        entry: []
    };

    studyBuddySheet.push(uniqueSheet);

    setStudyBuddyList();
    displayList(uniqueSheet);
    sheetInput.value = "";
    sheetInput.focus();

});

function displayList(studyBuddyObject) {
    let li = document.createElement("li");

    let nameText = document.createTextNode(studyBuddyObject.name);
    li.appendChild(nameText);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete");

    li.appendChild(deleteButton);
    listElement.appendChild(li);

    let entryListUI = document.createElement("ul");
    entryListUI.classList.add("entry-list");

    if (studyBuddyObject.entry) {
        studyBuddyObject.entry.forEach(savedEntry => {
            let entryLi = document.createElement("li");
            entryLi.textContent = savedEntry;

            let entryDeleteBtn = document.createElement("button");
            entryDeleteBtn.textContent = "❌";
            entryDeleteBtn.classList.add("delete-entry");

            entryDeleteBtn.addEventListener("click", function () {
                entryListUI.removeChild(entryLi);
                studyBuddyObject.entry = studyBuddyObject.entry.filter(name => name !== savedEntry);
                setStudyBuddyList();
            });
            entryLi.appendChild(entryDeleteBtn);
            entryListUI.appendChild(entryLi);
        });
    }

    let entryInput = document.createElement("input");
    entryInput.type = "text";
    entryInput.placeholder = "Copy and Paste Study Buddy Here!"

    let addEntryBtn = document.createElement("button");
    addEntryBtn.textContent = "Add Study Buddy";

    li.appendChild(entryInput);
    li.appendChild(addEntryBtn);
    li.appendChild(entryListUI);

    entryInput.addEventListener("paste", (e) => {
        const pastedData = (e.clipboardData || window.clipboardData).getData("text");
        
        if (pastedData.includes("\t") || pastedData.includes("\n")) {
        e.preventDefault();

        const rows = pastedData.trim().split("\n");

        rows.forEach(row => {
            const columns = row.split("\t");
            if (columns.length >= 2) {
                const formatted = `Q: ${columns[0].trim()} | A: ${columns[1].trim()}`;
                if (!studyBuddyObject.entry) studyBuddyObject.entry = [];
                studyBuddyObject.entry.push(formatted);

                let entryLi = document.createElement("li");
                entryLi.textContent = formatted;
                let entryDeleteBtn = document.createElement("button");
                entryDeleteBtn.textContent = "❌";
                entryDeleteBtn.classList.add("delete-entry");

                entryDeleteBtn.addEventListener("click", function () {
                    entryListUI.removeChild(entryLi);
                    studyBuddyObject.entry = studyBuddyObject.entry.filter(name => name !== formatted);
                    setStudyBuddyList();
                });
                entryLi.appendChild(entryDeleteBtn);
                entryListUI.appendChild(entryLi);
            }
        });
        setStudyBuddyList();
        }
    
    })

    addEntryBtn.addEventListener("click", () => {
        const entryName = entryInput.value.trim();

        if (entryName === "") {
            alert("Please copy and paste questions and answers.");
            return
        }

        if (!studyBuddyObject.entry) {
            studyBuddyObject.entry = [];
        }

        studyBuddyObject.entry.push(entryName);

        setStudyBuddyList();

        let entryLi = document.createElement("li");
        entryLi.textContent = entryName;

        let entryDeleteBtn = document.createElement("button");
        entryDeleteBtn.textContent = "❌";
        entryDeleteBtn.classList.add("delete-entry");

        entryDeleteBtn.addEventListener("click", function () {
            entryListUI.removeChild(entryLi);
            studyBuddyObject.entry = studyBuddyObject.entry.filter(name => name !== entryName);
            setStudyBuddyList();
        });
        entryLi.appendChild(entryDeleteBtn);
        entryListUI.appendChild(entryLi);

        entryInput.value = "";
        entryInput.focus();
    });

    deleteButton.addEventListener("click", function () {
        listElement.removeChild(li);
        deleteStudyBuddy(studyBuddyObject.id);
    });
}

function deleteStudyBuddy(sheetId) {
    studyBuddySheet = studyBuddySheet.filter(sheet => sheet.id !== sheetId);
    setStudyBuddyList();
}

