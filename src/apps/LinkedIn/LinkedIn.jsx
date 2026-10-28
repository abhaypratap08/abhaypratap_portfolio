import styles from './LinkedIn.module.css';
import { profile } from '../../data/profile';

const LINKEDIN_URL = profile.linkedin;

const highlights = [
  { icon: '🎓', label: 'Education', value: 'B.Tech CSE @ Galgotias University (2024–2028) · CGPA 8.65' },
  { icon: '🛠️', label: 'Focus', value: 'Backend Development · System Design · Applied AI' },
  { icon: '☁️', label: 'Certifications', value: 'Google Cloud (Gemini, Vertex AI) · Red Hat (RH124, RH104)' },
  { icon: '💻', label: 'Stack', value: 'Java · Spring Boot · REST APIs · Python · Linux' },
];

export default function LinkedIn() {
  return (
    <div className={styles.wrap}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.headline}>{profile.headline}</p>
          <div className={styles.location}>
            <i className="fa-solid fa-location-dot" />
            {profile.location}
          </div>
        </div>
        <img
          className={styles.liLogo}
          src="/app-icons/linkedin.png"
          alt="LinkedIn"
        />
      </div>

      {/* About */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.about}>{profile.summary}</p>
      </div>

      {/* Highlights */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <div className={styles.highlights}>
          {highlights.map((h) => (
            <div key={h.label} className={styles.highlightCard}>
              <span className={styles.highlightIcon}>{h.icon}</span>
              <div>
                <div className={styles.highlightLabel}>{h.label}</div>
                <div className={styles.highlightValue}>{h.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        className={styles.openBtn}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Full Profile on LinkedIn ↗
      </a>
    </div>
  );
}
