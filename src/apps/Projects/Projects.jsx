import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function Projects() {
  const { data: { projects } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      <h3 style={{ marginTop: 0 }}>Featured Projects</h3>
      {projects.length === 0 && <p>Projects will be added here as they are ready to share.</p>}
      {projects.map((p) => (
        <div className={doc.cardItem} key={p.title}>
          <h4>
            {p.title}{' '}
            {p.badge && <span className={doc.timelineBadge}>{p.badge}</span>}
          </h4>
          <div className={doc.stackLine}>{p.stack}</div>
          <ul>
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {p.github && (
            <div className={doc.links}>
              <a href={p.github} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github" /> GitHub
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
