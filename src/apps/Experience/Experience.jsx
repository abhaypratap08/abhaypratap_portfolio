import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function Experience() {
  const { data: { experience, education } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      {experience.length > 0 && <h3 style={{ marginTop: 0 }}>Work History</h3>}
      {experience.map((job) => (
        <div className={doc.cardItem} key={job.title}>
          <h4>
            {job.title} <span className={doc.timelineBadge}>{job.period}</span>
          </h4>
          <div className={doc.metaLine}>{job.company}</div>
          <ul>
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3 style={{ marginTop: experience.length ? undefined : 0 }}>Education</h3>
      {education.map((item) => (
        <div className={doc.cardItem} key={`${item.degree}-${item.school}`}>
          <h4>{item.degree} <span className={doc.timelineBadge}>{item.period}</span></h4>
          <div className={doc.metaLine}>{item.school}{item.detail ? ` · ${item.detail}` : ''}</div>
        </div>
      ))}
    </div>
  );
}
