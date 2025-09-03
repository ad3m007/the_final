import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { login } from "../Redux/actions";

Modal.setAppElement("#root");

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const loginUser = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
    toggleModal();
  };

  return (
    <div>
      <button onClick={toggleModal}>Login</button>
      <Modal isOpen={modalIsOpen} onRequestClose={toggleModal}>
        <button onClick={toggleModal}>close</button>
        <div>Register</div>
        <form>
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
          <button onClick={loginUser}>Sign in</button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
