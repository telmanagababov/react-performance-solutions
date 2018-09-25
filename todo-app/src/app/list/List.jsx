import React, { Component } from 'react';
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
      items: generateItems(200),
    };
  }

  componentDidMount() {
    this.props.onChange(this.state.input, this.state.items);
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
            <div className="item" key={`${item.name}:${i}`}>
              <div className="item-name">
                {item.name}
              </div>
              <div className="item-value">
                {this.getValue(item.value)}
              </div>
            </div>
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
