import "./Card.css";

const Cards = ({ pokemon, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? (
        <div className="card-front">
          <img src={pokemon.image} alt={pokemon.name} className="card-image" />
        </div>
      ) : (
        <div className="card-back">
          <i className="nes-pokeball"></i>
        </div>
      )}
    </div>
  );
};

export default Cards;
