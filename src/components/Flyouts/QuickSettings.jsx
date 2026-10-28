import { useState } from 'react';
import styles from './QuickSettings.module.css';

export default function QuickSettings({ onPower }) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(55);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);

  return (
    <div className={styles.flyout} onClick={(e) => e.stopPropagation()}>
      <div className={styles.grid}>
        <button className={`${styles.tile} ${wifi ? styles.active : ''}`} onClick={() => setWifi((v) => !v)}>
          <i className="fa-solid fa-wifi" />
          <span>Wi-Fi</span>
        </button>
        <button
          className={`${styles.tile} ${bluetooth ? styles.active : ''}`}
          onClick={() => setBluetooth((v) => !v)}
        >
          <i className="fa-brands fa-bluetooth-b" />
          <span>Bluetooth</span>
        </button>
        <div className={`${styles.tile} ${styles.active}`} style={{ pointerEvents: 'none' }}>
          <i className="fa-solid fa-signal" />
          <span>Connected</span>
        </div>
      </div>

      <div className={styles.sliderRow}>
        <i className="fa-solid fa-sun" />
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </div>
      <div className={styles.sliderRow}>
        <i className="fa-solid fa-volume-high" />
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
      </div>
      <div className={styles.footer}>
        <button
          className={styles.powerButton}
          aria-label="Power options"
          onClick={() => setPowerMenuOpen((value) => !value)}
        >
          <i className="fa-solid fa-power-off" />
        </button>
        {powerMenuOpen && (
          <div className={styles.powerMenu}>
            <button onClick={() => onPower('sleep')}><i className="fa-solid fa-moon" /> Sleep</button>
            <button onClick={() => onPower('restart')}><i className="fa-solid fa-rotate-right" /> Restart</button>
            <button onClick={() => onPower('shutdown')}><i className="fa-solid fa-power-off" /> Shut down</button>
          </div>
        )}
      </div>
    </div>
  );
}
