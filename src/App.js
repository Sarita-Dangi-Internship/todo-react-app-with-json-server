import "./styles/main.scss";
import Header from "./components/Header";
import AddNewInput from "./components/AddNewInput";
import Filter from "./components/FilterSortItems";
import CheckListItem from "./components/CheckListItem";
import React, { Component } from "react";
import http from "./utils/http";
import axios from "axios";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const api = axios.create({
  baseURL: "http://localhost:3004",
});
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
   * to get list of tasks
   */
  fetchTasks = async () => {
    try {
      const { data: response } = await api.get("/todoitems");
      console.log("res", response);
      this.setState({ items: response });
    } catch (error) {
      console.log(error);
    }
  };

  handleOnChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };
  handleDate = (date) => {
    this.setState({
      createdDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/todoitems", {
        task: this.state.newTodo,
        createdDate: this.state.createdDate,
        completed: this.state.completed,
      });
      console.log("post", response);
      this.setState({
        newTodo: "",
        createdDate: new Date(),
      });
      this.fetchTasks();
    } catch (error) {
      console.log(error);
    }
    // this.setState({
    //   items: [
    //     ...this.state.items,
    //     {
    //       task: this.state.newTodo,
    //       createdDate: this.state.createdDate,
    //       completed: this.state.completed,
    //     },
    //   ],
    // });
    // this.setState({
    //   newTodo: "",
    //   createdDate: new Date(),
    // });
    // console.log(this.state.items);
  };

  handleOnDelete = async (id) => {
    try {
      const items = await api.delete(`/todoitems/${id}`);
      console.log("delete", items);
      this.fetchTasks();
    } catch (error) {
      console.log(error);
    }

    // const items = this.state.items.filter((item, index) => index !== index);
    // this.setState({ items: items });
  };

  editTask = async (id, newtask) => {
    const editedTaskList = await api.patch(`/todoitems/${id}`, {
      task: newtask,
    });
    console.log("edit", editedTaskList);
    this.fetchTasks();
    // const editedTaskList = this.state.items.map((item, ind) => {
    //   if (id === ind) {
    //     return { ...item, task: newtask };
    //   }
    //   return item;
    // });
    // this.setState({ items: editedTaskList });
  };

  // handleOnFilter = (event) => {
  //   this.setState({ filter: event.target.value });
  // };

  // toggleTaskCompleted = (id) => {
  //   const updatedItems = this.state.items.map((item, id) => {
  //     if (index === index) {
  //       return { ...item, completed: !item.completed };
  //     }
  //     return item;
  //   });
  //   this.setState({ items: updatedItems });
  // };

  // handleChangeOnSort = (sortBy) => {
  //   const { items } = this.state;
  //   console.log("sort", sortBy);
  //   let sortedItems = items;
  //   const sorted = sortedItems.sort(
  //     (d1, d2) =>
  //       new Date(new Date(d2.createdDate)) - new Date(new Date(d1.createdDate))
  //   );
  //   this.setState({ sortBy });
  // };

  // toggleSortAsc = () => {
  //   this.setState({ sortAsc: !this.state.sortAsc });
  //   console.log("toggle", this.state.sortAsc);
  // };

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
          {/* <Filter
            filterNames={FILTER_NAMES}
            filter={this.state.filter}
            handleOnFilter={this.handleOnFilter}
            handleChangeOnSort={this.handleChangeOnSort}
            handleOnSort={this.sortByDate}
            toggleSortAsc={this.toggleSortAsc}
          /> */}

          <div className="main-container__checklist-items">
            <form>
              {/* {this.state.items
                .filter(FILTER_MAP[this.state.filter])
                .map((item, index) => (
                  <CheckListItem
                    key={index}
                    item={item}
                    index={index}
                    completed={item.completed}
                    toggleTaskCompleted={this.toggleTaskCompleted}
                    handleOnDelete={this.handleOnDelete}
                    editTask={this.editTask}
                  />
                ))} */}

              {this.state.items.map((item) => (
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
