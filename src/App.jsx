import React, { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import LeetCode from "./components/LeetCode";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import BackgroundEffects from "./components/BackgroundEffects";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0a0a0e] text-slate-200 min-h-screen selection:bg-blue-500/30 selection:text-blue-400 relative overflow-hidden">
      <BackgroundEffects />
      <CustomCursor />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Projects />
          <Achievements />
          <LeetCode />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;