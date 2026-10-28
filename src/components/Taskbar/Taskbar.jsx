import styles from './Taskbar.module.css';
import { appRegistry, taskbarPinned } from '../../data/appRegistry';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useClock } from '../../hooks/useClock';
import FullscreenButton from '../FullscreenButton/FullscreenButton';
import OrchisIcon from '../OrchisIcon/OrchisIcon';
import startIcon from '../../assets/images/start.png';

export default function Taskbar({ onToggleFlyout }) {
  const { windows, focusedId, openWindow, setStartMenuOpen, showDesktop } = useWindowManager();
  const { time, shortDate } = useClock();

  const runningIds = windows.map((w) => w.id);
  const dynamicRunning = runningIds.filter((id) => !taskbarPinned.includes(id));
  const taskbarIds = [...taskbarPinned, ...dynamicRunning];

  return (
    <>
      <header className={styles.taskbar}>
        <div className={styles.left}>
          <button
            className={styles.activities}
            onClick={(e) => {
              e.stopPropagation();
              if (window.matchMedia('(max-width: 768px)').matches) {
                showDesktop();
                setStartMenuOpen(false);
              } else {
                setStartMenuOpen((value) => !value);
              }
            }}
          >
            <span className={styles.activitiesLabel}>Activities</span>
            <img src={startIcon} alt="" className={styles.mobileActivitiesIcon} />
          </button>
        </div>

        <button
          className={styles.clock}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFlyout('calendar');
          }}
          aria-label={`Open calendar, ${shortDate}`}
        >
          {time}
        </button>

        <div className={styles.right}>
          <button
            className={styles.tray}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFlyout('quick');
            }}
            title="System status and settings"
            aria-label="System status and settings"
          >
            <i className="fa-solid fa-wifi" />
            <i className="fa-solid fa-volume-high" />
            <i className="fa-solid fa-battery-three-quarters" />
            <i className="fa-solid fa-chevron-down" />
          </button>
          <FullscreenButton />
        </div>
      </header>

      <nav className={styles.dock} aria-label="Favorite applications" onClick={(e) => e.stopPropagation()}>
        {taskbarIds.map((id) => {
          const meta = appRegistry[id];
          if (!meta) return null;
          const hasWindow = runningIds.includes(id);
          const isActive = focusedId === id;
          return (
            <button
              key={id}
              className={`${styles.task} ${hasWindow ? styles.hasWindow : ''} ${isActive ? styles.activeTask : ''}`}
              title={meta.title}
              aria-label={meta.title}
              onClick={() => openWindow(id)}
            >
              {meta.image ? (
                <img className={styles.appImageIcon} src={meta.image} alt="" />
              ) : meta.orchis ? (
                <OrchisIcon name={meta.orchis} color={meta.color} className={styles.orchisTaskIcon} />
              ) : (
                <i className={meta.icon} style={{ color: meta.color }} />
              )}
              <span className={styles.dot} />
            </button>
          );
        })}

        <span className={styles.separator} />

        <button
          className={`${styles.task} ${styles.appGrid}`}
          onClick={() => setStartMenuOpen((value) => !value)}
          title="Show applications"
          aria-label="Show applications"
        >
          <img className={styles.appGridIcon} src={startIcon} alt="" />
        </button>
      </nav>
    </>
  );
}
