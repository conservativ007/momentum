import React, {useState} from 'react';
import BackgroundImage from './BackgroundImage';
import Time from './Time';
import Welcome from './Welcome';

const App = () => {

  let [changeUserName, setChangeUserName] = useState(localStorage.getItem("user-name") === null ? false : true);

  if(changeUserName === false) {
    return (
      <div>
        <BackgroundImage />
        <Welcome setChangeUserName={setChangeUserName} />
        <button onClick={() => setChangeUserName(!changeUserName)} style={{position: "absolute"}}>change chlen</button>
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
