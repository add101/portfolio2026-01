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
          {/* <p className="subtitle">Building interactive systems that connect ideas and people</p> */}
          {/* <p className="description">
            I create spaces where ideas can be explored, interacted with, and felt. From digital interfaces and motion graphics to games and immersive systems, I combine design, code, and spatial thinking to turn concepts into experiences.
          </p> */}
          <p className="subtitle">Pixels in motion, ideas in play</p>
          <p className="description">
            I combine design, code, and interaction to bring concepts to life. Websites, apps, games, and interactive media - all engineered to engage, inform, and delight.
          </p>
        </div>
        {/* <div className="hero-threejs-container">
          <iframe src="/robot/robot.html" className="hero-threejs" scrolling="no" title="three.js robot assistant"></iframe>
        </div> */}
      </section>
    </>
  );
}