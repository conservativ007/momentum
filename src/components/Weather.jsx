import React, { useEffect, useRef, useState } from 'react';
import { getWeather } from '../functions/getWeather';
import "../styles/owfont-regular.css";
import "../styles/weather.css";
import ForecastDaily from './ForecastDaily';

const Weather = () => {

  let [weather, setWeather] = useState([]);
  let [isShowFutureWeather, setIsShowFutureWeather] = useState(false);

  let ref = useRef(null);

  let [temp, setTemp] = useState(0);
  let [icon, setIcon] = useState(0);
  let [city, setCity] = useState("");

  useEffect(() => {
    getWeather("currentDay")
    .then(data => data.json())
    .then(data => setWeather(data))
  }, [getWeather]);

  useEffect(() => {
    if(weather.length === 0) return;
    setTemp(Math.round(weather.main.temp));
    setIcon(weather.weather[0].id);
    setCity(weather.name);
  }, [weather])


  useEffect(() => {
    if(isShowFutureWeather === true){
      ref.current.style.opacity = 1;
    } else {
      ref.current.style.opacity = 0;
    }
  }, [isShowFutureWeather]);



  return (
    <div className="weather">
      <div onClick={() => setIsShowFutureWeather(!isShowFutureWeather)} className="weather-current">
        <div className="weather-current__day">
          <i className={`owf owf-${icon}-d owf-2x`}></i>
          <div className="weather-temp">{temp}°</div>
        </div>
        <div className="weather-current__city">{city}</div>
      </div>
      <div ref={ref} className="weather-forecast">
        <ForecastDaily city={city} />
      </div>
      
    </div>
  );
}

export default Weather;
