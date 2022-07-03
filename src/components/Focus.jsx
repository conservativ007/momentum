import React, { useState, useEffect, useRef } from 'react';

import "../styles/focus.css";
import "../styles/transition.css";

const Focus = () => {

  let [userFocus, setUSerFocus] = useState(localStorage.getItem("user-focus") === null ? "" : localStorage.getItem("user-focus"));
  
  let [isFocus, setIsFocus] = useState(getBoolFromLocalStorage("user-focus"));
  let [isFocusComplete, setIsFocusComplete] = useState(getValueFromLocalStorage("is-focus-complete"));

  let userFocusRef = useRef(null);

  function saveUserFocus(e) {
    if (e.key === "Enter" && userFocus.length > 0) {
      localStorage.setItem("user-focus", userFocus);
      setIsFocus(true);
    }
  }

  function getBoolFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    if(value === null) return false;
    return true;
  }
  
  function getValueFromLocalStorage(key) {
    let value = JSON.parse(localStorage.getItem(key));
    if(value === null) return false;
    return value;
  }

  useEffect(() => {
    localStorage.setItem("is-focus-complete", JSON.stringify(isFocusComplete));
    if(userFocusRef.current && isFocusComplete === true) {
      userFocusRef.current.style.textDecoration = "line-through";
    } 

    if(userFocusRef.current && isFocusComplete === false) {
      userFocusRef.current.style.textDecoration = "none";
    }
  }, [isFocusComplete, userFocusRef]);


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
          <div className="user-ask__focus">
            <input checked={isFocusComplete} onChange={() => setIsFocusComplete(!isFocusComplete)} id="show-focus" type="checkbox" className="user-ask__input"></input>
            <label htmlFor="show-focus"></label>
            <div ref={userFocusRef} className="user-ask__focus-text">{userFocus}</div>
            <div className="focus-edit">
              <span className="focus-edit__first"></span>
              <span className="focus-edit__second"></span>
              <span className="focus-edit__third"></span>
            </div>
          </div>
        </div>
      } 
    </div>
  );
}

export default Focus;
