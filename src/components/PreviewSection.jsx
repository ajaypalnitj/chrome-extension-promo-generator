import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import ScreenshotPreview from './previews/ScreenshotPreview';
import SmallTilePreview from './previews/SmallTilePreview';
import MarqueePreview from './previews/MarqueePreview';
import StyleSelector from './StyleSelector';

const Section = styled.section`
  background-color: ${props => props.theme.backgroundAlt};
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PreviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-top: 2rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const PreviewTitle = styled.h3`
  margin: 0;
`;

const PreviewInfo = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

const MultipleScreenshotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius);
  z-index: 10;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const StatusMessage = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.$isError ? 'var(--error-color)' : 'var(--success-color)'};
  margin-top: 0.5rem;
`;

// Fallback method for image generation
const createFallbackImage = (width, height, type) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // Fill with a gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#4285f4');
  gradient.addColorStop(1, '#34a853');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text indicating it's a fallback
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(`${type} Generation Failed`, width / 2, height / 2 - 20);
  ctx.font = '16px Arial';
  ctx.fillText('Please try again', width / 2, height / 2 + 20);
  
  return canvas.toDataURL('image/png');
};

function PreviewSection({ files, extensionName, tagline, styles, onStyleChange }) {
  const [previewUrls, setPreviewUrls] = useState({
    screenshots: {},
    smallTile: null,
    marqueeTile: null
  });
  
  const [loadingStatus, setLoadingStatus] = useState({
    screenshots: {},
    smallTile: false,
    marqueeTile: false
  });
  
  // Refs for all preview components
  const screenshotRefs = useRef({});
  const smallTileRef = useRef(null);
  const marqueeTileRef = useRef(null);
  
  // Get or create a ref for a screenshot at a specific index
  const getScreenshotRef = (index) => {
    if (!screenshotRefs.current[index]) {
      screenshotRefs.current[index] = React.createRef();
    }
    return screenshotRefs.current[index];
  };
  
  // Generate image from a component
  const generateImage = useCallback(async (ref, type, index = null) => {
    if (!ref?.current) return null;
    
    // Set loading state
    if (index !== null) {
      setLoadingStatus(prev => ({
        ...prev,
        screenshots: { ...prev.screenshots, [index]: true }
      }));
    } else {
      setLoadingStatus(prev => ({ ...prev, [type]: true }));
    }
    
    try {
      // Try generating with html-to-image
      const dataUrl = await toPng(ref.current, {
        quality: 0.95,
        pixelRatio: 2
      });
      
      // Store the result
      if (index !== null) {
        setPreviewUrls(prev => ({
          ...prev,
          screenshots: { ...prev.screenshots, [index]: dataUrl }
        }));
      } else {
        setPreviewUrls(prev => ({ ...prev, [type]: dataUrl }));
      }
      
      return dataUrl;
    } catch (error) {
      console.error(`Error generating ${type} image:`, error);
      
      // Create a fallback image
      let fallbackUrl;
      if (type === 'smallTile') {
        fallbackUrl = createFallbackImage(440, 280, 'Small Tile');
      } else if (type === 'marqueeTile') {
        fallbackUrl = createFallbackImage(1400, 560, 'Marquee Tile');
      } else {
        fallbackUrl = createFallbackImage(1280, 800, 'Screenshot');
      }
      
      // Store the fallback result
      if (index !== null) {
        setPreviewUrls(prev => ({
          ...prev,
          screenshots: { ...prev.screenshots, [index]: fallbackUrl }
        }));
      } else {
        setPreviewUrls(prev => ({ ...prev, [type]: fallbackUrl }));
      }
      
      return fallbackUrl;
    } finally {
      // Clear loading state
      if (index !== null) {
        setLoadingStatus(prev => ({
          ...prev,
          screenshots: { ...prev.screenshots, [index]: false }
        }));
      } else {
        setLoadingStatus(prev => ({ ...prev, [type]: false }));
      }
    }
  }, []);
  
  // Generate all images
  const regenerateAll = useCallback(() => {
    // Generate for each screenshot
    files.screenshots.forEach((screenshot, index) => {
      if (!screenshot) return;
      
      const ref = getScreenshotRef(index);
      if (ref && ref.current) {
        generateImage(ref, 'screenshot', index);
      }
    });
    
    // Generate small tile if icon exists
    if (files.icon && smallTileRef.current) {
      generateImage(smallTileRef, 'smallTile');
    }
    
    // Generate marquee tile if icon exists
    if (files.icon && marqueeTileRef.current) {
      generateImage(marqueeTileRef, 'marqueeTile');
    }
  }, [files, generateImage, getScreenshotRef]);
  
  // Download a generated image
  const handleDownload = useCallback((dataUrl, filename) => {
    if (!dataUrl) {
      alert('No image data available. Try generating the image first.');
      return;
    }
    
    try {
      // Convert data URL to blob and download
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          saveAs(blob, filename);
        });
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download the image. Please try again.');
    }
  }, []);
  
  // Download all generated images
  const downloadAll = useCallback(async () => {
    const screenshotKeys = Object.keys(previewUrls.screenshots);
    
    // Download each screenshot
    for (const index of screenshotKeys) {
      const dataUrl = previewUrls.screenshots[index];
      if (dataUrl) {
        handleDownload(dataUrl, `screenshot_${Number(index) + 1}_1280x800.png`);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    // Download small tile
    if (previewUrls.smallTile) {
      handleDownload(previewUrls.smallTile, 'small_promo_440x280.png');
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Download marquee tile
    if (previewUrls.marqueeTile) {
      handleDownload(previewUrls.marqueeTile, 'marquee_promo_1400x560.png');
    }
  }, [previewUrls, handleDownload]);

  return (
    <Section className="preview-section">
      <SectionTitle>
        Preview & Download
        <ButtonsContainer>
          <button 
            onClick={regenerateAll}
            style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Generate Materials
          </button>
          <button 
            onClick={() => downloadAll()}
            disabled={!previewUrls.smallTile && !previewUrls.marqueeTile && Object.keys(previewUrls.screenshots).length === 0}
          >
            Download All
          </button>
        </ButtonsContainer>
      </SectionTitle>
      
      <PreviewsGrid>
        {/* Screenshots Previews */}
        <PreviewContainer>
          <PreviewHeader>
            <div>
              <PreviewTitle>Screenshots (1280 x 800)</PreviewTitle>
              <PreviewInfo>Required for Chrome Web Store submission</PreviewInfo>
            </div>
          </PreviewHeader>
          
          <MultipleScreenshotsContainer>
            {files.screenshots.map((screenshot, index) => (
              <div key={`screenshot-${index}`} style={{ position: 'relative' }}>
                <PreviewHeader>
                  <div>
                    <PreviewTitle>Screenshot {index + 1}</PreviewTitle>
                  </div>
                  <button 
                    onClick={() => handleDownload(
                      previewUrls.screenshots[index], 
                      `screenshot_${index + 1}_1280x800.png`
                    )}
                    disabled={!previewUrls.screenshots[index] || loadingStatus.screenshots[index]}
                  >
                    {loadingStatus.screenshots[index] ? 'Generating...' : 'Download'}
                  </button>
                </PreviewHeader>
                
                <div style={{ position: 'relative' }}>
                  <ScreenshotPreview 
                    ref={getScreenshotRef(index)}
                    icon={files.icon} 
                    screenshot={screenshot}
                    extensionName={extensionName}
                    tagline={tagline}
                  />
                  {loadingStatus.screenshots[index] && <LoadingIndicator />}
                </div>
              </div>
            ))}
          </MultipleScreenshotsContainer>
        </PreviewContainer>
        
        {/* Small Tile Preview */}
        <PreviewContainer>
          <PreviewHeader>
            <div>
              <PreviewTitle>Small Promo Tile (440 x 280)</PreviewTitle>
              <PreviewInfo>Optional but recommended for better visibility</PreviewInfo>
            </div>
            <button 
              onClick={() => handleDownload(previewUrls.smallTile, 'small_promo_440x280.png')}
              disabled={!previewUrls.smallTile || loadingStatus.smallTile}
            >
              {loadingStatus.smallTile ? 'Generating...' : 'Download'}
            </button>
          </PreviewHeader>
          
          <StyleSelector 
            type="tile" 
            selectedStyle={styles.smallTile} 
            onChange={(styleId) => onStyleChange('smallTile', styleId)} 
          />
          
          <div style={{ position: 'relative' }}>
            <SmallTilePreview 
              ref={smallTileRef}
              icon={files.icon} 
              extensionName={extensionName}
              tagline={tagline}
              style={styles.smallTile}
            />
            {loadingStatus.smallTile && <LoadingIndicator />}
          </div>
        </PreviewContainer>
        
        {/* Marquee Preview */}
        <PreviewContainer>
          <PreviewHeader>
            <div>
              <PreviewTitle>Marquee Promo Tile (1400 x 560)</PreviewTitle>
              <PreviewInfo>Optional but recommended for featured extensions</PreviewInfo>
            </div>
            <button 
              onClick={() => handleDownload(previewUrls.marqueeTile, 'marquee_promo_1400x560.png')}
              disabled={!previewUrls.marqueeTile || loadingStatus.marqueeTile}
            >
              {loadingStatus.marqueeTile ? 'Generating...' : 'Download'}
            </button>
          </PreviewHeader>
          
          <StyleSelector 
            type="marquee" 
            selectedStyle={styles.marqueeTile} 
            onChange={(styleId) => onStyleChange('marqueeTile', styleId)} 
          />
          
          <div style={{ position: 'relative' }}>
            <MarqueePreview 
              ref={marqueeTileRef}
              icon={files.icon} 
              screenshots={files.screenshots.slice(0, 2)}
              extensionName={extensionName}
              tagline={tagline}
              style={styles.marqueeTile}
            />
            {loadingStatus.marqueeTile && <LoadingIndicator />}
          </div>
        </PreviewContainer>
      </PreviewsGrid>
    </Section>
  );
}

export default PreviewSection; 