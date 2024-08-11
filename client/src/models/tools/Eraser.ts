import eraserState from '../../store/eraserState.ts';
import Brush from './Brush.ts';

export default class Eraser extends Brush {
  name = 'eraser';
  constructor(canvas) {
    super(canvas);
  }
  draw(x: number, y: number) {
    this.context.strokeStyle = eraserState.getColor();
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
