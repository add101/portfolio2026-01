
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Points | null>(null);
  
  // State for UI controls
  const [speed, setSpeed] = useState(1);
  const [height, setHeight] = useState(0.5);
  const [frequency, setFrequency] = useState(0.5);
  const [color, setColor] = useState('#0099ff');
  const [density, setDensity] = useState(50);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    // ===== SCENE SETUP =====
    // Create the 3D scene - this is the container for all 3D objects
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000428); // Dark blue background
    sceneRef.current = scene;

    // ===== CAMERA SETUP =====
    // PerspectiveCamera(field of view, aspect ratio, near clipping, far clipping)
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view in degrees
      window.innerWidth / window.innerHeight, // Aspect ratio
      containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : 1, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(0, 3, 5); // Position camera above and in front of the wave
    camera.lookAt(0, 0, 0); // Look at the center of the scene

    // ===== HELPER FUNCTION: Create Circle Texture =====
    // Creates a radial gradient texture for round, glowing points
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      // Create radial gradient from center
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Bright center
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fade to transparent
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      return new THREE.CanvasTexture(canvas);
    }

    // ===== RENDERER SETUP =====
    // WebGLRenderer draws the scene using WebGL
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI screens
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // ===== GEOMETRY CREATION =====
    // PlaneGeometry(width, height, width segments, height segments)
    // More segments = smoother wave effect
    const geometry = new THREE.PlaneGeometry(10, 10, density, density);
    
    // ===== POINTS MATERIAL (Glowing Spheres) =====
    // PointsMaterial renders each vertex as a glowing point
    const pointsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.08, // Size of each point
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending, // Creates glow effect
      sizeAttenuation: true, // Points get smaller with distance
      map: createCircleTexture() // Custom texture for round points
    });
    
    // ===== POINTS CREATION =====
    // Points object renders vertices as individual points
    const points = new THREE.Points(geometry, pointsMaterial);
    points.rotation.x = -Math.PI / 2; // Rotate to be horizontal (facing up)
    scene.add(points);
    meshRef.current = points;

    // ===== WIREFRAME OVERLAY (Edge Highlighting) =====
    // Create a line segments mesh to connect the points
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x4488ff, // Bluish lines
      transparent: true,
      opacity: 0.1, // Very subtle lines
      blending: THREE.AdditiveBlending
    });
    
    // EdgesGeometry extracts edges from the geometry
    const edges = new THREE.EdgesGeometry(geometry);
    const wireframeMesh = new THREE.LineSegments(edges, wireframeMaterial);
    wireframeMesh.rotation.x = -Math.PI / 2; // Match rotation of points
    
    scene.add(wireframeMesh);

    // ===== LIGHTING =====
    // Ambient light provides soft overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light creates shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // ===== ANIMATION LOOP =====
    let animationId;
    let lastTime = performance.now();
    let frames = 0;
    let fpsUpdateTime = lastTime;
    
    const animate = (time) => {
      animationId = requestAnimationFrame(animate);

      // FPS Calculation
      frames++;
      if (time - fpsUpdateTime >= 1000) { // Update FPS every second
        setFps(Math.round(frames * 1000 / (time - fpsUpdateTime)));
        frames = 0;
        fpsUpdateTime = time;
      }

      // Get the position attribute from geometry
      // This contains all vertex positions as a Float32Array
      const positions = geometry.attributes.position.array;

      // Loop through all vertices and update their Z position (height)
      // Vertices are stored as [x, y, z, x, y, z, ...] so we step by 3
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];     // X position of vertex
        const y = positions[i + 1]; // Y position of vertex

        // Create wave formula using sine waves
        // time * 0.001 converts milliseconds to seconds and slows down animation
        // The formula combines two sine waves for more interesting motion:
        // - First wave: moves along X axis
        // - Second wave: moves along Y axis
        // - Frequency controls the wavelength (distance between waves)
        const wave1 = Math.sin(x * frequency + time * 0.001 * speed) * height;
        const wave2 = Math.sin(y * frequency + time * 0.001 * 0.8 * speed) * (height * 0.6);
        
        positions[i + 2] = wave1 + wave2; // Set Z position (height)
      }

      // Tell Three.js that positions have changed and need to be re-uploaded to GPU
      geometry.attributes.position.needsUpdate = true;

      // Slowly rotate the entire wave for better visualization
      points.rotation.z += 0.001;
      wireframeMesh.rotation.z += 0.001; // Rotate wireframe with the points

      // Render the scene from the camera's perspective
      renderer.render(scene, camera);
    };

    animate(0);

    // ===== RESPONSIVE HANDLING =====
    // Update camera and renderer when window is resized
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (containerRef.current && camera && renderer) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // ===== CLEANUP =====
    // Clean up resources when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      pointsMaterial.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [speed, height, frequency, color, density]); // Re-run effect when controls change

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '400px' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Equation Display - Top Right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        fontFamily: 'monospace',
        backdropFilter: 'blur(10px)',
        maxWidth: '400px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
          Wave Equations
        </h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#8ab4f8' }}>z(x, y, t) = wave₁ + wave₂</div>
          </div>
          <div style={{ marginBottom: '8px', paddingLeft: '10px' }}>
            <div style={{ color: '#81c995' }}>
              wave₁ = sin(x · {frequency.toFixed(1)} + t · {(speed * 0.001).toFixed(4)}) · {height.toFixed(1)}
            </div>
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <div style={{ color: '#fdd663' }}>
              wave₂ = sin(y · {frequency.toFixed(1)} + t · {(speed * 0.001 * 0.8).toFixed(4)}) · {(height * 0.6).toFixed(1)}
            </div>
          </div>
          <div style={{ marginTop: '15px', fontSize: '12px', color: '#aaa', fontFamily: 'Arial, sans-serif' }}>
            <div><strong>where:</strong></div>
            <div>• x, y = position coordinates</div>
            <div>• t = time (milliseconds)</div>
            <div>• z = vertical displacement</div>
          </div>
        </div>
      </div>
      
      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        minWidth: '250px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Wave Controls</h3>
        
        {/* Speed Slider */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Speed: {speed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        {/* Height Slider */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Height: {height.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        {/* Frequency Slider */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Frequency: {frequency.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        {/* Color Picker */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '100%', height: '40px', cursor: 'pointer', borderRadius: '5px' }}
          />
        </div>
        
        {/* Density Slider */}
        <div style={{ marginBottom: '0' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
            Density: {density}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={density}
            onChange={(e) => setDensity(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ fontSize: '11px', color: '#aaa', display: 'block', marginTop: '5px' }}>
            Higher values may affect performance
          </small>
        </div>
        
        {/* FPS Display */}
        <div style={{ 
          marginTop: '15px', 
          paddingTop: '15px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          fontSize: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>FPS:</span>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 'bold',
              color: fps >= 55 ? '#81c995' : fps >= 30 ? '#fdd663' : '#ff6b6b'
            }}>
              {fps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
