import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fileToDataUrl } from '../../utils/helpers';

const PreviewWrapper = styled.div`
  width: 1280px;
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transform-origin: top left;
  transform: scale(0.4);
  margin-bottom: -480px;
  
  @media (max-width: 768px) {
    transform: scale(0.25);
    margin-bottom: -600px;
  }
`;

const ChromeHeader = styled.div`
  height: 80px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
`;

const AddressBar = styled.div`
  flex: 1;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: #333;
  font-size: 14px;
  border: 1px solid #ddd;
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  margin-right: 10px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-bottom: none;
`;

const ScreenshotContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
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
  ${props => !props.$screenshot && `
    background-color: #f0f0f0;
  `}
`;

const ExtensionSidebar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-left: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ExtensionIcon = styled.div`
  width: 48px;
  height: 48px;
  background-image: ${props => props.$icon ? `url(${props.$icon})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 15px;
  
  ${props => !props.$icon && `
    background-color: #f5f5f5;
    border-radius: 8px;
  `}
`;

const ExtensionName = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

const ExtensionTagline = styled.p`
  margin: 15px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ExtensionButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 10px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  width: 120px;
`;

const ScreenshotPreview = forwardRef(({ icon, screenshot, extensionName, tagline }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  
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
      <ChromeHeader>
        <TabBar>
          <Tab>{extensionName || 'Chrome Extension'}</Tab>
        </TabBar>
        <AddressBar>chrome://extensions/?id=example-extension-id</AddressBar>
      </ChromeHeader>
      <ScreenshotContent>
        <BackgroundImage $screenshot={screenshotUrl} />
        <ExtensionSidebar>
          <IconContainer>
            <ExtensionIcon $icon={iconUrl} />
            <ExtensionName>
              {extensionName || 'Your Extension Name'}
            </ExtensionName>
          </IconContainer>
          <ExtensionTagline>
            {tagline || 'A short description of what your extension does'}
          </ExtensionTagline>
          <ExtensionButton>Options</ExtensionButton>
          <ExtensionButton style={{ marginTop: '10px', backgroundColor: '#0F9D58' }}>Details</ExtensionButton>
        </ExtensionSidebar>
      </ScreenshotContent>
    </PreviewWrapper>
  );
});

export default ScreenshotPreview; 