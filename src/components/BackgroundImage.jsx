import React, { useEffect, useState } from 'react';
import { getArray, getPartOfTheDay, addZero } from '../functions/backgroundFunctions';

const BackgroundImage = () => {

  let [arrNumbers] = useState(getArray());

  let [counter, setCounter] = useState(getHoursForBackground());
  let [imageUrl, setImageUrl] = useState(require(`../assets/images/${getPartOfTheDay()}/${addZero(arrNumbers[counter])}.jpg`));

  function nextSlide() {
    setCounter(counter + 1);
    if(counter === 19) setCounter(1);
  }

  useEffect(() => {
    setImageUrl(require(`../assets/images/${getPartOfTheDay()}/${addZero(arrNumbers[counter])}.jpg`))
  }, [counter, getPartOfTheDay, addZero, arrNumbers]);


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
      <button onClick={() => nextSlide()} style={{position: "absolute", zIndex: 1, left: "50%"}}>change image</button>
    </div>
    
  );
}

export default BackgroundImage;
