import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.backgroundAlt};
  padding: 1.5rem 2rem;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Link = styled.a`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Chrome Extension Promo Generator
        </Copyright>
        <Links>
          <Link 
            href="https://github.com/yourusername/chrome-extension-promo-generator" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link 
            href="https://github.com/yourusername/chrome-extension-promo-generator/issues" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Report Issues
          </Link>
          <Link 
            href="https://developer.chrome.com/docs/webstore/images/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chrome Store Guidelines
          </Link>
        </Links>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 