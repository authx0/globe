import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SPACE_COLORS } from '../utils/colors';

const Space = () => {
  const starsRef = useRef();
  
  // Create stars for the background
  const [starsGeometry, starsMaterial] = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];
    
    // Generate random stars
    for (let i = 0; i < 2000; i++) {
      // Random position in a large sphere
      const radius = Math.random() * 100 + 20;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      vertices.push(x, y, z);
      
      // Random star size
      const size = Math.random() * 0.6 + 0.2;
      sizes.push(size);
      
      // Random star color
      const colorIndex = Math.floor(Math.random() * SPACE_COLORS.STARS.length);
      const color = new THREE.Color(SPACE_COLORS.STARS[colorIndex]);
      colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    // Create point material
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    return [geometry, material];
  }, []);

  // Animate stars
  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
      starsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <>
      {/* Distant stars background */}
      <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />
      
      {/* Ambient light for scene */}
      <ambientLight intensity={0.3} color="#8a90d4" />
      
      {/* Soft blue light */}
      <pointLight position={[10, 5, 10]} intensity={1} color="#4d9aff" />
      
      {/* Purple accent light */}
      <pointLight position={[-10, -5, -10]} intensity={0.7} color="#a974ff" />
    </>
  );
};

export default Space;
