/*MODELED AFTER CODEPEN | CURRENT YEAR*/
const currentyear = document.querySelector("#currentyear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


lastmodified = document.getElementById("lastModified").innerHTML = document.lastModified;
