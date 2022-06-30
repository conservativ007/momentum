import React, { useEffect, useRef, useState } from 'react';
import "../styles/welcome.css";

const Welcome = ({setChangeUserName}) => {

  let ref = useRef(null);
  let [userName, setUserName] = useState(localStorage.getItem("user-name"));
  

  useEffect(() => {
    ref.current.focus();
  }, []);

  function saveUserName(e) {
    if (e.key === "Enter" && userName.length > 0) {
      localStorage.setItem("user-name", userName);
      setChangeUserName(true);
    }
  }

  return (
    <div className="welcome">
      <div className="welcom-question">What is your name ?</div>
      <input 
      value={userName === null ? "" : userName} 
      onChange={e => setUserName(e.target.value)}
      ref={ref} 
      onKeyDown={() => saveUserName()}
      className="welcome-input" 
      type="text" />
    </div>
  );
}

export default Welcome;
