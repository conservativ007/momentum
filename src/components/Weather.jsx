import React, { useEffect, useState } from 'react';
import { getWeather } from '../functions/getWeather';
import "../styles/owfont-regular.css";
import "../styles/weather.css";



const Weather = () => {

  let [weather, setWeather] = useState([]);

  let [temp, setTemp] = useState(0);
  let [icon, setIcon] = useState(0);
  let [city, setCity] = useState("");

  useEffect(() => {
    let promise = getWeather()
    .then(data => data.json())
    .then(data => setWeather(data))
  }, [getWeather]);

  useEffect(() => {
    if(weather.length === 0) return;
    setTemp(Math.ceil(weather.main.temp));
    setIcon(weather.weather[0].id);
    setCity(weather.name);
  }, [weather])

  useEffect(() => {
    console.log(weather)
  }, [weather])


  return (
    <div className="weather">
      <div className="weather-current">
        <i className={`owf owf-${icon}-d owf-2x`}></i>
        <div className="weather-temp">{temp}°</div>
      </div>
      <div className="weather-city">{city}</div>
    </div>
  );
}

export default Weather;
