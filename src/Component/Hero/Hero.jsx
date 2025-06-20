import React from 'react'
import './Hero.css'
import my_img from '../../assets/my.jpg';

const Hero = () => {
  return (
    <div className='hero'>
      <img src={my_img} alt="Ravi Kumar" />
      <h1><span>I'm Ravi Kumar</span>, a Frontend Developer based in India.</h1>
      <p>
        Passionate about building responsive and user-friendly web applications.
        Skilled in HTML, CSS, JavaScript, React.js, and Tailwind CSS. I love turning 
        ideas into reality through clean and efficient code. Always eager to learn 
        and explore new technologies to improve user experiences and performance.
      </p>
      <div className="hero-action">
        <div className="hero-connect">Connect with me</div>
        <div className="hero-resume">My Resume</div>
      </div>
    </div>
  )
}


export default Hero