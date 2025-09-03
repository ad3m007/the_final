import './App.css';
import NavigationBar from './Components/NavigationBar';


import { useDispatch, useSelector } from "react-redux";
import { fetch_games } from "./Redux/actions";
import { useEffect } from "react";
import GameList from './Components/GameList';
import AddGame from "./Components/AddGame";
import Library from "./Components/Library";
import { Routes, Route, Link } from "react-router-dom";


function App() {

  const dispatch = useDispatch();
  const games = useSelector((state) => state.gamesData);

  useEffect(() => {
    dispatch(fetch_games());
  }, [dispatch]);

  return (
    <div className="App">
      <NavigationBar/>
      <div className="game-store-container" style={{paddingTop: 16}}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Link className="nav-link" to="/">Store</Link>
          <Link className="nav-link" to="/library">Library</Link>
        </div>
        <Routes>
          <Route path="/" element={<>
            {games && <GameList />}
            <AddGame />
          </>} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
