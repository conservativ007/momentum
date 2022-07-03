export function getArray() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    return shuffle(arr);
}

export function getPartOfTheDay() {
  let part = new Date().getHours();

  if(part >= 0 && part <= 5)
  return "night";
  
  if(part >= 6 && part <= 11)
  return "morning";
  
  if(part >= 12 && part <= 16)
  return "day";
  
  if(part >= 17 && part <= 23)
  return "evening";
}

export function addZero(num) {
  return String(num).length === 1 ? `0${num}` : num;
}