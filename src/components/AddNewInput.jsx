import React, { Component } from "react";
import Calendar from "./Calendar";

export default class AddNewInput extends Component {
  render() {
    return (
      <>
        <form
          action=""
          className="main-container__add-new-item"
          onSubmit={this.props.handleOnSubmit}
        >
          <input
            type="text"
            name="addItem"
            id="addItem"
            placeholder="Add new..."
            value={this.props.value}
            onChange={this.props.handleOnChange}
          />
          <span className="todo__calendar">
            <Calendar handleDate={this.props.handleDate} />
            <i className="far fa-calendar-alt"></i>
          </span>
          <button id="add" type="submit">
            Add
          </button>
        </form>
      </>
    );
  }
}
