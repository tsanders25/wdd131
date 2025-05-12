const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;


const lastModified = document.lastModified;
document.querySelector("#lastModified").textContent = `Last Modified: ${lastModified}`;