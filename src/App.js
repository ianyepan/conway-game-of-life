import React from 'react';
import Grid from './components/Grid.js';
import './App.css';
import { FaPlay, FaPause, FaStop, FaRandom } from 'react-icons/fa';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 35;
    this.cols = 50;

    this.state = {
      isPlaying: false,
      generation: 0, // number of current iteration
      gridFull: Array(this.rows)
        .fill()
        .map(() => {
          return Array(this.cols).fill(false);
        }),
    };
  }

  componentDidMount() {
    this.handleRandomRestart();
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
    let newGrid = Array(this.rows)
      .fill()
      .map(() => {
        return Array(this.cols).fill(false);
      });
    for (let i = Math.floor(this.rows / 3); i < Math.floor((2 * this.rows) / 3); i++) {
      for (let j = Math.floor((1 * this.cols) / 5); j < Math.floor((4 * this.cols) / 5); j++) {
        newGrid[i][j] = Math.random() >= 0.6;
      }
    }
    this.setState({ gridFull: newGrid });
  };

  // main function: one interation
  play = () => {
    let originalGrid = this.state.gridFull;
    let newGrid = this.gridClone(this.state.gridFull);

    // rules of Conway's game fo life
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let neighbours = 0;

        if (i > 0 && originalGrid[i - 1][j]) neighbours++;
        if (i > 0 && j > 0 && originalGrid[i - 1][j - 1]) neighbours++;
        if (i > 0 && j < this.cols - 1 && originalGrid[i - 1][j + 1]) neighbours++;
        if (j < this.cols - 1 && originalGrid[i][j + 1]) neighbours++;
        if (j > 0 && originalGrid[i][j - 1]) neighbours++;
        if (i < this.rows - 1 && originalGrid[i + 1][j]) neighbours++;
        if (i < this.rows - 1 && j > 0 && originalGrid[i + 1][j - 1]) neighbours++;
        if (i < this.rows - 1 && j < this.cols - 1 && originalGrid[i + 1][j + 1]) neighbours++;

        if (originalGrid[i][j] && (neighbours < 2 || neighbours > 3)) newGrid[i][j] = false; // dies
        if (!originalGrid[i][j] && neighbours === 3) newGrid[i][j] = true; // lives
      }
    }
    this.setState(state => ({
      gridFull: newGrid,
      generation: state.generation + 1,
    }));
  };

  startPlay = () => {
    this.setState(state => ({ isPlaying: true, generation: 0 }));
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.play, this.speed);
  };

  handlePause = () => {
    clearInterval(this.intervalID);
    this.setState({ isPlaying: false });
  };

  handleClearScreen = () => {
    clearInterval(this.intervalID);
    this.setState({
      isPlaying: false,
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => {
          return Array(this.cols).fill(false);
        }),
    });
  };

  handleResume = () => {
    this.intervalID = setInterval(this.play, this.speed);
    this.setState({ isPlaying: true });
  };

  handleRandomRestart = () => {
    this.randomSeeding();
    this.startPlay();
  };

  render() {
    const playPauseButton = !this.state.isPlaying ? (
      <button className="col" onClick={this.handleResume}>
        <FaPlay /> Play
      </button>
    ) : (
      <button className="col" onClick={this.handlePause}>
        <FaPause /> Pause
      </button>
    );
    const { generation, gridFull } = this.state;
    return (
      <div>
        <div className="row">
        <p className="col" id="title">Ian's "Conway's Game of Life"</p>
        {playPauseButton}
        <button className="col" onClick={this.handleClearScreen}>
          <FaStop /> Clear Screen
        </button>
        <button className="col" onClick={this.handleRandomRestart}>
          <FaRandom /> Random Play
        </button>
        </div>
        <Grid gridFull={gridFull} rows={this.rows} cols={this.cols} toggleBox={this.toggleBox} />
        <p>Generation: #{generation}</p>
        <p>
          Copyright 2020 Ian Y.E. Pan | Made with ReactJS |{' '}
          <a target="_blank" href="https://github.com/ianpan870102/conway-game-of-life">
            Source Code (GitHub)
          </a>
        </p>
      </div>
    );
  }
}
