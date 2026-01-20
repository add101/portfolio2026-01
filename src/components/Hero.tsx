interface HeroProps {
  typedText: string;
  cursorClass: string;
}

export default function Hero({ typedText, cursorClass }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1><span className="typing-container"><span className="typed-text">{typedText}</span><span className={`cursor ${cursorClass}`}></span></span></h1>
        <p className="subtitle">3D Artist • Web Developer • VR Designer</p>
        <p className="description">
          Crafting immersive digital experiences through cutting-edge 3D visualisation,
          modern web development, and virtual reality innovation.
        </p>
      </div>
      <div className="hero-threejs-container">
        <iframe src="/robot/robot.html" className="hero-threejs" scrolling="no" title="three.js robot assistant"></iframe>
      </div>
    </section>
  );
}