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

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.$screenshot ? `url(${props.$screenshot})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8f9fa;
`;

const ChromeBrowser = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChromeHeader = styled.div`
  height: 60px;
  background-color: #f1f3f4;
  border-bottom: 1px solid #dadce0;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const ChromeAddressBar = styled.div`
  flex: 1;
  height: 36px;
  background-color: #fff;
  border-radius: 24px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #5f6368;
  font-size: 14px;
  border: 1px solid #dadce0;
`;

const ChromeContent = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ScreenshotPreview = forwardRef(({ icon, screenshot, extensionName, tagline }, ref) => {
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
      <ChromeBrowser>
        <ChromeHeader>
          <svg height="24" width="24" viewBox="0 0 24 24" fill="#5f6368">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
            <circle cx="12" cy="12" r="5" fill="#5f6368"></circle>
          </svg>
          <ChromeAddressBar>
            chrome-extension://{extensionName || 'your-extension'}
          </ChromeAddressBar>
        </ChromeHeader>
        <ChromeContent>
          <BackgroundImage $screenshot={screenshotUrl} />
        </ChromeContent>
      </ChromeBrowser>
    </PreviewWrapper>
  );
});

export default ScreenshotPreview; 