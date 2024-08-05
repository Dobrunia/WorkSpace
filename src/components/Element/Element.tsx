import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ElementType } from '../../types/types';
import './Element.css';

type ElementProps = {
  element: ElementType;
};

export const Element = React.memo((props: ElementProps) => {
  console.log('Element render ' + JSON.stringify(props.element.id));
  const elementRef = useRef(null);
  const [elementCoords, setElementCoords] = useState<{ x: number; y: number }>({
    x: props.element.x,
    y: props.element.y,
  });
  const [elementZIndex, setElementZIndex] = useState<number>(
    props.element.zIndex,
  );
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: props.element.width || 300,
    height: props.element.height || 200,
  });

  const handleStop = (e, data) => {
    setElementCoords({ x: data.x, y: data.y });
    console.log('Stop', data);
  };

  const handleResize = (e) => {
    const newWidth =
      e.clientX - elementRef.current.getBoundingClientRect().left;
    const newHeight =
      e.clientY - elementRef.current.getBoundingClientRect().top;

    if (newWidth > 20 && newHeight > 20) {
      setSize({
        width: newWidth,
        height: newHeight,
      });
    }
  };

  return (
    <Draggable
      nodeRef={elementRef}
      defaultPosition={{
        x: elementCoords.x,
        y: elementCoords.y,
      }}
      axis="both"
      bounds="parent"
      onStop={handleStop}
      position={{
        x: elementCoords.x,
        y: elementCoords.y,
      }}
    >
      <div
        ref={elementRef}
        id={props.element.id}
        className={`element`}
        style={{
          width: size.width,
          height: size.height,
          zIndex: elementZIndex,
        }}
      >
        {props.element.type === 'text' ? (
          <div className="textElement">{props.element.content}</div> //хочу иметь возможность менять размеры
        ) : props.element.type === 'image' ? (
          <img
            src={props.element.content}
            alt=""
            className="imgElement"
            draggable="false"
          /> //хочу иметь возможность менять размеры
        ) : (
          <div>Undefined type</div>
        )}
        <svg
          className="resizeHandle"
          xmlns="http://www.w3.org/2000/svg"
          id="arrow-circle-down"
          viewBox="0 0 24 24"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            document.addEventListener('mousemove', handleResize);
            document.addEventListener(
              'mouseup',
              () => {
                document.removeEventListener('mousemove', handleResize);
              },
              { once: true },
            );
          }}
        >
          <path d="M20,4.707l4,4V1.5c0-.827-.673-1.5-1.5-1.5h-7.207l4,4-7.293,7.293L4.707,4,8.707,0H1.5C.673,0,0,.673,0,1.5v7.207L4,4.707l7.293,7.293-7.293,7.293L0,15.293v7.207c0,.827,.673,1.5,1.5,1.5h7.207l-4-4,7.293-7.293,7.293,7.293-4,4h7.207c.827,0,1.5-.673,1.5-1.5v-7.207l-4,4-7.293-7.293,7.293-7.293Zm2.5-3.707c.276,0,.5,.225,.5,.5V6.293L17.707,1h4.793ZM1,1.5c0-.275,.224-.5,.5-.5H6.293L1,6.293V1.5Zm.5,21.5c-.276,0-.5-.225-.5-.5v-4.793l5.293,5.293H1.5Zm21.5-.5c0,.275-.224,.5-.5,.5h-4.793l5.293-5.293v4.793Z" />
        </svg>
      </div>
    </Draggable>
  );
});
