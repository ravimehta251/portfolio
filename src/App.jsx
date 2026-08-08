import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EngineeringMetrics from './components/EngineeringMetrics';
import Education from './components/Education';
import Achievements from './components/Achievements';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <ScrollProgress /><Navbar />
    <main id="main"><Hero /><About /><Projects /><Skills /><EngineeringMetrics /><Education /><Achievements /><CodingProfiles /><Contact /></main>
    <Footer />
  </>;
}
