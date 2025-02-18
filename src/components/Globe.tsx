// components/Globe.tsx
import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>();

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;

      // Add custom globe material
      globeEl.current.globeMaterial().color = new THREE.Color(0x1a1a1a);
      globeEl.current.globeMaterial().emissive = new THREE.Color(0x0a0a0a);
      globeEl.current.globeMaterial().emissiveIntensity = 0.1;
      globeEl.current.globeMaterial().specular = new THREE.Color(0xffffff);
      globeEl.current.globeMaterial().shininess = 0.7;

      // Add atmospheric glow
      globeEl.current.atmosphereColor(new THREE.Color(0x00aaff));
      globeEl.current.atmosphereAltitude(0.2);
    }
  }, []);

  // Data for markers (platforms, languages, tools)
  const markers = [
    { lat: 37.7749, lng: -122.4194, label: 'React' },
    { lat: 51.5074, lng: -0.1278, label: 'Node.js' },
    { lat: 35.6895, lng: 139.6917, label: 'Python' },
    { lat: 40.7128, lng: -74.006, label: 'TypeScript' },
    { lat: 48.8566, lng: 2.3522, label: 'AWS' },
    { lat: 55.7558, lng: 37.6173, label: 'Docker' },
    { lat: -33.8688, lng: 151.2093, label: 'Kubernetes' },
  ];

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      markers={markers}
      markerColor={() => '#00aaff'}
      markerRadius={0.5}
      markerLabel={(marker: any) => `${marker.label}`}
      onMarkerClick={(marker: any) => {
        console.log(`Clicked on ${marker.label}`);
      }}
      width={800}
      height={600}
    />
  );
};

export default GlobeComponent;