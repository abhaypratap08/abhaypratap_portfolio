import { useEffect, useState } from 'react';
import styles from './LockScreen.module.css';
import { useClock } from '../../hooks/useClock';
import { wallpapers } from '../../context/WallpaperContext';
import guestAvatar from '../../assets/images/guest-avatar.jpg';
import adminAvatar from '../../assets/images/abhay-profile.webp';

const USERS = [
  { id: 'guest', name: 'Guest', img: guestAvatar },
  { id: 'admin', name: 'Admin', img: adminAvatar },
];

export default function LockScreen({ onSignIn, adminSetupRequired }) {
  const { time, dowMonthDate } = useClock();
  const [locked, setLocked] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [user, setUser] = useState(USERS[0]);
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!locked) return undefined;
    function unlock() {
      setUnlocking(true);
      setTimeout(() => setLocked(false), 480);
    }
    window.addEventListener('keydown', unlock);
    return () => window.removeEventListener('keydown', unlock);
  }, [locked]);

  async function handleSignIn() {
    setAuthError('');
    if (user.id === 'admin' && password.length < 8) {
      setAuthError('Use at least 8 characters for the Admin passphrase.');
      return;
    }

    setSigningIn(true);
    try {
      await onSignIn(user.id, password);
    } catch (error) {
      setAuthError(error.message === 'OperationError'
        ? 'Incorrect passphrase or encrypted Admin data is damaged.'
        : error.message || 'Could not unlock Admin data.');
    } finally {
      setSigningIn(false);
      setPassword('');
    }
  }

  return (
    <div className={styles.stage} style={{ backgroundImage: `url(${wallpapers[0].src})` }}>
      <div className={`${styles.overlay} ${!locked ? styles.signInOverlay : ''}`} />

      {locked && (
        <div
          className={`${styles.lockScreen} ${unlocking ? styles.hide : ''}`}
          tabIndex={0}
          role="region"
          aria-label="Unlock screen"
          onClick={() => {
            setUnlocking(true);
            setTimeout(() => setLocked(false), 480);
          }}
        >
          <div className={styles.lockTopbar}>
            <span>{dowMonthDate}</span>
            <div className={styles.lockStatus} aria-label="Network and battery status">
              <i className="fa-solid fa-wifi" />
              <i className="fa-solid fa-battery-three-quarters" />
            </div>
          </div>
          <div className={styles.lockCenter}>
            <div className={styles.lockClock}>{time}</div>
            <div className={styles.lockHint}>Tap or press any key to unlock</div>
          </div>
          <div className={styles.lockActions}>
            <button type="button" aria-label="Network" title="Network" onClick={(event) => event.stopPropagation()}>
              <i className="fa-solid fa-wifi" />
            </button>
            <button type="button" aria-label="Accessibility" title="Accessibility" onClick={(event) => event.stopPropagation()}>
              <i className="fa-brands fa-accessible-icon" />
            </button>
          </div>
        </div>
      )}

      {!locked && (
        <div className={styles.signIn}>
          <div className={styles.container}>
            <div className={styles.profile}>
              <img src={user.img} alt={user.name} className={styles.avatar} />
              <h2 className={styles.name}>{user.name}</h2>
              <div className={styles.status}>
                {signingIn ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin" /> Signing in…
                  </>
                ) : (
                  user.id === 'admin'
                    ? (adminSetupRequired ? 'Create a passphrase to encrypt Admin edits' : 'Enter your Admin passphrase to decrypt saved edits')
                    : 'Continue as Guest'
                )}
              </div>
            </div>

            {user.id === 'admin' ? (
              <>
                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    placeholder="Admin passphrase"
                    className={styles.pinInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                    minLength={8}
                    autoComplete="off"
                    aria-describedby={authError ? 'sign-in-error' : 'sign-in-hint'}
                  />
                  <button
                    type="button"
                    className={styles.submitBtn}
                    onClick={handleSignIn}
                    disabled={signingIn}
                    aria-label="Unlock Admin"
                  >
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>
                <div id={authError ? 'sign-in-error' : 'sign-in-hint'} className={styles.pinHint} role={authError ? 'alert' : 'status'}>
                  {authError || (adminSetupRequired
                    ? 'Use at least 8 characters. You will need this passphrase to edit again.'
                    : 'The passphrase is never stored; losing it means encrypted edits cannot be recovered.')}
                </div>
              </>
            ) : (
              <button
                type="button"
                className={styles.guestSubmitBtn}
                onClick={handleSignIn}
                disabled={signingIn}
                aria-label="Continue as Guest"
                title="Continue as Guest"
              >
                {signingIn ? <i className="fa-solid fa-circle-notch fa-spin" /> : <i className="fa-solid fa-arrow-right" />}
              </button>
            )}
          </div>

          <div className={styles.userList}>
            {USERS.map((u) => (
              <div
                key={u.name}
                className={`${styles.userItem} ${user.name === u.name ? styles.active : ''}`}
                aria-pressed={user.id === u.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setUser(u);
                  setPassword('');
                  setAuthError('');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setUser(u);
                    setPassword('');
                    setAuthError('');
                  }
                }}
              >
                <img src={u.img} alt="" />
                <span>{u.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.footerActions}>
            <button className={styles.actionBtn} aria-label="Network" title="Network">
              <i className="fa-solid fa-wifi" />
            </button>
            <button className={styles.actionBtn} aria-label="Accessibility" title="Accessibility">
              <i className="fa-brands fa-accessible-icon" />
            </button>
            <button
              className={styles.actionBtn}
              aria-label="Return to lock screen"
              title="Power"
              onClick={() => {
                setLocked(true);
                setUnlocking(false);
              }}
            >
              <i className="fa-solid fa-power-off" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
