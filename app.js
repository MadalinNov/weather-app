///////variables
const API_KEY = "12b52b24bc1a6216265caac249d0fc88";
const temperature = document.getElementById("temperature");
const city = document.getElementById("location");
const search = document.getElementById("search-field");
const form = document.querySelector("form");
const condition = document.getElementById("condition");
const bg = document.getElementById("bg");
const feelsLike = document.getElementById("temp");
const button = document.querySelector("button");
const condArr = ["Clear", "Rain", "Snow", "Clouds"];
let finalLocation = "";
/////functions
const getInputValue = () => {
  finalLocation = search.value;
};
////////events
button.addEventListener("click", getInputValue);
const getWeather = async () => {
  const info = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${finalLocation}&appid=${API_KEY}`
  ).then((response) => {
    return response.json();
  });
  const temp = info.main.temp - 273.15;
  temperature.innerHTML = Math.floor(temp) + "°";
  const fTemp = info.main.feels_like - 273.15;
  feelsLike.innerHTML = "Feels like:" + Math.floor(fTemp) + "°";
  city.innerHTML = info.name;
  condition.innerHTML = info.weather[0].main;
  const conditionText = condition.innerHTML;
  condArr.map((cond) => {
    if (cond === conditionText) {
      bg.style.background = `url(assets/${cond.toLowerCase()}.gif) no-repeat center center fixed`;
      bg.style.backgroundSize = "cover";
    }
  });
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
});
