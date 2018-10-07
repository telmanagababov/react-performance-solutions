import React, { PureComponent } from 'react';

class ListControls extends PureComponent {
  state = {
    input: '',
  };

  applyInputChange(input) {
    const { onInput } = this.props;

    this.setState({
      input,
    }, () => {
      onInput(input);
    });
  }

  handleInput = (event) => {
    const input = event.target.value;

    this.applyInputChange(input);
  };

  handleAddItem = () => {
    const { onAdd } = this.props;
    const { input } = this.state;

    onAdd(input);
    this.applyInputChange('');
  };

  render() {
    const { hasSelectedItems, onRemove } = this.props;
    const { input } = this.state;

    return (
      <dv className="controls">
        <input
          className="input-name"
          onChange={this.handleInput}
          value={input} >
        </input>
        <button
          className="add-item-control"
          onClick={this.handleAddItem}
          disabled={!input}>
          Add
          </button>
        <button
          className="remove-items-control"
          onClick={onRemove}
          disabled={!hasSelectedItems}>
          Del
          </button>
      </dv>
    );
  }
}

export default ListControls;
