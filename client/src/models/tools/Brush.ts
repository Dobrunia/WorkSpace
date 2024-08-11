import brushState from '../../store/brushState';
import canvasState from '../../store/canvasState';
import Tool from './Tool';

export default class Brush extends Tool {
  private isDrawing: boolean;
  private rect: DOMRect;
  name = 'brush';
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.rect = this.canvas.getBoundingClientRect();
    this.isDrawing = false;
    this.listen();
  }

  private listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  private mouseUpHandler() {
    this.isDrawing = false;
  }
  private mouseDownHandler(event: MouseEvent) {
    event.preventDefault();
    if (event.button === 0) {
      this.isDrawing = true;
      this.rect = this.canvas.getBoundingClientRect();
      this.context.beginPath();
      this.context.moveTo(
        event.clientX - this.rect.left,
        event.clientY - this.rect.top,
      );
    }
  }
  private mouseMoveHandler(event: MouseEvent) {
    if (this.isDrawing) {
      this.context.lineWidth = brushState.getLineWidth();
      this.rect = this.canvas.getBoundingClientRect();
      this.draw(event.clientX - this.rect.left, event.clientY - this.rect.top);
    }
  }

  draw(x: number, y: number) {
    this.context.strokeStyle = brushState.getColor();
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
