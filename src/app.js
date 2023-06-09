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

//function to format forcast day timestamp
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",];
    let day = days[date.getDay()];
    return `${day}`;
}

//function to display forecast
function displayForecast(response) {
    let day = response.data.daily;
    let forecastRow = document.querySelector("#forecast");
    let forecastHtml = `<div class="futureWeather row">`;
    day.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `<div class="col">
      <div class="forecastPreview">
          <div class="forecast-day">${formatDay(forecastDay.time)}</div>
          <div>
              <img src="${
                forecastDay.condition.icon_url
              }" alt="" id="forecast-emoji-0" class="forecast-emoji" width="50">
          </div>
          <div class="forecastTemp">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temperature.maximum
              )}</span>° | 
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temperature.minimum
              )}</span>° 
          </div>
      </div>
  </div>`;
      }
    }),
      (forecastHtml = forecastHtml + `</div>`);
    forecastRow.innerHTML = forecastHtml;
  }
//function to call forecast api
function searchForecast(city) {
    let api = "aa56f014o9bf10caa03ebda1c6dfte85";
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${api}&units=metric`;
    axios.get(url).then(displayForecast);
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

    searchForecast(response.data.city);
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
    let userInput = document.querySelector("#user-input").value;
    searchCity(userInput);
}
let userSubmit = document.querySelector("#user-submit");
userSubmit.addEventListener("submit", submitCity);


searchCity("Tokyo");