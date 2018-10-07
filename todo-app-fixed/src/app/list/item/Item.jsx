import React, { PureComponent } from 'react';
import './Item.css';

class Item extends PureComponent {
  handleSelect = () => {
    const { id, onSelect } = this.props;
    onSelect(id);
  };

  handleDelete = (event) => {
    const { id, onDelete } = this.props;
    event.stopPropagation();
    onDelete(id);
  };

  render() {
    const { name, value, isSelected, style } = this.props;

    return (
      <div
        className={`item ${isSelected ? 'item-selected' : ''}`}
        style={style}
        onClick={this.handleSelect}
      >
        <div className="item-name">
          {name}
        </div>
        <div className="item-value">
          {value}
        </div>
        <div
          className="item-remove-icon"
          onClick={this.handleDelete}
        >X</div>
      </div>
    );
  }
}

export default Item;
