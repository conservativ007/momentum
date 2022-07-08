import React, { useState } from 'react';
import "../styles/serach-city.css";

import { useDispatch } from 'react-redux'
import { addActionCityName } from '../store/cityNameReducer';

const SearchForCity = ({cityName, setIsEditCity}) => {

  let [inputVal, setInputVal] = useState(cityName);
  const dispatch = useDispatch();

  function testFunc(e) {
    if(e.key === "Enter" && inputVal.length > 0) {
      setIsEditCity(prev => !prev)
      localStorage.setItem("city", inputVal);
      dispatch(addActionCityName(inputVal));
    }
  }

  return (
    <>
      <input className="search-city__input" type="text" onChange={(e) => setInputVal(e.target.value)} value={inputVal} onKeyDown={(e) => testFunc(e)} autoFocus />
    </>
  );
}

export default SearchForCity;
