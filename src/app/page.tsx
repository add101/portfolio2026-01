"use client";

import Image from "next/image";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import CaseStudies from '../components/CaseStudies';
import CaseStudyModal from '../components/CaseStudyModal';
import Gallery from '../components/Gallery';
import GalleryModal from '../components/GalleryModal';
import Contact from '../components/Contact';

export default function Home() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);

  const galleryImages = [
    '/images/gallery/Cocoabean_Hotel_Interior-02.jpg',
    '/images/gallery/Cocoabean_Hotel_iz-Atrium.jpg',
    '/images/gallery/01-Holborn-Gate-Reception.jpg',
    '/images/gallery/08 3D Rendering - Canteen Renovation Nottingham.jpg',
    '/images/gallery/02 3D Rendering - House Zero - House Ivy - Pretoria.jpg',
    '/images/gallery/01  3D Rendering - House Zero - Queenswood Pretoria.jpg',
    '/images/gallery/19-NGV-Night.jpg',
    '/images/gallery/CONFERENCE-PRE-ASSEMBLY.jpg',
    '/images/gallery/13 3D Visualisation - Gautrain Midrand Urban Study Area.jpg',
    '/images/gallery/13-2017-11-22-05-Open-Plan.jpg',
    '/images/gallery/15 3D Rendering - Nandos Restaurant.jpg',
    '/images/gallery/OLD_TOWN_002_DiningBar.jpg',
    '/images/gallery/Hotel-Roca-Norte-Lobby-Bar-02.jpg'
  ];

  const openGalleryModal = (index: number) => {
    setGalleryCurrentIndex(index);
    setIsGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };

  const nextGalleryImage = () => {
    setGalleryCurrentIndex((galleryCurrentIndex + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setGalleryCurrentIndex((galleryCurrentIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGalleryModalOpen) {
        if (e.key === 'Escape') closeGalleryModal();
        else if (e.key === 'ArrowRight') nextGalleryImage();
        else if (e.key === 'ArrowLeft') prevGalleryImage();
      } else if (isModalOpen) {
        if (e.key === 'Escape') closeModalCaseStudy();
        else if (e.key === 'ArrowRight') nextImageCaseStudy();
        else if (e.key === 'ArrowLeft') prevImageCaseStudy();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryModalOpen, galleryCurrentIndex, isModalOpen, currentImageIndex]);

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
    if (isModalOpen || isGalleryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isGalleryModalOpen]);

  return (
    <>
      <Navigation
        isMenuActive={isMenuActive}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      <Hero />
      <Skills />
      {/* <CaseStudies openModalCaseStudy={openModalCaseStudy} />
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
      )} */}
      <Gallery
        galleryImages={galleryImages}
        openGalleryModal={openGalleryModal}
      />
      <GalleryModal
        isGalleryModalOpen={isGalleryModalOpen}
        closeGalleryModal={closeGalleryModal}
        galleryImages={galleryImages}
        galleryCurrentIndex={galleryCurrentIndex}
        prevGalleryImage={prevGalleryImage}
        nextGalleryImage={nextGalleryImage}
      />
      <Contact />
    </>
  );
}
