import React, { useEffect, useState } from 'react';

const BackgroundImage = () => {

  let [counter, setCounter] = useState(randomNum(1, 20));
  let [imageUrl, setImageUrl] = useState(require(`./assets/images/day/${counter}.jpg`));
  

  function nextSlide() {
    setCounter(counter + 1);
    if(counter === 21) return setCounter(1);
  }

  useEffect(() => {
    setImageUrl(require(`./assets/images/day/${counter}.jpg`))
  }, [counter]);

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
