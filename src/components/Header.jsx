import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.backgroundAlt};
  padding: 1.5rem 2rem;
  box-shadow: ${props => props.theme.shadow};
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Tag = styled.span`
  background-color: ${props => props.theme.primary};
  color: white;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  margin-left: 0.5rem;
  text-transform: uppercase;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z"/>
          </svg>
          Chrome Extension Promo Generator
          <Tag>Web</Tag>
        </Logo>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header; 