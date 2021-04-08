import React, { Component } from "react";

export default class MovieItem extends Component {
  render() {
    const movie = this.props.movie;
    return (
      <div className="border border-gray-200 p-4 bg-white rounded-md shadow mb-4">
        <div className="flex justify-between mb-10">
          <div className="flex justify-between w-full">
            <h2>{movie.title}</h2>
            <h4 className="font-semibold text-xl">{movie.category}</h4>
          </div>
          <button
            className="text-red-500"
            onClick={() => this.props.remove(movie)}
          >
            <svg height="24" width="24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex">
            <span> Like {movie.likes}</span>
          </div>
          <div className="flex flex-1">
            {this.props.alreadyLike ? (
              <button
                onClick={() => this.props.toggleLike(movie)}
                className="bg-red-600 w-full inline-block mx-5 p-2 rounded text-white flex justify-center"
              >
                <svg height="24" width="24">
                  <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                  <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => this.props.toggleLike(movie)}
                className="bg-green-600 w-full inline-block mx-5 p-2 rounded text-white flex justify-center"
              >
                <svg height="24" width="24">
                  <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex">
            <span> Unlike {movie.dislikes}</span>
          </div>
        </div>
      </div>
    );
  }
}
