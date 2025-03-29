import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, applyThemeVariables } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import ThemeToggle from './components/ThemeToggle';
import UploadSection from './components/UploadSection';
import PreviewSection from './components/PreviewSection';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${props => props.theme.backgroundAlt};
  padding: 1.5rem 0;
  box-shadow: ${props => props.theme.shadow};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
  
  span {
    color: ${props => props.theme.primary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.backgroundAlt};
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  
  a {
    color: ${props => props.theme.primary};
  }
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [files, setFiles] = useState({
    icon: null,
    screenshots: []
  });
  const [extensionName, setExtensionName] = useState('Your Extension Name');
  const [tagline, setTagline] = useState('A tagline that describes your extension');
  const [stylePreferences, setStylePreferences] = useState({
    smallTile: 'gradient-blue',
    marqueeTile: 'gradient-blue'
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  useEffect(() => {
    applyThemeVariables(theme);
  }, [theme]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleFileUpload = (type, uploadedFiles) => {
    setErrorMessage('');
    
    try {
      if (type === 'icon') {
        if (uploadedFiles.length === 0) {
          setFiles(prev => ({ ...prev, icon: null }));
          return;
        }
        
        setFiles(prev => ({ ...prev, icon: uploadedFiles[0] }));
      } 
      else if (type === 'screenshots') {
        if (uploadedFiles.length === 0) return;
        
        setFiles(prev => ({
          ...prev,
          screenshots: [...prev.screenshots, ...uploadedFiles].slice(0, 5)
        }));
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      setErrorMessage('An error occurred while processing files. Please try again.');
    }
  };
  
  const handleRemoveScreenshot = (index) => {
    setFiles(prev => {
      const updatedScreenshots = [...prev.screenshots];
      updatedScreenshots.splice(index, 1);
      return { ...prev, screenshots: updatedScreenshots };
    });
  };
  
  const handleClearAll = () => {
    setFiles({ icon: null, screenshots: [] });
    setExtensionName('Your Extension Name');
    setTagline('A tagline that describes your extension');
    setErrorMessage('');
  };
  
  const handleStyleChange = (type, styleId) => {
    setStylePreferences(prev => ({
      ...prev,
      [type]: styleId
    }));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <div className="container">
            <HeaderContent>
              <Title>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20Z" fill="currentColor"/>
                  <path d="M11 17H13V19H11V17Z" fill="currentColor"/>
                  <path d="M12 7C14.2091 7 16 8.79086 16 11C16 12.1 15.5 13.1 14.4 14.2L14 14.6C13.4 15.2 13 15.8 13 17H11C11 15.3 11.8 14.1 12.6 13.3L13.1 12.9C13.8 12.2 14 11.7 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11H8C8 8.8 9.8 7 12 7Z" fill="currentColor"/>
                </svg>
                Chrome Extension <span>Promo Generator</span>
              </Title>
              
              <HeaderActions>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <a 
                  href="https://github.com/ajaypalnitj/chrome-extension-promo-generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source Code
                </a>
              </HeaderActions>
            </HeaderContent>
          </div>
        </Header>
        
        <Main>
          <div className="container">
            {errorMessage && (
              <div style={{
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: 'var(--error-bg)',
                color: 'var(--error-color)',
                borderRadius: 'var(--radius)',
                fontSize: '0.9rem'
              }}>
                {errorMessage}
                <button 
                  style={{
                    marginLeft: '10px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--error-color)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => setErrorMessage('')}
                >
                  Dismiss
                </button>
              </div>
            )}
            
            <ContentGrid>
              <UploadSection
                files={files}
                extensionName={extensionName}
                tagline={tagline}
                setExtensionName={setExtensionName}
                setTagline={setTagline}
                onUpload={handleFileUpload}
                onRemoveScreenshot={handleRemoveScreenshot}
                onClearAll={handleClearAll}
                onGenerate={() => {
                  const previewSection = document.querySelector('.preview-section');
                  if (previewSection) {
                    previewSection.scrollIntoView({ behavior: 'smooth' });
                    
                    setTimeout(() => {
                      const generateButton = previewSection.querySelector('button');
                      if (generateButton && generateButton.textContent.includes('Generate')) {
                        generateButton.click();
                      }
                    }, 500);
                  }
                }}
              />
              
              <PreviewSection
                files={files}
                extensionName={extensionName}
                tagline={tagline}
              />
            </ContentGrid>
          </div>
        </Main>
        
        <Footer>
          <div className="container">
            <p>
              Chrome Extension Promo Generator © {new Date().getFullYear()} | 
              <a href="https://github.com/ajaypalnitj/chrome-extension-promo-generator" target="_blank" rel="noopener noreferrer"> GitHub</a>
            </p>
          </div>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 