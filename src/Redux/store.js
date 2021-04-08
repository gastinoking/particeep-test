import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import getmovies from "./reducers/getmoviesReducer";

const rootReducer = combineReducers({
  getmovises: getmovies,
});

// const initialState = {};

const middeleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middeleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
