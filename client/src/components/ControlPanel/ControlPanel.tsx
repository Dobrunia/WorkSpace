import React from 'react';
import './ControlPanel.css';
import canvasState from '../../store/canvasState';

export const ControlPanel = React.memo(() => {
  const save = () => {
    const dataUrl = canvasState.getCanvas().toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = new Date() + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const importImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasState.getCanvas();
          const context = canvas.getContext('2d');
          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image onto the canvas
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="controlPanel">
      {/* <button className="controlPanelBtn save" onClick={() => download()}></button>
      <button className="controlPanelBtn import" onClick={() => updownload()}></button> */}
      <button
        className="controlPanelBtn undo"
        onClick={() => canvasState.undo()}
        title="назад"
      >
        <svg
          version="1.1"
          viewBox="0 0 512 512"
          style={{ transform: 'scaleX(-1)' }}
        >
          <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
        </svg>
      </button>
      <button
        className="controlPanelBtn redo"
        onClick={() => canvasState.redo()}
        title="вперёд"
      >
        <svg version="1.1" viewBox="0 0 512 512">
          <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
        </svg>
      </button>
      <button
        className="controlPanelBtn save"
        title="сохранить рабочее пространство"
        onClick={save}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#000000">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>
      <button className="controlPanelBtn import">
        <label htmlFor="fileInput">
          <img
            src="/import.png"
            alt="import"
            title="Импортировать рабочее пространство"
          />
        </label>
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={importImage}
        style={{ display: 'none' }}
        id="fileInput"
      />
    </div>
  );
});
