import React, {useState} from 'react';
import BackgroundImage from './BackgroundImage';
import Time from './Time';
import Weather from './Weather';
import Welcome from './Welcome';
import Mantra from './Mantra';

const App = () => {

  let [changeUserName, setChangeUserName] = useState(localStorage.getItem("user-name") === null ? false : true);

  if(changeUserName === false) {
    return (
      <div>
        <BackgroundImage />
        <Welcome setChangeUserName={setChangeUserName} />
      </div>
    )
  }

  return (
    <>
      <BackgroundImage />
      <Time />
      <Weather />
      <Mantra />
    </>
  );
}

export default App;
