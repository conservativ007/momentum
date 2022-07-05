export async function getWeather(value) {

  let coords = new Promise((resolve) => {
    resolve(
      fetch("https://ipapi.co/json/")
      .then(response => response.json())
    );
  })

  let {latitude, longitude} = await coords;


  if(value === "currentDay") {
    let weather = new Promise((resolve) => {
      resolve(
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`)
      )
    })
    return weather;
  }
  

  if(value === "forecast") {
    let weatherForecast = new Promise(resolve => {
      resolve(
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`)
      )
    })
    return weatherForecast;
  }
}

 