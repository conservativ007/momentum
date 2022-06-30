import React, {useState} from 'react';
import BackgroundImage from './BackgroundImage';
import Time from './Time';
import Welcome from './Welcome';

const App = () => {

  let [userName, setUserName] = useState(localStorage.getItem("user-name"));
  let [changeUserName, setChangeUserName] = useState(false);

  if(userName === null && changeUserName === false) {
    return (
      <div>
        <BackgroundImage />
        <Welcome setUserName={setUserName} userName={userName} setChangeUserName={setChangeUserName} />
      </div>
    )
  }

  return (
    <div>
      <BackgroundImage />
      <Time />
    </div>
  );
}

export default App;
