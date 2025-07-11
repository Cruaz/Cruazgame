import React, { useState, useEffect } from 'react';
import { Heart, Diamond, Spade, Club } from 'lucide-react';
import './Game1.css';

function Game1() {
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [dealerTotal, setDealerTotal] = useState(0);
    const [status, setStatus] = useState("playing");
    const [score, setScore] = useState(0);

    const suits = [<Heart color="white" />, <Diamond color="white" />, <Spade color="white" />, <Club color="white" />];

    // Semua kartu termasuk J, Q, K
    const cardValues = [
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "J", value: 10 },
        { label: "Q", value: 10 },
        { label: "K", value: 10 },
        { label: "A", value: 11 },
    ];

    const getRandomCard = () => {
        const randomCard = cardValues[Math.floor(Math.random() * cardValues.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        return { ...randomCard, suit };
    };

    const calculateTotal = (cards) => {
        let total = cards.reduce((sum, card) => sum + card.value, 0);

        // Penyesuaian Ace jika total lebih dari 21
        let aceCount = cards.filter((card) => card.label === "A").length;
        while (total > 21 && aceCount > 0) {
            total -= 10; // Ace berubah dari 11 ke 1
            aceCount -= 1;
        }

        return total;
    };

    const startGame = () => {
        const initialPlayerCards = [getRandomCard(), getRandomCard()];
        const initialDealerCards = [getRandomCard(), getRandomCard()];

        setPlayerCards(initialPlayerCards);
        setDealerCards(initialDealerCards);
        setPlayerTotal(calculateTotal(initialPlayerCards));
        setDealerTotal(calculateTotal(initialDealerCards));
        setStatus("playing");
    };

    const handleHit = () => {
        const newCard = getRandomCard();
        const newPlayerCards = [...playerCards, newCard];
        const newTotal = calculateTotal(newPlayerCards);

        setPlayerCards(newPlayerCards);
        setPlayerTotal(newTotal);

        if (newTotal > 21) {
            setStatus("dealerWin");
        }
    };

    const handleStand = () => {
        let dealerScore = dealerTotal;
        let dealerHand = [...dealerCards];

        while (dealerScore < 17) {
            const newCard = getRandomCard();
            dealerHand.push(newCard);
            dealerScore = calculateTotal(dealerHand);
        }

        setDealerCards(dealerHand);
        setDealerTotal(dealerScore);

        if (dealerScore > 21) {
            setStatus("playerWin");
            setScore(score + 1);
        } else if (playerTotal > dealerScore) {
            setStatus("playerWin");
            setScore(score + 1);
        } else if (playerTotal === dealerScore) {
            setStatus("Tie");
        } else {
            setStatus("dealerWin");
        }
    };

    const handleNewGame = () => {
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerTotal(0);
        setDealerTotal(0);
        setStatus("playing");
        startGame();
    };

    useEffect(() => {
        startGame();
    }, []);

    return (
        <div className="game1">
            <label className="title">
                <Heart size={40} />
                Blackjack
            </label>

            <div className="notification">
                {status === "dealerWin" && playerTotal > 21 && <p className="dealer-win">Bust! Dealer wins.</p>}
                {status === "playerWin" && dealerTotal > 21 && <p className="player-win">Dealer busts! You win!</p>}
                {status === "dealerWin" && playerTotal <= 21 && dealerTotal <= 21 && dealerTotal > playerTotal && (
                    <p className="dealer-win">Dealer wins!</p>
                )}
                {status === "playerWin" && dealerTotal <= 21 && <p className="player-win">You win!</p>}
                {status === "Tie" && <p className="tie">It's a tie!</p>}
            </div>

            <p>Score: {score} | Status: {status}</p>

            {/* Dealer's Section */}
            <div className="dealer">
                <h2>Dealer's Hand:</h2>
                <p>
                    {dealerCards.map((card, index) => (
                        <span key={index}>
                            {index === 1 && status === "playing"
                                ? "[Hidden]"
                                : (
                                    <>
                                        {card.label}
                                        {card.suit}
                                    </>
                                )}
                            {index < dealerCards.length - 1 && ", "}
                        </span>
                    ))}
                </p>
                <p>
                    Total: {status === "playing" ? dealerCards[0]?.value : dealerTotal}
                </p>
            </div>

            {/* Player's Section */}
            <div className="player">
                <h2>Your Hand:</h2>
                <p>
                    {playerCards.map((card, index) => (
                        <span key={index}>
                            {card.label}{card.suit}{" "}
                        </span>
                    ))}
                </p>
                <p>Total: {playerTotal}</p>
            </div>

            {/* Action Buttons */}
            <div className="buttons">
                <button onClick={handleHit} disabled={status !== "playing"}>Hit</button>
                <button onClick={handleStand} disabled={status !== "playing"}>Stand</button>
                <button onClick={handleNewGame}>New Game</button>
            </div>
        </div>
    );
}

export default Game1;