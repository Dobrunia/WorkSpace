import React, { useRef, useEffect, useState } from 'react';
import './DrawingCanvas.css';

const DrawingCanvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;
    const startDrawing = (event: MouseEvent) => {
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
      setIsDrawing(true);
    };
    const draw = (event: MouseEvent) => {

      if (!isDrawing) return;
      context.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
      context.stroke();
    };
    const endDrawing = () => {
      setIsDrawing(false);
      context.closePath();
    };
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', endDrawing);
    
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseleave', endDrawing);
    };
  }, [isDrawing, color]);

  return (
    <canvas
      ref={canvasRef}
      className='canvas'
      width={1200}
      height={800}
    />
  );
});

export default DrawingCanvas;
