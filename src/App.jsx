import Aurora from './components/Aurora';
import NavBar from './components/NavBar';
import ScrollVelocity from './components/ScrollVelocity';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Services from './sections/Services';
import Experience from './sections/Experience';
import Process from './sections/Process';
import Contact from './sections/Contact';
import './components/NavBar.css';

function App() {
  return (
    <>
      <Aurora />
      <NavBar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        <div className="marquee-section">
          <ScrollVelocity
            texts={['FULL-STACK DEVELOPMENT · SAAS · SYSTEMS ARCHITECTURE · AI & AUTOMATION · PRODUCT · SALES ·']}
            velocity={40}
            className="marquee-text"
          />
        </div>

        <Stats />
        <Portfolio />
        <Services />
        <Process />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default App;
