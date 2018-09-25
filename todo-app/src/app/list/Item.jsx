import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  render() {
    const { name, value, onDelete } = this.props;

    return (
      <div className="item">
        <div className="item-name">
          {name}
        </div>
        <div className="item-value">
          {value}
        </div>
        <div 
          className="item-remove-icon"
          onClick={() => onDelete()}
        >X</div>
      </div>
    );
  }
}

export default Item;
