
const inputElement = document.querySelector("#favchap");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("#list");


/*buttonElement.addEventListener("click", function () {

    if (inputElement.value != "") {
        const li = document.createElement("li");
        li.textContent = inputElement.value;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", function () {
            listElement.removeChild(li);
            inputElement.focus();
        });
       
        li.appendChild(deleteBtn);

        listElement.appendChild(li);

        inputElement.value = "";
    }

    inputElement.focus();
});*/
    
/*------- local storage ---------*/
let chaptersArray = getChaptersList() || [];
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

buttonElement.addEventListener("click", () => {
    if (inputElement.value != '') {
        displayList(inputElement.value);
        chaptersArray.push(inputElement.value);
        setChapterList();
        inputElement.value = '';
        inputElement.focus();
    }
});

function displayList(item) {
    let li = document.createElement("li");
    let deleteButton = document.createElement("button");
    li.textContent = item; 
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete");
    li.append(deleteButton);
    listElement.append(li);
    deleteButton.addEventListener("click", function () {
        listElement.removeChild(li);
        deleteChapter(li.textContent);
        inputElement.focus();
    });
}

function setChapterList() {
    localStorage.setItem("myFavBOMList", JSON.stringify(chaptersArray));
}

function getChaptersList() {
    return JSON.parse(localStorage.getItem("myFavBOMList"));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}