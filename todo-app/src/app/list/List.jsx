import React, { Component } from 'react';
import Item from './Item';
import { generateItems } from './items';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: '',
        value: '',
      },
      items: generateItems(props.size),
    };
  }

  getValue(value) {
    if (value <= 0) return 0;
    if (value === 1) return 1;
    return this.getValue(value - 1) + this.getValue(value - 2);
  }

  handlePress(key) {
    const { items, input } = this.state;
    const { onChange } = this.props;

    if (key === 'Enter') {
      this.setState({
        input: {
          name: '',
          value: '',
        },
        items: [].concat(input, items),
      }, () => {
        onChange(input, this.state.items);
      });
    }
  }

  handleInput(change) {
    this.setState({
      input: {
        ...this.state.input,
        ...change,
      }
    })
  }

  handleDelete(index) {
    const { items, input } = this.state;
    const { onChange } = this.props;

    this.setState({
      items: items.slice(0, index).concat(items.slice(index + 1)),
    }, () => {
      onChange(input, this.state.items);
    });
  }

  render() {
    const { items, input } = this.state;

    return (
      <div className="list-container">
        <dv className="controls" onKeyPress={event => this.handlePress(event.key)}>
          <input
            className="input-name"
            onChange={event => this.handleInput({ name: event.target.value })}
            value={input.name} >
          </input>
          <input
            className="input-value"
            onChange={event => this.handleInput({ value: event.target.value })}
            value={input.value} >
          </input>
        </dv>

        <div className="list">
          {items.map((item, i) => (
            <Item 
              key={`${item.name}:${i}`}
              name={item.name}
              value={this.getValue(item.value)}
              onDelete={() => this.handleDelete(i)}
            />
          ))}
        </div>

        <div className="footer">
          {`items: ${items.length}`}
        </div>
      </div>
    );
  }
}

export default List;
