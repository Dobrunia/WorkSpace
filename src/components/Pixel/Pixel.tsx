import React from 'react';
import { PixelType } from '../../types/types';
import './Pixel.css';

type PixelProps = {
  element: PixelType;
};

export const Pixel = React.memo((props: PixelProps) => {
  return (
    <div
      className="pixel"
      style={{
        left: props.element.x,
        top: props.element.y,
        backgroundColor: props.element.color,
        zIndex: props.element.zIndex,
        width: props.element.width,
        height: props.element.height,
      }}
    ></div>
  );
});
