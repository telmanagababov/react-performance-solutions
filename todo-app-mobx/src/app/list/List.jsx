import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { generateItems, getRandomValue } from './items';
import ListModel from './list.model';
import Item from './Item';
import './List.css';

@observer
class List extends Component {
  constructor(props) {
    super(props);

    const { isFilterable } = this.props;
    const items = generateItems(props.size);
    this.model = new ListModel({ items, isFilterable });
  }

  getValue(value) {
    if (value <= 0) return 0;
    if (value === 1) return 1;
    return this.getValue(value - 1) + this.getValue(value - 2);
  }

  handleInput(input) {
    this.model.set({ input });
  }

  handleAddItem() {
    const { onChange } = this.props;
    const newItem = { name: this.model.input, value: getRandomValue() };

    this.model.input = '';
    this.model.items.unshift(newItem);
    onChange(this.model.items);
  }

  handleRemoveItems() {
    const { onChange } = this.props;
    const { items } = this.model;
    const selectedItems = items.filter(item => item.isSelected);

    selectedItems.forEach((item) => items.remove(item));
    onChange(items);
  }

  handleDelete(index) {
    const { onChange } = this.props;
    const { items } = this.model;
    
    items.remove(items[index]);
    onChange(items);
  }

  handleSelect(index) {
    const item = this.model.items[index];
    item.isSelected = !item.isSelected;
  }

  render() {
    const { filteredItems, input } = this.model;
    const hasSelectedItems = filteredItems.some(item => item.isSelected);

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
