declare global {
  interface Document {
    mousePosition: { clientX: number; clientY: number };
  }
}

import React, { useEffect, useState } from 'react';
import { BoardProps } from '../../types/types.ts';
import { Element } from '../Element/Element.tsx';
import { Element as ElementModel } from '../../models/Element.ts';
import './Board.css';

export const Board = React.memo((props: BoardProps) => {
  const { boardExemplar } = props;
  const [zIndexArray, setZIndexArray] = useState<number[]>(
    boardExemplar.getElements().length > 0
      ? [
          Math.max(
            ...boardExemplar
              .getElements()
              .map((element) => element.getZIndex()),
          ),
        ]
      : [0],
  );
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target === null || !(event.target instanceof HTMLElement)) {
        return;
      }

      const targetId = event.target.parentElement?.id;

      if (selectedElementId === targetId) {
        // Клик по уже выбранному элементу
        return;
      } else if (targetId) {
        // Клик по новому элементу
        boardExemplar.getElements().forEach((element: ElementModel) => {
          element.setStatus(
            element.getId() === targetId ? 'selected' : 'deselected',
          );
        });
        setSelectedElementId(targetId);
      } else {
        // Клик вне элемента
        boardExemplar.getElements().forEach((element: ElementModel) => {
          element.setStatus('deselected');
        });
        setSelectedElementId(null);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [boardExemplar, selectedElementId]);

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { clientX, clientY } = document.mousePosition;

    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      console.error('Failed to access clipboard data');
      return;
    }

    const createNewElement = (content: string, type: 'text' | 'image') => {
      const newElement = new ElementModel(
        clientX,
        clientY,
        content,
        type,
        Math.max(...zIndexArray) + 1,
      );
      boardExemplar.addElement(newElement);
      setZIndexArray([...zIndexArray, newElement.getZIndex()]);
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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    document.mousePosition = { clientX: event.clientX, clientY: event.clientY };
  };
  return (
    <div className="Board" onMouseMove={handleMouseMove} onPaste={handlePaste}>
      {boardExemplar.getElements().map((element: ElementModel) => {
        return (
          <Element
            key={element.getId()}
            elementExemplar={element}
            isSelected={element.getId() === selectedElementId}
          />
        );
      })}
    </div>
  );
});
