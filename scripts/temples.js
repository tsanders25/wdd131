// hamburger menu
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


// footer 
const lastModified = document.lastModified;
document.querySelector("#lastModified").textContent = `Last Modified: ${lastModified}`;