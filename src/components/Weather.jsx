import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import "../styles/owfont-regular.css";
import "../styles/weather.css";
import ForecastDaily from './ForecastDaily';

import { useSelector } from 'react-redux'

const Weather = () => {

  let [isShowFutureWeather, setIsShowFutureWeather] = useState(false);

  let ref = useRef(null);

  let [temp, setTemp] = useState(0);
  let [icon, setIcon] = useState(0);
  let [cityName, setCityName] = useState(""); 
  
  let [cityData, setCityData] = useState(JSON.parse(localStorage.getItem("city-coordinates")));

  const cityNameFromReducer = useSelector(state => state.cityNameReducer);

  useEffect(() => {
    if(cityNameFromReducer.length === 0) return;
    // console.log(cityNameFromReducer)
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityNameFromReducer}&limit=1&appid=47f560079c502e4234c3013295d529d3`)
    .then(data => {
      if(data.data.length === 0) {
        return console.warn("enter the correct city")
      }
      let {lat, lon} = data.data[0];
      
      setCityData({lat, lon});
      localStorage.setItem("city-coordinates", JSON.stringify({lat, lon}))
    })
  }, [cityNameFromReducer]);
  
  // get coords by id
  useEffect(() => {
    if(cityData === null) {
      console.log("get coords")
      axios.get("https://ipapi.co/json/")
      .then(data => {
        setCityData({lat: data.data.latitude, lon: data.data.longitude})
      })
    }
  }, [cityData]);

  useEffect(() => {
    if(cityData === null) return;
    console.log("get data")

    let {lat, lon} = cityData;
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`)
    .then(data => {
      setTemp(Math.round(data.data.main.temp));
      setIcon(data.data.weather[0].id);
      setCityName(data.data.name);
      localStorage.setItem("city-coordinates", JSON.stringify({lat, lon}))
    })
  }, [cityData])

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
        <div className="weather-current__city">{cityName}</div>
      </div>
      <div ref={ref} className="weather-forecast">
        <ForecastDaily city={cityName} />
      </div>
    </div>
  );
}

export default Weather;
