"use client";

import { useState, useEffect, useRef } from 'react';
import BackgroundHero from './BackgroundHero';

export default function Hero() {
  // const [typedText, setTypedText] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   const text = 'Moving pixels with art and code';
  //   let index = 0;

  //   const typeWriter = () => {
  //     setTypedText(text.substring(0, index + 1));
  //     index++;
  //     if (index < text.length) {
  //       setTimeout(typeWriter, 100);
  //     }
  //   };

  //   typeWriter();
  // }, []);

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <>
      <BackgroundHero />
      <section className="hero" id="home">
        {/* Text Content - Left 30% */}
        <div className="hero-text-content">
          <div className="hero-content">
            {/* <h1><span className="typing-container"><span className="typed-text">{typedText}</span><span className="cursor"></span></span></h1> */}
            <p className="subtitle">Pixels in motion, ideas in play</p>
            <p className="description">
              I blend 3D, code, and design to create digital experiences, products, and immersive worlds.
            </p>
          </div>
        </div>

        {/* Video Content - Right 70% */}
        <div className="hero-video-container">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className="hero-video"
              controls={true}
              autoPlay
              loop
              muted
              // controlsList="nodownload"
            >
              <source src="/video/AdrianLamour_Showreel.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <button 
                className="fullscreen-btn" 
                onClick={handleFullscreen}
                title="Fullscreen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
            </div>
            {/* <div className="video-controls-hint">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 10 16 16 12"/>
              </svg>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}