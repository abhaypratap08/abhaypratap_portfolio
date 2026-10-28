import styles from './Browser.module.css';

export default function Browser({ win }) {
  const src = win?.startUrl ?? 'https://www.google.com/webhp?igu=1';

  return (
    <iframe
      title="Browser"
      className={styles.iframe}
      src={src}
    />
  );
}
