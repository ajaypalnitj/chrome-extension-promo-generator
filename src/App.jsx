import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadForm from './components/UploadForm';
import PreviewPanel from './components/PreviewPanel';
import { generateAllPromotionalMaterials } from './utils/imageGenerator';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

function App() {
  const [generatedImages, setGeneratedImages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      setIsGenerating(true);
      
      // Generate all promotional materials
      const images = await generateAllPromotionalMaterials({
        icon: formData.icon,
        name: formData.name,
        description: formData.description,
        screenshots: formData.screenshots
      });
      
      setGeneratedImages(images);
      
      // Scroll to the preview panel
      setTimeout(() => {
        document.querySelector('#preview-panel').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Failed to generate promotional materials. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          <div className="container">
            <Content>
              <UploadForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
              <div id="preview-panel">
                <PreviewPanel generatedImages={generatedImages} />
              </div>
            </Content>
          </div>
        </Main>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
