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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row text-center ml-0 mr-0 mt-2 mb-2 shadow">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 card pt-2 pb-2 weather-elements">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <div class="forecast-icon mt-1 mb-1">
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="44">
          </div>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '98f5a37ff9ffddbb3334ee960c2d442a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector('#city').innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  windMetric = Math.round(response.data.wind.speed);

  document.querySelector('#description').innerHTML = response.data.weather[0].description;
  document.querySelector('#icon').setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
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

function searchLocation(position) {
  let apiKey = '98f5a37ff9ffddbb3334ee960c2d442a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  
  let temperatureElement = document.querySelector('#temperature');
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let windElement = document.querySelector('#wind');
  let windImperial = windMetric * 0.62137;
  windElement.innerHTML = `${Math.round(windImperial)} mph`;
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');

  if (isCelsius){
    let temperatureMax = document.querySelectorAll('.weather-forecast-temperature-max');
    let temperatureMin = document.querySelectorAll('.weather-forecast-temperature-min');
    for (let i = 0; i < temperatureMax.length; i++) {
      let temperatureFahrenheitMax = (parseInt(temperatureMax[i].innerText) * 9) / 5 + 32;
      temperatureMax[i].innerHTML = `${Math.round(temperatureFahrenheitMax)}°`;
    }

    for (let i = 0; i < temperatureMin.length; i++) {
      let temperatureFahrenheitMin = (parseInt(temperatureMin[i].innerText) * 9) / 5 + 32;
      temperatureMin[i].innerHTML = `${Math.round(temperatureFahrenheitMin)}°`;
    }

    isCelsius = !isCelsius;
  }
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector('#temperature');
  let windElement = document.querySelector('#wind');

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = `${Math.round(windMetric)} km/h`;
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  
  if (!isCelsius) {
    let temperatureMax = document.querySelectorAll('.weather-forecast-temperature-max');
    let temperatureMin = document.querySelectorAll('.weather-forecast-temperature-min');

    for (let i = 0; i < temperatureMax.length; i++) {
      let temperatureCelsiusMax = (parseInt(temperatureMax[i].innerText) - 32) * 5/9;
      temperatureMax[i].innerHTML = `${Math.round(temperatureCelsiusMax)}°`;
    }

    for (let i = 0; i < temperatureMin.length; i++) {
      let temperatureCelsiusMin = (parseInt(temperatureMin[i].innerText) - 32) * 5/9;
      temperatureMin[i].innerHTML = `${Math.round(temperatureCelsiusMin)}°`;
    }
    isCelsius = !isCelsius;
  }
}

let dateElement = document.querySelector('#date');
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);

let currentLocationButton = document.querySelector('#current-location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusTemperature = null;
let windMetric = null;
let isCelsius = true;

let celsiusLink = document.querySelector('#celcius-link');
celsiusLink.addEventListener('click', displayCelsiusTemperature);

searchedCity('Kharkiv');


