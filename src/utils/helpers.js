/**
 * Helper functions for the Chrome Extension Promo Generator
 */

/**
 * Format file size in a human-readable format
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Debounce a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create a blob URL from a File object
 * @param {File} file - File object
 * @returns {string} Blob URL
 */
export const createObjectURL = (file) => {
  try {
    if (!file) return null;
    return URL.createObjectURL(file);
  } catch (error) {
    console.error('Error creating object URL:', error);
    return null;
  }
};

/**
 * Safely revoke a blob URL
 * @param {string} url - Blob URL to revoke
 */
export const revokeObjectURL = (url) => {
  try {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error revoking object URL:', error);
  }
};

/**
 * Validate a file's size and type
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @param {number} maxSizeInBytes - Maximum file size in bytes
 * @returns {Object} Validation result with isValid and message
 */
export const validateFile = (file, allowedTypes, maxSizeInBytes) => {
  if (!file) {
    return { isValid: false, message: 'No file provided' };
  }
  
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return { 
      isValid: false,
      message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  // Check file size
  if (maxSizeInBytes && file.size > maxSizeInBytes) {
    return {
      isValid: false,
      message: `File too large. Maximum size: ${formatFileSize(maxSizeInBytes)}`
    };
  }
  
  return { isValid: true, message: 'File is valid' };
};

/**
 * Get an image's dimensions
 * @param {string} url - Image URL
 * @returns {Promise<Object>} Promise resolving to { width, height } object
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

/**
 * Generates a random ID
 * @returns {string} - A random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to wait
 * @returns {Function} - The throttled function
 */
export const throttle = (func, wait) => {
  let lastFunc;
  let lastRan;
  
  return function executedFunction(...args) {
    const context = this;
    
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= wait) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, wait - (Date.now() - lastRan));
    }
  };
};

/**
 * Convert any file-like object to a data URL
 * @param {Object} file - The file to convert
 * @returns {Promise<string>} - A promise that resolves to the data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve) => {
    // If file already has a preview URL, just use that
    if (file && file.preview) {
      resolve(file.preview);
      return;
    }
    
    // If it's a File or Blob, use FileReader
    if (file && (file instanceof Blob || file.type)) {
      const reader = new FileReader();
      
      reader.onload = () => resolve(reader.result);
      
      reader.onerror = () => {
        console.error('Error reading file');
        resolve('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E');
      };
      
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
        resolve('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E');
      }
      return;
    }
    
    // Fallback for any other type of object
    resolve('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E');
  });
}; 