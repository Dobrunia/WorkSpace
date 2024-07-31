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
        //клик по уже выбранному элементу
      } else if (targetId) {
        //клик по новому элементу
        boardExemplar.getElements().forEach((element: ElementModel) => {
          if (element.getId() === targetId) {
            element.setStatus('selected');
          } else {
            element.setStatus('deselected');
          }
        });
        setSelectedElementId(targetId);
      } else {
        //клик вне елемента
        boardExemplar.getElements().forEach((element: ElementModel) => {
          element.setStatus('deselected');
        });
        setSelectedElementId(null);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [boardExemplar, selectedElementId]);

  //   const [elements, setElements] = useState<ElementModel[]>(
  //     boardExemplar.getElements(),
  //   );

  //   const [draggingElement, setDraggingElement] = useState<Element | null>(null);
  //   const [offset, setOffset] = useState<{ x: number; y: number }>({
  //     x: 0,
  //     y: 0,
  //   });

  //   const handleMouseMove = (event: MouseEvent) => {
  //     setMousePosition({ x: event.clientX, y: event.clientY });

  //     if (draggingElement) {
  //       const newX = event.clientX - offset.x;
  //       const newY = event.clientY - offset.y;

  //       const updatedElements = elements.map((element) =>
  //         element.id === draggingElement.id
  //           ? { ...element, x: newX, y: newY }
  //           : element,
  //       );

  //       setElements(updatedElements);
  //     }

  //   };

  //   useEffect(() => {
  //     window.addEventListener('mousemove', handleMouseMove);
  //     return () => {
  //       window.removeEventListener('mousemove', handleMouseMove);
  //     };
  //   }, [draggingElement]);

  //   const handlePaste = async (event: ClipboardEvent) => {
  //     event.preventDefault();
  //     const { x, y } = mousePosition;
  //

  //
  //   };

  //   const handleMouseDown = (
  //     event: React.MouseEvent<HTMLDivElement>,
  //     element: Element,
  //   ) => {
  //     event.preventDefault();
  //     const { clientX, clientY } = event;
  //     setDraggingElement(element);
  //     setOffset({ x: clientX - element.x, y: clientY - element.y });
  //     setZIndexArray([...zIndexArray, zIndexArray[zIndexArray.length - 1] + 1]);
  //     element.zIndex = zIndexArray[zIndexArray.length - 1];
  //   };

  //   const handleMouseUp = () => {
  //     setDraggingElement(null);
  //   };

  //   useEffect(() => {
  //     window.addEventListener('mouseup', handleMouseUp);
  //     return () => {
  //       window.removeEventListener('mouseup', handleMouseUp);
  //     };
  //   }, []);

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
        zIndexArray[zIndexArray.length - 1],
      );
      boardExemplar.addElement(newElement);
      //   setNewBoard(boardExemplar);
      setZIndexArray([...zIndexArray, newElement.getZIndex()]);
      return newElement;
    };

    const items = Array.from(clipboardData.items);
    const lastItem = items[items.length - 1];
    let elementData;

    if (lastItem.kind === 'file' && lastItem.type.startsWith('image/')) {
      const file = lastItem.getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          elementData = {
            content: reader.result as string,
            type: 'image' as 'text' | 'image',
          };
          createNewElement(elementData.content, elementData.type);
        };
        reader.readAsDataURL(file);
      }
    } else if (lastItem.kind === 'string') {
      try {
        const text = await navigator.clipboard.readText();
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        if (cleanText) {
          elementData = {
            content: cleanText,
            type: 'text' as 'text' | 'image',
          };
          createNewElement(elementData.content, elementData.type);
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
