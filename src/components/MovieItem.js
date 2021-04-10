import React, { Component } from "react";
import movieImg from "../assets/images/img.jpg";

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const movie = this.props.movie;
    const likeActiveClasse =
      movie.likeActive === 1 ? "fill-current text-red-600 " : "";
    const dislikeActiveClasse =
      movie.dislikeActive === 1 ? "fill-current text-red-600 " : "";
    return (
      <div className="border border-gray-200 bg-white rounded-md shadow-md overflow-hidden transition duration-300 card-movie">
        <div className="relative overflow-hidden">
          <img src={movieImg} alt="" className="h-40 w-full object-cover" />

          <h4 className="absolute bottom-0 right-0 bg-red-700 text-sm text-white px-2 rounded-tl shadow ">
            {movie.category}
          </h4>

          <button
            onClick={() => this.props.toggleLike(movie)}
            className="w-full absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 card-like"
          >
            {movie.likeActive === 0 ? (
              <i className="far fa-thumbs-up text-8xl text-red-300"></i>
            ) : (
              <i className="far fa-thumbs-down text-8xl text-red-300"></i>
            )}
          </button>
        </div>

        <div className="flex justify-between  p-2 ">
          <div className="flex justify-between w-full">
            <h2 className="font-semibold text-lg text-red-700">
              {movie.title}
            </h2>
          </div>
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="flex  justify-start items-center">
            <button
              onClick={() => this.props.toggleLike(movie)}
              className={likeActiveClasse}
            >
              <svg
                height="24"
                width="24"
                className="fill-current text-gray-600"
              >
                <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
              </svg>
            </button>

            <span className="text-sm"> {movie.likes}</span>
          </div>

          <div className="flex ml-3 justify-between items-center">
            <div className="flex">
              <button
                onClick={() => this.props.toggleDisLike(movie)}
                className={dislikeActiveClasse}
              >
                <svg
                  height="24"
                  width="24"
                  className="fill-current text-gray-600"
                >
                  <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
                </svg>
              </button>

              <span className="text-sm ml-1"> {movie.dislikes}</span>
            </div>
            <div className="flex">
              <button
                title="supprimer"
                className="text-red-900  focus:outline-none ml-10 bg-gray-300 rounded-full p-1 shadow bg-opacity-75 transition duration-200 transform  hover:scale-125"
                onClick={() => this.props.remove(movie)}
              >
                <svg
                  height="24"
                  width="24"
                  className="fill-current text-red-600 "
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
