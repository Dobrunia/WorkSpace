import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import canvasState from '../../store/canvasState.ts';
import './DrawingCanvas.css';

const DrawingCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);

  const wheelHandler = (event: WheelEvent) => {
    event.preventDefault();
  };

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (event.button === 1) {
      setIsPanning(true);
    }
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (isPanning) {
      const dx = event.movementX;
      const dy = event.movementY;
      canvasState.getContainer().classList.add('cursorGrabbing');
      canvasState.getContainer().scrollLeft -= dx;
      canvasState.getContainer().scrollTop -= dy;
    }
  };
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      canvasState.getContainer().classList.remove('cursorGrabbing');
    }
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current, containerRef.current);

    canvasState.getCanvas().addEventListener('mousedown', handleMouseDown);
    canvasState.getCanvas().addEventListener('mousemove', handleMouseMove);
    canvasState.getCanvas().addEventListener('mouseup', handleMouseUp);
    canvasState.getCanvas().addEventListener('wheel', wheelHandler, {
      passive: false,
    });
    return () => {
      canvasState.getCanvas().removeEventListener('mousedown', handleMouseDown);
      canvasState.getCanvas().removeEventListener('mousemove', handleMouseMove);
      canvasState.getCanvas().removeEventListener('mouseup', handleMouseUp);
      canvasState.getCanvas().removeEventListener('wheel', wheelHandler);
    };
  }, [isPanning]);

  return (
    <div ref={containerRef} className="canvasContainer">
      <canvas ref={canvasRef} className="canvas" width={10000} height={10000} />
    </div>
  );
});

export default DrawingCanvas;
