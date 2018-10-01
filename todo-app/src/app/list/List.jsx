import React, { Component } from 'react';
import Item from './Item';
import { generateItems, getRandomValue } from './items';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);

    const input = '';
    const items = generateItems(props.size);
    const filteredItems = this.getFilteredItems(items, input);

    this.state = {
      input,
      items,
      filteredItems,
    };
  }

  getFilteredItems(items, input) {
    if (!this.props.isFilterable || input === '') {
      return items;
    }
    return items.filter(item => (
      item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    ));
  }

  getValue(value) {
    if (value <= 0) return 0;
    if (value === 1) return 1;
    return this.getValue(value - 1) + this.getValue(value - 2);
  }

  handleInput(input) {
    const filteredItems = this.getFilteredItems(this.state.items, input);

    this.setState({
      input,
      filteredItems,
    });
  }

  handleAddItem() {
    const { onChange } = this.props;
    const newItem = { name: this.state.input, value: getRandomValue() };
    const input = '';
    const items = [].concat(newItem, this.state.items);
    const filteredItems = this.getFilteredItems(items, input);

    this.setState({
      input,
      items,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  }

  handleRemoveItems() {
    const { onChange } = this.props;
    const items = this.state.items.filter(item => !item.isSelected);
    const filteredItems = this.getFilteredItems(items, this.state.input);

    this.setState({
      items,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  }

  handleDelete(index) {
    const { onChange } = this.props;
    const items = this.state.items.slice(0, index).concat(this.state.items.slice(index + 1));
    const filteredItems = this.getFilteredItems(items, this.state.input);

    this.setState({
      items,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  }

  handleSelect(index) {
    const filteredItems = this.state.filteredItems.concat();
    filteredItems[index].isSelected = !filteredItems[index].isSelected;
    this.setState({ filteredItems })
  }

  render() {
    const { filteredItems, input } = this.state;
    const hasSelectedItems = this.state.filteredItems.some(item => item.isSelected);

    return (
      <div className="list-container">
        <dv className="controls">
          <input
            className="input-name"
            onChange={event => this.handleInput(event.target.value)}
            value={input} >
          </input>
          <button
            className="add-item-control"
            onClick={() => this.handleAddItem()}
            disabled={!input}>
            Add
          </button>
          <button
            className="remove-items-control"
            onClick={() => this.handleRemoveItems()}
            disabled={!hasSelectedItems}>
            Del
          </button>
        </dv>

        <div className="list">
          {filteredItems.map((item, i) => (
            <Item
              name={item.name}
              value={this.getValue(item.value)}
              isSelected={item.isSelected}
              onSelect={() => this.handleSelect(i)}
              onDelete={() => this.handleDelete(i)}
            />
          ))}
        </div>

        <div className="footer">
          {`items: ${filteredItems.length}`}
        </div>
      </div>
    );
  }
}

export default List;
