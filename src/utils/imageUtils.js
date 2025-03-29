/**
 * Load an image from a File object
 * @param {File} file - Image file to load
 * @returns {Promise<HTMLImageElement>} - Loaded image element
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Generate a fallback image when generation fails
 * @param {number} width - Width of the fallback image
 * @param {number} height - Height of the fallback image
 * @param {string} text - Text to display on the fallback image
 * @returns {string} - Data URL of the fallback image
 */
export function generateFallbackImage(width, height, text) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Fill with light gray
  ctx.fillStyle = '#f1f3f4';
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#5f6368';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text || 'Image Generation Failed', width / 2, height / 2);
  
  return canvas.toDataURL('image/png');
}

/**
 * Truncate text to fit within a maximum width
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} text - Text to truncate
 * @param {number} maxWidth - Maximum width in pixels
 * @returns {string} - Truncated text with ellipsis if needed
 */
export function truncateText(ctx, text, maxWidth) {
  if (!text) return '';
  
  const ellipsis = '...';
  const textWidth = ctx.measureText(text).width;
  
  if (textWidth <= maxWidth) {
    return text;
  }
  
  let truncated = text;
  let width = textWidth;
  
  while (width > maxWidth) {
    truncated = truncated.slice(0, -1);
    width = ctx.measureText(truncated + ellipsis).width;
  }
  
  return truncated + ellipsis;
}

/**
 * Wrap text to multiple lines
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} text - Text to wrap
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxLines - Maximum number of lines
 * @returns {string[]} - Array of wrapped text lines
 */
export function wrapText(ctx, text, maxWidth, maxLines) {
  if (!text) return [''];
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      
      if (lines.length >= maxLines - 1) {
        break;
      }
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // If we've hit the max lines and there's more text, add ellipsis
  if (lines.length === maxLines && lines.length < words.length) {
    const lastLine = lines[lines.length - 1];
    lines[lines.length - 1] = truncateText(ctx, lastLine, maxWidth);
  }
  
  return lines;
}

/**
 * Draw a rounded rectangle on a canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} radius - Corner radius
 * @param {boolean} fill - Whether to fill the rectangle
 * @param {boolean} stroke - Whether to stroke the rectangle
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  
  if (fill) {
    ctx.fill();
  }
  
  if (stroke) {
    ctx.stroke();
  }
}

/**
 * Convert a data URL to a Blob object
 * @param {string} dataUrl - Data URL to convert
 * @returns {Blob} - Blob object
 */
export function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

/**
 * Download a data URL as a file
 * @param {string} dataUrl - Data URL to download
 * @param {string} filename - Name of the file
 */
export function downloadDataURL(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Check if a file is an image
 * @param {File} file - File to check
 * @returns {boolean} - Whether the file is an image
 */
export function isImageFile(file) {
  return file && file.type.startsWith('image/');
}

/**
 * Get dimensions of an image from a File
 * @param {File} file - Image file
 * @returns {Promise<{width: number, height: number}>} - Image dimensions
 */
export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      URL.revokeObjectURL(img.src);
      reject(error);
    };
    img.src = URL.createObjectURL(file);
  });
} 