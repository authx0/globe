import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// This is a web-specific controls component that uses OrbitControls from drei
const Controls = ({ children }) => {
  const group = useRef();
  const { camera } = useThree();
  
  // Setup camera
  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);
  
  // Simple auto-rotation for demonstration
  useFrame((state, delta) => {
    if (group.current) {
      // Very subtle auto-rotation when not being controlled by user
      group.current.rotation.y += delta * 0.05;
    }
  });
  
  return (
    <group ref={group}>
      {children}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
        minDistance={2}
        maxDistance={10}
      />
    </group>
  );
};

export default Controls;
