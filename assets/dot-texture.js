// This module provides data for a simple dot texture for the points
// This creates a soft, glowing circular point that will be used on the globe

export const dotTexture = {
  width: 64,
  height: 64,
  data: new Uint8Array(64 * 64 * 4).fill(0).map((_, i) => {
    const x = Math.floor((i / 4) % 64);
    const y = Math.floor((i / 4) / 64);
    
    // Calculate distance from center
    const centerX = 32;
    const centerY = 32;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create a gradient circle
    const radius = 20;
    let alpha = 0;
    
    if (distance < radius) {
      // Smooth falloff toward edges
      alpha = 255 * (1 - distance / radius);
    }
    
    // RGBA channels
    switch (i % 4) {
      case 0: return 255; // R
      case 1: return 255; // G
      case 2: return 255; // B
      case 3: return alpha; // A
    }
  })
};
