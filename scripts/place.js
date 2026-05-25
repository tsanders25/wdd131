/*Get Dates*/
const currentyear = document.querySelector("#currentyear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


lastmodified = document.getElementById("lastModified").innerHTML = document.lastModified;

/*Weather Conditions*/

let temperature = 20;
let windSpeed = 6;

let windChill;

const calculateWindChill = (t, s) => 35.74 + (0.6215 * t) - 35.75 * Math.pow(s, 0.16) + (0.4275 * t * Math.pow(s, 0.16));

if (temperature <= 50 && windSpeed > 3) {
    windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + "°F"
} 
else {
    windChill = "N/A"
};

document.getElementById("wind-chill").textContent = windChill;

