export interface GalleryItem {
  src: string;
  description: string;
  category: 'architecture' | 'interiors' | 'web' | 'motion' | 'game';
  year: number;
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/images/gallery/Cocoabean_Hotel_Interior-02.jpg',
    description: 'Cocoa Bean Hotel interior with ambient lighting',
    category: 'interiors',
    year: 2019,
  },
  {
    src: '/images/gallery/Cocoabean_Hotel_iz-Atrium.jpg',
    description: 'Atrium view with natural light streams',
    category: 'interiors',
    year: 2019,
  },
  {
    src: '/images/gallery/01-Holborn-Gate-Reception.jpg',
    description: 'Reception lounge at Holborn Gate',
    category: 'interiors',
    year: 2018,
  },
  {
    src: '/images/gallery/08 3D Rendering - Canteen Renovation Nottingham.jpg',
    description: 'Canteen renovation rendering in Nottingham',
    category: 'interiors',
    year: 2020,
  },
  {
    src: '/images/gallery/02 3D Rendering - House Zero - House Ivy - Pretoria.jpg',
    description: 'House Zero Ivy residence render',
    category: 'architecture',
    year: 2018,
  },
  {
    src: '/images/gallery/01  3D Rendering - House Zero - Queenswood Pretoria.jpg',
    description: 'Queenswood Pretoria house render',
    category: 'architecture',
    year: 2018,
  },
  {
    src: '/images/gallery/19-NGV-Night.jpg',
    description: 'Night-time exterior view of NGV',
    category: 'architecture',
    year: 2017,
  },
  {
    src: '/images/gallery/CONFERENCE-PRE-ASSEMBLY.jpg',
    description: 'Conference pre-assembly space',
    category: 'interiors',
    year: 2016,
  },
  {
    src: '/images/gallery/13 3D Visualisation - Gautrain Midrand Urban Study Area.jpg',
    description: 'Gautrain Midrand urban study visualisation',
    category: 'architecture',
    year: 2019,
  },
  {
    src: '/images/gallery/13-2017-11-22-05-Open-Plan.jpg',
    description: 'Open-plan interior study',
    category: 'interiors',
    year: 2017,
  },
  {
    src: '/images/gallery/15 3D Rendering - Nandos Restaurant.jpg',
    description: 'Nando\'s restaurant interior rendering',
    category: 'interiors',
    year: 2020,
  },
  {
    src: '/images/gallery/OLD_TOWN_002_DiningBar.jpg',
    description: 'Old Town dining and bar space',
    category: 'interiors',
    year: 2015,
  },
  {
    src: '/images/gallery/Hotel-Roca-Norte-Lobby-Bar-02.jpg',
    description: 'Hotel Roca Norte lobby bar',
    category: 'interiors',
    year: 2021,
  },
];
