const apiKey = "fcdfa15c4c974c922d405aadc067bb0e";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim(); // Trim to remove extra spaces
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "❗ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found or API issue");
      }
      return response.json();
    })
    .then((data) => {
      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>🕐 Timezone: UTC ${data.timezone / 3600}</p>
      `;
      resultDiv.innerHTML = weather;
    })
    .catch((error) => {
      console.error(error); // Log error to console for debugging
      resultDiv.innerHTML = "❌ Error: " + error.message;
    });
}

