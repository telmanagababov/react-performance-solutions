import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './Item.css';

@observer
class Item extends Component {
  handleDelete(event) {
    event.stopPropagation();
    this.props.onDelete();
  }

  render() {
    const { name, value, isSelected, onSelect } = this.props;

    return (
      <div
        className={`item ${isSelected ? 'item-selected' : ''}`}
        onClick={onSelect}
      >
        <div className="item-name">
          {name}
        </div>
        <div className="item-value">
          {value}
        </div>
        <div
          className="item-remove-icon"
          onClick={(event) => this.handleDelete(event)}
        >X</div>
      </div>
    );
  }
}

export default Item;
