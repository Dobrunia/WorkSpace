import { makeAutoObservable } from 'mobx';

class CanvasState {
  private canvas: HTMLCanvasElement;
  private container: HTMLDivElement;
  private undoList = [];
  private redoList = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement, container: HTMLDivElement) {
    this.canvas = canvas;
    this.container = container;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  getCanvas() {
    return this.canvas;
  }

  getContainer() {
    return this.container;
  }

  clearAll() {
    const context = this.canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  undo() {
    const context = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      context.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
    }
  }

  redo() {
    const context = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
