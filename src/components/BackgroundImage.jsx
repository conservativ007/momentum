import React, { useEffect, useState } from 'react';

const BackgroundImage = () => {

  let [arrNumbers] = useState(getArray());

  let [counter, setCounter] = useState(randomNum(1, 20));
  let [imageUrl, setImageUrl] = useState(require(`./assets/images/${getPartOfTheDay()}/${addZero(arrNumbers[counter])}.jpg`));

  function addZero(num) {
    return String(num).length === 1 ? `0${num}` : num;
  }

  function getArray() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    return shuffle(arr);
  }

  function nextSlide() {
    setCounter(counter + 1);
    if(counter === 19) setCounter(1);
  }

  useEffect(() => {
    setImageUrl(require(`./assets/images/${getPartOfTheDay()}/${addZero(arrNumbers[counter])}.jpg`))
  }, [counter, getPartOfTheDay, addZero, arrNumbers]);

  function getPartOfTheDay() {
    let x = new Date().getHours();

    if(x >= 0 && x <= 5)
    return "night";
    
    if(x >= 6 && x <= 11)
    return "morning";
    
    if(x >= 12 && x <= 16)
    return "day";
    
    if(x >= 17 && x <= 23)
    return "evening";
  }

  function randomNum(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
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
