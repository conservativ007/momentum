import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../styles/mantra.css";

const Mantra = () => {

  let [mantra, setMantra] = useState("");
  let [mantraAuthor, setMantraAuthor] = useState("");

  useEffect(() => {
    axios.get("https://quotes.rest/qod?language=en&category=inspire")
    .then(data => {
      setMantra(data.data.contents.quotes[0].quote)
      setMantraAuthor(data.data.contents.quotes[0].author)
    })
  }, []);

  return (
    <div className="mantra">
      <div className="mantra-text">{mantra}</div>
      <div className="mantra-author">{mantraAuthor}</div>
    </div>
  );
}

export default Mantra;
