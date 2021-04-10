import {
  GET_CATEGORIES,
  GET_MOVIES,
  IS_LOADING,
  PAGINATE_MOVIES,
  REMOVE_MOVIE,
  SELECT_CATEGORY,
  TOGGLE_LIKE_MOVIE,
  TOGGLE_DISLIKE_MOVIE,
} from "../actions/types";

const initialState = {
  movies: [],
  categories: [],
  isLoding: false,
  selectedCategories: {},
  parPage: [3, 4, 5, 8],
  totalMovies: 0,
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
        totalMovies: action.payload.length,
        isLoding: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case REMOVE_MOVIE:
      let newCats;
      //Movies sans le film à supprimer
      const currentMovies = state.movies.filter(
        (item) => action.payload.id !== item.id
      );
      //categories restant
      const restcatAfterRemove = currentMovies.filter(
        (c) => c.category === action.payload.category
      ).length;
      //cat
      newCats =
        restcatAfterRemove === 0
          ? state.categories.filter((c) => c !== action.payload.category)
          : state.categories;

      return {
        ...state,
        movies: currentMovies,
        categories: newCats,
      };

    case TOGGLE_LIKE_MOVIE:
      console.log("TOGGLE_LIKE_MOVIE");

      const nextStat = {
        ...state,
        movies: [
          ...state.movies.map((e) => {
            if (e.id === action.payload.id) {
              if (e.dislikeActive === 1) {
                e.dislikeActive = 0;
                e.dislikes = parseInt(e.dislikes) - 1;
              }

              if (e.likeActive === 0) {
                e.likeActive = 1;
                e.likes = parseInt(e.likes) + 1;
              } else {
                e.likeActive = 0;
                e.likes = parseInt(e.likes) - 1;
              }
            }

            return e;
          }),
        ],
      };

      return nextStat;

    case TOGGLE_DISLIKE_MOVIE:
      console.log("TOGGLE_DISLIKE_MOVIE");

      const nextStat2 = {
        ...state,

        movies: [
          ...state.movies.map((e) => {
            if (e.id === action.payload.id) {
              if (e.likeActive === 1) {
                e.likeActive = 0;
                e.likes = parseInt(e.likes) - 1;
              }

              if (e.dislikeActive === 0) {
                e.dislikeActive = 1;
                e.dislikes = parseInt(e.dislikes) + 1;
              } else {
                e.dislikeActive = 0;
                e.dislikes = parseInt(e.dislikes) - 1;
              }
            }

            return e;
          }),
        ],
      };

      return nextStat2;

    case SELECT_CATEGORY:
      if (action.payload === state.selectedCategories) {
        return {
          ...state,
          selectedCategories: {},
          movies: [...state.movies],
        };
      } else {
        return {
          ...state,
          selectedCategories: action.payload,
          movies: [
            ...state.movies.filter((m) => m.category === action.payload),
          ],
        };
      }

    case PAGINATE_MOVIES:
      const indexOfLastPage =
        action.payload.currentPage * action.payload.pageLimit;
      const indexOfFirstPage = indexOfLastPage - action.payload.pageLimit;
      console.log(indexOfFirstPage, indexOfLastPage);
      let newState = state.movies.slice(indexOfFirstPage, indexOfLastPage);
      return {
        ...state,
        movies: newState,
      };

    default:
      return state;
  }
}

export default getmovies;
