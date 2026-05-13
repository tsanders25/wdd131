/*Get Dates*/
const currentyear = document.querySelector("#currentyear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


lastmodified = document.getElementById("lastModified").innerHTML = document.lastModified;


/*hamburger button*/

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation")

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});