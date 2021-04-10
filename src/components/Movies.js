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
import movieImg from "../assets/images/img.jpg";

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
      <div className="mx-4 lg:mx-16  pt-5">
        <div className="">
          <div className="flex justify-center items-center rounded-md overflow-hidden bg-gradient-to-t from-red-600 via-red-800 to-red-900">
            <div className="flex flex-col lg:flex-row">
              <div className="flex lg:w-1/2 justify-center items-center h-auto">
                <h1 className="text-white text-5xl font-semibold uppercase tracking-wider">
                  Liste des films
                </h1>
              </div>

              <div className="lg:w-1/2">
                <img
                  src={movieImg}
                  alt=""
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center flex-wrap bg-white my-3 rounded-md  shadow">
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
                className="w-32 bg-gray-200 text-xl p-1 rounded mr-3"
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

          <div className="moviesContainer grid gap-4 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {loading ? (
              <div className="h-screen fixed  bg-gray-900 bg-opacity-75 inset-0 flex flex-col justify-center items-center transition duration-300">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <h1 className="text-white">Chargement...</h1>
              </div>
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
            totalRecords={this.props.totalMovies}
            initialPage={1}
            pageLimit={parseInt(this.state.pageLimit) || 3}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.getmovises.movies,
  totalMovies: state.getmovises.totalMovies,
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
