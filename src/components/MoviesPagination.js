import React, { Component } from "react";

export default class MoviesPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: "",
      totalPage: "",
      currentPage: "",
      pagesToshow: "",
      pageLimit: 2,
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.totalRecords,
      pageLimit: this.props.pageLimit,
      pagesToshow: this.props.pagesToshow || 5,
      totalPage: Math.ceil(this.props.totalRecords / this.props.pageLimit),
      currentPage: this.props.initialPage || 1,
    });
  }

  nexPage() {
    this.setState({
      totalPage: Math.ceil(this.props.totalRecords / this.props.pageLimit),
    });

    this.setState({
      currentPage:
        this.state.currentPage >= this.state.totalPage
          ? 1
          : this.state.currentPage + 1,
    });
    this.getPager();
  }
  priviousePage() {
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1,
    });
    this.getPager();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalRecords: nextProps.totalRecords,
      pageLimit: nextProps.pageLimit,
      totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
      pagesToShow: nextProps.pagesToShow || 5,
    });
  }
  getPager() {
    this.props.onChangePage({
      page_number: this.state.currentPage,
      page_size: this.state.totalPages,
    });
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    return (
      <div>
        <ul className="mt-5 flex">
          <li>
            <button
              disabled={this.state.currentPage === 1}
              onClick={() => this.priviousePage()}
              className="p-2 bg-gray-500 rounded shadow mr-3 px-5 shadow-lg text-gray-100"
            >
              Precedent
            </button>
          </li>

          <li>
            <button
              disabled={
                this.state.currentPage ===
                Math.ceil(this.props.totalRecords / this.props.pageLimit)
              }
              onClick={() => this.nexPage()}
              className="p-2 bg-gray-500 rounded shadow mr-3 px-5 shadow-lg text-gray-100"
            >
              Suivant
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
