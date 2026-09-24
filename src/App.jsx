import Header from './components/Header';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import PlainResume from './sections/PlainResume';

export default function App() {
  return (
    <>
      <a className="skip" href="#plain-resume">
        Skip to plain resume
      </a>
      <a className="skip" href="#work">
        Skip to work
      </a>

      <div className="backdrop" aria-hidden="true" />
      <Header />

      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <PlainResume />

        <footer className="footer">
          <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', justifyContent: 'space-between', width: '100%' }}>
            <span>Johnny McConkie &middot; Provo, Utah</span>
            <a href="#top">Back to top</a>
          </div>
        </footer>
      </main>
    </>
  );
}
