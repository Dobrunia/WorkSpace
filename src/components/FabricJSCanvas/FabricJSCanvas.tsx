import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6

export const FabricCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasEl.current) {
      const options = {
        isDrawingMode: true,
      };
      const canvas = new fabric.Canvas(canvasEl.current, options);
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = 'red';
        canvas.freeDrawingBrush.width = 10;
      }
      return () => {
        canvas.dispose();
      };
    }
  }, []);

  return <canvas width="500" height="500" ref={canvasEl} />;
};
