import { useState } from 'react';

interface GalleryModalProps {
  isGalleryModalOpen: boolean;
  closeGalleryModal: () => void;
  galleryImages: string[];
  galleryCurrentIndex: number;
  prevGalleryImage: () => void;
  nextGalleryImage: () => void;
}

export default function GalleryModal({
  isGalleryModalOpen,
  closeGalleryModal,
  galleryImages,
  galleryCurrentIndex,
  prevGalleryImage,
  nextGalleryImage
}: GalleryModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextGalleryImage();
    } else if (isRightSwipe) {
      prevGalleryImage();
    }
  };

  return (
    <>
      {isGalleryModalOpen && (
        <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) closeGalleryModal(); }}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeGalleryModal}>×</button>
            <div
              className="modal-placeholder"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img src={galleryImages[galleryCurrentIndex]} alt={`Gallery image ${galleryCurrentIndex + 1}`} />
            </div>
            <button className="modal-prev" onClick={prevGalleryImage}>‹</button>
            <button className="modal-next" onClick={nextGalleryImage}>›</button>
          </div>
        </div>
      )}
    </>
  );
}