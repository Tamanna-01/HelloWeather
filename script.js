document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-box button');
  const container = document.querySelector('.container');
  const weatherBox = document.querySelector('.weather-box');
  const weatherDetails = document.querySelector('.weather-details');

  searchButton.addEventListener('click', async function() {
    const city = document.getElementById('city').value;
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'add your api key',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      weatherBox.style.visibility = 'visible';
      weatherDetails.style.visibility = 'visible';

      container.classList.remove('small');

      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph / 3.6;

      const isDay = data.current.is_day;
      const body = document.body;
      body.style.backgroundImage = isDay ? 'url(images/day_bg.png)' : 'url(images/night_bg.png)';
      body.style.backgroundSize = 'cover';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundPosition = 'center';

      const image = document.querySelector('.weather img');
      if (description.includes('clear') || description.includes('sun') || description.includes('sunny')) {
        image.src = "images/sunny.png";
      } else if (description.includes('cloud') || description.includes('cloudy')) {
        image.src = "images/cloudy.png";
      } else if (description.includes('rain') || description.includes('rainy')) {
        image.src = "images/rainy.png";
      } else if (description.includes('snow') || description.includes('snowy')) {
        image.src = "images/snowy.png";
      } else if (description.includes('mist') || description.includes('haze') || description.includes('fog')) {
        image.src = "images/misty.png";
      }

      document.querySelector('.temperature').textContent = `${temperature}°C`;
      document.querySelector('.description').textContent = description;
      document.querySelector('.humidity span').textContent = `${humidity}%`;
      document.querySelector('.wind span').textContent = `${windSpeed.toFixed(2)} m/s`;

      speak(city, temperature, humidity);
    } catch (error) {
      console.error(error);
    }
  });
});

function speak(city, temperature, humidity) {
  const text = `The current temperature of ${city} is ${temperature} degrees Celcius, and the current humidity of ${city} is ${humidity} percent`;
  const speech = new SpeechSynthesisUtterance(text);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
