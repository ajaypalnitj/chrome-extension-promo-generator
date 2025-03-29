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
  
  @media (max-width: 768px) {
    transform: scale(0.25);
    margin-bottom: -600px;
  }
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
  display: block;
`;

const ScreenshotPreview = forwardRef(({ screenshot }, ref) => {
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  
  // Load screenshot data URL
  useEffect(() => {
    let mounted = true;
    
    const loadScreenshot = async () => {
      if (!screenshot) return;
      
      try {
        if (typeof screenshot === 'string') {
          setScreenshotUrl(screenshot);
        } else {
          const objectUrl = URL.createObjectURL(screenshot);
          if (mounted) {
            setScreenshotUrl(objectUrl);
          }
          
          return () => {
            URL.revokeObjectURL(objectUrl);
          };
        }
      } catch (error) {
        console.error('Error loading screenshot:', error);
      }
    };
    
    const cleanup = loadScreenshot();
    
    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [screenshot]);

  return (
    <PreviewWrapper ref={ref}>
      {screenshotUrl ? (
        <ScreenshotImage src={screenshotUrl} alt="Screenshot preview" />
      ) : (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
          No screenshot loaded
        </div>
      )}
    </PreviewWrapper>
  );
});

export default ScreenshotPreview; 