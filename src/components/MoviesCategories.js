import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MoviesCategories extends Component {
  activeClass = (categorie) => {
    return this.props.selectedCategories.includes(categorie)
      ? " bg-red-800 text-white"
      : " bg-white text-red-800";
  };
  render() {
    return (
      <div className="catContainer flex flew-row">
        {this.props.categories.map((cat) => (
          <button
            key={cat}
            className={
              "p-1 m-2 rounded  border-red-800 border focus:outline-none focus:ring ring-red-500 ring-opacity-50" +
              this.activeClass(cat)
            }
            onClick={() => this.props.selectCategory(cat)}
          >
            <h1 className="text-sm  px-1">{cat}</h1>
          </button>
        ))}
      </div>
    );
  }
}

// MoviesCategories.prototype = {
//   selectedCategories: PropTypes.array.isRequired,
//   selectCategory: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  selectedCategories: state.getmovises.selectedCategories,
});
export default connect(mapStateToProps, {})(MoviesCategories);
