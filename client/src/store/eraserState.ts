import { makeAutoObservable } from 'mobx';

class eraserState {
  private color: string = '#131313'; //TODO:: fix getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color').trim()
  constructor() {
    makeAutoObservable(this);
  }

  getColor() {
    return this.color;
  }
}

export default new eraserState();
