import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=afaf0fe8e7d868e576eefaa527b2bde7&units=metric`
      );

setWeatherData(response.data);
     } catch (error) {
       console.error(error);
     }
   };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

return (
    <div className='app'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} />
      <button onClick={getWeather}>Weather report</button>

      {weatherData && (
        <div>
          <div className='weather'>
            <h2>{weatherData.name}</h2>
            <div className="date">{dateBuilder(new Date())} </div>
             <p2>Current Time: {currentTime}</p2>  
     
          </div>
          <div className='weather-details'>

            <div className='temperature'>
              <p1>Temperature: {weatherData.main.temp}°C </p1></div>
              </div>
            <div className='weather-report'>
              <div className='parametrs'>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Pressure: {weatherData.main.pressure} hPa </p>
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
                <p>Visibility: {weatherData.visibility}km</p>
                <p>Clouds:{weatherData.clouds.all}</p>
                <p>Wind:{weatherData.wind.speed}mi/hr</p>
          


              </div>
            </div>
</div>
      )}
    </div>
  );
}

export default Weather;