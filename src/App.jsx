import Header from './components/Header';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import About from './sections/About';
import Contact from './sections/Contact';
import { profile } from './data/resume';

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>

      <div className="grain" aria-hidden="true" />
      <Header />

      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>
            &copy; {new Date().getFullYear()} {profile.fullName} &middot; {profile.location}
          </span>
          <a href="#top">Back to top &uarr;</a>
        </div>
      </footer>
    </>
  );
}
