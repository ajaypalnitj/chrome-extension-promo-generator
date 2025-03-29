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
  width: 1400px;
  height: 560px;
  background: ${props => props.$background || 'linear-gradient(135deg, #4285f4, #34a853)'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: ${props => props.$color || 'white'};
  padding: 40px;
  display: flex;
  flex-direction: row;
  
  @media (max-width: 768px) {
    transform: scale(0.5);
    transform-origin: top left;
    margin-bottom: -280px;
  }
`;

const ContentSection = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    border-radius: 20px;
  `}
`;

const TextContent = styled.div`
  max-width: 400px;
`;

const ExtensionName = styled.h2`
  margin: 0 0 15px;
  font-size: 36px;
  font-weight: 700;
  color: inherit;
`;

const ExtensionTagline = styled.p`
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
  opacity: 0.9;
`;

const ScreenshotsSection = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const ScreenshotContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
`;

const ScreenshotImage = styled.div`
  width: 320px;
  height: 480px;
  background-color: #f5f5f5;
  background-image: ${props => props.$src ? `url(${props.$src})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  position: absolute;
  transform: rotate(${props => props.$rotate || '0deg'});
  top: ${props => props.$top || '0'};
  right: ${props => props.$right || '0'};
  z-index: ${props => props.$zIndex || 1};
`;

const MarqueePreview = forwardRef(({ icon, screenshots = [], extensionName, tagline, style = 'gradient-blue' }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const [screenshotUrls, setScreenshotUrls] = useState([]);
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
  
  // Load screenshot data URLs
  useEffect(() => {
    let mounted = true;
    
    const loadScreenshots = async () => {
      if (!screenshots || screenshots.length === 0) return;
      
      try {
        const urls = await Promise.all(
          screenshots.slice(0, 3).map(screenshot => fileToDataUrl(screenshot))
        );
        
        if (mounted) {
          setScreenshotUrls(urls);
        }
      } catch (error) {
        console.error('Error loading screenshots:', error);
      }
    };
    
    loadScreenshots();
    
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
      <ContentSection>
        <ExtensionIcon $icon={iconUrl} />
        <TextContent>
          <ExtensionName>
            {extensionName || 'Your Extension Name'}
          </ExtensionName>
          <ExtensionTagline>
            {tagline || 'A short description of what your extension does and why users should install it'}
          </ExtensionTagline>
        </TextContent>
      </ContentSection>
      
      <ScreenshotsSection>
        <ScreenshotContainer>
          {screenshotUrls.length > 0 ? (
            <>
              {screenshotUrls.length >= 3 && (
                <ScreenshotImage 
                  $src={screenshotUrls[2]} 
                  $rotate="-5deg" 
                  $right="300px" 
                  $top="20px"
                  $zIndex={1}
                />
              )}
              
              {screenshotUrls.length >= 2 && (
                <ScreenshotImage 
                  $src={screenshotUrls[1]} 
                  $rotate="3deg" 
                  $right="200px"
                  $top="10px"
                  $zIndex={2}
                />
              )}
              
              <ScreenshotImage 
                $src={screenshotUrls[0]} 
                $rotate="0deg"
                $right="100px"
                $zIndex={3}
              />
            </>
          ) : (
            <ScreenshotImage />
          )}
        </ScreenshotContainer>
      </ScreenshotsSection>
    </PreviewWrapper>
  );
});

export default MarqueePreview; 