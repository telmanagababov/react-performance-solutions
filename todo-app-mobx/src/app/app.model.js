import { observable, action } from 'mobx';

export default class AppModel {
  @observable leftItems = 500;
  @observable rightItems = 2000;

  @action set(change) {
    Object.assign(this, change);
  }
}