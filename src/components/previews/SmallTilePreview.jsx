import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fileToDataUrl } from '../../utils/helpers';

// Style configuration
const STYLES = {
  'minimal': {
    background: '#ffffff',
    color: '#333333',
    border: '1px solid #e0e0e0',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    iconBg: 'rgba(240, 240, 240, 0.8)'
  },
  'dark': {
    background: '#1e1e2e',
    color: '#ffffff',
    border: '1px solid #2d2d3a',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    iconBg: 'rgba(60, 60, 80, 0.5)'
  },
  'colorful': {
    background: 'linear-gradient(135deg, #4285f4, #34a853)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    iconBg: 'rgba(255, 255, 255, 0.2)'
  }
};

const PreviewWrapper = styled.div`
  width: 440px;
  height: 280px;
  background: ${props => props.$background || 'white'};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.$shadow || '0 5px 10px rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  border: ${props => props.$border || 'none'};
  color: ${props => props.$color || '#333'};
  display: flex;
  align-items: center;
  padding: 30px;
`;

const ExtensionIcon = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  margin-right: 20px;
  background-image: ${props => props.$icon ? `url(${props.$icon})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  
  ${props => !props.$icon && `
    background-color: ${props.$iconBg || 'rgba(240, 240, 240, 0.8)'};
  `}
`;

const TextContent = styled.div`
  flex: 1;
`;

const ExtensionName = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: inherit;
`;

const ExtensionTagline = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
`;

const SmallTilePreview = forwardRef(({ icon, extensionName, tagline, style = 'colorful' }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const styleConfig = STYLES[style] || STYLES['colorful'];
  
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
      $border={styleConfig.border}
      $shadow={styleConfig.shadow}
    >
      <ExtensionIcon 
        $icon={iconUrl} 
        $iconBg={styleConfig.iconBg}
      />
      <TextContent>
        <ExtensionName>
          {extensionName || 'Your Extension Name'}
        </ExtensionName>
        <ExtensionTagline>
          {tagline || 'A short description of what your extension does'}
        </ExtensionTagline>
      </TextContent>
    </PreviewWrapper>
  );
});

export default SmallTilePreview; 