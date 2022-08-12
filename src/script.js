let apiKey = "ca62161fa9c037c12a181a9e71f2e8ab";

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
newDate.innerHTML = `${day} ${date} ${month} ${hour}:${minute}`;

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  if (response.data.name === "Altstadt") {
    document.querySelector(".city").innerHTML = "Munich";
  }
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".pressure").innerHTML = response.data.main.pressure;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let searchForm = document.querySelector(".city-form");
searchForm.addEventListener("submit", handleSubmitButton);

let currentCityButton = document.querySelector(".current-city");
currentCityButton.addEventListener("click", getCurrentLocation);

searchCity("Munich");
