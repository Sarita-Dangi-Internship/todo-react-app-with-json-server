import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <>
        <header className="main-container__title main-container__title--color main-container__title--size">
          <i className="fas fa-check-square"></i>
          <h2>My Todos</h2>
        </header>
      </>
    );
  }
}
