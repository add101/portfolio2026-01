"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import CaseStudies from '../components/CaseStudies';
import CaseStudyModal from '../components/CaseStudyModal';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') closeModalCaseStudy();
        else if (e.key === 'ArrowRight') nextImageCaseStudy();
        else if (e.key === 'ArrowLeft') prevImageCaseStudy();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex]);

  useEffect(() => {
    fetch('/featured-projects.json')
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error loading featured projects:', error));
  }, []);

  const openModalCaseStudy = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModalCaseStudy = () => {
    setIsModalOpen(false);
  };

  const nextImageCaseStudy = () => {
    const currentGallery = projectsData[activeProjectIndex]?.galleryImages || [];
    if (currentImageIndex < currentGallery.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImageCaseStudy = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const currentProject = projectsData[activeProjectIndex];
  const currentGallery = currentProject?.galleryImages || [];
  const currentImage = currentGallery[currentImageIndex];

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <Navigation
        isMenuActive={isMenuActive}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      <Hero />
      <Skills />
      <CaseStudies openModalCaseStudy={openModalCaseStudy} />
      {isModalOpen && (
        <CaseStudyModal
          isModalOpen={isModalOpen}
          closeModalCaseStudy={closeModalCaseStudy}
          currentProject={currentProject}
          currentImage={currentImage}
          currentImageIndex={currentImageIndex}
          currentGallery={currentGallery}
          prevImageCaseStudy={prevImageCaseStudy}
          nextImageCaseStudy={nextImageCaseStudy}
        />
      )}
      <Gallery />
      <Contact />
    </>
  );
}
