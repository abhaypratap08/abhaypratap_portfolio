import doc from '../../styles/doc-content.module.css';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function Skills() {
  const { data: { skills } } = usePortfolioData();

  return (
    <div className={doc.docContent}>
      {skills.map((group) => (
        <div className={doc.skillGroup} key={group.group}>
          <h4>{group.group}</h4>
          <div className={doc.tagRow}>
            {group.items.map((item) => (
              <div className={doc.tag} key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
