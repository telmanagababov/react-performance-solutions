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

  addItem(change) {
    this.setState({
      ...this.state,
      ...change,
    });
  }

  render() {
    const { leftItems, rightItems } = this.state;
    const itemsNumber = leftItems + rightItems;

    return (
      <div className="app">
        <header>Items ({itemsNumber})</header>

        <main>
          <List
            size={leftItems}
            onChange={(items) => (
              this.addItem({ leftItems: items.length })
            )}>
          </List>

          <List
            isFilterable
            size={rightItems}
            onChange={(items) => (
              this.addItem({ rightItems: items.length })
            )}>
          </List>
        </main>
      </div>
    );
  }
}

export default App;
