//b40b135798f82a05aed08769f9275f50

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let newDate = document.querySelector(".today-date");
newDate.innerHTML = `${day} <br> ${month}, ${date} ${hour}:${minute}`;

function getForecast(coordinates) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function searchCity(city) {
  let apiKey = "f6b96cb42318daf27f140a4392bf519f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".today-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".pressure").innerHTML = response.data.main.pressure;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector(".icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(".icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );

  getForecast(response.data.coord);
}

function handleSubmitButton(event) {
  event.preventDefault();
  let city = document.querySelector(".text-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "f6b96cb42318daf27f140a4392bf519f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  document.querySelector(".today-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  document.querySelector(".today-temp").innerHTML =
    Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row week"> <div class="card-group">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `          
      <div class="col-2">
        <div class="card-transparent">
          <div class="card-body">
            <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="icon">
            <p class="card-text"> <strong>Max: </strong>${Math.round(
              forecastDay.temp.max
            )}° <strong>Min: </strong>${Math.round(forecastDay.temp.min)}°</p>
          </div>
        </div>
      </div>  
    `;
    }
  });

  forecastHTML = forecastHTML + `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

let celsiusTemperature = null;

let searchForm = document.querySelector(".city-form");
searchForm.addEventListener("submit", handleSubmitButton);

let currentCityButton = document.querySelector(".current-city");
currentCityButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", showCelsius);

searchCity("Munich");
