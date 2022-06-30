import React from 'react';

const Mantra = ({phrase, name}) => {
  return (
    <div className="message">
      {phrase}, {name}
    </div>
  );
}

export default Mantra;
