import React from 'react';
import './ControlPanel.css';
import canvasState from '../../store/canvasState';

export const ControlPanel = React.memo(() => {
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
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#000000">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>
      <button className="controlPanelBtn import">
        <img
          src="/import.png"
          alt="import"
          title="Импортировать рабочее пространство"
        />
      </button>
    </div>
  );
});
