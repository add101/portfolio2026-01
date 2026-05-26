import { useState, useEffect } from 'react';
import GalleryModal from './GalleryModal';
import { galleryItems } from '../data/galleryItems';

type FilterCategory = 'all' | 'architecture' | 'interiors' | 'web' | 'motion' | 'game';

export default function Gallery() {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');

  // Expand gallery when user navigates to it from navbar
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery-section') {
        setIsGalleryExpanded(true);
      }
    };

    // Check on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!isGalleryModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsGalleryModalOpen(false);
      } else if (event.key === 'ArrowRight') {
        setGalleryCurrentIndex((current) => (current + 1) % galleryItems.length);
      } else if (event.key === 'ArrowLeft') {
        setGalleryCurrentIndex((current) => (current - 1 + galleryItems.length) % galleryItems.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryModalOpen]);

  const openGalleryModal = (index: number) => {
    setGalleryCurrentIndex(index);
    setIsGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };

  const nextGalleryImage = () => {
    setGalleryCurrentIndex((galleryCurrentIndex + 1) % galleryItems.length);
  };

  const prevGalleryImage = () => {
    setGalleryCurrentIndex((galleryCurrentIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Get items to display (filtered and respect accordion state)
  const displayedItems = isGalleryExpanded ? filteredItems : filteredItems.slice(0, 6);

  const categories: Array<{ value: FilterCategory; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'interiors', label: 'Interiors' },
    { value: 'web', label: 'Web' },
    { value: 'motion', label: 'Motion' },
    { value: 'game', label: 'Game' },
  ];

  return (
    <section className="gallery-section" id="gallery-section">
      <h2 className="section-title">Gallery</h2>
      
      {/* Filter Categories */}
      <div className="gallery-filters">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`filter-button ${selectedCategory === category.value ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category.value);
              setIsGalleryExpanded(false); // Reset to collapsed when changing filter
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="gallery" id="gallery">
        {displayedItems.map((item, index) => (
          <div key={index} className="gallery-item" onClick={() => openGalleryModal(index)}>
            <img src={item.src} className="placeholder-content" alt={item.description} />
          </div>
        ))}
      </div>
      
      {filteredItems.length > 6 && (
        <div className="gallery-button-container">
          <button
            className="gallery-expand-button"
            onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
            aria-expanded={isGalleryExpanded}
            aria-label={isGalleryExpanded ? 'Collapse gallery' : 'Expand gallery'}
          >
            <span>{isGalleryExpanded ? 'Show Less' : 'Show More'}</span>
            <svg 
              className={`expand-icon ${isGalleryExpanded ? 'expanded' : ''}`}
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      )}
      
      <GalleryModal
        isGalleryModalOpen={isGalleryModalOpen}
        closeGalleryModal={closeGalleryModal}
        galleryItems={galleryItems}
        galleryCurrentIndex={galleryCurrentIndex}
        prevGalleryImage={prevGalleryImage}
        nextGalleryImage={nextGalleryImage}
      />
    </section>
  );
}
