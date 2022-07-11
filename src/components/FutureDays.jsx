import React from 'react';

const FutureDays = ({days, setDayOfTheWeek, setActiveDay}) => {

  let daysOfTheWeek = {
    "Thu" : "Thusday",
    "Fri" : "Friday",
    "Sat" : "Saturday",
    "Sun" : "Sunday",
    "Mon" : "Monday",
    "Tue" : "Tuesday",
    "Wed" : "Wednesday",
  }

  function toggleActive(e, item, time) {
    let elems = document.querySelectorAll(".weather-forecast__future-days");
    [...elems].map(item => item.className = "weather-forecast__future-days");
    e.currentTarget.className = "weather-forecast__future-days active";
    setActiveDay(item);

    let chunkDayOfTheWeek = String(new Date(time * 1000)).slice(0, 3);
    setDayOfTheWeek(daysOfTheWeek[chunkDayOfTheWeek]);
  }

  return (
    days.map((item, index) => {
      if(index >= 5) return;
      return (
        <div className={`weather-forecast__future-days ${index === 0 ? "active" : ""}`} key={item.dt} onClick={(e) => toggleActive(e, item, item.dt)}>
          <div className="future-days__day">{String(new Date(item.dt * 1000)).slice(0, 3)}</div>
          <div className="future-days__icon" style={{backgroundImage: `url(http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png)`}}></div>
          <div className="future-days__temp">
            <div className="temp-max">{Math.round(item.temp.max)}°</div>
            <div className="temp-min">{Math.round(item.temp.min)}°</div>
          </div>
        </div>
      )}
    )
  )
}

export default FutureDays;
