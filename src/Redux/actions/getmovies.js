import {
  GET_CATEGORIES,
  GET_MOVIES,
  IS_LOADING,
  REMOVE_MOVIE,
  SELECT_CATEGORY,
  TOGGLE_LIKE_MOVIE,
  TOGGLE_DISLIKE_MOVIE,
  PAGINATE_MOVIES,
} from "./types";
import { movies$ } from "../../API/movies";

export const getMovies = () => (dispatch) => {
  dispatch(setIsLoading());
  movies$
    .then((movies) => {
      const allMovies = movies.map((m) => {
        return { ...m, likeActive: 0, dislikeActive: 0 };
      });
      dispatch({ type: GET_MOVIES, payload: allMovies });

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
export const toggleDisLikeMovie = (movie) => {
  return { type: TOGGLE_DISLIKE_MOVIE, payload: movie };
};

export const paginate = (data) => (dispatch) => {
  dispatch(setIsLoading());
  movies$
    .then((movies) => {
      dispatch({ type: GET_MOVIES, payload: movies });
      dispatch({ type: PAGINATE_MOVIES, payload: data });
    })
    .catch((errors) => console.log(errors));
};

export const selectCategory = (cat) => (dispatch) => {
  // ...state.movies.filter(
  //         (movie) => movie.category === action.payload
  //     ),

  dispatch(setIsLoading());
  movies$
    .then((movies) => {
      dispatch({ type: GET_MOVIES, payload: movies });
      dispatch({ type: SELECT_CATEGORY, payload: cat });

      // let categories = newmovies.map((movie) => {
      //     return movie.category;
      // });
      // dispatch({
      //     type: GET_CATEGORIES,
      //     payload: Array.from(new Set(categories)),
      // });
    })
    .catch((errors) => console.log(errors));
};
