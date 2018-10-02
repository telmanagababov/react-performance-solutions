import { observable, action, computed } from 'mobx';

export default class ListModel {
  @observable input = '';
  @observable items = [];
  @observable isFilterable = false;
  
  constructor(initialState) {
    this.set(initialState);
  }

  @action set(change) {
    Object.assign(this, change);
  }

  @computed get filteredItems() {
    if (!this.isFilterable || this.input === '') {
      return this.items;
    }
    return this.items.filter(item => (
      item.name.toLowerCase().indexOf(this.input.toLowerCase()) >= 0
    ));
  }
}