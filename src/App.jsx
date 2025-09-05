import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import About from "./Component/About/About"
import Service from "./Component/Services/Services"
import Mywork from "./Component/MyWork/Mywork";
import Contact from "./Component/Contact/contact"
import Footer from "./Component/Footer/Footer";
const App = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <About/>
      <Service/>
      <Mywork/>
      <Contact/>
      <Footer/>
    </div>
 )
}
export default App;
// 26 minute done