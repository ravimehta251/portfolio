import React from "react";
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

const App = () => {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen selection:bg-blue-500/30 selection:text-blue-400">
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
  );
};

export default App;