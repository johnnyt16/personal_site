import Aurora from './components/Aurora';
import NavBar from './components/NavBar';
import ScrollVelocity from './components/ScrollVelocity';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import About from './sections/About';
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
            texts={['WEB DEVELOPMENT · SYSTEMS ARCHITECTURE · AI-POWERED BUILDS · FORGE DEVELOPMENT · SHIP FAST · OWN OUTCOMES ·']}
            velocity={40}
            className="marquee-text"
          />
        </div>

        <Services />
        <Portfolio />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
