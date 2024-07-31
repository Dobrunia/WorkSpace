import { Board } from '../models/Board.ts';
import { Element } from '../models/Element.ts';

export type BoardProps = {
  // elements?: ElementType[];
  boardExemplar: Board;
  //setNewBoard: (newBoard: Board) => void;
};

export type ElementProps = {
  elementExemplar: Element;
};
