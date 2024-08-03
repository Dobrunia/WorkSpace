import React, { useState } from 'react';
import { Element } from '../Element/Element.tsx';
import { ElementType } from '../../types/types.ts';
import { v4 as uuidv4 } from 'uuid';
import './Board.css';

export const Board = React.memo(() => {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // console.log('Board render');

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      console.error('Failed to access clipboard data');
      return;
    }

    const createNewElement = (content: string, type: 'text' | 'image') => {
      const maxZIndex = Math.max(
        ...elements.map((element) => element.zIndex),
        0,
      );
      const newElement: ElementType = {
        id: uuidv4(),
        x: mousePosition.x,
        y: mousePosition.y,
        content,
        type,
        zIndex: maxZIndex + 1
      }
      setElements([...elements, newElement]);
    };

    const items = Array.from(clipboardData.items);
    const lastItem = items[items.length - 1];

    if (lastItem.kind === 'file' && lastItem.type.startsWith('image/')) {
      const file = lastItem.getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          createNewElement(reader.result as string, 'image');
        };
        reader.readAsDataURL(file);
      }
    } else if (lastItem.kind === 'string') {
      try {
        const text = await navigator.clipboard.readText();
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        if (cleanText) {
          createNewElement(cleanText, 'text');
        }
      } catch (error) {
        console.error('Error reading clipboard:', error);
      }
    }
  };

  return (
    <div className="Board" onMouseMove={handleMouseMove} onPaste={handlePaste}>
      {elements.map((element: ElementType) => (
        <Element key={element.id} element={element} />
      ))}
    </div>
  );
});
