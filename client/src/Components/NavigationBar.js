import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Register from "./Register";
import Login from "./Login";
import { logout, getAuth } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const NavigationBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const logoutUser = () => {
    dispatch(logout());
  };

  useEffect(()=> {
    dispatch(getAuth())
  }, [])

  const userNotAuth = (
    <>
      <Register />
      <Login />
    </>
  );

  const userAuth = (
    <>
      <Nav.Link className="nav-link">
        👤 {user && user.fullName}
      </Nav.Link>
      <Nav.Link className="nav-link" onClick={logoutUser} style={{ cursor: 'pointer' }}>
        🚪 Logout
      </Nav.Link>
    </>
  );
  
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          🎮 EpicGameStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? userAuth: userNotAuth}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
