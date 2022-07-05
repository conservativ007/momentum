import React, {useEffect, useState} from 'react';
import { getWeather } from '../functions/getWeather';

const ForecastDaily = () => {

  let [days, setDays] = useState([]);
  let [activeDay, setActiveDay] = useState([]);

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

  return (
    <>
      {
        activeDay.length === 0 ? "" :
        <div className="weather-forecast__current-day">
          <div className="current-day__description">
            <div className="current-day__description-name">{activeDay.name}</div>
            <div className="current-day__description-weather">{activeDay.weather[0].description}</div>
          </div>
          <div className="current-day__temp">
            <div className={`owf owf-${activeDay.weather[0].id}-d owf-3x`}></div>
            <div className="current-day__temp-temp">{Math.round(activeDay.main.temp)}°</div>
          </div>
          <div className="weather-forecast__marker"></div>
        </div>
      }

      <div className="weather-forecast__future">
      {
        days.length === 0 ? "" :
        days.map((item, index) => {
          if(index >= 5) return;
          return (
            <div className="weather-forecast__future-days" key={item.dt}>
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
