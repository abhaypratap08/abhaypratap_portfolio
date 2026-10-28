// Central registry describing every app the desktop shell knows about.
// `external` apps redirect immediately instead of opening a window.

import { profile } from './profile';

export const appRegistry = {
  admin: {
    title: 'Admin Studio',
    shortLabel: 'Admin Studio',
    image: '/app-icons/admin.svg',
    icon: 'fa-solid fa-sliders',
    orchis: 'settings',
    color: '#3584e4',
    fit: true,
  },

  resume: {
    title: 'Resume',
    shortLabel: 'Resume',
    image: '/app-icons/resume.svg',
    icon: 'fa-solid fa-file-lines',
    orchis: 'document',
    color: '#dc4b3f',
  },

  about: {
    title: 'About Me',
    shortLabel: 'About Me',
    image: '/app-icons/about.svg',
    icon: 'fa-solid fa-user',
    orchis: 'user',
    color: '#4fa8ff',
  },

  experience: {
    title: 'Experience',
    shortLabel: 'Experience',
    image: '/app-icons/experience.svg',
    icon: 'fa-solid fa-briefcase',
    orchis: 'briefcase',
    color: '#d46a1f',
  },

  projects: {
    title: 'Projects',
    shortLabel: 'Projects',
    image: '/app-icons/projects.svg',
    icon: 'fa-solid fa-folder',
    orchis: 'folder',
    color: '#dfb620',
  },

  skills: {
    title: 'Skills',
    shortLabel: 'Skills',
    image: '/app-icons/skills.svg',
    icon: 'fa-solid fa-layer-group',
    orchis: 'layers',
    color: '#7c5cff',
  },

  certifications: {
    title: 'Certifications',
    shortLabel: 'Certifications',
    image: '/app-icons/certifications.svg',
    icon: 'fa-solid fa-certificate',
    orchis: 'certificate',
    color: '#b98700',
  },

  contact: {
    title: 'Contact Me',
    shortLabel: 'Contact Me',
    image: '/app-icons/contact.svg',
    icon: 'fa-solid fa-envelope-open-text',
    orchis: 'mail',
    color: '#34a853',
  },

  explorer: {
    title: 'Files',
    shortLabel: 'Files',
    image: '/app-icons/files.svg',
    icon: 'fa-solid fa-folder-open',
    orchis: 'folder',
    color: '#ffca28',
    fit: true,
  },

  browser: {
    title: 'Google Chrome',
    shortLabel: 'Chrome',
    image: '/app-icons/chrome.svg',
    icon: 'fa-brands fa-chrome',
    orchis: 'globe',
    color: '#ea4335',
    fit: true,
  },

  paint: {
    title: 'Paint',
    shortLabel: 'Paint',
    image: '/app-icons/paint.svg',
    icon: 'fa-solid fa-paintbrush',
    orchis: 'palette',
    color: '#2a41eb',
    fit: true,
  },

  personalize: {
    title: 'Personalize — Background',
    shortLabel: 'Personalize',
    image: '/app-icons/personalize.svg',
    icon: 'fa-solid fa-palette',
    orchis: 'palette',
    color: '#e0538a',
  },

  // External links — open in a new tab instead of a window
  github: {
    title: 'GitHub',
    shortLabel: 'GitHub',
    image: '/app-icons/github.svg',
    icon: 'fa-brands fa-github',
    orchis: 'spark',
    color: '#ffffff',
    external: profile.github,
  },

  linkedin: {
    title: 'LinkedIn',
    shortLabel: 'LinkedIn',
    image: '/app-icons/linkedin.png',
    icon: 'fa-brands fa-linkedin',
    orchis: 'globe',
    color: '#4fa8ff',
    external: profile.linkedin,
  },
};

// Order + labels for desktop icons
export const desktopIconOrder = [
  'resume',
  'about',
  'experience',
  'projects',
  'skills',
  'certifications',
  'contact',
  'paint',
];

// Favorite applications shown in the overview
export const pinnedAppOrder = [
  'resume',
  'about',
  'experience',
  'projects',
  'skills',
  'certifications',
  'contact',
  'browser',
  'paint',
  'explorer',
];

// Fixed taskbar shortcuts
// Always visible, left of the dynamic running apps.
export const taskbarPinned = [
  'explorer',
  'browser',
  'resume',
];