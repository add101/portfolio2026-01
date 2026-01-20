interface CaseStudyModalProps {
  isModalOpen: boolean;
  closeModalCaseStudy: () => void;
  currentProject: any;
  currentImage: string;
  currentImageIndex: number;
  currentGallery: string[];
  prevImageCaseStudy: () => void;
  nextImageCaseStudy: () => void;
}

export default function CaseStudyModal({
  isModalOpen,
  closeModalCaseStudy,
  currentProject,
  currentImage,
  currentImageIndex,
  currentGallery,
  prevImageCaseStudy,
  nextImageCaseStudy
}: CaseStudyModalProps) {
  return (
    <section className="case-study-modal" id="case-study-modal">
      <div className={`case-study-modal-overlay ${isModalOpen ? 'case-study-active' : ''}`} id="caseStudyModal" onClick={(e) => { if (e.target === e.currentTarget) closeModalCaseStudy(); }}>
        <div className="case-study-modal-content">
          <button className="case-study-close-btn" onClick={closeModalCaseStudy}>
            <svg className="case-study-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div className="case-study-top-row">
            <div className="case-study-left-section">
              <div className="case-study-media-container">
                {currentProject?.videoUrl && (currentProject.videoUrl.includes('youtube') || currentProject.videoUrl.includes('youtu.be')) ? (
                  <iframe
                    className="case-study-main-video"
                    src={currentProject.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : currentProject?.videoUrl && (currentProject.videoUrl.endsWith('.jpg') || currentProject.videoUrl.endsWith('.png') || currentProject.videoUrl.endsWith('.jpeg') || currentProject.videoUrl.endsWith('.gif')) ? (
                  <img
                    className="case-study-main-video"
                    src={currentProject.videoUrl}
                    alt="Case study project media"
                  />
                ) : null}
              </div>
              <h1 className="case-study-project-title" id="caseStudyProjectTitle">{currentProject?.title}</h1>
            </div>

            <div className="case-study-right-section">
              <div className="case-study-gallery-container">
                <div className="case-study-gallery-wrapper">
                  <div className="case-study-gallery-frame">
                    <img
                      className="case-study-gallery-image"
                      id="currentGalleryImage"
                      src={currentImage}
                      alt="Case study project gallery image"
                    />
                    <div className="case-study-gallery-counter" id="galleryCounter">{currentImageIndex + 1} / {currentGallery.length}</div>
                  </div>
                  <button className="case-study-nav-btn case-study-nav-prev" id="prevBtn" onClick={prevImageCaseStudy} disabled={currentImageIndex === 0}>
                    <svg className="case-study-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button className="case-study-nav-btn case-study-nav-next" id="nextBtn" onClick={nextImageCaseStudy} disabled={currentImageIndex === currentGallery.length - 1}>
                    <svg className="case-study-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="case-study-article-container">
            <h2 className="case-study-article-heading" id="caseStudyArticleHeading">{currentProject?.articleHeading}</h2>
            <div className="case-study-article-content">
              <div className="case-study-article-text" id="articleText" dangerouslySetInnerHTML={{ __html: currentProject?.articleText || '' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}