import { usePortfolioData } from '../../context/PortfolioDataContext';
import styles from './Resume.module.css';

export default function Resume() {
  const { data } = usePortfolioData();
  const { profile } = data;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.nameBlock}>
          <h2 className={styles.name}>{profile.name}</h2>
          <div className={styles.role}>{profile.headline}</div>
        </div>
        <a
          href="/abhay-pratap-singh-resume.pdf"
          download="Abhay_Pratap_Singh_Resume.pdf"
          className={styles.downloadBtn}
        >
          <i className="fa-solid fa-download" /> Download My Resume
        </a>
      </div>

      <div className={styles.preview}>
        <ResumeSheet data={data} />
      </div>
    </div>
  );
}

function ResumeSheet({ data }) {
  return (
    <iframe
      title="Resume preview"
      className={styles.iframe}
      srcDoc={buildResumeHtml(data)}
    />
  );
}
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function buildResumeHtml(data) {
  // A lightweight, self-contained sheet rendered inside an iframe so it
  const { profile, experience, education, projects, skills, certifications } = data;
  const list = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const experienceHtml = experience.map((job) => `
    <div class="item">
      <div class="row"><div class="item-title">${escapeHtml(job.title)} — ${escapeHtml(job.company)}</div><div class="meta">${escapeHtml(job.period)}</div></div>
      <ul>${list(job.bullets)}</ul>
    </div>`).join('');
  const projectHtml = projects.map((project) => `
    <div class="item">
      <div class="item-title">${escapeHtml(project.title)}</div>
      <div class="stack">${escapeHtml(project.stack)}</div>
      <ul>${list(project.bullets)}</ul>
    </div>`).join('');
  const skillHtml = skills.map((group) => `<strong>${escapeHtml(group.group)}:</strong> ${escapeHtml(group.items.join(', '))}`).join('<br/>');
  const certificationHtml = certifications.map((item) => `<li>${escapeHtml(item.title)} — ${escapeHtml(item.issuer)}${item.period ? ` · ${escapeHtml(item.period)}` : ''}</li>`).join('');
  const educationHtml = education.map((item) => `
    <div class="item">
      <div class="row"><div class="item-title">${escapeHtml(item.degree)}</div><div class="meta">${escapeHtml(item.period)}</div></div>
      <div class="meta">${escapeHtml(item.school)}${item.detail ? ` · ${escapeHtml(item.detail)}` : ''}</div>
    </div>`).join('');
  const contactHtml = [profile.email, profile.phone, profile.github, profile.linkedin]
    .filter(Boolean)
    .map(escapeHtml)
    .join('<br/>');
  const aboutHtml = `${escapeHtml(profile.summary)}<br/><br/>${escapeHtml(profile.about).replace(/\n\n/g, '<br/><br/>')}`;
  // keeps its own print-style layout independent of the OS shell CSS.
  return `<!DOCTYPE html><html><head><meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body { margin:0; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; color:#222; }
    .resume { max-width: 820px; margin: 0 auto; padding: 24px; }
    .header { display:flex; justify-content:space-between; border-bottom:2px solid #eee; padding-bottom:12px; margin-bottom:16px; }
    .name { font-size:24px; font-weight:700; }
    .role { font-size:13px; color:#666; margin-top:2px; }
    .contacts { text-align:right; font-size:13px; line-height:1.7; }
    .section-title { font-weight:700; color:#3584e4; margin:18px 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:.4px; }
    .row { display:flex; justify-content:space-between; margin-bottom:2px; }
    .meta { color:#666; font-size:12px; white-space:nowrap; }
    .item { margin-bottom:12px; }
    .item-title { font-weight:600; font-size:14px; }
    .stack { font-size:12.5px; color:#3584e4; font-weight:600; margin:2px 0 6px; }
    ul { margin:0; padding-left:18px; font-size:13.5px; }
    li { margin-bottom:3px; }
    .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
  </style></head>
  <body><div class="resume">
    <div class="header">
      <div><div class="name">${escapeHtml(profile.name)}</div><div class="role">${escapeHtml(profile.headline)}</div></div>
      <div class="contacts">${contactHtml}</div>
    </div>

    <div class="section-title">Profile</div>
    <div class="summary">${aboutHtml}</div>

    ${experience.length ? `<div class="section-title">Experience</div>${experienceHtml}` : ''}
    ${projects.length ? `<div class="section-title">Projects</div>${projectHtml}` : ''}

    <div class="grid-2">
      ${skills.length ? `<div>
        <div class="section-title">Skills</div>
        <div style="font-size:13.5px;line-height:1.9;">
          ${skillHtml}
        </div>
      </div>` : ''}
      ${certifications.length ? `<div>
        <div class="section-title">Certifications</div>
        <ul>
          ${certificationHtml}
        </ul>
      </div>` : ''}
    </div>

    ${education.length ? `<div class="section-title">Education</div>${educationHtml}` : ''}
  </div></body></html>`;
}
