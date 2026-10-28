import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function Contact() {
  const { data: { profile } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      <h2>Let&apos;s talk</h2>
      <div className={doc.lead}>{profile.headline}</div>

      <div style={{ marginTop: 16 }}>
        {profile.email && <div className={doc.contactRow}>
          <i className="fa-solid fa-envelope" />
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>}
        {profile.phone && <div className={doc.contactRow}>
          <i className="fa-solid fa-phone" />
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </div>}
        {profile.github && <div className={doc.contactRow}>
          <i className="fa-brands fa-github" />
          <a href={profile.github} target="_blank" rel="noreferrer">
            {profile.github.replace('https://', '')}
          </a>
        </div>}
        {profile.linkedin && <div className={doc.contactRow}>
          <i className="fa-brands fa-linkedin" />
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedin.replace('https://www.', '')}
          </a>
        </div>}
        {!profile.email && !profile.phone && !profile.github && !profile.linkedin && (
          <p>Contact details haven&apos;t been added yet.</p>
        )}
      </div>
    </div>
  );
}
