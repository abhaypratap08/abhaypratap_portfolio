import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import styles from './About.module.css';
import profilePhoto from '../../assets/images/abhay-profile.webp';

export default function About() {
  const { data: { profile, education } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      <article className={styles.profileArticle}>
        <img
          className={styles.portrait}
          src={profilePhoto}
          alt={`${profile.name}, profile photo`}
        />
        <h2>Hi, I&apos;m {profile.name.split(' ')[0]} 👋</h2>
        <div className={doc.lead}>{profile.headline}</div>
        <p>{profile.summary}</p>
        {profile.about.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <h3>What I&apos;m working toward</h3>
      <ul>
        {profile.workingToward.split('\n').filter(Boolean).map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
      <p>{profile.principle}</p>
      <h3>Education</h3>
      {education.map((item) => (
        <div className={doc.cardItem} key={`${item.degree}-${item.school}`}>
          <h4>{item.degree} <span className={doc.timelineBadge}>{item.period}</span></h4>
          <div className={doc.metaLine}>{item.school}{item.detail ? ` · ${item.detail}` : ''}</div>
        </div>
      ))}
    </div>
  );
}
