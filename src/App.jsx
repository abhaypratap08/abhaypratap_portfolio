import { useEffect, useState } from 'react';
import styles from './App.module.css';

import LockScreen from './components/LockScreen/LockScreen';
import Desktop from './components/Desktop/Desktop';

import { WindowManagerProvider } from './context/WindowManagerContext';
import { WallpaperProvider } from './context/WallpaperContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { usePortfolioData } from './context/PortfolioDataContext';

export default function App() {
  return (
    <WallpaperProvider>
      <WindowManagerProvider>
        <PortfolioDataProvider>
          <AppSession />
        </PortfolioDataProvider>
      </WindowManagerProvider>
    </WallpaperProvider>
  );
}

function AppSession() {
  const { unlockAdmin, lockAdmin, hasEncryptedData } = usePortfolioData();
  const [session, setSession] = useState('locked'); // 'locked' | 'guest' | 'admin'
  const [powerState, setPowerState] = useState(null); // null | 'sleep' | 'restart' | 'shutdown'
  const [booting, setBooting] = useState(true);

  // Boot screen
  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 850);

    return () => clearTimeout(id);
  }, []);

  async function handleSignIn(account, passphrase) {
    if (account === 'admin') {
      await unlockAdmin(passphrase);
    }
    setSession(account);
  }

  function handlePower(kind) {
    setPowerState(kind);
    lockAdmin();

    setTimeout(() => {
      if (kind === 'restart') {
        setPowerState(null);
        setSession('locked');
      } else {
        setPowerState(null);
        setSession('locked');
      }
    }, 1100);
  }

  return (
    <div className={styles.app}>

          {/* Boot Screen */}
          {booting && (
            <div className={styles.boot}>
              <div className={styles.bootRing} />
              <div className={styles.bootText}>
                Welcome
              </div>
            </div>
          )}

          {/* Main OS */}
          {session === 'locked' ? (
            <LockScreen onSignIn={handleSignIn} adminSetupRequired={!hasEncryptedData} />
          ) : (
            <Desktop onPower={handlePower} isAdmin={session === 'admin'} />
          )}

          {/* Power Screen */}
          {powerState && (
            <div className={styles.shutdown}>
              <div className={styles.bootRing} />

              <div>
                {powerState === 'restart' && 'Restarting…'}
                {powerState === 'shutdown' && 'Shutting down…'}
                {powerState === 'sleep' && 'Sleeping…'}
              </div>
            </div>
          )}

    </div>
  );
}