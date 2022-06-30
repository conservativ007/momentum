import React, { useEffect, useState } from 'react';
import "../styles/time.css";

const Time = () => {

  let [hours, setHours] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let name = localStorage.getItem("user-name");

  const phrases = ["Good morning", "Good afternoon", "Good evening", "Good night"];

  function setTime() {
    let date = new Date();
    setHours(date.getHours())
    setMinutes(date.getMinutes())
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
    <>
      <div className="time">
        <div className="time-clock">
          {hours}:{minutes}
        </div>
          {
            name === null ? "" : <div className="message">{phrases[1]}, {name}</div>
          }
      </div>
     
    </>
  );
}

export default Time;
