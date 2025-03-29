import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fileToDataUrl } from '../../utils/helpers';

// Style configuration
const STYLES = {
  'gradient-blue': {
    background: 'linear-gradient(135deg, #4285f4, #0F9D58)',
    color: 'white',
    overlayOpacity: 0.3
  },
  'dark': {
    background: 'linear-gradient(135deg, #212121, #424242)',
    color: 'white',
    overlayOpacity: 0.5
  },
  'vibrant': {
    background: 'linear-gradient(135deg, #00c9ff, #92fe9d)',
    color: '#333',
    overlayOpacity: 0.2
  }
};

const PreviewWrapper = styled.div`
  width: 1400px;
  height: 560px;
  background-image: ${props => props.$background || 'linear-gradient(135deg, #4285f4, #0F9D58)'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: ${props => props.$color || 'white'};
  transform-origin: top left;
  transform: scale(0.35);
  margin-bottom: -364px;
  
  @media (max-width: 768px) {
    transform: scale(0.25);
    margin-bottom: -420px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => 
    props.$overlayOpacity ? 
    `rgba(0, 0, 0, ${props.$overlayOpacity})` : 
    'rgba(0, 0, 0, 0.3)'
  };
  display: flex;
`;

const Content = styled.div`
  width: 50%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ExtensionName = styled.h2`
  margin: 0 0 20px;
  font-size: 54px;
  font-weight: 700;
  color: inherit;
  line-height: 1.2;
`;

const ExtensionTagline = styled.p`
  margin: 0 0 30px;
  font-size: 24px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 500px;
`;

const ExtensionIcon = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
  background-image: ${props => props.$icon ? `url(${props.$icon})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  
  ${props => !props.$icon && `
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
  `}
`;

const ScreenshotsArea = styled.div`
  width: 50%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScreenshotFrame = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 600px;
  height: 420px;
  position: relative;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
`;

const Screenshot = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${props => props.$screenshot ? `url(${props.$screenshot})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  
  ${props => !props.$screenshot && `
    background-color: #f5f5f5;
  `}
`;

const MarqueePreview = forwardRef(({ icon, screenshots = [], extensionName, tagline, style = 'gradient-blue' }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
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
  
  // Load screenshot data URL
  useEffect(() => {
    let mounted = true;
    
    const loadScreenshot = async () => {
      if (!screenshots || screenshots.length === 0) return;
      
      try {
        const dataUrl = await fileToDataUrl(screenshots[0]);
        if (mounted) {
          setScreenshotUrl(dataUrl);
        }
      } catch (error) {
        console.error('Error loading screenshot:', error);
      }
    };
    
    loadScreenshot();
    
    return () => {
      mounted = false;
    };
  }, [screenshots]);

  return (
    <PreviewWrapper 
      ref={ref}
      $background={styleConfig.background}
      $color={styleConfig.color}
    >
      <Overlay $overlayOpacity={styleConfig.overlayOpacity}>
        <Content>
          <ExtensionIcon $icon={iconUrl} />
          <ExtensionName>
            {extensionName || 'Your Extension Name'}
          </ExtensionName>
          <ExtensionTagline>
            {tagline || 'A short description of what your extension does and why users would want to install it'}
          </ExtensionTagline>
        </Content>
        <ScreenshotsArea>
          <ScreenshotFrame>
            <Screenshot $screenshot={screenshotUrl} />
          </ScreenshotFrame>
        </ScreenshotsArea>
      </Overlay>
    </PreviewWrapper>
  );
});

export default MarqueePreview; 