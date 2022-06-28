/* let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let degrees = document.querySelector('.degrees');
let currentDate = document.querySelector('.date-now');
let currentTime = new Date();
let city = document.querySelector('.searched-city');
let cityInput = document.querySelector('.form-control');
let currentCity = document.querySelector('.change-city-button');
let apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
let apiKey = '98f5a37ff9ffddbb3334ee960c2d442a';
let units = 'metric';
let buttonGeolocation = document.querySelector('.button-current-city');

function formatDate(date) {

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} | ${hours} : ${minutes}`;
  return formattedDate;
}

currentDate.innerHTML = formatDate(currentTime);

function searchedCityLocation() {
  let temperatureSearchedCity = `${apiUrl}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(temperatureSearchedCity).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  degrees.innerHTML = temperature;
}

function searchedCity() {
  
  let inputCity = cityInput.value.trim();
  inputCity = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
  city.innerHTML = inputCity;
  searchedCityLocation();
}

currentCity.addEventListener('click', searchedCity);

function showCurrentPosition(position) {
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiCurrentPosition = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiCurrentPosition).then(apiResponseHandler);
  
}

function apiResponseHandler(response) {
  let temperatureCurrentCity = Math.round(response.data.main.temp);
  degrees.innerHTML = temperatureCurrentCity;
  let currentCityName = response.data.name;
  city.innerHTML = currentCityName;
  
}

function showGeolocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

buttonGeolocation.addEventListener('click', showGeolocation); */


function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[dayIndex];

  return `${day} | ${hours}:${minutes}`;
}

let dateElement = document.querySelector('#date');
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  console.log(response.data.weather[0]);
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
  document.querySelector('#description').innerHTML = response.data.weather[0].main;
}

function searchedCity(city) {
  let apiKey = '98f5a37ff9ffddbb3334ee960c2d442a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('#city-input').value;
  searchedCity(city);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);

function searchLocation(position) {
  let apiKey = '98f5a37ff9ffddbb3334ee960c2d442a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector('#current-location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

/* function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
} */

/* function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
 */