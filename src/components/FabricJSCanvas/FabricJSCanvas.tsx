import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6

export const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasEl.current) {
      const options = {
        isDrawingMode: true,
      };
      const canvas = new fabric.Canvas(canvasEl.current, options);
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = 'red'; // Replace with desired color
        canvas.freeDrawingBrush.width = 10; // Replace with desired width
      }
      return () => {
        canvas.dispose();
      };
    }
  }, []);

  return <canvas width="300" height="300" ref={canvasEl} />;
};
