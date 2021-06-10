import React, { Component } from "react";

export default class CheckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      newTodo: this.props.newTodo,
    };
  }

  handleOnEdit = () => {
    this.setState({ isEditMode: true });
  };
  handleOnCancel = () => {
    this.setState({ isEditMode: false });
  };
  handleOnChange = (event) => {
    this.setState({ newTodo: event.target.value });
    console.log("edit", this.state.newTodo);
  };
  handleOnSave = (index) => {
    this.props.editTask(this.props.index, this.state.newTodo);
    this.setState({ newTodo: "" });
    this.setState({ isEditMode: false });
  };

  render() {
    const { task, createdDate, completed } = this.props.item;
    const { handleOnDelete, index, toggleTaskCompleted } = this.props;
    const { isEditMode } = this.state;
    return (
      <>
        <div className="checklist-row">
          {!isEditMode ? (
            <>
              <div className="form-group">
                <label className="styled-checkbox" htmlFor={index}>
                  {task || "Buy groceries for next week"}
                  <input
                    type="checkbox"
                    id={index}
                    value="item1"
                    defaultChecked={completed}
                    onChange={() => toggleTaskCompleted(index)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="icons-group">
                <i
                  className="fas fa-pen icon icon-pen tooltip"
                  onClick={() => {
                    this.handleOnEdit(index);
                  }}
                >
                  <span className="tooltiptext">Edit todo</span>
                </i>
                <i
                  className="fas fa-trash-alt icon icon-trash tooltip "
                  onClick={() => {
                    handleOnDelete(index);
                  }}
                >
                  <span className="tooltiptext">Delete todo</span>
                </i>
                <div className="date">
                  <i className="fas fa-info-circle tooltip">
                    <span className="tooltiptext">Created date</span>
                  </i>
                  {createdDate || "28 Jun 2020"}
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="form-group">
                <label className="styled-checkbox" htmlFor={index}>
                  <input type="checkbox" id={index} value="item3" />
                  <span className="checkmark"></span>
                </label>
                <input
                  type="text"
                  className="edit-input"
                  defaultValue={task}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="icons-group">
                <i
                  className="fas fa-check icon icon-pen tooltip"
                  onClick={() => {
                    this.handleOnSave(index);
                  }}
                >
                  <span className="tooltiptext">Save todo</span>
                </i>
                <i
                  className="fas fa-times icon icon-trash tooltip"
                  onClick={() => this.handleOnCancel(index)}
                >
                  <span className="tooltiptext">Cancel edit</span>
                </i>
                <i
                  className="fas fa-trash-alt icon icon-trash tooltip"
                  onClick={() => {
                    handleOnDelete(index);
                  }}
                >
                  <span className="tooltiptext">Delete todo</span>
                </i>
                <div className="date">
                  <i className="fas fa-info-circle tooltip">
                    <span className="tooltiptext">Created date</span>
                  </i>
                  28 Jun 2020
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
