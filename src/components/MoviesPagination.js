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
    this.getPager();
    const totalPage = Math.ceil(this.props.totalRecords / this.props.pageLimit);

    this.setState({
      currentPage:
        this.state.currentPage >= totalPage ? 1 : this.state.currentPage + 1,
    });
  }
  priviousePage() {
    this.getPager();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1,
    });
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
    const totalPages = Math.ceil(
      this.props.totalRecords / this.props.pageLimit
    );
    this.props.onChangePage({
      page_number: this.state.currentPage,
      page_size: totalPages,
    });
  }

  componentDidUpdate(prevProps, prevState) {}
  render() {
    // if (!this.state.totalRecords || this.state.totalPage === 1) return null;
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
          {this.state.currentPage}
          <br />
          pageLimit: {this.state.pageLimit}
          <li>
            <button
              disabled={
                this.state.currentPage ===
                Math.ceil(this.props.totalRecords / this.props.pageLimit)
              }
              onClick={() => this.nexPage()}
              className="p-2 bg-gray-500 rounded shadow mr-3 px-5 shadow-lg text-gray-100"
            >
              Suivants
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
