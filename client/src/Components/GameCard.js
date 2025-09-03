import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { add_to_library, update_game, delete_game } from "../Redux/actions";

const GameCard = ({ _id, title, description, posterURL, rating, price = "0" }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className="game-card">
      <div className="game-card-content">
        <img 
          className="game-poster" 
          src={posterURL} 
          alt={title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/350x250/1a1a1a/00ffff?text=GAME+COVER';
          }}
        />
        <div className="game-info">
          <h3 className="game-title">{title}</h3>
          <p className="game-description">{description}</p>
          <div className="game-rating">
            <span className="rating-stars">{renderStars(rating)}</span>
            <span className="rating-number">{rating}/10</span>
          </div>
          <div className="game-price">{price}</div>
          <div style={{ marginTop: 10 }}>
            <Button size="sm" className="submit-btn" onClick={() => dispatch(add_to_library(_id))}>
              Buy
            </Button>
            {user && user.role === 'admin' && (
              <>
                <Button
                  size="sm"
                  variant="warning"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    if (!_id) return;
                    const newTitle = window.prompt("Update title", title) ?? title;
                    const newDescription = window.prompt("Update description", description) ?? description;
                    const newPoster = window.prompt("Update image URL", posterURL) ?? posterURL;
                    const newRating = window.prompt("Update rating (1-10)", String(rating)) ?? String(rating);
                    const newPrice = window.prompt("Update price", price) ?? price;
                    const updates = {
                      title: newTitle,
                      description: newDescription,
                      posterURL: newPoster,
                      rating: Number(newRating),
                      price: newPrice,
                    };
                    dispatch(update_game(_id, updates));
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    if (!_id) return;
                    if (window.confirm("Delete this game?")) {
                      dispatch(delete_game(_id));
                    }
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
