import { useEffect, useRef, useState } from "react";

import styles from "./Desktop.module.css";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import Window from "../Window/Window";
import Taskbar from "../Taskbar/Taskbar";
import StartMenu from "../StartMenu/StartMenu";
import ContextMenu from "../ContextMenu/ContextMenu";
import QuickSettings from "../Flyouts/QuickSettings";
import Calendar from "../Flyouts/Calendar";
import OrchisIcon from "../OrchisIcon/OrchisIcon";

import startIcon from "../../assets/images/start.png";

import {
  appRegistry,
  desktopIconOrder,
  taskbarPinned,
} from "../../data/appRegistry";

import { useWindowManager } from "../../context/WindowManagerContext";
import { useWallpaper } from "../../context/WallpaperContext";

export default function Desktop({ onPower, isAdmin = false }) {
  const {
    windows,
    openWindow,
    startMenuOpen,
    setStartMenuOpen,
    showDesktop,
  } = useWindowManager();

  const { wallpaper } = useWallpaper();

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [largeIcons, setLargeIcons] = useState(false);
  const [iconOrder, setIconOrder] = useState(desktopIconOrder);
  const [mobileSearch, setMobileSearch] = useState('');
  const openedAdminRef = useRef(false);

  const mobileAppIds = [...new Set([
    ...desktopIconOrder,
    'browser',
    'explorer',
    'personalize',
    'github',
    'linkedin',
    ...(isAdmin ? ['admin'] : []),
  ])];
  const mobileFavorites = [...new Set([...taskbarPinned, 'paint', 'contact', ...(isAdmin ? ['admin'] : [])])];

  useEffect(() => {
    if (isAdmin && !openedAdminRef.current) {
      openedAdminRef.current = true;
      openWindow('admin');
    }
  }, [isAdmin, openWindow]);

  function handleDesktopClick() {
    setSelectedIcon(null);
    setCtxMenu(null);
    setActiveFlyout(null);
    setStartMenuOpen(false);
  }

  function handleContextMenu(e) {
    // Don't show the desktop context menu over icons or windows.
    if (
      e.target.closest(`.${styles.icons}`) ||
      e.target.closest("[data-window]")
    ) {
      return;
    }

    e.preventDefault();

    const x = Math.min(
      e.clientX,
      window.innerWidth - 230
    );

    const y = Math.min(
      e.clientY,
      window.innerHeight - 260
    );

    setCtxMenu({ x, y });
  }

  function toggleFlyout(which) {
    setStartMenuOpen(false);

    setActiveFlyout((prev) =>
      prev === which ? null : which
    );
  }

  function handleOpenApp(id) {
    openWindow(id);
    setStartMenuOpen(false);
  }

  return (
    <div
      className={styles.desktop}
      style={{
        backgroundImage: `url(${wallpaper.src})`,
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className={styles.icons}>
        {[...iconOrder, ...(isAdmin ? ['admin'] : [])].map((id) => (
          <DesktopIcon
            key={id}
            id={id}
            meta={appRegistry[id]}
            selected={selectedIcon === id}
            large={largeIcons}
            onSelect={(iconId) =>
              setSelectedIcon(iconId)
            }
            onOpen={(iconId) =>
              openWindow(iconId)
            }
          />
        ))}
      </div>

      <section className={styles.mobileScopes}>
        <label className={styles.mobileSearch}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="search"
            value={mobileSearch}
            onChange={(event) => setMobileSearch(event.target.value)}
            placeholder="Search applications"
            aria-label="Search applications"
          />
        </label>
        <nav className={styles.mobileLauncher} aria-label="Favorite applications">
          {mobileFavorites.map((id) => {
            const meta = appRegistry[id];
            return (
              <button key={id} type="button" aria-label={meta.title} title={meta.title} onClick={() => handleOpenApp(id)}>
                {meta.image ? (
                  <img src={meta.image} alt="" />
                ) : meta.orchis ? (
                  <OrchisIcon name={meta.orchis} color={meta.color} />
                ) : (
                  <i className={meta.icon} style={{ color: meta.color }} />
                )}
              </button>
            );
          })}
          <button type="button" aria-label="Show installed applications" title="Installed applications" className={styles.launcherHome} onClick={showDesktop}>
            <img src={startIcon} alt="" />
          </button>
        </nav>
        <div className={styles.scopeViewport}>
          <div className={styles.scopeTrack}>
            <article className={styles.scopePage} aria-label="Installed applications">
              <div className={styles.scopeApps}>
                {mobileAppIds
                  .filter((id) => appRegistry[id]?.shortLabel.toLowerCase().includes(mobileSearch.toLowerCase()))
                  .map((id) => {
                    const meta = appRegistry[id];
                    return (
                      <button className={styles.scopeApp} key={id} type="button" onClick={() => handleOpenApp(id)}>
                        {meta.image ? (
                          <img src={meta.image} alt="" />
                        ) : meta.orchis ? (
                          <OrchisIcon name={meta.orchis} color={meta.color} />
                        ) : (
                          <i className={meta.icon} style={{ color: meta.color }} />
                        )}
                        <span>{meta.shortLabel}</span>
                      </button>
                    );
                  })}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Open application windows */}
      {windows
        .slice()
        .sort(
          (a, b) =>
            a.zIndex - b.zIndex
        )
        .map((win) => (
          <div
            key={win.id}
            data-window
          >
            <Window win={win} />
          </div>
        ))}

      {/* GNOME top panel and dock */}
      <Taskbar
        onToggleFlyout={toggleFlyout}
        activeFlyout={activeFlyout}
        onShowDesktop={showDesktop}
      />

      {/* Applications overview */}
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <StartMenu
          open={startMenuOpen}
          onOpenApp={handleOpenApp}
          isAdmin={isAdmin}
        />
      </div>

      {/* Quick Settings */}
      {activeFlyout === "quick" && (
        <QuickSettings onPower={onPower} />
      )}


      {/* Calendar */}
      {activeFlyout === "calendar" && (
        <Calendar />
      )}

      {/* Desktop Context Menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() =>
            setCtxMenu(null)
          }
          onView={() => {
            setLargeIcons(
              (value) => !value
            );

            setCtxMenu(null);
          }}
          onSort={() => {
            setIconOrder((prev) =>
              [...prev].sort(
                (a, b) =>
                  appRegistry[a].shortLabel.localeCompare(
                    appRegistry[b].shortLabel
                  )
              )
            );

            setCtxMenu(null);
          }}
          onRefresh={() => {
            setCtxMenu(null);
          }}
          onPersonalize={() => {
            openWindow("personalize");
            setCtxMenu(null);
          }}
          onAbout={() => {
            openWindow("about");
            setCtxMenu(null);
          }}
        />
      )}
    </div>
  );
}