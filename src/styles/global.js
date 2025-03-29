import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Color palette */
    --primary: #4285F4;
    --primary-dark: #3367D6;
    --secondary: #34A853;
    --accent: #FBBC05;
    --error: #EA4335;
    
    /* Text colors */
    --text: #202124;
    --text-secondary: #5F6368;
    
    /* UI colors */
    --border: #DADCE0;
    --card-bg: #FFFFFF;
    --background: #F8F9FA;
    --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
    
    /* Form colors */
    --input-bg: #FFFFFF;
    --disabled: #9AA0A6;
    --preview-bg: #F8F9FA;
    --upload-area-bg: rgba(66, 133, 244, 0.05);
    --upload-area-hover: rgba(66, 133, 244, 0.1);
    
    /* Derived RGB values for transparency */
    --primary-rgb: 66, 133, 244;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--text);
    background-color: var(--background);
    line-height: 1.5;
    overflow-x: hidden;
    max-width: 100vw;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Container classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 0 0.75rem;
    }
  }
`;

export default GlobalStyles; 