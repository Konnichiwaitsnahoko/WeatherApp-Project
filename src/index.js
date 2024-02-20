function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature-current");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-info-city");
  let countryElement = document.querySelector("#weather-info-country");
  let descriptionElement = document.querySelector("#details-description");
  let humidityElement = document.querySelector("#details-humidity");
  let windSpeedElement = document.querySelector("#details-wind");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#details-time");
  let iconElement = document.querySelector("#weather-info-temperature-icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-info-temperature-icon"/>`;

  getForecastData(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7e6535efo0b6a8aba82ctdabc0ba3974";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecastData(city) {
  let apiKey = "7e6535efo0b6a8aba82ctdabc0ba3974";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML += `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">☔</div>
    <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-highest">19° </span>
    <span class="weather-forecast-temperature-lowest"> 10°</span>
    </div>
    </div>       
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let searchInputElement = document.querySelector("#search-form-input");
searchInputElement.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearchSubmit(event);
  }
});

searchCity("Los Angeles");
