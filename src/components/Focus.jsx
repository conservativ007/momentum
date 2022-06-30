import React, { useState, useEffect } from 'react';

import "../styles/focus.css";
import "../styles/transition.css";

const Focus = () => {

  let [userFocus, setUSerFocus] = useState(localStorage.getItem("user-focus"));
  let [isFocus, setIsFocus] = useState(localStorage.getItem("user-focus") === null ? false : true);

  function saveUserFocus(e) {
    if (e.key === "Enter" && userFocus.length > 0) {
      localStorage.setItem("user-focus", userFocus);
      setIsFocus(true);
    }
  }

  useEffect(() => {
    console.log(isFocus)
  }, [isFocus])

  

  return (
    <div className="user-focus">
      { isFocus === false ?  
        <div className="user-test">
          <div className="user-ask">What is your main focus for today?</div>
          <input onChange={e => setUSerFocus(e.target.value)} value={userFocus} onKeyDown={(e) => saveUserFocus(e)}  className="welcome-input" type="text" />
        </div>
          :
        <div className="user-ask">
          <div className="user-ask__today">today</div>
          <div className="user-ask__focus">{userFocus}</div>
        </div>
      } 
    </div>
  );
}

export default Focus;
