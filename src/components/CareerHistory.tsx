"use client";

import React, { useEffect, useRef } from "react";

type Job = { title: string; company: string; year: string; color: string; desc: string };

const JOBS: Job[] = [

{
  title: "Creative Technologist",
  company: "GrowMotion 3D",
  year: "2017 — Now",
  color: "#c8a96e",
  desc: "Bridging architecture, branding, and digital experiences through realtime 3D, interactive/web-based work, VR/AR, and AI-assisted pipelines. I develop visual narratives, prototypes, and immersive content for agencies and brands, combining technical execution with design-led thinking."
},

{
  title: "3D Visualisation Artist",
  company: "Dakota Design",
  year: "2013 — 2015",
  color: "#8b8b8b",
  desc: "Produced high-end interior and retail visuals for brand-led environments, supporting marketing, store rollouts, and experiential concepts. Worked closely with designers to translate identity, materials, and spatial intent into polished, atmospheric imagery for clients like Old Khaki and Old Town Italy."
},

{
  title: "3D Visualiser",
  company: "Arup",
  year: "2007 — 2008",
  color: "#6b6f72",
  desc: "Created visualisations for major transport and infrastructure projects, including Elizabeth Line stations (Paddington, TCR, Bond Street) and Gautrain urban planning. Helped engineering and design teams communicate complex spatial and technical ideas to stakeholders and the public."
},

{
  title: "Architectural Visualiser",
  company: "Freelance",
  year: "2003 — 2013",
  color: "#5b5b5b",
  desc: "A decade of multidisciplinary work across architecture, interiors, built-in furniture, product design, and event activations. Delivered concept development, visualisation, and presentation imagery for studios, branding agencies, and independent clients, adapting to a wide range of design languages and project types."
},

{
  title: "Architectural Draughtsman",
  company: "Aubrey Lamour Architectural Design",
  year: "1998 — 2001",
  color: "#4a4a4a",
  desc: "Foundational experience in residential architecture — working drawings, detailing, and spatial problem-solving. Built the technical base that later shaped my approach to 3D, visualisation, and design communication."
}

];

export default function CareerHistory() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const cardNaturalH = useRef<number[]>([]);
  const cardOffsets = useRef<number[]>([]);
  const scales = useRef<number[]>([]);

  const state = useRef({ y: 0 });
  const springTween = useRef<any>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadGsap() {
      try {
        const mod = await import("gsap");
        return mod.default || mod;
      } catch (e) {
        // fallback to CDN if package not installed
        await new Promise<void>((resolve) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
          s.onload = () => resolve();
          document.head.appendChild(s);
        });
        return (window as any).gsap;
      }
    }

    (async () => {
      const gsap = await loadGsap();
      if (!mounted) return;
      gsapRef.current = gsap;

      const MIN_SCALE = 0.62;
      const MAX_SCALE = 1.0;
      const SIGMA = 200;

      // make sure refs match length
      wrapRefs.current = wrapRefs.current.slice(0, JOBS.length);
      cardRefs.current = cardRefs.current.slice(0, JOBS.length);
      scales.current = new Array(JOBS.length).fill(MIN_SCALE);

      function gauss(dist: number, sigma: number) {
        return Math.exp(-(dist * dist) / (2 * sigma * sigma));
      }

      function measure() {
        // temporarily set unscaled for accurate measurements
        cardRefs.current.forEach((card) => gsap.set(card, { scale: 1, opacity: 1 }));

        cardNaturalH.current = wrapRefs.current.map((w) => w.getBoundingClientRect().height);

        const track = trackRef.current;
        if (track) {
          const maxHeight = Math.max(...cardNaturalH.current, 0);
          const padding = Math.max((window.innerHeight - maxHeight) / 2, 0);
          track.style.padding = `${padding}px 0`;
        }

        // render once after measuring
        render();
      }

      function render() {
        const viewMid = window.scrollY + window.innerHeight * 0.5;

        cardRefs.current.forEach((card, i) => {
          const wrap = wrapRefs.current[i];
          if (!card || !wrap) return;
          const natural = cardNaturalH.current[i] || card.offsetHeight;
          const rect = wrap.getBoundingClientRect();
          const cardCentre = rect.top + window.scrollY + natural * 0.5;
          const dist = Math.abs(cardCentre - viewMid);
          const t = gauss(dist, SIGMA);
          const sc = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * t;
          const op = 0.32 + 0.68 * t;

          scales.current[i] = sc;
          gsap.set(card, { scale: sc, opacity: op });
        });

        wrapRefs.current.forEach((wrap, i) => {
          const naturalH = cardNaturalH.current[i] || (cardRefs.current[i]?.offsetHeight) || 0;
          wrap.style.height = naturalH + 10 + "px"; // ← remove the scale multiplication
        });
      }

      function onScroll() {
        if (springTween.current) springTween.current.kill();
        springTween.current = gsap.to(state.current, {
          y: window.scrollY,
          duration: 0.5,
          ease: "power3.out",
          onUpdate: render,
        });
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      gsap.ticker.add(render);
      window.addEventListener("resize", measure);

      requestAnimationFrame(() => requestAnimationFrame(() => measure()));

      // cleanup
      return () => {
        mounted = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", measure);
        if (springTween.current) springTween.current.kill();
        gsap.ticker.remove(render);
      };
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="career-history" id="career">
      <div className="container">
        {/* <h2 className="section-title">Career Timeline</h2> */}

        <div id="stage" ref={stageRef}>
          <div id="track" ref={trackRef}>
            {JOBS.map((job, i) => (
              <div
                key={i}
                className="card-wrap"
                ref={(el) => {
                  if (el) wrapRefs.current[i] = el;
                }}
              >
                <div
                  className="card"
                  ref={(el) => {
                    if (el) cardRefs.current[i] = el;
                  }}
                >
                  <div className="card-header">
                    <span className="job-title">
                      <span className="dot" style={{ background: job.color }} />
                      {job.title}
                    </span>
                    <span className="year">{job.year}</span>
                  </div>
                  <div className="company">{job.company}</div>
                  <div className="desc">{job.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .career-history {
          padding: 100px 0;
        }

        .career-history .section-title {
          display: inline-block;
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: transparent;
          background: linear-gradient(45deg, #ffffff, #64ffda);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 2;
        }

        #stage {
          height: auto;
          overflow: visible;
        }

        #track {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0;
          gap: 16px;
        }

        .card-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .card {
          width: 55vw;
          max-width: 59vw;
          border-radius: 20px;
          padding: 22px 26px 28px 26px;
          position: relative;
          overflow: hidden;
          border: 0.5px solid rgba(255,255,255,0.1);
          background: #111;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.12),
            0 4px 20px rgba(0,0,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.04);
          transform-origin: center center;
          will-change: transform, opacity;
          flex-shrink: 0;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 55%);
          pointer-events: none;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 3px;
        }

        .job-title {
          font-size: 15px;
          font-weight: 600;
          color: #f7f7f7;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 7px;
          line-height: 1.3;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.95;
        }

        .year {
          font-size: 12px;
          color: #b8b8b8;
          font-weight: 400;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .company {
          font-size: 12px;
          color: #d0d0d0;
          font-weight: 400;
          margin-bottom: 10px;
          padding-left: 14px;
        }

        .desc {
          font-size: 13px;
          color: #c0c0c0;
          line-height: 1.66;
          padding-left: 14px;
        }
      `}</style>
    </section>
  );
}

