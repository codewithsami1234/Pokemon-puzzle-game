import { useEffect, useState } from "react";
import Board from "../components/Board";
import initialPokemons from "../data";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Game({ setUser }) {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const shuffled = [...initialPokemons, ...initialPokemons]
      .sort(() => Math.random() - 0.5)
      .map((p) => ({ ...p, uid: Math.random() }));
    setPokemons(shuffled);
  }, []);
  
  const handleCardClick = (uid) => {
    if (flippedCards.length === 2 || flippedCards.includes(uid)) return;

    const newFlipped = [...flippedCards, uid];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped.map((id) =>
        pokemons.find((p) => p.uid === id)
      );
      if (first.name === second.name) setMatchedPairs((prev) => [...prev, first.name]);
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
    setPokemons((prev) =>
      [...prev].sort(() => Math.random() - 0.5).map((p) => ({ ...p, uid: Math.random() }))
    );
  };

  const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  navigate("/"); // redirect back to Login page
};

  useEffect(() => {
    if (matchedPairs.length === initialPokemons.length) setGameWon(true);
  }, [matchedPairs]);

  const progressPercent = (matchedPairs.length / initialPokemons.length) * 100;

  return (
    <div className="app-container">
      <h1>Pokémon Puzzle Game</h1>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <p>Moves: {moves}</p>
      {gameWon && <h2> You Won! </h2>}

      <Board
        pokemons={pokemons}
        flippedCards={flippedCards}
        matchedPairs={matchedPairs}
        handleCardClick={handleCardClick}
      />

   <div className="d-flex justify-content-center gap-3 mt-3">
  <button className="btn btn-success" onClick={resetGame}>
    Restart Game
  </button>
  <button className="btn btn-danger" onClick={handleLogout}>
    Logout
  </button>
</div>

    </div>
  );
}
export default Game;
