import React, { Component } from "react";

export default class FilterSortItems extends Component {
  render() {
    return (
      <>
        <div className="main-container__items-filter-sort">
          {/* filter section starts */}
          <form action="" className="filter">
            <label htmlFor="filter">Filter</label>
            <select
              id="filter"
              className="select"
              value={this.props.filter}
              onChange={this.props.handleOnFilter}
            >
              {this.props.filterNames.map((name) => (
                <option role="button" key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </form>
          {/*  filter section ends */}

          {/*  sort section starts */}
          <form action="" className="sort">
            <label htmlFor="sort">Sort</label>
            <select
              id="sort"
              name="sort"
              className="select"
              onChange={(e) => this.props.handleChangeOnSort(e.target.value)}
            >
              <option value="addedDate">Added date</option>
              <option value="dueDate">Due date</option>
            </select>
            <i
              className="fas fa-sort-amount-down-alt"
              onClick={() => this.props.toggleSortAsc()}
            ></i>
          </form>
          {/*  sort section ends  */}
        </div>
      </>
    );
  }
}
