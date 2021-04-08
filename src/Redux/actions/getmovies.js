import {
  GET_CATEGORIES,
  GET_MOVIES,
  IS_LOADING,
  REMOVE_MOVIE,
  SELECT_CATEGORY,
  TOGGLE_LIKE_MOVIE,
} from "./types";
import { movies$ } from "../../API/movies";

export const getMovies = () => (dispatch) => {
  dispatch(setIsLoading());
  movies$
    .then((movies) => {
      dispatch({ type: GET_MOVIES, payload: movies });

      let categories = movies.map((movie) => {
        return movie.category;
      });
      dispatch({
        type: GET_CATEGORIES,
        payload: Array.from(new Set(categories)),
      });
    })
    .catch((errors) => console.log(errors));
};

export const setIsLoading = () => {
  return { type: IS_LOADING };
};

export const removeMovie = (movie) => {
  return { type: REMOVE_MOVIE, payload: movie };
};

export const toggleLikeMovie = (movie) => {
  return { type: TOGGLE_LIKE_MOVIE, payload: movie };
};

export const selectCategory = (cat) => {
  return { type: SELECT_CATEGORY, payload: cat };
};
