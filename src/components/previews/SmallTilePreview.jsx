import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fileToDataUrl } from '../../utils/helpers';

// Style configuration
const STYLES = {
  'gradient-blue': {
    background: 'linear-gradient(135deg, #4285f4, #34a853)',
    color: 'white'
  },
  'gradient-purple': {
    background: 'linear-gradient(135deg, #673ab7, #e91e63)',
    color: 'white'
  },
  'gradient-orange': {
    background: 'linear-gradient(135deg, #ff5722, #ff9800)',
    color: 'white'
  }
};

const PreviewWrapper = styled.div`
  width: 440px;
  height: 280px;
  background-image: ${props => props.$background || 'linear-gradient(135deg, #4285f4, #34a853)'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: ${props => props.$color || 'white'};
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 30px;
`;

const ExtensionIcon = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  margin-right: 30px;
  background-image: ${props => props.$icon ? `url(${props.$icon})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  
  ${props => !props.$icon && `
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  `}
`;

const TextContent = styled.div`
  flex: 1;
`;

const ExtensionName = styled.h2`
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  color: inherit;
`;

const ExtensionTagline = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.9;
`;

const SmallTilePreview = forwardRef(({ icon, extensionName, tagline, style = 'gradient-blue' }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const styleConfig = STYLES[style] || STYLES['gradient-blue'];
  
  // Load icon data URL
  useEffect(() => {
    let mounted = true;
    
    const loadIcon = async () => {
      if (!icon) return;
      
      try {
        const dataUrl = await fileToDataUrl(icon);
        if (mounted) {
          setIconUrl(dataUrl);
        }
      } catch (error) {
        console.error('Error loading icon:', error);
      }
    };
    
    loadIcon();
    
    return () => {
      mounted = false;
    };
  }, [icon]);

  return (
    <PreviewWrapper 
      ref={ref} 
      $background={styleConfig.background} 
      $color={styleConfig.color}
    >
      <Content>
        <ExtensionIcon $icon={iconUrl} />
        <TextContent>
          <ExtensionName>
            {extensionName || 'Your Extension Name'}
          </ExtensionName>
          <ExtensionTagline>
            {tagline || 'A short description of what your extension does'}
          </ExtensionTagline>
        </TextContent>
      </Content>
    </PreviewWrapper>
  );
});

export default SmallTilePreview; 