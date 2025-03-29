import { loadImage, truncateText, wrapText, roundRect, generateFallbackImage } from './imageUtils';

/**
 * Generate a small tile (440x280) promo image
 * @param {Object} options - Generation options
 * @param {File} options.icon - The extension icon file
 * @param {string} options.name - The extension name
 * @returns {Promise<string>} - Data URL of the generated image
 */
export async function generateSmallTile({ icon, name }) {
  try {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 280;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with a light background
    ctx.fillStyle = '#f9f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load icon image
    const iconImage = await loadImage(icon);
    
    // Calculate icon size (centered, max 128px)
    const iconSize = Math.min(128, iconImage.width, iconImage.height);
    const iconX = (canvas.width - iconSize) / 2;
    const iconY = 50;
    
    // Draw icon
    ctx.drawImage(
      iconImage,
      0, 0, iconImage.width, iconImage.height,
      iconX, iconY, iconSize, iconSize
    );
    
    // Draw extension name
    ctx.fillStyle = '#202124';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    const maxTextWidth = canvas.width - 60;
    const truncatedName = truncateText(ctx, name, maxTextWidth);
    
    ctx.fillText(truncatedName, canvas.width / 2, iconY + iconSize + 30);
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating small tile:', error);
    return generateFallbackImage(440, 280, 'Small Tile');
  }
}

/**
 * Generate a marquee promo image (1400x560)
 * @param {Object} options - Generation options
 * @param {File} options.icon - The extension icon file
 * @param {string} options.name - The extension name
 * @param {string} options.description - The extension description
 * @param {File[]} options.screenshots - Extension screenshots
 * @returns {Promise<string>} - Data URL of the generated image
 */
export async function generateMarquee({ icon, name, description, screenshots }) {
  try {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 560;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f9f9fa');
    gradient.addColorStop(1, '#eaeaec');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the main branding area (left side)
    const brandingWidth = canvas.width * 0.4;
    
    // Load icon image
    const iconImage = await loadImage(icon);
    
    // Calculate icon size (max 196px)
    const iconSize = Math.min(196, iconImage.width, iconImage.height);
    const iconX = (brandingWidth - iconSize) / 2;
    const iconY = 100;
    
    // Draw icon
    ctx.drawImage(
      iconImage,
      0, 0, iconImage.width, iconImage.height,
      iconX, iconY, iconSize, iconSize
    );
    
    // Draw extension name
    ctx.fillStyle = '#202124';
    ctx.font = 'bold 40px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    const maxNameWidth = brandingWidth - 80;
    const truncatedName = truncateText(ctx, name, maxNameWidth);
    
    ctx.fillText(truncatedName, brandingWidth / 2, iconY + iconSize + 40);
    
    // Draw extension description
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#5f6368';
    
    const maxWidth = brandingWidth - 100;
    const lineHeight = 30;
    const maxLines = 3;
    
    const wrappedText = wrapText(ctx, description, maxWidth, maxLines);
    const textY = iconY + iconSize + 100;
    
    wrappedText.forEach((line, index) => {
      ctx.fillText(line, brandingWidth / 2, textY + (index * lineHeight));
    });
    
    // Draw screenshots (right side)
    if (screenshots && screenshots.length > 0) {
      try {
        // Load the first screenshot
        const screenshot = await loadImage(screenshots[0]);
        
        // Draw screenshot with padding and rounded corners
        const imageWidth = canvas.width - brandingWidth - 100;
        const imageHeight = (imageWidth * 0.625); // 16:10 aspect ratio
        const imageX = brandingWidth + 50;
        const imageY = (canvas.height - imageHeight) / 2;
        
        // Draw a background for the screenshot
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        
        // Draw rounded rectangle for the background
        roundRect(ctx, imageX - 10, imageY - 10, imageWidth + 20, imageHeight + 20, 10, true);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw the screenshot
        ctx.drawImage(
          screenshot, 
          0, 0, screenshot.width, screenshot.height,
          imageX, imageY, imageWidth, imageHeight
        );
      } catch (screenshotError) {
        console.error('Error loading screenshot:', screenshotError);
        // Continue with the rest of the image
      }
    }
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating marquee:', error);
    return generateFallbackImage(1400, 560, 'Marquee Image');
  }
}

/**
 * Generate a screenshot promo image
 * @param {Object} options - Generation options
 * @param {File} options.screenshot - The screenshot file
 * @returns {Promise<string>} - Data URL of the generated image
 */
export async function generatePromoScreenshot({ screenshot }) {
  try {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 800;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load screenshot
    const screenshotImage = await loadImage(screenshot);
    
    // Calculate dimensions to maintain aspect ratio
    let drawWidth = canvas.width;
    let drawHeight = (screenshotImage.height / screenshotImage.width) * drawWidth;
    
    // If height exceeds canvas, scale down proportionally
    if (drawHeight > canvas.height) {
      drawHeight = canvas.height;
      drawWidth = (screenshotImage.width / screenshotImage.height) * drawHeight;
    }
    
    // Calculate position to center the image
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;
    
    // Draw screenshot
    ctx.drawImage(
      screenshotImage,
      0, 0, screenshotImage.width, screenshotImage.height,
      x, y, drawWidth, drawHeight
    );
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating promo screenshot:', error);
    return generateFallbackImage(1280, 800, 'Screenshot Image');
  }
}

/**
 * Generate all promotional materials
 * @param {Object} options - Generation options
 * @param {File} options.icon - The extension icon file
 * @param {string} options.name - The extension name
 * @param {string} options.description - The extension description
 * @param {File[]} options.screenshots - Extension screenshots
 * @returns {Promise<Object>} - Object containing all generated images
 */
export async function generateAllPromotionalMaterials({ icon, name, description, screenshots }) {
  try {
    // Generate small tile
    const smallTile = await generateSmallTile({ icon, name });
    
    // Generate marquee
    const marqueeTile = await generateMarquee({ 
      icon, 
      name, 
      description, 
      screenshots 
    });
    
    // Generate screenshot images
    const screenshotImages = [];
    
    if (screenshots && screenshots.length) {
      for (const screenshot of screenshots) {
        try {
          const screenshotImage = await generatePromoScreenshot({ screenshot });
          screenshotImages.push(screenshotImage);
        } catch (error) {
          console.error('Error generating screenshot image:', error);
          // Continue with next screenshot
        }
      }
    }
    
    return {
      smallTile,
      marqueeTile,
      screenshots: screenshotImages
    };
  } catch (error) {
    console.error('Error generating promotional materials:', error);
    throw new Error('Failed to generate promotional materials');
  }
} 