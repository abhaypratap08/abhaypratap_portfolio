import Resume from './Resume/Resume';
import About from './About/About';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';
import Skills from './Skills/Skills';
import Certifications from './Certifications/Certifications';
import Contact from './Contact/Contact';
import Explorer from './Explorer/Explorer';
import Browser from './Browser/Browser';
import Paint from './Paint/Paint';
import Personalize from './Personalize/Personalize';
import AdminStudio from './AdminStudio/AdminStudio';
import GitHub from './GitHub/GitHub';
import LinkedIn from './LinkedIn/LinkedIn';

const componentMap = {
  resume: Resume,
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  certifications: Certifications,
  contact: Contact,
  explorer: Explorer,
  browser: Browser,
  paint: Paint,
  personalize: Personalize,
  admin: AdminStudio,
  github: GitHub,
  linkedin: LinkedIn,
};

export default function AppRenderer({ id, win }) {
  const Component = componentMap[id];

  if (!Component) return null;

  return <Component win={win} />;
}