'use client';

import { useMemo } from 'react';

export default function Tools() {
  const skillsData = useMemo(
    () => [
      {
        id: 'realtime',
        title: 'Realtime & Immersive',
        tools: [
          { name: 'Unreal Engine', color: '#1e40af', logo: '/images/icons/tools/unreal-engine.png' },
          { name: 'Unity', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/unity.png' },
        ],
      },
      {
        id: '3d-creation',
        title: '3D Creation & Assets',
        tools: [
          { name: '3ds Max', color: '#374151', logo: '/images/icons/tools/3ds-max.png' },
          { name: 'Blender', color: '#ea580c', logo: '/images/icons/tools/blender.png' },
          { name: 'Substance Painter', color: '#ea580c', logo: '/images/icons/tools/substance-painter.png' },
        ],
      },
      {
        id: 'rendering',
        title: 'Rendering & Visualization',
        tools: [
          { name: 'V-Ray', color: '#4f46e5', logo: '/images/icons/tools/vray.png' },
          { name: 'Corona', color: '#ca8a04', logo: '/images/icons/tools/coronarender.png' },
          { name: 'Enscape', color: '#7c3aed', logo: '/images/icons/tools/enscape.png' },
          { name: 'Lumion', color: '#0891b2', logo: '/images/icons/tools/lumion.png' },
          { name: 'Twinmotion', color: '#3b82f6', logo: '/images/icons/tools/twinmotion.png' },
        ],
      },
      {
        id: 'web',
        title: 'Web & Interactive',
        tools: [
          { name: 'React', color: '#60a5fa', logo: '/images/icons/tools/react.png' },
          { name: 'Next.js', color: '#1f2937', logo: '/images/icons/tools/nextdotjs.png' },
          { name: 'R3F', color: '#ec4899', logo: '/images/icons/tools/r3f.png' },
          { name: 'Three.js', color: '#16a34a', logo: '/images/icons/tools/threejs.png' },
          { name: 'Figma', color: '#a855f7', logo: '/images/icons/tools/figma.png' },
        ],
      },
      {
        id: 'post-ai',
        title: 'Post-Production & AI',
        tools: [
          { name: 'ComfyUI', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/comfyui.png' },
          { name: 'Photoshop', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/photoshop.png' },
          { name: 'After Effects', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/aftereffects.png' },
          { name: 'Premiere', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/premiere.png' },
          { name: 'Krita', color: 'rgba(0, 0, 0, 1)', logo: '/images/icons/tools/krita.png' },
        ],
      },
      {
        id: 'cad',
        title: 'CAD & 3D Design',
        tools: [
          { name: 'Sketchup', color: '#06b6d4' },
          { name: 'Revit', color: '#9333ea' },
          { name: 'AutoCAD', color: '#7c3aed' },
        ],
      },
    ],
    []
  );

  return (
    <section id="skills">
      <div className="tools-container">
        {/* Section Header */}
        <div className="tools-header">
          <h2 className="section-title">Skills & Tools</h2>
        </div>

        {/* Cards Grid */}
        <div className="tools-grid">
          {skillsData.map((category) => (
            <div key={category.id} className="tool-card">
              {/* Card Header */}
              <h3 className="tool-card-title">{category.title}</h3>

              {/* Tools Grid Inside Card */}
              <div className="tools-inner-grid">
                {category.tools.map((tool) => (
                  <div key={tool.name} className="tool-item">
                    {/* Icon */}
                    {/* <div
                      className="tool-icon"
                      style={{ background: tool.color }}
                    >
                      {tool.logo ? (
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="tool-logo"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="tool-initial">
                          {tool.name.split(' ')[0][0]}
                        </span>
                      )}
                    </div> */}

                    {/* Tool Name */}
                    <p className="tool-name">{tool.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        #skills {
          padding: 100px 0;
          position: relative;
          z-index: 10;
          color: #ffffff;
        }

        .tools-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 96vw;
          margin: 0 auto;
          padding: 0 40px;
        }

        .tools-header {
          width: 100%;
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          background: linear-gradient(45deg, #ffffff, #64ffda);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          width: 100%;
        }

        .tool-card {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 20;
        }

        .tool-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.4);
          transform: translateY(-4px);
        }

        .tool-card-title {
          font-size: 22px;
          font-weight: 400;
          text-align: center;
          color: #d0d0d0;
          margin-bottom: 32px;
          line-height: 1.4;
        }

        .tools-inner-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .tool-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .tool-icon {
          width: 128px;
          height: 128px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-out;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .tool-item:hover .tool-icon {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .tool-initial {
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
        }

        .tool-name {
          font-size: 18px;
          color: #a0a0a0;
          text-align: center;
          font-weight: 500;
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .section-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .tools-inner-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .tools-container {
            padding: 0 20px;
          }

          .tool-card {
            padding: 24px 20px;
          }

          .tool-card-title {
            font-size: 20px;
            margin-bottom: 24px;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}