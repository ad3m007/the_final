import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { register } from "../Redux/actions";

Modal.setAppElement("#root");

const Register = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const [fullName, setFull] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const newRegister = () => {
    const newUser = {
        fullName,
        email,
        password
    }
    dispatch(register(newUser))
    toggleModal()
  }

  return (
    <div>
      <button onClick={toggleModal}>Register</button>
      <Modal isOpen={modalIsOpen} onRequestClose={toggleModal}>
        <button onClick={toggleModal}>close</button>
        <div>Register</div>
        <form>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full name"
            onChange={(e) => setFull(e.target.value)}
          />
          <br></br>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button onClick={newRegister}>Sign up</button>
        </form>
      </Modal>
    </div>
  );
};

export default Register;
