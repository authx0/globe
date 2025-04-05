import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { GLOBE_COLORS } from '../utils/colors';
import { earthTexture } from '../assets/earth-texture';
import { dotTexture } from '../assets/dot-texture';

const Globe = () => {
  const globeRef = useRef();
  const dotsRef = useRef();
  
  // Create Earth texture
  const [globeTexture] = useState(() => {
    const texture = new THREE.DataTexture(
      earthTexture.data,
      earthTexture.width,
      earthTexture.height,
      THREE.RGBAFormat
    );
    texture.needsUpdate = true;
    return texture;
  });
  
  // Create dots texture for points
  const [dotsTexture] = useState(() => {
    const texture = new THREE.DataTexture(
      dotTexture.data,
      dotTexture.width,
      dotTexture.height,
      THREE.RGBAFormat
    );
    texture.needsUpdate = true;
    return texture;
  });

  // Create points for globe surface
  const [pointsGeometry] = useState(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    // Create random points on sphere surface
    for (let i = 0; i < 1500; i++) {
      // Get random point on sphere
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(theta);
      
      positions.push(x, y, z);
      
      // Random size for each point
      const size = Math.random() * 0.1 + 0.05;
      sizes.push(size);
      
      // Random color from palette
      const colorIndex = Math.floor(Math.random() * GLOBE_COLORS.DOTS.length);
      const color = new THREE.Color(GLOBE_COLORS.DOTS[colorIndex]);
      colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    return geometry;
  });

  useFrame((state, delta) => {
    // Auto-rotate the globe slightly when not interacting
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
    
    // Animate dots
    if (dotsRef.current) {
      dotsRef.current.rotation.y += delta * 0.15;
    }
  });
  
  return (
    <group ref={globeRef}>
      {/* Earth globe */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial 
          map={globeTexture}
          color={GLOBE_COLORS.GLOBE}
          emissive={GLOBE_COLORS.GLOBE_EMISSIVE}
          emissiveIntensity={0.4}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.025, 32, 32]}>
        <meshStandardMaterial 
          color={GLOBE_COLORS.ATMOSPHERE}
          transparent={true}
          opacity={0.3}
          roughness={1}
          metalness={0}
        />
      </Sphere>
      
      {/* Points on globe surface */}
      <points ref={dotsRef} geometry={pointsGeometry}>
        <pointsMaterial 
          size={0.05} 
          map={dotsTexture} 
          transparent={true}
          vertexColors={true}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default Globe;
