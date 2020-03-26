import React from 'react';
import './Box.css';

const Box = props => {
  const handleSelect = () => {
    props.toggleBox(props.row, props.col);
  };

  const boxClassName = props.boxClassName;
  return <div className={boxClassName} id={props.id} onClick={handleSelect}></div>;
};

export default Box;
