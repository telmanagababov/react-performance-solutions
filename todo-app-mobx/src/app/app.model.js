import { observable, action } from 'mobx';

export default class AppModel {
  @observable leftItems = 0;
  @observable rightItems = 0;
  
  constructor(initialState) {
    this.set(initialState);
  }

  @action set(change) {
    Object.assign(this, change);
  }
}