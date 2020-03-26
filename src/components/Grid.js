import React from 'react';
import Box from './Box.js';

const Grid = props => {
  let rowsArr = [];
  let boxClassName = '';
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      let boxID = i + '_' + j;
      boxClassName = props.gridFull[i][j] ? 'box on' : 'box off';
      rowsArr.push(
        <Box
          boxClassName={boxClassName}
          key={boxID}
          boxID={boxID}
          row={i}
          col={j}
          toggleBox={props.toggleBox}
        />
      );
    }
  }
  return (
    <div className="grid" style={{ width: props.cols * (20+2) }}>
      {rowsArr}
    </div>
  );
};
export default Grid;
