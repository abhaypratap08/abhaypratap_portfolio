import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function Certifications() {
  const { data: { certifications } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      <h3 style={{ marginTop: 0 }}>Certifications</h3>
      {certifications.length === 0 && <p>No certifications listed yet.</p>}
      {certifications.map((c) => (
        <div className={doc.cardItem} key={c.title}>
          <h4>{c.title}</h4>
          <div className={doc.metaLine}>{c.issuer}{c.period ? ` · ${c.period}` : ''}</div>
        </div>
      ))}
    </div>
  );
}
