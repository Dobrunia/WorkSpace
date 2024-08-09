import React, { useRef, useEffect, useState } from 'react';
import './DrawingCanvas.css';

const DrawingCanvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>('#ffffff');
  const [selectedTool, setSelectedTool] = useState<string>('brush');
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const mainBgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-bg-color')
    .trim();
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let container: HTMLDivElement;

  const setContext = () => {
    canvas = canvasRef.current!;
    context = canvas.getContext('2d')!;
    container = containerRef.current!;
    canvas.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault(); // Предотвращаем прокрутку
      },
      { passive: false },
    );
  };
  const handleBroomClick = () => {
    context.fillStyle = mainBgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
  const startDrawing = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    context.lineWidth = selectedTool === 'eraser' ? 20 : lineWidth;
    context.strokeStyle = selectedTool === 'eraser' ? mainBgColor : brushColor;
    context.beginPath();
    context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    setIsDrawing(true);
  };
  const draw = (event: MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    context.stroke();
  };
  const endDrawing = () => {
    setIsDrawing(false);
    context.closePath();
  };
  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (event.button === 0) {
      startDrawing(event);
    } else if (event.button === 1 || event.button === 2) {
      setIsPanning(true);
    }
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (isPanning) {
      const dx = event.movementX;
      const dy = event.movementY;
      container.classList.add('cursorGrabbing');
      container.scrollLeft -= dx;
      container.scrollTop -= dy;
    } else {
      draw(event);
    }
  };
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      container.classList.remove('cursorGrabbing');
    } else endDrawing();
  };
  useEffect(() => {
    setContext();
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', endDrawing);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', endDrawing);
    };
  }, [isDrawing, brushColor, selectedTool, lineWidth, isPanning]);

  return (
    <>
      <div className="controlPanel">
        <div
          className={`brush ${selectedTool === 'brush' ? 'selectedTool' : ''}`}
          title="Кисть"
          onClick={() => setSelectedTool('brush')}
        >
          <label htmlFor="brush">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="mdi-brush-outline"
              viewBox="0 0 24 24"
              fill={brushColor}
            >
              <path d="M7 16C7.55 16 8 16.45 8 17C8 18.1 7.1 19 6 19C5.83 19 5.67 19 5.5 18.95C5.81 18.4 6 17.74 6 17C6 16.45 6.45 16 7 16M18.67 3C18.41 3 18.16 3.1 17.96 3.29L9 12.25L11.75 15L20.71 6.04C21.1 5.65 21.1 5 20.71 4.63L19.37 3.29C19.17 3.09 18.92 3 18.67 3M7 14C5.34 14 4 15.34 4 17C4 18.31 2.84 19 2 19C2.92 20.22 4.5 21 6 21C8.21 21 10 19.21 10 17C10 15.34 8.66 14 7 14Z" />
            </svg>
          </label>
          <input
            type="color"
            id="brush"
            name="brush"
            value={brushColor}
            style={{
              background: brushColor,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBrushColor(e.target.value);
            }}
          />
        </div>
        <div
          className={`eraser ${
            selectedTool === 'eraser' ? 'selectedTool' : ''
          }`}
          onClick={() => setSelectedTool('eraser')}
          title="Стирательная резинка"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#000000"
            viewBox="0 0 16 16"
          >
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
          </svg>
        </div>
        <input
          type="range"
          id="range"
          name="range"
          min="1"
          max="10"
          defaultValue={5}
          onChange={(event) => setLineWidth(parseInt(event.target.value))}
        />
        <img
          src="/broom.png"
          alt=""
          className="oneClickTool"
          onClick={handleBroomClick}
          title="Очистить всё"
        />
        <div className="oneClickTool" title="Сохранить рабочее пространство">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </div>
        <img
          src="/import.png"
          alt=""
          className="oneClickTool"
          title="Импортировать рабочее пространство"
        />
      </div>
      <div ref={containerRef} className="canvasContainer">
        <canvas
          ref={canvasRef}
          className="canvas"
          width={10000}
          height={10000}
        />
      </div>
    </>
  );
});

export default DrawingCanvas;
