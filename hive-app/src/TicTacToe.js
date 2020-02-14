import React from "react";
import "./TicTacToe.css"

/*
// because this component doesn't maintain its own state but is instead managed by Board,
// 		it is considered a "controlled component"
// ALSO: React.PureComponent only updates the component if the state or props change;
// 		you wouldn't want to use it for some internally-driven, animated component
class Square extends React.PureComponent 
{
	
	// define state in the constructor
	constructor(props) 
	{
		super(props);
		
		this.state = {
			hasBeenClicked: false,
		};
		
	}
	
	render() 
	{
		return (
			<button 
				className="square" 
				onClick={function() {
					//alert('click');
					//this.setState({hasBeenClicked: true});
					this.props.onClicked();
				}.bind(this)}
			>
				{this.props.value}
			</button>
		);
	}
	
	 // -- this functionality is automated in React.PureComponent
	// shouldComponentUpdate(nextProps, nextState) 
	// {
		// if (this.props.value !== nextProps.value) {
			// return true;
		// }
		// return false;
	// }
}
*/
// this "function component" is a simpler way of representing the same state-less rendering as above
function Square(props) 
{
	return (
		<button 
			className="square" 
			onClick={props.onClicked}
		>
			{props.value}
		</button>
	);
}


class Board extends React.Component 
{
	constructor(props) 
	{
		super(props);
		
		this.state = {
			board: Array(9).fill(null),
			nextPlayer: 0,
		};
	}
	
	// convention dictates that on[Event] from the child gets handled by handle[Event] 
	handleClick(i) 
	{		
		// ignore if:
		// the square is filled
		if (this.state.board[i])
		{
			return;
		}
		// or the game is over
		if (calculateWinner(this.state.board))
		{
			return;
		}
		
	
		// create a copy of the array with slice(), because we like data immutability
		// this gets us: 
		// 		- undo/redo functionality
		// 		- easy/centralized change detection
		// 		- "pure components", meaning we can limit the extent of our DOM refresh
		const board = this.state.board.slice();
		board[i] = getSymbolForPlayer(this.state.nextPlayer);
		this.setState({
			board: board,
			nextPlayer: (this.state.nextPlayer + 1) % 2,
		});
	}
	
	renderSquare(i) 
	{
		return <Square 
						value={this.state.board[i]} 
						onClicked={()=>this.handleClick(i)}
					/>;
	}

	render() 
	{
		const winner = calculateWinner(this.state.board);
		let status;
		if (winner)
		{
			status = "Winner: " + winner;
		}
		else
		{
			status = "Next player: " + getSymbolForPlayer(this.state.nextPlayer);
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

class TicTacToeGame extends React.Component 
{
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

// helper functions
function getSymbolForPlayer(playerIndex) 
{
	if(playerIndex < 0 || playerIndex > 1)
	{
		return '?';
	}
	return playerIndex == 0 ? 'X' : 'O';
}
	
function calculateWinner(boardState)
{
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
	
	// iterate across array and decompose tuple
	for (let [a, b, c] of lines) //i = 0; i < lines.length; i++)
	{
		//const [a, b, c] = lines[i];
		
		// check if they are all the same and also not null
		if (boardState[a] && 
			boardState[a] === boardState[b] &&
			boardState[b] === boardState[c])
		{
			return boardState[a];
		}
	}
	
	return null;
}

export default TicTacToeGame;
