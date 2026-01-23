"use client";

import { useState, useEffect } from 'react';
import BackgroundHero from './BackgroundHero';

export default function Hero() {
  const [typedText, setTypedText] = useState('');


  
  useEffect(() => {
    const text = 'Moving pixels with art and code';
    let index = 0;

    const typeWriter = () => {
      setTypedText(text.substring(0, index + 1));
      index++;
      if (index < text.length) {
        setTimeout(typeWriter, 100); // speed of typing
      }
    };

    typeWriter();
  }, []);

  return (
    <>
      <BackgroundHero />
      <section className="hero" id="home">
        <div className="hero-content">
          <h1><span className="typing-container"><span className="typed-text">{typedText}</span><span className="cursor"></span></span></h1>
          <p className="subtitle">3D Artist • Web Developer • VR Designer</p>
          <p className="description">
            Crafting immersive digital experiences through cutting-edge 3D visualisation,
            modern web development, and virtual reality innovation.
          </p>
        </div>
        {/* <div className="hero-threejs-container">
          <iframe src="/robot/robot.html" className="hero-threejs" scrolling="no" title="three.js robot assistant"></iframe>
        </div> */}
      </section>
    </>
  );
}