// This module provides data for a simplified earth texture
// In a real implementation, we would use an actual image loaded via an asset loader
// For this code-based implementation, we're creating a procedural texture

export const earthTexture = {
  width: 256,
  height: 128,
  data: new Uint8Array(256 * 128 * 4).fill(0).map((_, i) => {
    const x = Math.floor((i / 4) % 256);
    const y = Math.floor((i / 4) / 256);
    
    // Simple procedural texture with continents and oceans
    const u = x / 256;
    const v = y / 128;
    
    // Base color (deep blue for oceans)
    let r = 40;
    let g = 70;
    let b = 150;
    
    // Convert lat/long to 3D coordinates on a sphere
    const phi = u * Math.PI * 2;
    const theta = v * Math.PI;
    
    // Generate simple noise for continents
    const seed = Math.sin(phi * 4) * Math.cos(theta * 4) + 
                Math.sin(phi * 8) * Math.cos(theta * 8) * 0.5;
    
    // Create land where noise is positive
    if (seed > 0.1) {
      // Land color (varies from green to brown)
      r = 80 + Math.floor(seed * 60);
      g = 120 + Math.floor(seed * 40);
      b = 70 + Math.floor(seed * 30);
    }
    
    // Add polar ice caps
    if (v < 0.15 || v > 0.85) {
      r = g = b = 220 + Math.floor(Math.random() * 35);
    }
    
    // Create channel data
    switch (i % 4) {
      case 0: return r;
      case 1: return g;
      case 2: return b;
      case 3: return 255; // alpha
    }
  })
};
