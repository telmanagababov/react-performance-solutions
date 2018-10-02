import React, { Component } from 'react';
import { observer } from 'mobx-react';

import List from './list/List';
import AppModel from './app.model';
import './App.css';

@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.model = new AppModel({
      leftItems: 500,
      rightItems: 2000
    });
  }

  addItem(change) {
    this.model.set(change);
  }

  render() {
    const { leftItems, rightItems } = this.model;
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
