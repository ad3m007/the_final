import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { add_game, update_game, delete_game } from "../Redux/actions";

const customStyles = {
  content: {
    position: 'relative',
    inset: 'auto',
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    borderRadius: '0',
    outline: 'none',
    padding: '0',
  },
};

Modal.setAppElement("#root");

const AddGame = () => {
  let subtitle;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterURL, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("0");

  // update modal state
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [uTitle, setUTitle] = useState("");
  const [uDescription, setUDescription] = useState("");
  const [uPosterURL, setUPosterURL] = useState("");
  const [uRating, setURating] = useState(0);
  const [uPrice, setUPrice] = useState("");

  // delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

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
    setPrice("0");
    
    toggleModal();
  };

  const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

  const onUpdateGame = () => {
    const updates = {};
    if (uTitle) updates.title = uTitle;
    if (uDescription) updates.description = uDescription;
    if (uPosterURL) updates.imageUrl = uPosterURL;
    if (uRating) updates.rating = Number(uRating);
    if (uPrice) updates.price = uPrice;
    if (!updateId) return;
    dispatch(update_game(updateId, updates));
    setUpdateId("");
    setUTitle("");
    setUDescription("");
    setUPosterURL("");
    setURating(0);
    setUPrice("");
    toggleUpdateModal();
  };

  const onDeleteGame = () => {
    if (!deleteId) return;
    dispatch(delete_game(deleteId));
    setDeleteId("");
    toggleDeleteModal();
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {user && user.role === 'admin' && (
        <div className="button-container">
          <Button className="add-game-btn" onClick={toggleModal}>
            🎮 Add New Game
          </Button>
          <Button variant="warning" onClick={toggleUpdateModal}>
            ✏️ Update Game
          </Button>
          <Button variant="danger" onClick={toggleDeleteModal}>
            🗑️ Delete Game
          </Button>
        </div>
      )}
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
                placeholder="0 or $29.99"
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

      {/* Update Game Modal */}
      <Modal
        isOpen={updateModalOpen}
        onRequestClose={toggleUpdateModal}
        style={customStyles}
        contentLabel="Update Game Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">✏️ Update Game</h2>
          <Button className="close-btn" onClick={toggleUpdateModal}>✕ Close</Button>
        </div>
        <Form className="game-form">
          <Form.Group className="form-group">
            <Form.Label>Game ID</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter game id"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>🎮 Game Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Leave blank to keep current"
                value={uTitle}
                onChange={(e) => setUTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>⭐ Rating</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                step="0.1"
                placeholder="Leave blank to keep current"
                value={uRating}
                onChange={(e) => setURating(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" className="form-group">
              <Form.Label>📝 Game Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Leave blank to keep current"
                value={uDescription}
                onChange={(e) => setUDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>🖼️ Game Cover URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Leave blank to keep current"
                value={uPosterURL}
                onChange={(e) => setUPosterURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="form-group">
              <Form.Label>💰 Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Leave blank to keep current"
                value={uPrice}
                onChange={(e) => setUPrice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button className="submit-btn" onClick={onUpdateGame}>✏️ Update</Button>
        </Form>
      </Modal>

      {/* Delete Game Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={toggleDeleteModal}
        style={customStyles}
        contentLabel="Delete Game Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">🗑️ Delete Game</h2>
          <Button className="close-btn" onClick={toggleDeleteModal}>✕ Close</Button>
        </div>
        <Form className="game-form">
          <Form.Group className="form-group">
            <Form.Label>Game ID</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter game id"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" className="submit-btn" onClick={onDeleteGame}>🗑️ Delete</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddGame;
