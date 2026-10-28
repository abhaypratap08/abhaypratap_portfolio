import styles from './DesktopIcon.module.css';
import OrchisIcon from '../OrchisIcon/OrchisIcon';

export default function DesktopIcon({ id, meta, selected, large, onSelect, onOpen }) {
  return (
    <div
      className={`${styles.icon} ${selected ? styles.selected : ''} ${large ? styles.large : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
        onOpen(id);
      }}
    >
      {meta.image ? (
        <img className={styles.appImageIcon} src={meta.image} alt="" />
      ) : meta.orchis ? (
        <OrchisIcon name={meta.orchis} color={meta.color} className={styles.orchisIcon} />
      ) : (
        <i className={meta.icon} style={{ color: meta.color }} />
      )}
      <p>{meta.shortLabel}</p>
    </div>
  );
}
