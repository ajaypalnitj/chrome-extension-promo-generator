import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUpload, FiX, FiImage, FiFileText } from 'react-icons/fi';
import { isImageFile } from '../utils/imageUtils';

const FormContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
  max-width: 800px;
  width: 100%;
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
  
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
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--input-bg);
  color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--input-bg);
  color: var(--text);
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  }
`;

const UploadArea = styled.div`
  position: relative;
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  background-color: var(--upload-area-bg);
  margin-bottom: 1rem;
  
  &:hover, &.active {
    border-color: var(--primary);
    background-color: var(--upload-area-hover);
  }
  
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 1rem;
  color: var(--primary);
  
  svg {
    width: 36px;
    height: 36px;
  }
`;

const UploadText = styled.div`
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
`;

const UploadHint = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FilePreviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FilePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--preview-bg);
  }
  
  .file-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    background-color: rgba(220, 53, 69, 0.8);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const GenerateButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  width: 100%;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--disabled);
    cursor: not-allowed;
  }
`;

function UploadForm({ onSubmit, isGenerating }) {
  const [icon, setIcon] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    
    if (file && isImageFile(file)) {
      setIcon(file);
    }
  };
  
  const handleScreenshotUpload = (e) => {
    const files = Array.from(e.target.files).filter(isImageFile);
    
    if (files.length > 0) {
      setScreenshots((prev) => [...prev, ...files].slice(0, 5));
    }
  };
  
  const handleIconDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    
    if (file && isImageFile(file)) {
      setIcon(file);
    }
  };
  
  const handleScreenshotDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(isImageFile);
    
    if (files.length > 0) {
      setScreenshots((prev) => [...prev, ...files].slice(0, 5));
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleRemoveIcon = () => {
    setIcon(null);
  };
  
  const handleRemoveScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!canGenerate) return;
    
    onSubmit({
      icon,
      screenshots,
      name,
      description
    });
  };
  
  const canGenerate = icon && screenshots.length > 0 && name && description;
  const disableForm = isGenerating || !canGenerate;
  
  // Add loading indicator to the generate button
  const generateButtonContent = isGenerating ? (
    <>
      <span className="loading-spinner"></span> Generating...
    </>
  ) : (
    <>
      <FiImage /> Generate Promotional Materials
    </>
  );
  
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormTitle>
          <FiFileText /> Extension Details
        </FormTitle>
        
        <FormSection>
          <SectionTitle>Extension Information</SectionTitle>
          
          <InputGroup>
            <Label htmlFor="name">Extension Name*</Label>
            <Input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your extension name"
              required
              disabled={isGenerating}
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="description">Extension Description*</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Write a short description of your extension"
              required
              disabled={isGenerating}
            />
          </InputGroup>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Upload Extension Icon*</SectionTitle>
          
          <UploadArea 
            className={isDragging ? 'active' : ''}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleIconDrop}
            style={isGenerating ? { opacity: 0.7, pointerEvents: 'none' } : {}}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleIconUpload} 
              id="icon-upload" 
              disabled={isGenerating}
            />
            <UploadIcon>
              <FiUpload />
            </UploadIcon>
            <UploadText>
              {icon ? 'Replace Icon' : 'Upload Extension Icon'}
            </UploadText>
            <UploadHint>
              Recommended: 128×128px PNG image
            </UploadHint>
          </UploadArea>
          
          {icon && (
            <FilePreviewsContainer>
              <FilePreview>
                <img 
                  src={URL.createObjectURL(icon)} 
                  alt="Extension icon preview" 
                />
                <div className="file-name">{icon.name}</div>
                {!isGenerating && (
                  <RemoveButton onClick={handleRemoveIcon}>
                    <FiX />
                  </RemoveButton>
                )}
              </FilePreview>
            </FilePreviewsContainer>
          )}
        </FormSection>
        
        <FormSection>
          <SectionTitle>Upload Screenshots*</SectionTitle>
          
          <UploadArea 
            className={isDragging ? 'active' : ''}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleScreenshotDrop}
            style={isGenerating ? { opacity: 0.7, pointerEvents: 'none' } : {}}
          >
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleScreenshotUpload} 
              id="screenshot-upload" 
              disabled={isGenerating}
            />
            <UploadIcon>
              <FiImage />
            </UploadIcon>
            <UploadText>
              Upload Screenshots (up to 5)
            </UploadText>
            <UploadHint>
              Recommended: 1280×800px PNG images
            </UploadHint>
          </UploadArea>
          
          {screenshots.length > 0 && (
            <FilePreviewsContainer>
              {screenshots.map((screenshot, index) => (
                <FilePreview key={index}>
                  <img 
                    src={URL.createObjectURL(screenshot)} 
                    alt={`Screenshot ${index + 1}`} 
                  />
                  <div className="file-name">{screenshot.name}</div>
                  {!isGenerating && (
                    <RemoveButton onClick={() => handleRemoveScreenshot(index)}>
                      <FiX />
                    </RemoveButton>
                  )}
                </FilePreview>
              ))}
            </FilePreviewsContainer>
          )}
        </FormSection>
        
        <GenerateButton 
          type="submit"
          disabled={disableForm}
        >
          {generateButtonContent}
        </GenerateButton>
      </form>
    </FormContainer>
  );
}

export default UploadForm; 