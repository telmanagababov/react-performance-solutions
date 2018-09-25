import React, { Component } from 'react';
import List from './list/List';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItems: 200,
      rightItems: 200,
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
            onChange={(change, items) => (
              this.addItem({ leftItems: items.length })
            )}>
          </List>

          <List 
            size={rightItems} 
            onChange={(change, items) => (
              this.addItem({ rightItems: items.length })
            )}>
          </List>
        </main>
      </div>
    );
  }
}

export default App;
