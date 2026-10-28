import { useEffect, useState } from 'react';
import styles from './GitHub.module.css';

const GITHUB_USER = 'abhaypratap08';

export default function GitHub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`).then((r) => r.json()),
    ])
      .then(([u, r]) => {
        setUser(u);
        setRepos(Array.isArray(r) ? r : []);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return (
    <div className={styles.wrap}>
      <p className={styles.errorMsg}>Could not load GitHub profile.</p>
      <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className={styles.openBtn}>
        Open on GitHub ↗
      </a>
    </div>
  );

  if (!user) return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
    </div>
  );

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <img className={styles.avatar} src={user.avatar_url} alt={user.name} />
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.login}>@{user.login}</p>
          {user.bio && <p className={styles.bio}>{user.bio}</p>}
          <div className={styles.stats}>
            <span><strong>{user.public_repos}</strong> repos</span>
            <span><strong>{user.followers}</strong> followers</span>
            <span><strong>{user.following}</strong> following</span>
          </div>
          <a
            className={styles.openBtn}
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>

      {/* Repos */}
      <div className={styles.reposSection}>
        <h2 className={styles.reposTitle}>Recent Repositories</h2>
        <div className={styles.repoGrid}>
          {repos.map((repo) => (
            <a
              key={repo.id}
              className={styles.repoCard}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.repoName}>{repo.name}</div>
              {repo.description && (
                <div className={styles.repoDesc}>{repo.description}</div>
              )}
              <div className={styles.repoMeta}>
                {repo.language && <span className={styles.lang}>{repo.language}</span>}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
