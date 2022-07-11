import React, {useEffect, useRef, useState} from 'react';

import { MdOutlineModeEditOutline } from 'react-icons/md';
import SearchForCity from './SearchForCity';
import FutureDays from './FutureDays';
import axios from 'axios';

const ForecastDaily = ({city, cityData}) => {

  let [days, setDays] = useState([]);
  let [dayOfTheWeek, setDayOfTheWeek] = useState("");
  let [activeDay, setActiveDay] = useState([]);

  let [isEditCity, setIsEditCity] = useState(false);
  let ref = useRef(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`)
    .then(data => setDays(data.data.daily))
  }, [cityData]);
  
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`)
    .then(data => setActiveDay(data.data))
  }, [cityData]);

  return (
    <>
      {
        activeDay.length === 0 ? "" :
        <div className="weather-forecast__current-day">
          {
            isEditCity === true ? <div className="search-city"><SearchForCity cityName={city} setIsEditCity={setIsEditCity} /></div>  :
            <div className="current-day">
              <div className="current-day__description">
                <div className="current-day__description-name">{city}</div>
                <div className="current-day__description-week">{dayOfTheWeek}</div>
                <div className="current-day__description-edit"><MdOutlineModeEditOutline onClick={() => setIsEditCity(!isEditCity)} /></div>
              </div>
              <div className="current-day__description-weather">{activeDay.weather[0].description.slice(0, 1).toUpperCase() + activeDay.weather[0].description.slice(1, activeDay.weather[0].description.length)}</div>
            </div>
          }
          
          <div className="current-day__temp">
            <div className="current-day__tem-icon" style={{backgroundImage: `url(http://openweathermap.org/img/wn/${activeDay.weather[0].icon}@2x.png)`}}></div>
            {activeDay.main ? <div className="current-day__temp-temp">{Math.round(activeDay.main.temp)}°</div> : ""}
            {activeDay.temp ? 
            <div className="daily-forecast">
              <div className="daily-forecast__temp-max">{Math.round(activeDay.temp.max)}°</div>
              <div className="daily-forecast__temp-min">{Math.round(activeDay.temp.min)}°</div>
            </div> : ""
            }
          </div>
          <div className="weather-forecast__marker"></div>
        </div>
      }

      <div className="weather-forecast__future" ref={ref}>
      {
        days.length === 0 ? "" : 
        <FutureDays days={days} setDayOfTheWeek={setDayOfTheWeek} setActiveDay={setActiveDay} />
      }
      </div>
    </>
  );
}

export default ForecastDaily;
