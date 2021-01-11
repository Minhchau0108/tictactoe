import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Board from './Board';

// Step 0
// Draw the tree of components
// SquareButton --> Board --> Game ---> APP 

// STEP 6.6 - Rocket: History of moves
// Import useLocalStorageState from ../utils/useLocalStorageState
// Appy the custom hook to persist the game across browser refresh

function getNextValue(squares) {
	const X_Count = squares.filter(x => x === "X").length;
	const O_Count = squares.filter(x => x === "O").length;
	if(X_Count === O_Count) return "X";
	return "O";
}

function getWinner(squares) {
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
	for(let i = 0; i < lines.length; i++){
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			return squares[a];
		}
	}
	return null;
}

function getStatus(squares, winner, nextValue) {
	if(winner !== null) {
		return (<p>Winner: {winner}</p>);
	}
	if(squares.filter(x => x === null).length === 0){
		return (<p>Draw Game</p>);
	}
	return (<p>Next player: {nextValue}</p>);
}

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentStep, setCurrentStep] = useState(0);
	const currentSquares = history[currentStep];

	const nextValue = getNextValue(currentSquares)
	const winner = getWinner(currentSquares);
	const status = getStatus(currentSquares, winner, nextValue);

	const clickSquare = (index) => {
		if(winner !== null) { return;}
		const historyCopy = history.slice(0, currentStep + 1);
		const squares = [...currentSquares];
		squares[index] = nextValue;		
		setHistory([...historyCopy, squares])
		setCurrentStep(historyCopy.length);
	};

	const restartGame = () => {
		setHistory([Array(9).fill(null)])
		setCurrentStep(0)
	};
	const moves = history.map((squares, step) => {
	  const description = step ? `Go to move # ${step}`: `Go to game start`;
	  const isCurrentStep = step === history.length;
	  return (
	    <li key={step}>
	      <Button
	        variant="outline-success"
	        size="sm"
	        disabled={isCurrentStep}
	        onClick={() => setCurrentStep(step)}
	      >
	        {description} {isCurrentStep ? "(current)" : null}
	      </Button>
	    </li>
	  );
	});

	return (
		<Container>
			<Row>
				<Col className="d-flex justify-content-center mb-3">
					<Button onClick={restartGame} size="sm">
						Restart
					</Button>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Board squares={history[currentStep]} onClick={clickSquare} />
					<div>
						<strong>Winner: {winner}</strong>
					</div>
				</Col>
				<Col md={6}>
					<div>
						<strong>{status}</strong>
					</div>
					 <ol>{moves}</ol> 
				</Col>
			</Row>
		</Container>
	);
};

export default Game;
