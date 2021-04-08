import React, { Component } from "react";

import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import {
  getMovies,
  removeMovie,
  toggleLikeMovie,
} from "../Redux/actions/getmovies";
import { connect } from "react-redux";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    const { movies, loading, categories } = this.props;
    return (
      <div className="min-h-screen bg-gray-200 pb-10">
        <div className="mx-4 lg:mx-16">
          <div className="h-32 bg-gray-700 flex justify-center items-center rounded-md">
            <h1 className="text-white text-3xl font-semibold ">
              Liste des films
            </h1>
          </div>

          <div className="catContainer flex flew-row flex-wrap">
            {categories.map((cat) => (
              <button className="p-1 bg-white m-2 rounded shadow border">
                <h1 className="text-sm">{cat}</h1>
              </button>
            ))}
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
});
export default connect(mapStateToProps, {
  getMovies,
  removeMovie,
  toggleLikeMovie,
})(Movies);
