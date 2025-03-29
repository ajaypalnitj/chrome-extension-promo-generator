import React from 'react';
import styled from 'styled-components';

const StyleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const StyleOption = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.$isSelected ? 'var(--primary-color)' : 'transparent'};
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  transition: all 0.2s ease-in-out;
`;

const StylePreview = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.$background || 'linear-gradient(135deg, #4285f4, #0F9D58)'};
`;

const StyleName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  font-size: 10px;
  padding: 3px 0;
  text-align: center;
`;

const StyleLabel = styled.div`
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: 500;
`;

const STYLE_OPTIONS = {
  tile: [
    { 
      id: 'gradient-blue', 
      name: 'Blue', 
      background: 'linear-gradient(135deg, #4285f4, #34a853)' 
    },
    { 
      id: 'gradient-purple', 
      name: 'Purple', 
      background: 'linear-gradient(135deg, #673ab7, #e91e63)' 
    },
    { 
      id: 'gradient-orange', 
      name: 'Orange', 
      background: 'linear-gradient(135deg, #ff5722, #ff9800)' 
    }
  ],
  marquee: [
    { 
      id: 'gradient-blue', 
      name: 'Blue', 
      background: 'linear-gradient(135deg, #4285f4, #0F9D58)' 
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      background: 'linear-gradient(135deg, #212121, #424242)' 
    },
    { 
      id: 'vibrant', 
      name: 'Vibrant', 
      background: 'linear-gradient(135deg, #00c9ff, #92fe9d)' 
    }
  ]
};

function StyleSelector({ type, selectedStyle, onChange }) {
  const options = STYLE_OPTIONS[type] || [];
  
  return (
    <div>
      <StyleLabel>Select Style:</StyleLabel>
      <StyleContainer>
        {options.map(style => (
          <StyleOption 
            key={style.id}
            $isSelected={selectedStyle === style.id}
            onClick={() => onChange(style.id)}
            title={style.name}
          >
            <StylePreview $background={style.background} />
            <StyleName>{style.name}</StyleName>
          </StyleOption>
        ))}
      </StyleContainer>
    </div>
  );
}

export default StyleSelector; 