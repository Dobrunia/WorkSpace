import { Element } from './Element.ts';

export class Board {
  private elements: Element[];

  constructor(elements?: Element[]) {
    this.elements = elements ? elements : [];
  }

  public getElements(): Element[] {
    return this.elements;
  }

  public addElement(element: Element): void {
    this.elements.push(element);
  }

  public removeElement(id: string): void {
    this.elements = this.elements.filter((e) => e.getId() !== id);
  }

  public clearBoard(): void {
    this.elements = [];
  }
}
