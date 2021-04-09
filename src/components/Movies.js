import React, { Component } from "react";

import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import {
  getMovies,
  removeMovie,
  toggleLikeMovie,
  selectCategory,
  paginate,
  toggleDisLikeMovie,
} from "../Redux/actions/getmovies";
import { connect } from "react-redux";
import MoviesCategories from "./MoviesCategories";
import MoviesPagination from "./MoviesPagination";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { pageLimit: 3 };
  }
  componentDidMount() {
    this.props.getMovies();
  }
  componentDidUpdate() {}
  remove = (movie) => {
    this.props.removeMovie(movie);
  };
  toggleLike = (movie) => {
    this.props.toggleLikeMovie(movie);
  };

  toggleDisLike = (movie) => {
    this.props.toggleDisLikeMovie(movie);
  };
  selectCategory = (cat) => {
    this.props.selectCategory(cat);
  };

  onChangePage = (data) => {
    this.props.paginate(data);
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
                onChange={(e) => this.setState({ pageLimit: e.target.value })}
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
                  toggleDisLike={this.toggleDisLike}
                />
              ))
            )}
          </div>

          <MoviesPagination
            totalRecords={movies.length}
            initialPage={1}
            pagesToshow={2}
            pageLimit={this.state.pageLimit || 3}
            onChangePage={this.onChangePage}
          />
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
  toggleDisLikeMovie,
  selectCategory,
  paginate,
})(Movies);
