import React from 'react'
import './About.css';
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/my.jpg'
const About = () => {
  return (
    <div id='about' className='about'>
        <div className="about-title">
            <h1>About me</h1>
            <img src={theme_pattern} alt=""/>
        </div>
        <div className="about-sections">
            <div className="about-left">
                <img src={profile_img} alt="" />
            </div>
            <div className="about-right">
                <div className="about-para">
                    <p>
                        Hello! I'm Ravi Kumar, 
                        a Third-year student pursuing Information Science and Engineering.
                    </p>

                    <p>
                        I’m always eager to take on new challenges, 
                      contribute to meaningful projects, and continue growing as a developer and security enthusiast.
                    </p>
                </div>
                <div className="about-skills">
                    <div className="about-skill"> <p>HTML & CSS</p><hr style={{width:'50%'}}/> </div>
                    <div className="about-skill"> <p>React JS</p><hr style={{width:'80%'}}/> </div>
                    <div className="about-skill"> <p>JavaScript</p><hr style={{width:'60%'}}/> </div>
                    <div className="about-skill"> <p>GSAP</p><hr style={{width:'50%'}}/> </div>
                   
                </div>
            </div>
        </div>
        <div className="about-achivements">
            <div className="about-achievement">
                <h1>1+</h1>
                <p>YEAR OF EXPERIENCE</p>
            </div><hr/>
            <div className="about-achievement">
                <h1>10+</h1>
                <p>Project Completed</p>
            </div>
        </div>

    </div>
  )
}

export default About