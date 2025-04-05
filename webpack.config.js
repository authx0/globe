// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Allow react-dom@18.3.1 to work with react@19.1.0
  config.resolve.alias = {
    ...config.resolve.alias,
    'react': require.resolve('react'),
    'react-dom': require.resolve('react-dom'),
    '@react-three/fiber': require.resolve('@react-three/fiber'),
  };

  return config;
};