import { createContext, useContext, useState } from 'react';
import fern from '../assets/images/fern.jpg';
import arch from '../assets/images/arch-btw.jpg';
import aurora from '../assets/images/aurora.jpg';
import devtools from '../assets/images/devtools.jpg';
import sequoia from '../assets/images/sequoia.jpg';
import citynight from '../assets/images/citynight.jpg';

export const wallpapers = [
  { id: 'fern',      label: 'Fern',       src: fern      },
  { id: 'arch-btw',  label: 'Arch BTW',   src: arch      },
  { id: 'aurora',    label: 'Aurora',     src: aurora    },
  { id: 'devtools',  label: 'Dev Tools',  src: devtools  },
  { id: 'sequoia',   label: 'Sequoia',    src: sequoia   },
  { id: 'citynight', label: 'City Night', src: citynight },
];

const WallpaperContext = createContext(null);

export function WallpaperProvider({ children }) {
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error('useWallpaper must be used inside WallpaperProvider');
  return ctx;
}
