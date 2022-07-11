import React, { useEffect, useState } from 'react';
import "../styles/time.css";
import SayHi from './SayHi';
import Focus from './Focus';

const Time = () => {

  let [hours, setHours] = useState(new Date().getHours());
  let [minutes, setMinutes] = useState(new Date().getMinutes());

  function setTime() {
    let date = new Date();
    setMinutes(date.getMinutes());
    setHours(date.getHours());
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      setTime()
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if(String(minutes).length === 1) {
      let test = `0${minutes}`;
      setMinutes(test)
    }
  }, [minutes])

  return (
    <div className="time">
      <div className="time-clock">
        {hours}:{minutes}
      </div>
        <SayHi hours={hours} /> 
        <Focus />
    </div>
  );
}

export default Time;
