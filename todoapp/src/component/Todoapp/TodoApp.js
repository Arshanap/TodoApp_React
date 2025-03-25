import React, { Component } from "react";
import "./TodoApp.css";
import Modal from "react-modal";



export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    isOpen: false,
    selectedItem: "",
    editIndex: null,
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItem = (event) => {
    event.preventDefault();
    const { input } = this.state;

    if (input !== "") {
      this.setState({
        items: [...this.state.items, input],
        input: "",
      });
    }
  };

  deleteItem = (index) => {
    this.setState({
      items: this.state.items.filter((_, i) => index !== i),
    });
  };

  openEditModal = (item, index) => {
    this.setState({ selectedItem: item, editIndex: index, isOpen: true });
  };

  updateItem = (event) => {
    event.preventDefault(); 
    const { items, selectedItem, editIndex } = this.state;

    if (selectedItem !== "" && editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = selectedItem;

      this.setState({
        items: updatedItems,
        isOpen: false,
        selectedItem: "",
        editIndex: null,
      });
    }
  };

  closeModal = () => {
    this.setState({ isOpen: false, selectedItem: "", editIndex: null });
  };

  render() {
    const { input, items, isOpen, selectedItem } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItem}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items..."
          />
        </form>

        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}
              <span className="icons">
                <i className="fa-solid fa-pen" onClick={() => this.openEditModal(data, index)}></i>
                <i className="fa-solid fa-trash-can" onClick={() => this.deleteItem(index)}></i>
              </span>
            </li>
          ))}
        </ul>

        <Modal isOpen={isOpen} onRequestClose={this.closeModal}>
          <div className="modal-content">
            <form onSubmit={this.updateItem}>
              <h2 className="editTitile">Edit Item</h2>
              <input
                type="text"
                value={selectedItem}
                onChange={(e) => this.setState({ selectedItem: e.target.value })}
                className="edit-input"
              />
              <div className="modal-buttons">
                <button type="button" className="close-btn" onClick={this.closeModal}>Close</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
