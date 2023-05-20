//function to format the date
function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[date.getDay()];
    let hours = String(date.getHours()).padStart(2, `0`);
    let minutes = String(date.getMinutes()).padStart(2, `0`);
    let time = `${hours}:${minutes}`;
    return `${day} ${time}`;
  }

//function to amend weather stats
function showWeather(response) {
    celsiusTemp = Math.round(response.data.temperature.current);
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#current-temp").innerHTML = celsiusTemp;
    document.querySelector("#current-description").innerHTML = response.data.condition.description;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    let today = new Date(response.data.time * 1000);
    let now = document.querySelector("#current-day").innerHTML = formatDate(today);
    let iconElement = document.querySelector("#current-emoji");
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
    iconElement.setAttribute("alt", `${response.data.condition.icon}`);
}
//amends url then instructs to run function to amend weather stats
function searchCity(city) {
    let api = "aa56f014o9bf10caa03ebda1c6dfte85";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${api}&units=metric`;
    axios.get(url).then(showWeather);
}
//runs searchCity function based on the value of the users input
function submitCity(event) {
    event.preventDefault();
    farenheit.classList.remove("active");
    let userInput = document.querySelector("#user-input").value;
    searchCity(userInput);
}
let userSubmit = document.querySelector("#user-submit");
userSubmit.addEventListener("submit", submitCity);


function showFarenheit(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    farenheit.classList.add("active");
    document.querySelector("#current-temp").innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function showCelsius(event) {
    event.preventDefault();
    celsius.classList.add("active");
    farenheit.classList.remove("active");
    document.querySelector("#current-temp").innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

searchCity("Tokyo");