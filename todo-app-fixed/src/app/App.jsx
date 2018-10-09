import React, { Component } from 'react';
import List from './list/List';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItems: 10000,
      rightItems: 10000,
    };
  }

  addLeftItems = ({ length }) => {
    this.setState({ leftItems: length });
  };

  addRightItems = ({ length }) => {
    this.setState({ rightItems: length });
  };

  render() {
    const { leftItems, rightItems } = this.state;
    const itemsNumber = leftItems + rightItems;

    return (
      <div className="app">
        <header>Items ({itemsNumber})</header>

        <main>
          <List
            size={leftItems}
            onChange={this.addLeftItems}>
          </List>

          <List
            isFilterable
            size={rightItems}
            onChange={this.addRightItems}>
          </List>
        </main>
      </div>
    );
  }
}

export default App;
