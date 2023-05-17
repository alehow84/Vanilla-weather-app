//function to amend weather stats
function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#current-temp").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#current-description").innerHTML = response.data.condition.description;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
}


let api = "aa56f014o9bf10caa03ebda1c6dfte85";
let searchCity = "Tokyo";
let url = `https://api.shecodes.io/weather/v1/current?query=${searchCity}&key=${api}&units=metric`;
axios.get(url).then(showWeather);