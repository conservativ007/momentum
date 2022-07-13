import React, { useState, useEffect, useRef } from 'react';

import "../styles/focus.css";
import "../styles/transition.css";

const Focus = () => {

  let [userFocus, setUSerFocus] = useState(localStorage.getItem("user-focus") === null ? "" : localStorage.getItem("user-focus"));
  
  let [isFocus, setIsFocus] = useState(getBoolFromLocalStorage("user-focus"));
  let [isFocusComplete, setIsFocusComplete] = useState(getValueFromLocalStorage("is-focus-complete"));

  let [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const [userCongratulates] = useState(["Good job!", "Great work!", "Way to go!"]);
  const [userCongratulatesPhrase, setUserCongratulatesPhrase] = useState("");
  const showCongratulateRef = useRef(null);

  let userFocusRef = useRef(null);
  let focusDropdownMenu = useRef(null);

  function saveUserFocus(e) {
    if (e.key === "Enter" && userFocus.length > 0) {
      localStorage.setItem("user-focus", userFocus);
      localStorage.setItem("is-focus-congratulate", JSON.stringify(false));
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

  function clearUserFocus() {
    setUSerFocus("");
    setIsFocus(false);
  }

  function editUserFocus() {
    setIsFocus(false);
    setIsFocusComplete(false);
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

  useEffect(() => {
    if(focusDropdownMenu.current) {
      focusDropdownMenu.current.style.opacity = isDropdownMenuOpen === true ? 1 : 0;
      focusDropdownMenu.current.style.display = isDropdownMenuOpen === true ? "block" : "none";
    }
  }, [isDropdownMenuOpen, focusDropdownMenu]);

  useEffect(() => {
    if(isFocusComplete === true) {

      let isShowCongratulate = JSON.parse(localStorage.getItem("is-focus-congratulate"));
      if(isShowCongratulate === true) return;

      setUserCongratulatesPhrase(userCongratulates[getRandomArbitrary(0, 2)]);
      showCongratulateRef.current.style.opacity = 1;

      let timerId = setTimeout(() => {
        showCongratulateRef.current.style.opacity = 0;
        localStorage.setItem("is-focus-congratulate", JSON.stringify(true));
      }, 3000);

      return () => clearTimeout(timerId);
    } 
  }, [isFocusComplete]);

  // save day to local storage
  useState(() => {
    localStorage.setItem("date-now", JSON.stringify(new Date().getDate()));
  }, []);

  // clear focus to hte next day
  useState(() => {
    let someDate = JSON.parse(localStorage.getItem("date-now"));
    let timerId = setInterval(() => {
      if(new Date().getDate() !== someDate) {
        setUSerFocus("");
        localStorage.setItem("user-focus", "");
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="user-focus">
      { isFocus === false ?  
        <div className="user-test">
          <div className="user-ask">What is your main focus for today?</div>
          <input autoFocus onChange={e => setUSerFocus(e.target.value)} value={userFocus} onKeyDown={(e) => saveUserFocus(e)}  className="welcome-input" type="text" />
        </div>
          :
        <div className="user-ask">
          <div className="user-ask__today">today</div>
          <div className="user-ask__focus">
            <input checked={isFocusComplete} onChange={() => setIsFocusComplete(!isFocusComplete)} id="show-focus" type="checkbox" className="user-ask__input"></input>
            <label htmlFor="show-focus"></label>
            <div ref={userFocusRef} className="user-ask__focus-text">{userFocus}</div>
            <div onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)} className="focus-edit">
              <div className="focus-edit__items">
                <span className="focus-edit__first"></span>
                <span className="focus-edit__second"></span>
                <span className="focus-edit__third"></span>
              </div>
              <div ref={focusDropdownMenu} className="focus-edit__dropdown">
                <div onClick={() => editUserFocus()}>edit</div>
                <div onClick={() => clearUserFocus()}>clear</div>
              </div>
            </div>
          </div>
          <div ref={showCongratulateRef} className="user-ask__congratulate">{userCongratulatesPhrase}</div>
        </div>
      } 
    </div>
  );
}

export default Focus;
