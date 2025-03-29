import React from 'react';
import styled from 'styled-components';
import { FiDownload, FiImage, FiPackage } from 'react-icons/fi';
import { downloadDataURL } from '../utils/imageUtils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const PanelContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  max-width: 800px;
  width: 100%;
`;

const PanelTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
  background-color: var(--background);
  border-radius: 8px;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    opacity: 0.7;
  }
  
  h3 {
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
  
  p {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const PreviewSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PreviewImage = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const DownloadButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--disabled);
    cursor: not-allowed;
  }
`;

const DownloadAllButton = styled(DownloadButton)`
  margin-top: 1.5rem;
  width: 100%;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

function PreviewPanel({ generatedImages }) {
  const hasImages = generatedImages && (
    generatedImages.smallTile || 
    generatedImages.marqueeTile || 
    (generatedImages.screenshots && generatedImages.screenshots.length > 0)
  );

  const handleDownload = (dataUrl, filename) => {
    downloadDataURL(dataUrl, filename);
  };

  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();
      
      // Add small tile
      if (generatedImages.smallTile) {
        const smallTileBlob = await fetch(generatedImages.smallTile).then(r => r.blob());
        zip.file('small-tile.png', smallTileBlob);
      }
      
      // Add marquee
      if (generatedImages.marqueeTile) {
        const marqueeBlob = await fetch(generatedImages.marqueeTile).then(r => r.blob());
        zip.file('marquee.png', marqueeBlob);
      }
      
      // Add screenshots
      if (generatedImages.screenshots && generatedImages.screenshots.length > 0) {
        const screenshotsFolder = zip.folder('screenshots');
        
        for (let i = 0; i < generatedImages.screenshots.length; i++) {
          const screenshotBlob = await fetch(generatedImages.screenshots[i]).then(r => r.blob());
          screenshotsFolder.file(`screenshot-${i + 1}.png`, screenshotBlob);
        }
      }
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Save the zip file
      saveAs(content, 'promotional-materials.zip');
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to create the zip file. Please try downloading files individually.');
    }
  };
  
  if (!hasImages) {
    return (
      <PanelContainer>
        <PanelTitle>
          <FiImage /> Promotional Materials
        </PanelTitle>
        
        <EmptyState>
          <FiImage />
          <h3>No promotional materials generated yet</h3>
          <p>
            Upload your extension icon and screenshots, then click the "Generate Promotional Materials" button to create promotional images for the Chrome Web Store.
          </p>
        </EmptyState>
      </PanelContainer>
    );
  }
  
  return (
    <PanelContainer>
      <PanelTitle>
        <FiImage /> Promotional Materials
      </PanelTitle>
      
      {generatedImages.smallTile && (
        <PreviewSection>
          <SectionTitle>
            Small Tile (440×280)
            <DownloadButton onClick={() => handleDownload(generatedImages.smallTile, 'small-tile.png')}>
              <FiDownload /> Download
            </DownloadButton>
          </SectionTitle>
          
          <PreviewImage>
            <img src={generatedImages.smallTile} alt="Small promotional tile" />
          </PreviewImage>
        </PreviewSection>
      )}
      
      {generatedImages.marqueeTile && (
        <PreviewSection>
          <SectionTitle>
            Marquee Promotional Tile (1400×560)
            <DownloadButton onClick={() => handleDownload(generatedImages.marqueeTile, 'marquee.png')}>
              <FiDownload /> Download
            </DownloadButton>
          </SectionTitle>
          
          <PreviewImage>
            <img src={generatedImages.marqueeTile} alt="Marquee promotional tile" />
          </PreviewImage>
        </PreviewSection>
      )}
      
      {generatedImages.screenshots && generatedImages.screenshots.length > 0 && (
        <PreviewSection>
          <SectionTitle>
            Screenshot Images
          </SectionTitle>
          
          <GridLayout>
            {generatedImages.screenshots.map((screenshot, index) => (
              <div key={index}>
                <PreviewImage>
                  <img src={screenshot} alt={`Screenshot ${index + 1}`} />
                </PreviewImage>
                <DownloadButton onClick={() => handleDownload(screenshot, `screenshot-${index + 1}.png`)}>
                  <FiDownload /> Download Screenshot {index + 1}
                </DownloadButton>
              </div>
            ))}
          </GridLayout>
        </PreviewSection>
      )}
      
      <DownloadAllButton onClick={handleDownloadAll}>
        <FiPackage /> Download All Materials
      </DownloadAllButton>
    </PanelContainer>
  );
}

export default PreviewPanel; 