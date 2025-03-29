import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatFileSize, fileToDataUrl } from '../utils/helpers';

const PreviewContainer = styled.div`
  position: relative;
  width: 150px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  display: block;
  background-color: #f5f5f5;
`;

const PreviewInfo = styled.div`
  padding: 0.5rem;
  background-color: white;
`;

const PreviewName = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const PreviewSize = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
`;

const ImageDetails = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: 0;
  color: #666;
  font-weight: bold;
  font-size: 16px;
  
  &:hover {
    background-color: white;
    color: var(--error-color);
  }
`;

function FilePreview({ file, name, onRemove }) {
  const [preview, setPreview] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!file) {
      setError(true);
      return;
    }
    
    let mounted = true;
    setError(false);
    
    const loadPreview = async () => {
      try {
        // Use fileToDataUrl helper to convert file to data URL
        const dataUrl = await fileToDataUrl(file);
        
        if (!mounted) return;
        
        setPreview(dataUrl);
        
        // Get image dimensions
        const img = new Image();
        img.onload = () => {
          if (!mounted) return;
          setDimensions({
            width: img.width,
            height: img.height
          });
        };
        
        img.onerror = () => {
          if (!mounted) return;
          console.error('Error loading image from data URL');
          setError(true);
        };
        
        img.src = dataUrl;
      } catch (err) {
        if (!mounted) return;
        console.error('Error creating preview:', err);
        setError(true);
      }
    };
    
    loadPreview();
    
    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [file]);

  return (
    <PreviewContainer>
      {!error ? (
        <PreviewImage 
          src={preview} 
          alt={name} 
          onError={() => setError(true)} 
          loading="lazy"
        />
      ) : (
        <PreviewImage 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E" 
          alt="Preview not available" 
        />
      )}
      <RemoveButton onClick={onRemove} title="Remove file">×</RemoveButton>
      <PreviewInfo>
        <PreviewName title={name}>{name}</PreviewName>
        {file && file.size && (
          <PreviewSize>
            <span>{formatFileSize(file.size)}</span>
            <span>{file.type ? file.type.split('/')[1].toUpperCase() : 'FILE'}</span>
          </PreviewSize>
        )}
        {dimensions.width > 0 && (
          <ImageDetails>
            {dimensions.width} × {dimensions.height}px
          </ImageDetails>
        )}
        {error && (
          <ImageDetails style={{ color: 'var(--error-color)' }}>
            Failed to load preview
          </ImageDetails>
        )}
      </PreviewInfo>
    </PreviewContainer>
  );
}

export default FilePreview; 