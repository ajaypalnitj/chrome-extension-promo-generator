import React from 'react';
import styled from 'styled-components';
import { FaChrome } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: var(--card-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  
  svg {
    color: var(--primary);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: var(--primary);
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo>
            <FaChrome size={24} />
            <span>Extension Promo Generator</span>
          </Logo>
          
          <Nav>
            <NavLink href="https://developer.chrome.com/docs/webstore/images/" target="_blank" rel="noopener noreferrer">
              Chrome Web Store Guidelines
            </NavLink>
            <NavLink href="https://github.com/ajaypalnitj/promo-generator-web" target="_blank" rel="noopener noreferrer">
              GitHub
            </NavLink>
          </Nav>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
}

export default Header; 