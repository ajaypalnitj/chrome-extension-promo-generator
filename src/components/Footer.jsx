import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--card-bg);
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid var(--border);
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

function Footer() {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          &copy; {new Date().getFullYear()} Chrome Extension Promo Generator | <a href="https://github.com/ajaypalnitj/promo-generator-web" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem' }}>GitHub</a>
        </FooterContent>
      </div>
    </FooterContainer>
  );
}

export default Footer; 