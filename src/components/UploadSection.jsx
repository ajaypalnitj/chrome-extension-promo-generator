import React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import FilePreview from './FilePreview';

const Section = styled.section`
  background-color: ${props => props.theme.backgroundAlt};
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const UploadBox = styled.div`
  background-color: ${props => props.theme.background};
  border: 2px dashed ${props => props.isDragActive ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--primary-color);
    background-color: ${props => props.theme.backgroundHover};
  }
`;

const UploadIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  
  svg {
    width: 100%;
    height: 100%;
    color: var(--text-secondary);
  }
`;

const UploadText = styled.div`
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const UploadHint = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: ${props => props.theme.inputBg};
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const PreviewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

const Button = styled.button`
  background-color: ${props => props.$isPrimary ? 'var(--primary-color)' : props.theme.buttonBg};
  color: ${props => props.$isPrimary ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  font-weight: ${props => props.$isPrimary ? '600' : '400'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$isPrimary ? 'var(--primary-hover)' : props.theme.buttonHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UploadHelpText = styled.div`
  background-color: ${props => props.theme.backgroundHover};
  border-radius: var(--radius);
  padding: 1rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  p {
    margin: 0 0 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: var(--text-primary);
  }
`;

function UploadSection({ 
  files, 
  extensionName, 
  tagline, 
  setExtensionName, 
  setTagline, 
  onUpload, 
  onRemoveScreenshot,
  onClearAll,
  onGenerate
}) {
  // Simple icon dropzone
  const {
    getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconDragActive
  } = useDropzone({
    onDrop: files => onUpload('icon', files),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });
  
  // Simple screenshots dropzone
  const {
    getRootProps: getScreenshotsRootProps,
    getInputProps: getScreenshotsInputProps,
    isDragActive: isScreenshotsDragActive
  } = useDropzone({
    onDrop: files => onUpload('screenshots', files),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    }
  });
  
  // Check if files are available
  const hasFiles = !!files.icon || files.screenshots.length > 0;

  return (
    <Section>
      <SectionTitle>Upload Your Assets</SectionTitle>
      
      <UploadGrid>
        <div>
          <InputGroup>
            <InputLabel htmlFor="extension-name">Extension Name</InputLabel>
            <Input
              id="extension-name"
              type="text"
              value={extensionName}
              onChange={e => setExtensionName(e.target.value)}
              placeholder="Your Extension Name"
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel htmlFor="extension-tagline">Tagline / Description</InputLabel>
            <Input
              id="extension-tagline"
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="A short description of what your extension does"
            />
          </InputGroup>
        </div>
        
        <div>
          <InputLabel>Extension Icon</InputLabel>
          
          <UploadBox
            {...getIconRootProps()}
            isDragActive={isIconDragActive}
          >
            <input {...getIconInputProps()} />
            <UploadIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </UploadIcon>
            <UploadText>
              {files.icon ? 'Replace Icon' : 'Upload Icon'}
            </UploadText>
            <UploadHint>
              PNG, JPG or WebP, 128x128px recommended
            </UploadHint>
          </UploadBox>
          
          {files.icon && (
            <PreviewsContainer>
              <FilePreview
                file={files.icon}
                name={files.icon.name || 'Icon'}
                onRemove={() => onUpload('icon', [])}
              />
            </PreviewsContainer>
          )}
        </div>
        
        <div>
          <InputLabel>
            Screenshots ({files.screenshots.length}/5)
          </InputLabel>
          
          <UploadBox
            {...getScreenshotsRootProps()}
            isDragActive={isScreenshotsDragActive}
          >
            <input {...getScreenshotsInputProps()} />
            <UploadIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </UploadIcon>
            <UploadText>
              Upload Screenshots
            </UploadText>
            <UploadHint>
              PNG, JPG or WebP, 1280x800px recommended
            </UploadHint>
          </UploadBox>
          
          {files.screenshots.length > 0 && (
            <PreviewsContainer>
              {files.screenshots.map((screenshot, index) => (
                <FilePreview
                  key={index}
                  file={screenshot}
                  name={screenshot.name || `Screenshot ${index + 1}`}
                  onRemove={() => onRemoveScreenshot(index)}
                />
              ))}
            </PreviewsContainer>
          )}
        </div>
      </UploadGrid>
      
      <UploadHelpText>
        <p><strong>How it works:</strong></p>
        <p>1. Upload your extension icon and screenshots</p>
        <p>2. Enter your extension name and a tagline</p>
        <p>3. Click "Generate Materials" to create your promotional images</p>
        <p>4. Choose from different styles for tile and marquee images</p>
        <p>5. Download individual images or all at once</p>
      </UploadHelpText>
      
      <ButtonGroup>
        <Button 
          $isPrimary
          onClick={onGenerate}
          disabled={!files.icon && files.screenshots.length === 0}
        >
          Generate Materials
        </Button>
        
        <Button
          onClick={onClearAll}
          disabled={!hasFiles && extensionName === 'Your Extension Name' && tagline === 'A tagline that describes your extension'}
        >
          Clear All
        </Button>
      </ButtonGroup>
    </Section>
  );
}

export default UploadSection; 