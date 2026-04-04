const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/:city', auth, async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) return res.status(400).json({ message: 'City not found' });

    const weather = {
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon
    };

    // Risk based on weather
    let weatherRisk = 'Low';
    if (['Thunderstorm', 'Storm'].includes(weather.condition)) weatherRisk = 'High';
    else if (['Rain', 'Drizzle', 'Fog', 'Mist'].includes(weather.condition)) weatherRisk = 'Medium';
    else if (weather.temp > 40) weatherRisk = 'High';
    else if (weather.temp < 5) weatherRisk = 'Medium';

    res.json({ ...weather, weatherRisk });
  } catch (err) {
    res.status(500).json({ message: 'Weather fetch failed', error: err.message });
  }
});

module.exports = router;