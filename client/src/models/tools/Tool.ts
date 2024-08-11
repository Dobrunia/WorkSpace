export default class Tool {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.context.fillStyle = color;
  }
  set strokeColor(color: string) {
    this.context.strokeStyle = color;
  }
  set lineWidth(width: number) {
    this.context.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
