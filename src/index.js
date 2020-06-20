import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

// Square as a function Component
// function component is one which only has a render method and doesn't have its own state.
function Square(props){
  return (
    <button className="square" onClick={props.onSquareClick }>
      {props.value}
    </button>
  );
}

// Square as a React.Component
// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         // setting state of a component means to re-render the component, in this case, when button is "clicked"
//         // setting value as 'X' or 'O' when setting state means component is re-rendered with this new "value"
//         //NOTE: setState automatically updates the child components too
//         // this onClick has a kind of pre-defined meaning because it is on the DOM element <button>
//         onClick={ () => this.props.onSquareClick() }
//       >
//         {/* button display */}
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  // in JS classes, you always need to call super when defining the constructor of a subclass (=Square ot Board)
  // so in React, all constructors should start with a super(props) call
  // setting default value (as null) of "state" property.
  constructor(props){
    super(props)
    this.state = {
      // this sets state = null for each of its children, but since Square component has its own set defined, so it ignores the null state sent by its parent
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // set the state of squares[i]
  handleClick(i) {
    // store a copy of squares array in a const "squares" using .slice(), instad of modifying the existing squares array
    const squares = this.state.squares.slice();
    // return if a winner or value('X' or 'O') is present
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    // set the value of ith square
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // set this const squares array as the state of all 9 squares
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // Board is setting value of each individual Square as ('X', 'O', or null)
    // Board is keeping the state of each Square component
    return(
      <Square
        value={this.state.squares[i]}
        // <Square /> is not a build-in DOM element but a custom component, hence we can give any name to this onClick function
        onSquareClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
