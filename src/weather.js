// 날씨 openweathermap.org
const API_KEY = "adb3d809656bf4e5e9326d35a352d828";

function onGeoSuccess(position) {
  // 사용자의 위도, 경도
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}°`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you");
}

// https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

// 날씨에 따라 배경 변경
// function changeBg(data) {
// }
