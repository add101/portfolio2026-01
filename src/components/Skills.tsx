export default function Skills() {
  return (
    <section className="skills" id="skills">
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      <div className="container">
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">
              <div className="sector-image-container">
                <img src="/images/GrowMotion_.jpg" className="sector-image" alt="3D Art & Visualization" />
              </div>
            </div>
            <h3>3D Visualisation</h3>
            <p>Creating visual environments with 3ds Max, V-Ray, Photoshop, and Unreal Engine. Drawing on a background in architectural draughting and conceptual design across architecture, interiors, and related disciplines.</p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <div className="sector-image-container">
                <img src="/images/WebDev3.jpg" className="sector-image" alt="Frontend Development" />
              </div>
            </div>
            <h3>Web Development</h3>
            <p>Building responsive, performant web applications with React, Three.js, R3F, and JavaScript. Expert in modern CSS, animations, and creating seamless user experiences that bring designs to life.</p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">
              <div className="sector-image-container">
                <img src="/images/VR_Headset-02.jpg" className="sector-image" alt="VR/AR Development" />
              </div>
            </div>
            <h3>Immersive Experiences</h3>
            <p>VR/AR: Developing immersive virtual and augmented reality experiences using Unity, Unreal Engine, and WebXR. Creating interactive worlds that push the boundaries of digital storytelling and user engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}