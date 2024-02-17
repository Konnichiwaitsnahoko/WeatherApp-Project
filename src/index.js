function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature-current");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#weather-info-city");
  cityElement.innerHTML = response.data.city;
  let countryElemnt = document.querySelector("#weather-info-country");
  countryElemnt.innerHTML = response.data.country;
  let descriptionElement = document.querySelector("#details-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let 
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
