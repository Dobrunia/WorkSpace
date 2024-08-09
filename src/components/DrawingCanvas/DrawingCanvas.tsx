import React, { useRef, useEffect, useState } from 'react';
import './DrawingCanvas.css';

const DrawingCanvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>('#ffffff');
  const [selectedTool, setSelectedTool] = useState<string>('brush');
  const [lineWidth, setLineWidth] = useState(5);
  const mainBgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-bg-color')
    .trim();

  const handleElementClick = (element: string) => {
    setSelectedTool(element);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(event.target.value));
  };
  const handleBroomClick = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = mainBgColor;
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const startDrawing = (event: MouseEvent) => {
      context.lineWidth = lineWidth;
      if (selectedTool === 'eraser') {
        context.lineWidth = 20;
        context.strokeStyle = mainBgColor;
      } else {
        context.strokeStyle = brushColor;
      }
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
  }, [isDrawing, brushColor, selectedTool, lineWidth]);

  return (
    <>
      <div className="controlPanel">
        <div
          className={`brush ${selectedTool === 'brush' ? 'selectedTool' : ''}`}
          title="Кисть"
          onClick={() => handleElementClick('brush')}
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
          onClick={() => handleElementClick('eraser')}
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
          onChange={handleChange}
        />
        <img
          src="/broom.png"
          alt=""
          className="oneClickTool"
          onClick={() => handleBroomClick()}
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
      <canvas ref={canvasRef} className="canvas" width={1200} height={800} />
    </>
  );
});

export default DrawingCanvas;
