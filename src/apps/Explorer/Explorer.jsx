import { useMemo, useState } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import styles from './Explorer.module.css';

const folders = {
  home: {
    label: 'Home',
    items: [
      { id: 'documents', label: 'Documents', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'projects-folder', label: 'Projects', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'experience-folder', label: 'Experience', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'certifications-folder', label: 'Certifications', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'skills-folder', label: 'Skills', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'about-folder', label: 'About', type: 'folder', icon: 'fa-solid fa-folder' },
      { id: 'contact-folder', label: 'Contact', type: 'folder', icon: 'fa-solid fa-folder' },
    ],
  },
  documents: {
    label: 'Documents',
    items: [
      { id: 'resume', label: 'Resume.pdf', type: 'app', appId: 'resume', icon: 'fa-solid fa-file-pdf', meta: 'PDF document' },
    ],
  },
  'projects-folder': {
    label: 'Projects',
    items: [{ id: 'projects', label: 'Projects', type: 'app', appId: 'projects', icon: 'fa-solid fa-folder-open', meta: 'Portfolio folder' }],
  },
  'experience-folder': {
    label: 'Experience',
    items: [{ id: 'experience', label: 'Experience', type: 'app', appId: 'experience', icon: 'fa-solid fa-briefcase', meta: 'Portfolio information' }],
  },
  'certifications-folder': {
    label: 'Certifications',
    items: [{ id: 'certifications', label: 'Certifications', type: 'app', appId: 'certifications', icon: 'fa-solid fa-certificate', meta: 'Portfolio information' }],
  },
  'skills-folder': {
    label: 'Skills',
    items: [{ id: 'skills', label: 'Skills', type: 'app', appId: 'skills', icon: 'fa-solid fa-layer-group', meta: 'Portfolio information' }],
  },
  'about-folder': {
    label: 'About',
    items: [{ id: 'about', label: 'About Me', type: 'app', appId: 'about', icon: 'fa-solid fa-user', meta: 'Portfolio information' }],
  },
  'contact-folder': {
    label: 'Contact',
    items: [{ id: 'contact', label: 'Contact', type: 'app', appId: 'contact', icon: 'fa-solid fa-address-card', meta: 'Portfolio information' }],
  },
  downloads: { label: 'Downloads', items: [] },
};

const sidebarSections = [
  { heading: 'Favorites', items: [{ id: 'home', label: 'Home', icon: 'fa-solid fa-house' }, { id: 'documents', label: 'Documents', icon: 'fa-solid fa-folder' }, { id: 'downloads', label: 'Downloads', icon: 'fa-solid fa-download' }] },
  { heading: 'Computer', items: [{ id: 'home', label: 'Other Locations', icon: 'fa-solid fa-computer' }] },
];

export default function Explorer() {
  const { openWindow } = useWindowManager();
  const [location, setLocation] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState('grid');

  const currentFolder = folders[location] ?? folders.home;
  const visibleItems = useMemo(() => currentFolder.items.filter((item) =>
    item.label.toLowerCase().includes(search.trim().toLowerCase())
  ), [currentFolder, search]);

  function navigate(nextLocation) {
    setLocation(nextLocation);
    setHistory((previous) => [...previous.slice(0, historyIndex + 1), nextLocation]);
    setHistoryIndex((index) => index + 1);
    setSelectedId(null);
  }

  function goBack() {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setLocation(history[nextIndex]);
    setSelectedId(null);
  }

  function goForward() {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setLocation(history[nextIndex]);
    setSelectedId(null);
  }

  function openItem(item) {
    if (item.type === 'folder') navigate(item.id);
    else openWindow(item.appId);
  }

  const breadcrumb = location === 'home'
    ? [{ id: 'home', label: 'Home' }]
    : [{ id: 'home', label: 'Home' }, { id: location, label: currentFolder.label }];

  return (
    <div className={styles.files}>
      <header className={styles.toolbar}>
        <div className={styles.navControls}>
          <button type="button" className={styles.iconButton} onClick={goBack} disabled={historyIndex === 0} title="Back" aria-label="Back">
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button type="button" className={styles.iconButton} onClick={goForward} disabled={historyIndex >= history.length - 1} title="Forward" aria-label="Forward">
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>

        <div className={styles.locationBar} aria-label="Current location">
          {breadcrumb.map((crumb, index) => (
            <span key={crumb.id} className={styles.crumbWrap}>
              {index > 0 && <i className={`fa-solid fa-chevron-right ${styles.crumbSeparator}`} />}
              <button
                type="button"
                className={`${styles.crumb} ${index === breadcrumb.length - 1 ? styles.crumbCurrent : ''}`}
                onClick={() => index < breadcrumb.length - 1 && navigate(crumb.id)}
                aria-current={index === breadcrumb.length - 1 ? 'location' : undefined}
              >
                {crumb.label}
              </button>
            </span>
          ))}
        </div>

        <label className={styles.search}>
          <i className="fa-solid fa-magnifying-glass" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" aria-label="Search files" />
        </label>
        <div className={styles.viewControls}>
          <button type="button" className={`${styles.iconButton} ${view === 'grid' ? styles.active : ''}`} onClick={() => setView('grid')} title="Icon view" aria-label="Icon view">
            <i className="fa-solid fa-grip" />
          </button>
          <button type="button" className={`${styles.iconButton} ${view === 'list' ? styles.active : ''}`} onClick={() => setView('list')} title="List view" aria-label="List view">
            <i className="fa-solid fa-list" />
          </button>
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.sidebar} aria-label="Places">
          {sidebarSections.map((section) => (
            <div key={section.heading}>
              <div className={styles.sidebarHeading}>{section.heading}</div>
              {section.items.map((item) => (
                <button
                  type="button"
                  key={`${section.heading}-${item.label}`}
                  className={`${styles.sidebarItem} ${location === item.id && item.label !== 'Other Locations' ? styles.active : ''}`}
                  onClick={() => navigate(item.id)}
                >
                  <i className={item.icon} />
                  <span>{item.label}</span>
                </button>
              ))}
              {section.heading === 'Favorites' && <div className={styles.sidebarDivider} />}
            </div>
          ))}
        </aside>

        <main className={styles.main}>
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>{search ? 'Search Results' : currentFolder.label}</h2>
          </div>

          {visibleItems.length ? (
            <div className={`${styles.items} ${view === 'list' ? styles.list : ''}`}>
              {visibleItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`${styles.item} ${selectedId === item.id ? styles.selected : ''}`}
                  onClick={() => setSelectedId(item.id)}
                  onDoubleClick={() => openItem(item)}
                  onKeyDown={(event) => event.key === 'Enter' && openItem(item)}
                  title={`Open ${item.label}`}
                >
                  <i className={`${styles.itemIcon} ${item.type === 'app' ? styles.file : ''} ${item.icon}`} />
                  <span className={styles.itemName}>{item.label}</span>
                  {view === 'list' && <span className={styles.itemMeta}>{item.meta ?? 'Folder'}</span>}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <i className="fa-regular fa-folder-open" />
              <span>{search ? 'No matching files' : 'This folder is empty'}</span>
            </div>
          )}
          <footer className={styles.statusBar}>
            {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'}
            {selectedId && ` · ${visibleItems.find((item) => item.id === selectedId)?.label} selected`}
          </footer>
        </main>
      </div>
    </div>
  );
}
