import React, {useEffect, useRef, useState} from 'react';
import { getWeather } from '../functions/getWeather';

const ForecastDaily = ({city}) => {

  let [days, setDays] = useState([]);
  let [dayOfTheWeek, setDayOfTheWeek] = useState("");
  let [activeDay, setActiveDay] = useState([]);

  let daysOfTheWeek = {
    "Thu" : "Thusday",
    "Fri" : "Friday",
    "Sat" : "Saturday",
    "Sun" : "Sunday",
    "Mon" : "Monday",
    "Tue" : "Tuesday",
    "Wed" : "Wednesday",
  }

  let ref = useRef(null);

  // get daily forecast
  useEffect(() => {
    getWeather("forecast")
    .then(r => r.json())
    .then(data => setDays(data.daily))
  }, []);

  // get current day
  useEffect(() => {
    getWeather("currentDay")
    .then(r => r.json())
    .then(data => setActiveDay(data))
  }, []);


  useEffect(() => {
    console.log(city)
  }, [city]);

  function toggleActive(e, item, time) {
    let elems = document.querySelectorAll(".weather-forecast__future-days");
    [...elems].map(item => item.className = "weather-forecast__future-days");
    e.currentTarget.className = "weather-forecast__future-days active";
    setActiveDay(item);

    let chunkDayOfTheWeek = String(new Date(time * 1000)).slice(0, 3);
    setDayOfTheWeek(daysOfTheWeek[chunkDayOfTheWeek]);
    // console.log(daysOfTheWeek[chunkDayOfTheWeek])
  }

  return (
    <>
      {
        activeDay.length === 0 ? "" :
        <div className="weather-forecast__current-day">
          <div className="current-day__description">
            <div>
              <div className="current-day__description-name">{city}</div>
              <div className="current-day__description-week">{dayOfTheWeek}</div>
            </div>
            <div className="current-day__description-weather">{activeDay.weather[0].description.slice(0, 1).toUpperCase() + activeDay.weather[0].description.slice(1, activeDay.weather[0].description.length)}</div>
          </div>
          <div className="current-day__temp">
            <div className={`owf owf-${activeDay.weather[0].id}-d owf-3x`}></div>
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
        days.map((item, index) => {
          if(index >= 5) return;
          return (
            <div className={`weather-forecast__future-days ${index === 0 ? "active" : ""}`} key={item.dt} onClick={(e) => toggleActive(e, item, item.dt)}>
              <div className="future-days__day">{String(new Date(item.dt * 1000)).slice(0, 3)}</div>
              <div className={`future-days__icon owf owf-${item.weather[0].id}-d owf-2x`}></div>
              <div className="future-days__temp">
                <div className="temp-max">{Math.round(item.temp.max)}°</div>
                <div className="temp-min">{Math.round(item.temp.min)}°</div>
              </div>
            </div>
          )}
        )
      }
      </div>
    </>
  );
}

export default ForecastDaily;
