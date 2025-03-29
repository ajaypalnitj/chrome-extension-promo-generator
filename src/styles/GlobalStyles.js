import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.button.primary.background};
    color: ${({ theme }) => theme.button.primary.text};
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background-color 0.2s ease;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.button.primary.hover};
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &.secondary {
      background-color: ${({ theme }) => theme.button.secondary.background};
      color: ${({ theme }) => theme.button.secondary.text};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.button.secondary.hover};
      }
    }
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: var(--radius);
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.textSecondary};
    }
    
    &:disabled {
      background-color: ${({ theme }) => theme.backgroundAlt};
      cursor: not-allowed;
    }
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
  
  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.text};
    margin-left: 1rem;
    font-size: 0.9rem;
    text-decoration: none;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
      text-decoration: none;
    }
    
    svg {
      width: 20px;
      height: 20px;
      fill: ${({ theme }) => theme.text};
    }
    
    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

export default GlobalStyles; 