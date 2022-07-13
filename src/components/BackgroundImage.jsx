import React, { useEffect, useState } from 'react';
import { getArray, getPartOfTheDay } from '../functions/backgroundFunctions';

const BackgroundImage = () => {

  let [arrNumbers] = useState(getArray());

  let [counter, setCounter] = useState(getHoursForBackground());
  let [imageUrl, setImageUrl] = useState(require(`../assets/images/${getPartOfTheDay()}/${arrNumbers[counter]}.jpg`));

  useEffect(() => {
    setImageUrl(require(`../assets/images/${getPartOfTheDay()}/${arrNumbers[counter]}.jpg`))
  }, [counter, getPartOfTheDay, arrNumbers]);


  useEffect(() => {
    let timerId = setInterval(() => {
      setCounter(getHoursForBackground())
    }, 1000);
    return () => clearInterval(timerId);
  }, [counter])

  function getHoursForBackground() {
    return new Date().getHours() % 20;
  }

  return (
    <div className="background">
      <div 
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>
    </div>
  );
}

export default BackgroundImage;
