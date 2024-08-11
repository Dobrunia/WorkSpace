import React from 'react';
import BrushBtn from './BrushBtn/BrushBtn.tsx';
import './ToolPanel.css';
import Eraser from '../../models/tools/Eraser.ts';
import toolState from '../../store/toolState.ts';
import canvasState from '../../store/canvasState.ts';
import { observer } from 'mobx-react-lite';
import brushState from '../../store/brushState.ts';

const ToolPanel = observer(() => {
  return (
    <div className="toolPanel">
      <BrushBtn />
      <button
        className={
          'tool ' + (toolState.tool?.name === 'eraser' ? 'selected' : '')
        }
        title="стирательная резинка"
        onClick={() => toolState.setTool(new Eraser(canvasState.getCanvas()))}
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
      </button>
      <input
        className="pointer"
        type="range"
        min={1}
        max={40}
        defaultValue={5}
        onChange={(event) =>
          brushState.setLineWidth(parseInt(event.target.value))
        }
        title="размер мыши"
      />
      <img
        src="/broom.png"
        alt="Удалить всё"
        className="pointer"
        onClick={() => canvasState.clearAll()}
        title="Очистить всё"
      />
    </div>
  );
});

export default ToolPanel;
