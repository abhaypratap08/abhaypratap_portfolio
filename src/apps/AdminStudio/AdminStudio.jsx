import { useState } from 'react';
import { initialPortfolioData } from '../../data/profile';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import styles from './AdminStudio.module.css';

export default function AdminStudio() {
  const { data, saveData, resetData } = usePortfolioData();
  const sections = ['profile', 'experience', 'education', 'projects', 'skills', 'certifications'];
  const labels = {
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    certifications: 'Certifications',
  };
  const [activeSection, setActiveSection] = useState('profile');
  const [draft, setDraft] = useState(JSON.stringify(data.profile, null, 2));
  const [message, setMessage] = useState('');

  async function handleSave() {
    try {
      const parsed = JSON.parse(draft);
      const shouldBeList = ['experience', 'education', 'projects', 'skills', 'certifications'].includes(activeSection);
      if (!parsed || (shouldBeList ? !Array.isArray(parsed) : Array.isArray(parsed) || typeof parsed !== 'object')) {
        throw new Error(shouldBeList ? 'This section must be a JSON list.' : 'This section must be a JSON object.');
      }
      const nextData = { ...data, [activeSection]: parsed };
      await saveData(nextData);
      setDraft(JSON.stringify(parsed, null, 2));
      setMessage(`${labels[activeSection]} saved in this browser`);
    } catch (error) {
      setMessage(error instanceof SyntaxError ? 'Check the JSON syntax and try again' : error.message);
    }
  }

  async function handleReset() {
    await resetData();
    setDraft(JSON.stringify(initialPortfolioData[activeSection], null, 2));
    setMessage('Restored the original portfolio content');
  }

  function selectSection(section) {
    setActiveSection(section);
    setDraft(JSON.stringify(data[section], null, 2));
    setMessage('');
  }

  function updateField(key, value) {
    const parsed = JSON.parse(draft);
    setDraft(JSON.stringify({ ...parsed, [key]: value }, null, 2));
    setMessage('');
  }

  const isFormSection = activeSection === 'profile';
  let formData = {};
  if (isFormSection) {
    try {
      formData = JSON.parse(draft);
    } catch {
      formData = {};
    }
  }

  return (
    <div className={styles.editor}>
      <header className={styles.header}>
        <div>
          <h2>Portfolio content</h2>
          <p>Edit profile details, experience, projects, skills, education, and certifications.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.reset} onClick={handleReset}>Reset</button>
          <button type="button" className={styles.save} onClick={handleSave}>
            <i className="fa-solid fa-floppy-disk" /> Save changes
          </button>
        </div>
      </header>
      <nav className={styles.tabs} aria-label="Content sections">
        {sections.map((section) => (
          <button
            type="button"
            key={section}
            className={section === activeSection ? styles.selectedTab : ''}
            aria-pressed={section === activeSection}
            onClick={() => selectSection(section)}
          >
            {labels[section]}
          </button>
        ))}
      </nav>
      {isFormSection ? (
        <div className={styles.fields}>
          {Object.entries(formData).map(([key, value]) => (
            <label key={key} className={styles.field}>
              <span>{key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`).replace(/^./, (letter) => letter.toUpperCase())}</span>
              <textarea
                rows={String(value).length > 100 ? 4 : 1}
                value={String(value ?? '')}
                onChange={(event) => updateField(key, event.target.value)}
              />
            </label>
          ))}
        </div>
      ) : (
        <textarea
          className={styles.input}
          aria-label={`${labels[activeSection]} JSON`}
          spellCheck="false"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setMessage('');
          }}
        />
      )}
      <div className={styles.status} role="status">{message || 'Changes apply to portfolio apps and persist in this browser.'}</div>
    </div>
  );
}