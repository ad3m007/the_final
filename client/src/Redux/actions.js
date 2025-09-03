import { REGISTER, LOGIN, LOGOUT, GET_AUTH_USER, FETCH_GAMES, ADD_GAME, ADD_TO_LIBRARY, FETCH_LIBRARY, REMOVE_FROM_LIBRARY } from "./actionTypes";
import axios from "axios";

export const register = (newUser) => (dispatch) => {
  axios
    .post("users/register", newUser)
    .then((res) => dispatch({ type: REGISTER, payload: res.data }))
    .catch((err) => console.error(err));
};

export const login = (user) => (dispatch) => {
  axios
    .post("users/login", user)
    .then((res) => dispatch({ type: LOGIN, payload: res.data }))
    .catch((err) => console.error(err));
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const getAuth = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  axios
    .get("users/isAuth", config)
    .then((res) => dispatch({ type: GET_AUTH_USER, payload: res.data }))
    .catch((err) => console.error(err));
};

export const fetch_games = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/games");
    dispatch({ type: FETCH_GAMES, payload: data });
  } catch (err) {
    console.error(err);
  }
}

export const add_game = (game) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { data } = await axios.post("/api/games", game, config);
    dispatch({ type: ADD_GAME, payload: data });
  } catch (err) {
    console.error(err);
  }
}

export const update_game = (id, updates) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.put(`/api/games/${id}`, updates, config);
    dispatch(fetch_games());
  } catch (err) {
    console.error(err);
  }
}

export const delete_game = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.delete(`/api/games/${id}`, config);
    dispatch(fetch_games());
  } catch (err) {
    console.error(err);
  }
}

export const add_to_library = (gameId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { data } = await axios.post("/api/library/add", { gameId }, config);
    dispatch({ type: ADD_TO_LIBRARY, payload: data.game });
  } catch (err) {
    console.error(err);
  }
};

export const fetch_library = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { data } = await axios.get("/api/library", config);
    dispatch({ type: FETCH_LIBRARY, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const remove_from_library = (gameId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.delete(`/api/library/${gameId}`, config);
    dispatch({ type: REMOVE_FROM_LIBRARY, payload: gameId });
  } catch (err) {
    console.error(err);
  }
};
