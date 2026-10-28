import { createContext, useContext, useRef, useState } from 'react';
import { initialPortfolioData } from '../data/profile';

const STORAGE_KEY = 'rohanos-admin-data-encrypted-v1';
const LEGACY_STORAGE_KEYS = ['rohanos-portfolio-data-v5', 'rohanos-portfolio-data-v4'];
const KEY_DERIVATION_ITERATIONS = 310000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const PortfolioDataContext = createContext(null);

function toBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function deriveEncryptionKey(passphrase, salt) {
  const material = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: KEY_DERIVATION_ITERATIONS, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptData(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(JSON.stringify(data)),
  );

  return JSON.stringify({
    version: 1,
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  });
}

function readLegacyData() {
  for (const key of LEGACY_STORAGE_KEYS) {
    const saved = localStorage.getItem(key);
    if (!saved) continue;

    try {
      const parsed = JSON.parse(saved);
      return {
        ...initialPortfolioData,
        ...parsed,
        certifications: parsed.certifications?.length
          ? parsed.certifications
          : initialPortfolioData.certifications,
      };
    } catch {
      continue;
    }
  }

  return initialPortfolioData;
}

export function PortfolioDataProvider({ children }) {
  const [data, setData] = useState(initialPortfolioData);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [hasEncryptedData, setHasEncryptedData] = useState(() => Boolean(localStorage.getItem(STORAGE_KEY)));
  const encryptionKeyRef = useRef(null);

  async function unlockAdmin(passphrase) {
    if (passphrase.length < 8) {
      throw new Error('Use a passphrase with at least 8 characters.');
    }

    const existing = localStorage.getItem(STORAGE_KEY);
    let key;
    let nextData;

    if (existing) {
      const record = JSON.parse(existing);
      if (record.version !== 1 || !record.salt || !record.iv || !record.ciphertext) {
        throw new Error('Encrypted Admin data is invalid.');
      }

      key = await deriveEncryptionKey(passphrase, fromBase64(record.salt));
      const plaintext = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: fromBase64(record.iv) },
        key,
        fromBase64(record.ciphertext),
      );
      nextData = JSON.parse(decoder.decode(plaintext));
    } else {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      key = await deriveEncryptionKey(passphrase, salt);
      nextData = readLegacyData();
      const encrypted = JSON.parse(await encryptData(nextData, key));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...encrypted, salt: toBase64(salt) }));
      LEGACY_STORAGE_KEYS.forEach((legacyKey) => localStorage.removeItem(legacyKey));
      setHasEncryptedData(true);
    }

    encryptionKeyRef.current = key;
    setData({ ...initialPortfolioData, ...nextData });
    setAdminUnlocked(true);
  }

  async function saveData(nextData) {
    if (!encryptionKeyRef.current) throw new Error('Unlock Admin before saving content.');
    const encrypted = JSON.parse(await encryptData(nextData, encryptionKeyRef.current));
    const currentRecord = JSON.parse(localStorage.getItem(STORAGE_KEY));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...encrypted, salt: currentRecord.salt }));
    setData(nextData);
  }

  async function resetData() {
    LEGACY_STORAGE_KEYS.forEach((legacyKey) => localStorage.removeItem(legacyKey));
    setData(initialPortfolioData);
    if (encryptionKeyRef.current) {
      const currentRecord = localStorage.getItem(STORAGE_KEY);
      const salt = currentRecord
        ? JSON.parse(currentRecord).salt
        : toBase64(crypto.getRandomValues(new Uint8Array(16)));
      const encrypted = JSON.parse(await encryptData(initialPortfolioData, encryptionKeyRef.current));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...encrypted, salt }));
      setHasEncryptedData(true);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setHasEncryptedData(false);
    }
  }

  function lockAdmin() {
    encryptionKeyRef.current = null;
    setAdminUnlocked(false);
    setData(initialPortfolioData);
  }

  return (
    <PortfolioDataContext.Provider value={{
      data,
      saveData,
      resetData,
      unlockAdmin,
      lockAdmin,
      adminUnlocked,
      hasEncryptedData,
    }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) throw new Error('usePortfolioData must be used inside PortfolioDataProvider');
  return context;
}