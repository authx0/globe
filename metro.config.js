// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// Initialize default config
const config = getDefaultConfig(__dirname);

// Add the proper resolution for react and react-dom
const extraNodeModules = {
  'react': require.resolve('react'),
  'react-dom': require.resolve('react-dom'),
  '@react-three/fiber': require.resolve('@react-three/fiber'),
};

// Modify the resolver
config.resolver = {
  ...config.resolver,
  extraNodeModules,
  sourceExts: [...config.resolver.sourceExts, 'cjs']
};

// Export the new config
module.exports = config;