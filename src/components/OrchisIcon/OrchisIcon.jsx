const iconMap = {
  file: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h6l4 4V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M13 3.5V8h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 12h7M8.5 15h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5.5 18.5c1.5-2.7 4-4.1 6.5-4.1s5 1.4 6.5 4.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V6.8A1.8 1.8 0 0 1 8.8 5h6.4A1.8 1.8 0 0 1 17 6.8V8h2.5A1.5 1.5 0 0 1 21 9.5v7A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-7A1.5 1.5 0 0 1 4.5 8H7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 8V6.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3.5 12.5h17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 8.5A2.5 2.5 0 0 1 6 6h3l1.5 2h7.5A2.5 2.5 0 0 1 20.5 10.5v6A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5v-8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5 4.5 8l7.5 3.5L19.5 8 12 4.5Zm-7.5 6.4 7.5 3.5 7.5-3.5M4.5 15l7.5 3.5L19.5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  certificate: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5 17.2c1.2-2.3 3.2-3.4 7-3.4s5.8 1.1 7 3.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17.5 7.5 20 10l-4.2 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4.7 7.3 12 13.2l7.3-5.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 12h16M12 4a12 12 0 0 1 0 16M12 4a12 12 0 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.8 5l-3.6 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5A8.5 8.5 0 0 0 3.5 12a8.5 8.5 0 0 0 8.5 8.5c1.7 0 2.9-.6 3.9-1.5.8-.7 1.6-1.7 2.6-1.7 1 0 1.8.8 1.8 1.7 0 1.7-1.5 2.8-4.2 2.8A8.5 8.5 0 0 1 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="8" cy="10" r="1.1" fill="currentColor"/>
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor"/>
      <circle cx="15.5" cy="10.5" r="1.1" fill="currentColor"/>
      <circle cx="12" cy="14.5" r="1.1" fill="currentColor"/>
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 11.5 4 14.5v2a2 2 0 0 0 2 2h1.2a2 2 0 0 0 1.4-.6l1.4-1.4h6.8l1.4 1.4a2 2 0 0 0 1.4.6H18a2 2 0 0 0 2-2v-2l-2.5-3.1A3 3 0 0 0 15.8 10H8.2a3 3 0 0 0-1.7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 13.5h1.8M9.9 12.7v1.6M15 13.5h1.5M15.8 12.7v1.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  note: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h7l4 4V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 3.5V8h4M8.5 12h7M8.5 15h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7.5h14M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M7 7.5l1 11a2 2 0 0 0 2 1.8h4a2 2 0 0 0 2-1.8l1-11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  appgrid: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="14" y="5" width="5" height="3.4" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="5" y="14" width="3.4" height="5" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="10" y="14" width="9" height="5" rx="1.2" fill="currentColor" opacity="0.9"/>
    </svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h7.2A2.3 2.3 0 0 1 18 7.3V16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M8.5 9.5h7M8.5 13h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17.5l-1.8-5.9L4.5 9.8 10.2 8 12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h7l4 4V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 3.5V8h4M8.5 12h7M8.5 15h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
};

export default function OrchisIcon({ name, color = '#e95420', className = '' }) {
  const icon = iconMap[name] || iconMap.file;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9,
        background: color,
        color: '#fff',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ width: '18px', height: '18px', display: 'block' }}
        aria-hidden="true"
      >
        {icon.props.children}
      </svg>
    </span>
  );
}
