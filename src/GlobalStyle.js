import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: ${props => props.theme.primary};
    --primary-dark: ${props => props.theme.primaryDark};
    --text-primary: ${props => props.theme.text};
    --text-secondary: ${props => props.theme.textSecondary};
    --background-light: ${props => props.theme.background};
    --background-alt: ${props => props.theme.backgroundAlt};
    --border-color: ${props => props.theme.border};
    --success-color: ${props => props.theme.success};
    --error-color: ${props => props.theme.error};
    --warning-color: ${props => props.theme.warning};
    --shadow: ${props => props.theme.shadow};
    --radius: 8px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${props => props.theme.text};
  }

  button {
    cursor: pointer;
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius);
    font-weight: 500;
    transition: background-color 0.2s, transform 0.1s;
  }

  button:hover {
    background-color: ${props => props.theme.primaryDark};
  }
  
  button:active {
    transform: translateY(1px);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2rem;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: ${props => props.theme.primaryDark};
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    button {
      padding: 0.6rem 1rem;
    }
  }
`;

export default GlobalStyle; 