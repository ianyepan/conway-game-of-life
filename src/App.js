import React from 'react';
import Grid from './components/Grid.js';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 25;
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

  componentDidMount() {
    this.randomSeeding();
  }

  gridClone = gridFull => {
    return JSON.parse(JSON.stringify(gridFull));
  };

  toggleBox = (row, col) => {
    let newGridFull = this.gridClone(this.state.gridFull);
    newGridFull[row][col] = !newGridFull[row][col];
    this.setState({ gridFull: newGridFull });
  };

  randomSeeding = () => {
    let newGridFull = this.gridClone(this.state.gridFull);
    for (let i = Math.floor(this.rows / 3); i < Math.floor((2 * this.rows) / 3); i++) {
      for (let j = Math.floor((2 * this.cols) / 5); j < Math.floor((3 * this.cols) / 5); j++) {
        newGridFull[i][j] = Math.random() >= 0.75;
      }
    }
    this.setState({ gridFull: newGridFull });
  };

  render() {
    const { generation, gridFull } = this.state;
    return (
      <div>
        <p id="title">Conway's Game of Life</p>
        <Grid gridFull={gridFull} rows={this.rows} cols={this.cols} toggleBox={this.toggleBox} />
        <p>Generation: #{generation}</p>
        <p>
          Copyright 2020 Ian Y.E. Pan | Made with ReactJS |{' '}
          <a target="_blank" href="https://github.com/ianpan870102/conway-game-of-life">Source Code (GitHub)</a>
        </p>
      </div>
    );
  }
}
