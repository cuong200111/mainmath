import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './game.css'
import { useState } from 'react';
let formatSquare = []
for (let row = 0; row < 20; row++) {
    let obj = { row: row }
    let arrayColumn = []
    for (let column = 0; column < 20; column++) {
        const formatNum = column + (row * 20)

        arrayColumn.push(formatNum)
        obj = { ...obj, column: arrayColumn }
    }
    formatSquare.push(obj)
}

function Square({ value, onSquareClick }) {
    return (
        <button className="squareGame" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = (xIsNext ? 'X' : 'O');
    }
    console.log(status);
    return (
        <>
            <div className="status">Người chơi: <span style={{
                color:status==='X'?'red':'blue',
                fontWeight:600
            }}>{status}</span></div>
            {formatSquare.map((item, index) => {


                return (<div className="board-row" >
                    {item.column.map((column, index) => {
                        return (<>
                            <Square value={squares[column]} onSquareClick={() => handleClick(column)} />
                        </>)
                    })}
                </div>)
            })}

        </>
    );
}

export default function GameOffline() {
    const [history, setHistory] = useState([Array(formatSquare.length * formatSquare.length).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Bắt đầu lại game';
            return (
                <li style={{listStyle:"none"}} key={move}>
                    <div onClick={() => jumpTo(move)}>{description}</div>
                </li>
            );
        }
     
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
               {moves}
            </div>
        </div>
    );
}


function calculateWinner(squares) {
    function generateLines(boardSize, consecutiveCount) {
        const lines = [];
    
        // Horizontal lines
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col <= boardSize - consecutiveCount; col++) {
                const line = [];
                for (let i = 0; i < consecutiveCount; i++) {
                    line.push(row * boardSize + col + i);
                }
                lines.push(line);
            }
        }
    
        // Vertical lines
        for (let col = 0; col < boardSize; col++) {
            for (let row = 0; row <= boardSize - consecutiveCount; row++) {
                const line = [];
                for (let i = 0; i < consecutiveCount; i++) {
                    line.push((row + i) * boardSize + col);
                }
                lines.push(line);
            }
        }
    
        // Diagonal lines (top-left to bottom-right)
        for (let row = 0; row <= boardSize - consecutiveCount; row++) {
            for (let col = 0; col <= boardSize - consecutiveCount; col++) {
                const line = [];
                for (let i = 0; i < consecutiveCount; i++) {
                    line.push((row + i) * boardSize + col + i);
                }
                lines.push(line);
            }
        }
    
        // Diagonal lines (top-right to bottom-left)
        for (let row = 0; row <= boardSize - consecutiveCount; row++) {
            for (let col = consecutiveCount - 1; col < boardSize; col++) {
                const line = [];
                for (let i = 0; i < consecutiveCount; i++) {
                    line.push((row + i) * boardSize + col - i);
                }
                lines.push(line);
            }
        }
    
        return lines;
    }
    const lines = generateLines(20, 5);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c,d,e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return squares[a];
        }
    }
    return null;
}