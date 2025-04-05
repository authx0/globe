import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

import Globe from './components/Globe';
import Space from './components/Space';
import CelestialObject from './components/CelestialObject';
import Controls from './components/Controls';

// Web-only version of the application
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Scene content for web
  const SceneContent = () => (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Space />
      <Controls>
        <Globe />
      </Controls>
      
      {/* Celestial objects */}
      <CelestialObject 
        position={[2, 0.5, 0]} 
        scale={0.2} 
        color="#6E56CF" 
        orbitSpeed={0.3}
        rotationSpeed={0.5}
        orbitRadius={3}
        orbitAxis="y"
      />
      
      <CelestialObject 
        position={[-2.5, -1, 1]} 
        scale={0.15} 
        color="#82AAFF" 
        orbitSpeed={0.4}
        rotationSpeed={0.7}
        orbitRadius={3.5}
        orbitAxis="z"
      />
      
      <CelestialObject 
        position={[1, -2, -1]} 
        scale={0.18} 
        color="#6EE7B7" 
        orbitSpeed={0.25}
        rotationSpeed={0.6}
        orbitRadius={3.2}
        orbitAxis="x"
      />
    </>
  );

  // Web-specific rendering
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isLoading ? (
        <div style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Loading Universe...
        </div>
      ) : (
        <Canvas 
          style={{ width: '100%', height: '100%' }} 
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default App;
