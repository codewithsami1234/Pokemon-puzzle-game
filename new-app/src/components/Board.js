import Cards from "./Cards";
import "./Board.css";

const Board = ({ pokemons, flippedCards, matchedPairs, handleCardClick }) => {
  return (
    <div className="board nes-container is-rounded is-dark">
      {pokemons.map((pokemon) => (
        <Cards
          key={pokemon.uid}
          pokemon={pokemon}
          isFlipped={
            flippedCards.includes(pokemon.uid) || matchedPairs.includes(pokemon.name)
          }
          onClick={() => handleCardClick(pokemon.uid)}
        />
      ))}
    </div>
  );
};

export default Board;
