import React from 'react';
import { ElementProps } from '../../types/types';
import './Element.css';

export const Element = React.memo((props: ElementProps) => {
  const { elementExemplar, isSelected } = props;
  console.log('render Element');
  return (
    <div
      id={elementExemplar.getId()}
      key={elementExemplar.getId()}
      className={`element ${isSelected ? 'selected' : ''}`}
      style={{
        left: elementExemplar.getPosition().x + 'px',
        top: elementExemplar.getPosition().y + 'px',
        zIndex: elementExemplar.getZIndex(),
      }}
    >
      {elementExemplar.getType() === 'text' ? (
        <div className="textElement">{elementExemplar.getContent()}</div>
      ) : elementExemplar.getType() === 'image' ? (
        <img src={elementExemplar.getContent()} alt="" className="imgElement" />
      ) : (
        <div>Undefined type</div>
      )}
      <div className="resizeHandle"></div>
    </div>
  );
});
