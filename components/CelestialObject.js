import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CelestialObject = ({ 
  position = [0, 0, 0], 
  scale = 1, 
  color = '#6E56CF',
  orbitSpeed = 0.5,
  rotationSpeed = 0.5,
  orbitRadius = 3,
  orbitAxis = 'y'
}) => {
  const objRef = useRef();
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const time = useRef(Math.random() * 100); // Random starting time
  
  // Create a small shader material for the celestial object
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(color) },
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          float glow = smoothstep(0.0, 1.0, intensity);
          // Add pulse effect
          float pulse = 0.5 + 0.5 * sin(time * 2.0);
          vec3 finalColor = mix(glowColor, glowColor * 1.5, pulse * 0.5);
          gl_FragColor = vec4(finalColor, glow);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending
    });
  }, [color]);
  
  useFrame((state, delta) => {
    if (objRef.current) {
      // Update time uniform for shader
      if (objRef.current.material.uniforms) {
        time.current += delta;
        objRef.current.material.uniforms.time.value = time.current;
      }
      
      // Rotate the object
      objRef.current.rotation.x += delta * rotationSpeed;
      objRef.current.rotation.y += delta * rotationSpeed * 0.7;
      
      // Orbit around the globe
      const orbit = time.current * orbitSpeed;
      
      if (orbitAxis === 'y') {
        objRef.current.position.x = initialPosition.x + Math.sin(orbit) * orbitRadius;
        objRef.current.position.z = initialPosition.z + Math.cos(orbit) * orbitRadius;
      } else if (orbitAxis === 'x') {
        objRef.current.position.y = initialPosition.y + Math.sin(orbit) * orbitRadius;
        objRef.current.position.z = initialPosition.z + Math.cos(orbit) * orbitRadius;
      } else if (orbitAxis === 'z') {
        objRef.current.position.x = initialPosition.x + Math.sin(orbit) * orbitRadius;
        objRef.current.position.y = initialPosition.y + Math.cos(orbit) * orbitRadius;
      }
    }
  });
  
  return (
    <mesh ref={objRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={glowMaterial} attach="material" />
    </mesh>
  );
};

export default CelestialObject;
