import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fileToDataUrl } from '../../utils/helpers';

const PreviewWrapper = styled.div`
  width: 1280px;
  height: 800px;
  background-color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transform-origin: top left;
  transform: scale(0.4);
  margin-bottom: -480px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    transform: scale(0.25);
    margin-bottom: -600px;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${props => props.$screenshot ? `url(${props.$screenshot})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ScreenshotPreview = forwardRef(({ screenshot, extensionName }, ref) => {
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  
  // Load screenshot data URL
  useEffect(() => {
    let mounted = true;
    
    const loadScreenshot = async () => {
      if (!screenshot) return;
      
      try {
        const dataUrl = await fileToDataUrl(screenshot);
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
  }, [screenshot]);

  return (
    <PreviewWrapper ref={ref}>
      <BackgroundImage $screenshot={screenshotUrl} />
    </PreviewWrapper>
  );
});

export default ScreenshotPreview; 