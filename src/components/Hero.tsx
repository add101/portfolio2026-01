'use client';

import { useEffect, useRef, useState } from 'react';
import Particles2 from './Particles2';

interface HeroProps {
  typedText: string;
  cursorClass: string;
}

export default function Hero({ typedText, cursorClass }: HeroProps) {

  return (
    <section className="hero" id="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div className="hero-content" style={{ flex: '1 1 500px', maxWidth: '100%' }}>
        <h1><span className="typing-container"><span className="typed-text">{typedText}</span><span className={`cursor ${cursorClass}`}></span></span></h1>
        <p className="subtitle">3D Artist • Web Developer • VR Designer</p>
        <p className="description">
          Crafting immersive digital experiences through cutting-edge 3D visualisation,
          modern web development, and virtual reality innovation.
        </p>
      </div>
      
      <div className="particles-wrapper">
        <Particles2 />
      </div>

      {/* <style jsx>{`
        .particles-wrapper {
          flex: 1 1 40%;
          height: 600px;
          margin-left: 50px;
        }
        @media (max-width: 768px) {
          .particles-wrapper {
            display: none;
          }
        }
      `}</style> */}
    </section>
  );
}