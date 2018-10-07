import React, { PureComponent } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import Item from './item/Item';
import { generateItems, getRandomValue } from './item/items';
import ListControls from './controls/ListControls';
import './List.css';

class List extends PureComponent {
  constructor(props) {
    super(props);

    const items = generateItems(props.size);
    const filter = ''
    const filteredItems = this.getFilteredItems(items, filter);

    this.state = {
      items,
      filteredItems,
      filter,
    };
  }

  getFilteredItems(items, input = '') {
    if (!this.props.isFilterable || input === '') {
      return items;
    }
    return items.filter(item => (
      item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    ));
  }

  handleInput = (input) => {
    const { isFilterable } = this.props;
    const { items } = this.state;
    const filter = isFilterable ? input : this.state.filter;
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      filteredItems,
      filter,
    });
  };

  handleAddItem = (name) => {
    const { onChange } = this.props;
    const { filter } = this.state;
    const newItem = { name, value: getRandomValue() };
    const items = [].concat(newItem, this.state.items);
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      items,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  };

  handleRemoveItems = () => {
    const { onChange } = this.props;
    const { filter } = this.state;
    const items = this.state.items.filter(item => !item.isSelected);
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      items,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  };

  handleDelete = (id) => {
    const { onChange } = this.props;
    const { items, filter } = this.state;
    const remainingItems = items.slice(0, id).concat(items.slice(id + 1));
    const filteredItems = this.getFilteredItems(remainingItems, filter);

    this.setState({
      items: remainingItems,
      filteredItems,
    }, () => {
      onChange(this.state.items);
    });
  };

  handleSelect = (id) => {
    const filteredItems = this.state.filteredItems.concat();
    filteredItems[id].isSelected = !filteredItems[id].isSelected;
    this.setState({ filteredItems })
  };

  rowRenderer = ({ key, index, style, isScrolling }) => {
    const item = this.state.filteredItems[index];

    // if (isScrolling) {
    //   return (
    //     <div
    //       className="scrolling-item"
    //       key={key}
    //       style={style}>
    //       Scrolling...
    //     </div>
    //   );
    // }

    return (
      <div style={style} key={key}>
        <Item
          id={index}
          name={item.name}
          value={item.value}
          isSelected={item.isSelected}
          onSelect={this.handleSelect}
          onDelete={this.handleDelete}
        />
      </div>
    )
  };

  render() {
    const { filteredItems } = this.state;
    const hasSelectedItems = filteredItems.some(item => item.isSelected);

    return (
      <div className="list-container">
        <ListControls
          hasSelectedItems={hasSelectedItems}
          onInput={this.handleInput}
          onAdd={this.handleAddItem}
          onRemove={this.handleRemoveItems}
        />

        <VirtualizedList
          className="list"
          width={500}
          height={450}
          rowCount={filteredItems.length}
          rowHeight={48}
          rowRenderer={this.rowRenderer}
          items={filteredItems}
          overscanRowCount={10}
        />

        <div className="footer">
          {`items: ${filteredItems.length}`}
        </div>
      </div>
    );
  }
}

export default List;
