import React, {useState, useEffect, useRef} from 'react';

const SayHi = () => {

  const [name, setName] = useState(localStorage.getItem("user-name"));
  const [phrase, setPhrase] = useState("");

  let [hours, setHours] = useState(null);

  const [widthElemOfTheUserName, setWidthElemOfTheUserName] = useState(0);
  
  const [showMessageSettings, setShowMessageSettings] = useState(false);
  const [isEditName, setIsEditName] = useState(false);

  let dropdownMenu = useRef(null);
  let userNameRef = useRef(null);

  useEffect(() => {
    if(hours === null) return;
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
    setInterval(() => {
      setHours(new Date().getHours());
    }, 1000);
  }, []);

  useEffect(() => {
    if(showMessageSettings === true) {
      dropdownMenu.current.style.opacity = 1;
      dropdownMenu.current.style.display = "block";
    } else {
      dropdownMenu.current.style.opacity = 0;
      dropdownMenu.current.style.display = "none";
    }
  }, [showMessageSettings])

  useEffect(() => {
    if(userNameRef.current === null) return;
    setWidthElemOfTheUserName(userNameRef.current.offsetWidth)
  }, [userNameRef]);


  // set length user name in start script
  useEffect(() => {
    let lengthUserName = localStorage.getItem("user-name").length;
    setWidthElemOfTheUserName((lengthUserName + 1) * 24);
  }, [])


  function testFunc(e) {
    if(e.key === "Enter" && name.length > 0) {
      setIsEditName(false);
      localStorage.setItem("user-name", name);
    }
    setWidthElemOfTheUserName((name.length + 1) * 24)
  }

  function showName() {
    if(phrase.length !== 0) {
      return <div className="message-text">{phrase}, <span ref={userNameRef} className="message-text__name"> {name}</span>.</div>
    }
    return "";
  }

  return (
    <div className="message">
      {
        isEditName === false ? showName() :
        <div className="message-text">{phrase}, 
        <input 
          style={{width: `${widthElemOfTheUserName + 20}px`}} 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          onKeyDown={(e) => testFunc(e)}
          autoFocus
        /></div> 
      }
      
      <div onClick={() => setShowMessageSettings(!showMessageSettings)} className="focus-edit">
        <div className="focus-edit__items">
          <span className="focus-edit__first"></span>
          <span className="focus-edit__second"></span>
          <span className="focus-edit__third"></span>
        </div>
        <div ref={dropdownMenu} className="focus-edit__dropdown">
          <div onClick={() => setIsEditName(true)}>edit your name</div>
        </div>
      </div>
    </div>
  );
}

export default SayHi;
