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
      let  newCats ;
      //Movies sans le film à supprimer
      const currentMovies = state.movies.filter((item) => action.payload.id !== item.id)
      //categories restant
      const restcatAfterRemove = currentMovies.filter(c=>c.category===action.payload.category).length
        //cat
      newCats = restcatAfterRemove===0 ? state.categories.filter(c=>c!==action.payload.category) : state.categories

      return {
        ...state,
        movies:currentMovies ,
        categories:newCats
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
      //index de  la catégorie  dans la liste
      const indexCat = state.selectedCategories.findIndex( cat=> cat === action.payload);
      //Si la catégorie n' existe dans la liste
      if (indexCat !== -1) {

        return {
          ...state,
          selectedCategories: [
            ...state.selectedCategories.filter((cat) => cat !== action.payload),
          ],
          movies: [
              ...state.movies.filter(m=>state.selectedCategories.includes(m.category)),

          ],
        };
      } else {

        return {
          ...state,
          selectedCategories: [...state.selectedCategories, action.payload],
          movies: [
            ...state.movies.filter(m=>m.category===action.payload),
          ],
        };
      }

    default:
      return state;
  }
}

export default getmovies;
