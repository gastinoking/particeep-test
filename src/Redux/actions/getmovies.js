import {
  GET_CATEGORIES,
  GET_MOVIES,
  IS_LOADING,
  REMOVE_MOVIE,
  TOGGLE_LIKE_MOVIE,
} from "./types";
import { movies$ } from "../../API/movies";

export const getMovies = () => (dispatch) => {
  dispatch(setIsLoading());
  movies$
    .then((movies) => {
      dispatch({ type: GET_MOVIES, payload: movies });
      dispatch({
        type: GET_CATEGORIES,
        payload: movies.map((movie) => movie.category),
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
