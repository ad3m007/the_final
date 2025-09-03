import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { add_game } from "../Redux/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const AddGame = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterURL, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("FREE");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const dispatch = useDispatch();

  const addNewGame = () => {
    const newGame = {
      title,
      description,
      posterURL,
      rating,
      price,
    };
    dispatch(add_game(newGame));
    
    // Reset form fields
    setTitle("");
    setDescription("");
    setPoster("");
    setRating(0);
    setPrice("FREE");
    
    toggleModal();
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button className="add-game-btn" onClick={toggleModal}>
        🎮 Add New Game
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Add New Game Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title" ref={(_subtitle) => (subtitle = _subtitle)}>
            🎮 Add New Game
          </h2>
          <Button className="close-btn" onClick={toggleModal}>
            ✕ Close
          </Button>
        </div>
        <Form className="game-form">
          <Row className="mb-3">
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>🎮 Game Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter game title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>⭐ Rating</Form.Label>
              <Form.Control
                required
                type="number"
                min="1"
                max="10"
                step="0.1"
                placeholder="Rate from 1-10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" className="form-group">
              <Form.Label>📝 Game Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter game description and features"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>🖼️ Game Cover URL</Form.Label>
              <Form.Control
                required
                type="url"
                placeholder="https://example.com/game-cover.jpg"
                value={posterURL}
                onChange={(e) => setPoster(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>💰 Price</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="FREE or $29.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button className="submit-btn" onClick={addNewGame}>
            🎮 Add Game
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddGame;
