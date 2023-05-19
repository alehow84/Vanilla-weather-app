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
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#current-temp").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#current-description").innerHTML = response.data.condition.description;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    let today = new Date(response.data.time * 1000);
    let now = document.querySelector("#current-day").innerHTML = formatDate(today);
    let iconElement = document.querySelector("#current-emoji");
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
    iconElement.setAttribute("alt", `${response.data.condition.icon}`);
}


let api = "aa56f014o9bf10caa03ebda1c6dfte85";
let searchCity = "Lisbon";
let url = `https://api.shecodes.io/weather/v1/current?query=${searchCity}&key=${api}&units=metric`;
axios.get(url).then(showWeather);