import { REGISTER, LOGIN, LOGOUT, GET_AUTH_USER, FETCH_GAMES, ADD_GAME, ADD_TO_LIBRARY, FETCH_LIBRARY, REMOVE_FROM_LIBRARY } from "./actionTypes";

const initialStates = {
  user: null,
  token: null,
  msg: null,
  gamesData: [],
  libraryGames: [],
};

const reducer = (state = initialStates, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        msg: action.payload.msg,
      };
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        msg: action.payload.msg,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        msg: null,
        token: null,
        user: null,
      };
    case GET_AUTH_USER:
      return { ...state, user: action.payload.user };


      
      case FETCH_GAMES:
            return {...state, gamesData: action.payload}
        case ADD_GAME:
            return {...state, gamesData: [...state.gamesData, action.payload]}
        case ADD_TO_LIBRARY: {
            const exists = state.libraryGames.some(g => g._id === action.payload._id);
            return exists ? state : { ...state, libraryGames: [...state.libraryGames, action.payload] };
        }
        case FETCH_LIBRARY:
            return { ...state, libraryGames: action.payload };
        case REMOVE_FROM_LIBRARY:
            return { ...state, libraryGames: state.libraryGames.filter(g => g._id !== action.payload) };
            
    default:
      return state;



        
  }
};

export default reducer;





