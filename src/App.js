import React from 'react';
import Grid from './components/Grid.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 20;
    this.cols = 40;

    this.state = {
      generation: 0, // number of current iteration
      gridFull: Array(this.rows)
        .fill()
        .map(() => {
          return Array(this.cols).fill(false);
        }),
    };
  }

  gridClone = gridFull => {
    return JSON.parse(JSON.stringify(gridFull));
  };

  toggleBox = (row, col) => {
    let newGridFull = this.gridClone(this.state.gridFull);
    newGridFull[row][col] = !newGridFull[row][col];
    this.setState({ gridFull: newGridFull })
  };

  render() {
    const { generation, gridFull } = this.state;
    return (
      <div>
        <h3>Conway's Game of Life</h3>
        <Grid gridFull={gridFull} rows={this.rows} cols={this.cols} toggleBox={this.toggleBox} />
        <h5>Generations: {generation}</h5>
      </div>
    );
  }
}
