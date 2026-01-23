import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GridBackground = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const gridRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - aerial view looking down
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(15, 2, 0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create 10x10 grid with glowing lines
    const gridGroup = new THREE.Group();
    const gridSize = 20;
    const spacing = 2;
    const totalSize = gridSize * spacing;
    const offset = totalSize / 2;

    // Material for glowing lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.6
    });

    // Noise function for terrain-like hills
    const getTerrainHeight = (x, z, scrollProgress) => {
      // Adjustable parameters for the noise pattern
      const amplitude = 3;      // Height of the hills
      const frequency = 0.1;    // How often hills appear
      const octaves = 3;        // Layers of detail
      
      let height = 0;
      let amp = amplitude;
      let freq = frequency;
      
      // Multi-octave noise for more natural hills
      for (let i = 0; i < octaves; i++) {
        height += Math.sin(x * freq) * Math.cos(z * freq * 0.7) * amp;
        height += Math.cos(x * freq * 1.3) * Math.sin(z * freq * 0.9) * amp * 0.5;
        amp *= 0.5;
        freq *= 2;
      }
      
      // Scale height based on scroll progress (0 = flat, 1 = full height)
      return height * scrollProgress;
    };


    // Horizontal lines
    // for (let i = 0; i <= gridSize; i++) {
    //   const geometry = new THREE.BufferGeometry();
    //   const points = [
    //     new THREE.Vector3(-offset, 0, i * spacing - offset),
    //     new THREE.Vector3(offset, 0, i * spacing - offset)
    //   ];
    //   geometry.setFromPoints(points);
    //   const line = new THREE.Line(geometry, lineMaterial);
    //   gridGroup.add(line);
    // }

    const horizontalLines = [];
    for (let i = 0; i <= gridSize; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const segments = 50; // Number of points along the line for smooth curves
      
      for (let j = 0; j <= segments; j++) {
        const x = -offset + (j / segments) * totalSize;
        const z = i * spacing - offset;
        const y = getTerrainHeight(x, z, 0); // Start flat
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);
      horizontalLines.push({ geometry, points: points.map(p => ({ x: p.x, z: p.z })) });
    }

    // Vertical lines
    // for (let i = 0; i <= gridSize; i++) {
    //   const geometry = new THREE.BufferGeometry();
    //   const points = [
    //     new THREE.Vector3(i * spacing - offset, 0, -offset),
    //     new THREE.Vector3(i * spacing - offset, 0, offset)
    //   ];
    //   geometry.setFromPoints(points);
    //   const line = new THREE.Line(geometry, lineMaterial);
    //   gridGroup.add(line);
    // }

    // Vertical lines with terrain
    const verticalLines = [];
    for (let i = 0; i <= gridSize; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const segments = 50;
      
      for (let j = 0; j <= segments; j++) {
        const z = -offset + (j / segments) * totalSize;
        const x = i * spacing - offset;
        const y = getTerrainHeight(x, z, 0); // Start flat
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);
      verticalLines.push({ geometry, points: points.map(p => ({ x: p.x, z: p.z })) });
    }

    scene.add(gridGroup);
    gridRef.current = gridGroup;

    // Add glow effect with point light that follows mouse
    const light = new THREE.PointLight(0x00ffaa, 2, 30);
    light.position.set(0, 5, 0);
    scene.add(light);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) over the first viewport height
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight; // Adjust this to control how far you need to scroll
      scrollProgressRef.current = Math.min(scrolled / maxScroll, 1);
    };

    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Subtle rotation
    //   if (gridRef.current) {
    //     gridRef.current.rotation.y += 0.001;
    //   }

      // Light follows mouse
    //   light.position.x = mouseRef.current.x * 10;
    //   light.position.z = mouseRef.current.y * 10;

      // Subtle camera movement based on mouse
    //   camera.position.x = mouseRef.current.x * 2;
    //   camera.position.z = mouseRef.current.y * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div id="background-hero" className="fixed w-full h-screen overflow-hidden">
      {/* Three.js Canvas - Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(#1d2b4f 0%, #000000 100%)' }}
      />      
    </div>
  );
};

export default GridBackground;