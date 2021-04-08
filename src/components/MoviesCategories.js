import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MoviesCategories extends Component {
  activeClass = (categorie) => {
    return this.props.selectedCategories.includes(categorie)
      ? " bg-red-400"
      : " bg-white";
  };
  render() {
    return (
      <div className="catContainer flex flew-row flex-wrap">
        {this.props.categories.map((cat) => (
          <button
            key={cat}
            className={"p-1  m-2 rounded shadow border" + this.activeClass(cat)}
            onClick={() => this.props.selectCategory(cat)}
          >
            <h1 className="text-sm">{cat}</h1>
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
