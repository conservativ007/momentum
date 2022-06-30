import React, { useEffect, useState } from 'react';
import "../styles/time.css";
import Mantra from './Mantra';
import Focus from './Focus';

const Time = () => {

  let [hours, setHours] = useState(new Date().getHours());
  let [minutes, setMinutes] = useState(new Date().getMinutes());
  
  let name = localStorage.getItem("user-name");

  const [phrase, setPhrase] = useState("");

  function setTime() {
    let date = new Date();
    setMinutes(date.getMinutes());
    setHours(date.getHours());
  }

  useEffect(() => {
    let hours = new Date().getHours();

    if(hours >= 0 && hours <= 5)
    return setPhrase("Good night");
    
    if(hours >= 6 && hours <= 11)
    return setPhrase("Good morning");
    
    if(hours >= 12 && hours <= 16)
    return setPhrase("Good afternoon");
    
    if(hours >= 17 && hours <= 23)
    return setPhrase("Good evening");
  }, [hours]);

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
        {
          name === null ? "" : <Mantra phrase={phrase} name={name} />
        }
        <Focus />
    </div>
  );
}

export default Time;
