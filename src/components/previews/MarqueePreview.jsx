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
    cardBackground: '#ffffff'
  },
  'dark': {
    background: '#1e1e2e',
    color: '#ffffff',
    border: '1px solid #2d2d3a',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    cardBackground: '#2d2d3a'
  },
  'colorful': {
    background: 'linear-gradient(135deg, #4285f4, #34a853)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    cardBackground: 'rgba(255, 255, 255, 0.9)'
  }
};

const PreviewWrapper = styled.div`
  width: 1400px;
  height: 560px;
  background: ${props => props.$background || 'white'};
  color: ${props => props.$color || '#333'};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.$shadow || '0 5px 10px rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  border: ${props => props.$border || 'none'};
  padding: 40px;
  display: flex;
  transform-origin: top left;
  transform: scale(0.35);
  margin-bottom: -364px;
  
  @media (max-width: 768px) {
    transform: scale(0.25);
    margin-bottom: -420px;
  }
`;

const LeftSection = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 30px;
`;

const RightSection = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ScreenshotCard = styled.div`
  width: ${props => props.$width || '48%'};
  height: 420px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  background: ${props => props.$cardBackground || 'white'};
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ExtensionIcon = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  background-image: ${props => props.$icon ? `url(${props.$icon})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  
  ${props => !props.$icon && `
    background-color: rgba(200, 200, 200, 0.3);
    border-radius: 20px;
  `}
`;

const ExtensionName = styled.h2`
  margin: 0 0 15px;
  font-size: 36px;
  font-weight: 700;
  color: inherit;
`;

const ExtensionTagline = styled.p`
  margin: 0 0 20px;
  font-size: 20px;
  line-height: 1.5;
  opacity: 0.9;
`;

const MarqueePreview = forwardRef(({ icon, screenshots = [], extensionName, tagline, style = 'colorful' }, ref) => {
  const [iconUrl, setIconUrl] = useState(null);
  const [screenshotUrls, setScreenshotUrls] = useState([]);
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
  
  // Load screenshot data URLs
  useEffect(() => {
    let mounted = true;
    
    const loadScreenshots = async () => {
      if (!screenshots || screenshots.length === 0) return;
      
      try {
        const urls = await Promise.all(
          screenshots.slice(0, 2).map(screenshot => {
            if (typeof screenshot === 'string') return screenshot;
            return URL.createObjectURL(screenshot);
          })
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
      screenshotUrls.forEach(url => {
        if (url && !url.startsWith('data:')) URL.revokeObjectURL(url);
      });
    };
  }, [screenshots]);

  return (
    <PreviewWrapper 
      ref={ref}
      $background={styleConfig.background}
      $color={styleConfig.color}
      $border={styleConfig.border}
      $shadow={styleConfig.shadow}
    >
      <LeftSection>
        <ExtensionIcon $icon={iconUrl} />
        <ExtensionName>
          {extensionName || 'Your Extension Name'}
        </ExtensionName>
        <ExtensionTagline>
          {tagline || 'A short description of what your extension does and why users should install it'}
        </ExtensionTagline>
      </LeftSection>
      
      <RightSection>
        {screenshotUrls.length > 0 ? (
          screenshotUrls.length === 1 ? (
            <ScreenshotCard $width="90%" $cardBackground={styleConfig.cardBackground}>
              <ScreenshotImage src={screenshotUrls[0]} alt="Extension screenshot" />
            </ScreenshotCard>
          ) : (
            <>
              <ScreenshotCard $cardBackground={styleConfig.cardBackground}>
                <ScreenshotImage src={screenshotUrls[0]} alt="Extension screenshot 1" />
              </ScreenshotCard>
              <ScreenshotCard $cardBackground={styleConfig.cardBackground}>
                <ScreenshotImage src={screenshotUrls[1]} alt="Extension screenshot 2" />
              </ScreenshotCard>
            </>
          )
        ) : (
          <ScreenshotCard $width="90%" $cardBackground={styleConfig.cardBackground}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: styleConfig.color === 'white' ? '#999' : '#666'
            }}>
              No screenshots available
            </div>
          </ScreenshotCard>
        )}
      </RightSection>
    </PreviewWrapper>
  );
});

export default MarqueePreview; 