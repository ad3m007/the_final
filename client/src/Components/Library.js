import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetch_library, remove_from_library } from "../Redux/actions";
import Button from "react-bootstrap/Button";

const Library = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.libraryGames);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetch_library());
    }
  }, [dispatch, user]);

  if (!library || library.length === 0) {
    return (
      <div className="game-store-container">
        <h2 className="store-title">Your Library</h2>
        <p className="store-subtitle">No games yet. Buy a game to add it to your library.</p>
      </div>
    );
  }

  return (
    <div className="game-store-container">
      <h2 className="store-title">Your Library</h2>
      <div className="game-grid">
        {library.map((game, index) => (
          <div className="game-card" key={index}>
            <div className="game-card-content">
              <img className="game-poster" src={game.posterURL} alt={game.title} />
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <div className="game-price">Owned</div>
                <Button
                  size="sm"
                  variant="danger"
                  style={{ marginTop: 8 }}
                  onClick={() => dispatch(remove_from_library(game._id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;


