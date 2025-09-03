import { useSelector } from "react-redux";
import GameCard from "./GameCard";

const GameList = () => {
  const games = useSelector((state) => state.gamesData);
  return (
    <div className="game-store-container">
      <div className="store-header">
        <h1 className="store-title neon-pulse">🎮 Game Store</h1>
        <p className="store-subtitle">Discover Amazing Games • Epic Collection • Premium Quality</p>
      </div>
      <div className="game-grid">
        {games && games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
