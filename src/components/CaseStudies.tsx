interface CaseStudiesProps {
  openModalCaseStudy: (index: number) => void;
}

export default function CaseStudies({ openModalCaseStudy }: CaseStudiesProps) {
  return (
    <section className="portfolio-preview" id="portfolio">
      <div className="container">
        <h2 className="section-title">Case Studies</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item portfolio-item--clickable" onClick={() => openModalCaseStudy(0)}>
            <div className="portfolio-image">
              <img src="/images/gallery/MOD-Couch-03.jpg" className="portfolio-img" alt="Mødernist Furniture" />
            </div>
            <div className="portfolio-content">
              <h4>Mødernist Furnitures</h4>
              <p>3D Visualisation of sofa designs by Modernist Furniture</p>
            </div>
          </div>
          <div className="portfolio-item portfolio-item--clickable" onClick={() => openModalCaseStudy(1)}>
            <div className="portfolio-image">
              <img src="/images/gallery-uncompressed/OLD KHAKI MENLYN 01 ENTRANCE 4c Option 1.jpg" className="portfolio-img" alt="Old Khaki" />
            </div>
            <div className="portfolio-content">
              <h4>Old Khaki</h4>
              <p>Concept-to-final visuals for store rollout</p>
            </div>
          </div>
          <div className="portfolio-item portfolio-item--clickable" onClick={() => openModalCaseStudy(2)}>
            <div className="portfolio-image">
              <img src="/images/gallery-uncompressed/8th-Street-Parkhurst---01-.jpg" className="portfolio-img" alt="AI-Powered Design System" />
            </div>
            <div className="portfolio-content">
              <h4>AI-Powered Design System</h4>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}