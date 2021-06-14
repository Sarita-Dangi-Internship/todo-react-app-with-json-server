import "./styles/main.scss";
import Header from "./components/Header";
import AddNewInput from "./components/AddNewInput";
import Filter from "./components/FilterSortItems";
import CheckListItem from "./components/CheckListItem";
import React, { Component } from "react";
import http from "./utils/http";
import * as todoService from "./services/todolist";
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default class App extends Component {
  state = {
    newTodo: "",
    createdDate: "",
    completed: false,
    filter: "All",
    isOldestFirst: true,
    sortBy: "addedDate",
    sortAsc: true,
    items: [],
  };

  componentDidMount() {
    this.fetchTasks();
  }

  /**
   * Function to get list of tasks
   */
  fetchTasks = async () => {
    try {
      const response = await todoService.fetchTask();
      this.setState({ items: response.data });
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * Function to get value when new task add
   */
  handleOnChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  /**
   * Function to get created data
   * @param {*} date
   */
  handleDate = (date) => {
    this.setState({
      createdDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    });
  };

  /**
   * Function to create new task
   * @param {*} event
   */
  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await todoService.addNewTask({
        task: this.state.newTodo,
        createdDate: this.state.createdDate,
        completed: this.state.completed,
      });
      this.setState({
        newTodo: "",
        createdDate: new Date(),
      });
      this.fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *  Function to delete task
   * @param {*} id
   */
  handleOnDelete = async (id) => {
    try {
      const items = await todoService.deletetaskId(id);
      this.fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *  Function to edit task
   * @param {*} id
   * @param {*} newtask
   */
  editTask = async (id, newtask) => {
    const editedTaskList = await todoService.editTaskById(id, {
      task: newtask,
    });
    this.fetchTasks();
  };

  /**
   * Function to take filter type from selected option
   * @param {*} event
   */
  handleOnFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  /**
   * Function to update checkbox for completed task
   * @param {*} id
   */
  toggleTaskCompleted = (id) => {
    const updatedItems = this.state.items.map((item) => {
      if (id === item.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };

  /**
   * Function to sort list by due-date
   * @param {*} sortBy
   */
  handleChangeOnSort = (sortBy) => {
    const { items } = this.state;
    let sortedItems = items;
    const sorted = sortedItems.sort(
      (d1, d2) =>
        new Date(new Date(d2.createdDate)) - new Date(new Date(d1.createdDate))
    );
    this.setState({ sortBy });
  };

  /**
   * Function to toggle asc and dec
   */
  toggleSortAsc = () => {
    this.setState({ sortAsc: !this.state.sortAsc });
  };

  render() {
    return (
      <div className="App">
        <div className="main-container">
          <Header />
          <AddNewInput
            value={this.state.newTodo}
            handleOnChange={this.handleOnChange}
            handleOnSubmit={this.handleOnSubmit}
            handleDate={this.handleDate}
          />
          <Filter
            filterNames={FILTER_NAMES}
            filter={this.state.filter}
            handleOnFilter={this.handleOnFilter}
            handleChangeOnSort={this.handleChangeOnSort}
            handleOnSort={this.sortByDate}
            toggleSortAsc={this.toggleSortAsc}
          />

          <div className="main-container__checklist-items">
            <form>
              {this.state.items
                .filter(FILTER_MAP[this.state.filter])
                .map((item) => (
                  <CheckListItem
                    key={item.id}
                    item={item}
                    completed={item.completed}
                    handleOnDelete={this.handleOnDelete}
                    editTask={this.editTask}
                    toggleTaskCompleted={this.toggleTaskCompleted}
                  />
                ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
