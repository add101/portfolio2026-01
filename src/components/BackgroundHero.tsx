import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gridRef = useRef<THREE.Group | null>(null);
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

    
    // Material for glowing lines - fades on scroll
    // let lineMaterialOpacity = 0.6;
    // const lineMaterial = new THREE.LineBasicMaterial({
    //   color: 0x00ffaa,
    //   transparent: true,
    //   opacity: lineMaterialOpacity
    // });

    // Material for glowing lines - fades on scroll
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.6
    });

    // Scroll-based opacity control
    function updateOpacityOnScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxScroll = documentHeight - viewportHeight;
  
  // Fade out after 2 pages of scroll
  const fadeOutStart = viewportHeight * 1.3;
  const fadeOutDuration = viewportHeight * 0.375;
  
  // Fade back in on last page
  const fadeInStart = maxScroll - (viewportHeight * 0.5);
  const fadeInDuration = viewportHeight * 0.375; // Same duration, adjust as needed
  
  let opacity: number;
  
  if (scrollY < fadeOutStart) {
    // Beginning - full opacity
    opacity = 0.6;
  } else if (scrollY < fadeOutStart + fadeOutDuration) {
    // Fading out - linear from 0.6 to 0
    const fadeProgress = (scrollY - fadeOutStart) / fadeOutDuration;
    opacity = 0.6 * (1 - fadeProgress);
  } else if (scrollY < fadeInStart) {
    // Middle section - zero opacity
    opacity = 0;
  } else if (scrollY < fadeInStart + fadeInDuration) {
    // Fading back in - linear from 0 to 0.6
    const fadeProgress = (scrollY - fadeInStart) / fadeInDuration;
    opacity = 0.3 * fadeProgress;
  } else {
    // End - full opacity
    opacity = 0.3;
  }
  
  lineMaterial.opacity = opacity;
}

document.addEventListener('scroll', updateOpacityOnScroll);
updateOpacityOnScroll();

    // Add the scroll listener
    document.addEventListener('scroll', updateOpacityOnScroll);

    // Call once on load to set initial state
    updateOpacityOnScroll();

    // Noise function for terrain-like hills
    const getTerrainHeight = (x: number, z: number, scrollProgress: number) => {
      // Adjustable parameters for the noise pattern
      const amplitude = 1.4;      // Height of the hills
      const frequency = 0.45;    // How often hills appear
      const octaves = 2;        // Layers of detail
      
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

      // Ensure positive heights only
      height = Math.max(0, height); // Clamp to minimum of 0
      
      // Scale height based on scroll progress (0 = flat, 1 = full height)

      // Mask for flat middle section (30% of total width)
      const flatRadius = (totalSize * 0.01) / 2;
      const transition = 8; // Smooth transition area
      
      let mask = 0;
      const absZ = Math.abs(z);
      
      if (absZ > flatRadius) {
        // Calculate transition from 0 to 1
        const t = Math.min((absZ - flatRadius) / transition, 1);
        // Smoothstep for organic transition
        mask = t * t * (3 - 2 * t);
      }

      return height * scrollProgress * mask;
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

    const horizontalLines: { geometry: THREE.BufferGeometry; points: { x: number; z: number }[] }[] = [];
    for (let i = 0; i <= gridSize; i++) {
      const geometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
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
    const verticalLines: { geometry: THREE.BufferGeometry; points: { x: number; z: number }[] }[] = [];
    for (let i = 0; i <= gridSize; i++) {
      const geometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
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
    const handleMouseMove = (e: MouseEvent) => {
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

      const progress = scrollProgressRef.current;

      // Update horizontal lines
      horizontalLines.forEach(line => {
        const positions = line.geometry.attributes.position.array;
        for (let i = 0; i < line.points.length; i++) {
          const point = line.points[i];
          // Update Y (index i*3 + 1) based on original X, Z and current scroll progress
          positions[i * 3 + 1] = getTerrainHeight(point.x, point.z, progress);
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

      // Update vertical lines
      verticalLines.forEach(line => {
        const positions = line.geometry.attributes.position.array;
        for (let i = 0; i < line.points.length; i++) {
          const point = line.points[i];
          positions[i * 3 + 1] = getTerrainHeight(point.x, point.z, progress);
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

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