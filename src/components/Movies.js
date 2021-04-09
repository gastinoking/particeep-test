import React, { Component } from "react";

import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import {
  getMovies,
  removeMovie,
  toggleLikeMovie,
  selectCategory,
} from "../Redux/actions/getmovies";
import { connect } from "react-redux";
import MoviesCategories from "./MoviesCategories";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 12 };
  }
  componentDidMount() {
    this.props.getMovies();
    console.log("didUp", this.props);
  }
  componentDidUpdate() {}
  remove = (movie) => {
    this.props.removeMovie(movie);
  };
  toggleLike = (movie) => {
    this.props.toggleLikeMovie(movie);
  };
  selectCategory = (cat) => {
    this.props.selectCategory(cat);
  };
  selectChangePagination = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { movies, loading, categories } = this.props;
    return (
      <div className="min-h-screen bg-gray-200 pb-10 text-gray-700">
        <div className="mx-4 lg:mx-16">
          <div className="h-32 bg-gray-700 flex justify-center items-center rounded-md">
            <h1 className="text-white text-3xl font-semibold ">
              Liste des films
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <MoviesCategories
              categories={categories}
              selectCategory={this.selectCategory}
            />
            <div className="">
              {/* {JSON.stringify(this.props.parPage)} */}
              {JSON.stringify(this.state.value)}
              <select
                value={this.state.value}
                name="parpage"
                className="w-32 bg-gray-400 text-xl p-1 rounded"
                onChange={this.selectChangePagination}
              >
                {this.props.parPage.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="moviesContainer grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {loading ? (
              <h1>Chargement ....</h1>
            ) : (
              movies.map((movie) => (
                <MovieItem
                  movie={movie}
                  key={movie.id.toString()}
                  remove={this.remove}
                  toggleLike={this.toggleLike}
                />
              ))
            )}
          </div>

          <div className="mt-5">
            <button className="p-2 bg-gray-500 rounded shadow mr-3 px-5 shadow-lg text-gray-100">
              Precedent
            </button>
            <button className="p-2 bg-gray-500 rounded shadow mr-3 px-5 shadow-lg text-gray-100">
              Suivant
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.getmovises.movies,
  loading: state.getmovises.isLoding,
  categories: state.getmovises.categories,
  parPage: state.getmovises.parPage,
});
export default connect(mapStateToProps, {
  getMovies,
  removeMovie,
  toggleLikeMovie,
  selectCategory,
})(Movies);
