import React, { useState } from 'react';
import './Game2.css'; // Import file CSS yang sudah dipisahkan

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [turns, setTurns] = useState(0);
    const [gameCount, setGameCount] = useState(0); // Menyimpan jumlah permainan yang telah selesai
    const gameLimit = 5; // Tentukan batas permainan (misalnya 5)

    const handleClick = (index) => {
        if (board[index] || winner || gameCount >= gameLimit) return; // Batasi jika permainan sudah mencapai limit

        const newBoard = board.slice();
        const currentPlayer = isXNext ? 'X' : 'O';
        newBoard[index] = currentPlayer;

        setBoard(newBoard);
        setIsXNext(!isXNext);
        setTurns(turns + 1);

        checkWinner(newBoard);
    };

    const checkWinner = (newBoard) => {
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
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                return;
            }
        }

        if (!newBoard.includes(null)) {
            setWinner('Draw');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setTurns(0);
    };

    const restartGame = () => {
        if (winner === 'X') {
            setXWins(xWins + 1);
        } else if (winner === 'O') {
            setOWins(oWins + 1);
        }
        setGameCount(gameCount + 1); // Increment game count setelah setiap permainan selesai
        resetGame();
    };

    const endGameMessage = () => {
        // Jika permainan sudah mencapai batas, tampilkan pesan Game Over dan tentukan pemenang berdasarkan skor
        if (gameCount >= gameLimit) {
            let gameWinner = '';
            if (xWins > oWins) {
                gameWinner = 'Pemain X Menang!';
            } else if (oWins > xWins) {
                gameWinner = 'Pemain O Menang!';
            } else {
                gameWinner = 'It\'s a Draw!';
            }
    
            // Menampilkan notifikasi menggunakan alert
            alert(gameWinner + " Anda telah mencapai batas permainan sebanyak " + gameLimit + " rounds.");
    
            return <div className="result">Game Selesai! {gameWinner} Anda telah mencapai batas permainan sebanyak {gameLimit} rounds.</div>;
        }
        return null;
    };

    const handleRestart = () => {
        // Reset semua statistik dan board
        setXWins(0);
        setOWins(0);
        setGameCount(0);
        resetGame();
    };

    return (
        <div className="game-container">
            <h1>Tic-Tac-Toe</h1>
            <div className="scoreboard">
                <div>Player X: {xWins}</div>
                <div>Player O: {oWins}</div>
            </div>
            <div className="game-board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className={`cell ${cell}`}
                        onClick={() => handleClick(index)}
                    >
                        {cell && <span>{cell}</span>}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="result">
                    <div className="winner-message">
                        {winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}
                    </div>
                    {winner !== 'Draw' && (
                        <i className={`fa fa-trophy trophy-animation ${winner === 'X' ? 'x-winner' : 'o-winner'}`}></i>
                    )}
                    <button onClick={restartGame}>Play Again</button>
                </div>
            )}
            {endGameMessage()}
            <div className="instructions">
                {!board.some(cell => cell !== null) && !winner && (
                    <p>Pemain X mulai terlebih dahulu. Klik pada kotak untuk melakukan gerakan.</p>
                )}
            </div>
            {/* Tombol restart akan muncul setelah game selesai */}
            {(winner || gameCount >= gameLimit) && (
                <button className="restart-button" onClick={handleRestart}>
                    Restart Games
                </button>
            )}
        </div>
    );
};

export default TicTacToe;