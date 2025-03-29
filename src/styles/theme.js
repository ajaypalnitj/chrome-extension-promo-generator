/**
 * Theme configuration for the application
 */

export const lightTheme = {
  body: '#FAFAFA',
  text: '#2A2A2A',
  textSecondary: '#666666',
  background: '#FFFFFF',
  backgroundAlt: '#F0F2F5',
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  error: '#EA4335',
  success: '#34A853',
  border: '#E0E0E0',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  toggleBorder: '#FAFAFA',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  button: {
    primary: {
      background: '#4285F4',
      text: '#FFFFFF',
      hover: '#2D76F6',
    },
    secondary: {
      background: '#F0F2F5',
      text: '#2A2A2A',
      hover: '#E0E2E5',
    }
  },
  dropzone: {
    background: '#F8F9FA',
    backgroundActive: '#E8F0FE',
    border: '#E0E0E0',
    borderActive: '#4285F4',
    text: '#666666',
  }
};

export const darkTheme = {
  body: '#121212',
  text: '#FAFAFA',
  textSecondary: '#A0A0A0',
  background: '#1E1E1E',
  backgroundAlt: '#2A2A2A',
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  error: '#EA4335',
  success: '#34A853',
  border: '#404040',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  button: {
    primary: {
      background: '#4285F4',
      text: '#FFFFFF',
      hover: '#2D76F6',
    },
    secondary: {
      background: '#3A3A3A',
      text: '#FAFAFA',
      hover: '#4A4A4A',
    }
  },
  dropzone: {
    background: '#2A2A2A',
    backgroundActive: '#3A3A3A',
    border: '#404040',
    borderActive: '#4285F4',
    text: '#A0A0A0',
  }
};

export const cssVariables = {
  light: {
    '--text-primary': lightTheme.text,
    '--text-secondary': lightTheme.textSecondary,
    '--background': lightTheme.body,
    '--background-alt': lightTheme.backgroundAlt,
    '--primary-color': lightTheme.primary,
    '--secondary-color': lightTheme.secondary,
    '--accent-color': lightTheme.accent,
    '--error-color': lightTheme.error,
    '--success-color': lightTheme.success,
    '--border-color': lightTheme.border,
    '--shadow': lightTheme.shadow,
    '--radius': '8px',
  },
  dark: {
    '--text-primary': darkTheme.text,
    '--text-secondary': darkTheme.textSecondary,
    '--background': darkTheme.body,
    '--background-alt': darkTheme.backgroundAlt,
    '--primary-color': darkTheme.primary,
    '--secondary-color': darkTheme.secondary,
    '--accent-color': darkTheme.accent,
    '--error-color': darkTheme.error,
    '--success-color': darkTheme.success,
    '--border-color': darkTheme.border,
    '--shadow': darkTheme.shadow,
    '--radius': '8px',
  }
};

/**
 * Apply CSS variables to the document root based on the current theme
 * @param {string} theme - 'light' or 'dark'
 */
export const applyThemeVariables = (theme) => {
  const variables = theme === 'dark' ? cssVariables.dark : cssVariables.light;
  Object.entries(variables).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
}; 