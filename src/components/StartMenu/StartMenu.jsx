import { useState } from 'react';
import styles from './StartMenu.module.css';
import { appRegistry, pinnedAppOrder } from '../../data/appRegistry';
import OrchisIcon from '../OrchisIcon/OrchisIcon';

export default function StartMenu({ open, onOpenApp, isAdmin = false }) {
  const [query, setQuery] = useState('');

  const appOrder = isAdmin ? [...pinnedAppOrder, 'admin'] : pinnedAppOrder;
  const filteredPinned = appOrder.filter((id) =>
    appRegistry[id].shortLabel.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`${styles.menu} ${open ? styles.open : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.search}>
        <i className="fa-solid fa-magnifying-glass" />
        <input
          type="text"
          placeholder="Search applications and projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.sectionTitle}>Applications</div>
      <div className={styles.pinnedGrid} aria-label="Applications">
        {filteredPinned.map((id) => {
          const meta = appRegistry[id];
          return (
            <div key={id} className={styles.pinnedApp} onClick={() => onOpenApp(id)}>
              {meta.image ? (
                <img className={styles.appImageIcon} src={meta.image} alt="" />
              ) : meta.orchis ? (
                <OrchisIcon name={meta.orchis} color={meta.color} className={styles.orchisPinnedIcon} />
              ) : (
                <i className={meta.icon} style={{ color: meta.color }} />
              )}
              <span>{meta.shortLabel}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
