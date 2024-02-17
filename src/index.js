function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature-current");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#weather-info-city");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector("#weather-info-country");
  countryElement.innerHTML = response.data.country;

  let descriptionElement = document.querySelector("#details-description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#details-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;

  let windSpeedElement = document.querySelector("#details-wind");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let timeElement = document.querySelector("#details-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Pasadena");
