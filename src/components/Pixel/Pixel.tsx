import React from 'react';
import { PixelType } from '../../types/types';
import './Pixel.css';

type PixelProps = {
    pixel: PixelType;
};

export const Pixel = React.memo((props: PixelProps) => {
  return (
    <div
      className="pixel"
      style={{
        left: props.pixel.x,
        top: props.pixel.y,
        backgroundColor: props.pixel.color,
        zIndex: props.pixel.zIndex,
        width: props.pixel.width,
        height: props.pixel.height,
      }}
    ></div>
  );
});
