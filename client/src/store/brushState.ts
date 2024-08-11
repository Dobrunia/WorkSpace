import { makeAutoObservable } from 'mobx';

class brushState {
  private color: string = '#ffffff';
  private width: number = 5;
  constructor() {
    makeAutoObservable(this);
  }

  setColor(color: string) {
    this.color = color;
  }

  setLineWidth(width: number) {
    this.width = width;
  }

  getColor() {
    return this.color;
  }

  getLineWidth() {
    return this.width;
  }
}

export default new brushState();
