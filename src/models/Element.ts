import { v4 as uuidv4 } from 'uuid';

export class Element {
  private id: string;
  private x: number;
  private y: number;
  private content: string;
  private type: 'text' | 'image';
  private zIndex: number;
  private status?: 'selected' | 'deselected';
  public width?: number;
  public height?: number;

  constructor(
    x: number,
    y: number,
    content: string,
    type: 'text' | 'image',
    zIndex: number,
  ) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.content = content;
    this.type = type;
    this.zIndex = zIndex;
    this.status = 'deselected';
  }

  public setPosition(coords: { x: number; y: number}): void {
    this.x = coords.x;
    this.y = coords.y;
  }

  public setStatus(status: 'selected' | 'deselected'): void {
    this.status = status;
  }

  public setZIndex(zIndex: number): void {
    this.zIndex = zIndex;
  }

  public getId(): string {
    return this.id;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public getZIndex(): number {
    return this.zIndex;
  }

  public getContent(): string {
    return this.content;
  }

  public getType(): 'text' | 'image' {
    return this.type;
  }

  public getStatus(): 'selected' | 'deselected' {
    if (this.status === undefined) {
      throw new Error('Status is not defined');
    }
    return this.status;
  }

  public clone(): Element {
    // Создаем новый экземпляр с теми же параметрами
    const clonedElement = new Element(
      this.x,
      this.y,
      this.content,
      this.type,
      this.zIndex,
    );

    clonedElement.id = this.id;

    if (this.status) {
      clonedElement.setStatus(this.status);
    }
    if (this.width) {
      clonedElement.width = this.width;
    }
    if (this.height) {
      clonedElement.height = this.height;
    }

    return clonedElement;
  }
}
