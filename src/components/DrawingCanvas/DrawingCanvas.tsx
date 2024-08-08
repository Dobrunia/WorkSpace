import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const startDrawing = (event: MouseEvent) => {
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

    // очистка событий при размонтировании
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseleave', endDrawing);
    };
  }, [isDrawing]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid black' }}
    />
  );
});

export default DrawingCanvas;
