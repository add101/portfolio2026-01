interface GalleryProps {
  galleryImages: string[];
  openGalleryModal: (index: number) => void;
}

  const galleryWebImages = [
    '/images/gallery/Cocoabean_Hotel_Interior-02.jpg',
  ];

export default function GalleryWeb({ galleryImages, openGalleryModal }: GalleryProps) {
  return (
    <section className="gallery-section" id="gallery-section">
      <h2 className="section-title">Gallery</h2>
      <div className="gallery-container">
        <div className="gallery" id="gallery">
          {galleryWebImages.map((src, index) => (
            <div key={index} className="gallery-item" onClick={() => openGalleryModal(index)}>
              <img src={src} className="placeholder-content" alt={`Gallery item ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}