export type BoardProps = {
  // elements?: ElementType[];
  // boardExemplar: Board;
  //setNewBoard: (newBoard: Board) => void;
};

export type ElementType = {
  id: string;
  x: number;
  y: number;
  content: string;
  type: 'text' | 'image';
  zIndex: number;
  width?: number;
  height?: number;
};

export type PixelType = {
  id: string;
  x: number;
  y: number;
  color: string;
  type: 'pixel';
  zIndex: number;
  width?: number;
  height?: number;
};
