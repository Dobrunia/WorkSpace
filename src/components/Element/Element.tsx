import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ElementType } from '../../types/types';
import './Element.css';

type ElementProps = {
  element: ElementType;
};

export const Element = React.memo((props: ElementProps) => {
  const [elementCoords, setElementCoords] = useState<{ x: number; y: number }>({
    x: props.element.x,
    y: props.element.y,
  });
  const [elementZIndex, setElementZIndex] = useState<number>(props.element.zIndex);
  // const [elementSize, setElementSize] = useState<{ width: number, height: number }>({
  //   width: props.width,
  //   height: props.height,
  // });

  console.log('Element render ' + JSON.stringify(props.element.id));
  const handleStop = (e, data) => {
    setElementCoords({ x: data.x, y: data.y });
    console.log('Stop', data);
  };

  return (
    <Draggable
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
      <div id={props.element.id} className={`element`}>
        {props.element.type === 'text' ? (
          <div className="textElement">{props.element.content}</div>
        ) : props.element.type === 'image' ? (
          <img src={props.element.content} alt="" className="imgElement" />
        ) : (
          <div>Undefined type</div>
        )}
        <div className="resizeHandle" />
      </div>
    </Draggable>
  );
});
