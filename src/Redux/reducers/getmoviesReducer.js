import {
  GET_CATEGORIES,
  GET_MOVIES,
  IS_LOADING,
  REMOVE_MOVIE,
  SELECT_CATEGORY,
  TOGGLE_LIKE_MOVIE,
} from "../actions/types";

const initialState = {
  movies: [],
  categories: [],
  isLoding: false,
  selectedCategories: [],
  parPage: [12, 4, 8],
};

function getmovies(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoding: true,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        isLoding: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case REMOVE_MOVIE:
      console.log("REMOVE_MOVIE", action.payload.id);

      return {
        ...state,
        movies: state.movies.filter((item) => action.payload.id !== item.id),
      };

    case TOGGLE_LIKE_MOVIE:
      let nextStat;
      console.log("TOGGLE_LIKE_MOVIE");
      let newMovie = {};
      if (action.payload.alreadyLike) {
        // newMovie = { ...action.payload, ...{ alreadyLike: 0 } };
        nextStat = {
          ...state,
          movies: state.find((item) => {
            if (item.id === action.payload.id) {
              item.alreadyLike = 1;
            }
          }),
        };
      } else {
        // newMovie = { ...action.payload, ...{ alreadyLike: 0 } };
        nextStat = {
          ...state,
          movies: state.find((item) => {
            if (item.id === action.payload.id) {
              item.alreadyLike = 0;
            }
          }),
        };
      }
      return nextStat;

    case SELECT_CATEGORY:
      const indexCat = state.selectedCategories.findIndex(
        (cat) => cat === action.payload
      );

      if (indexCat !== -1) {
        return {
          ...state,
          selectedCategories: [
            ...state.selectedCategories.filter((cat) => cat !== action.payload),
          ],
          movies: [
            ...state.movies.filter(
              (movie) => movie.category === action.payload
            ),
          ],
        };
      } else {
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, action.payload],
          movies: [
            ...state.movies.filter(
              (movie) => movie.category === action.payload
            ),
          ],
        };
      }

    default:
      return state;
  }
}

export default getmovies;
