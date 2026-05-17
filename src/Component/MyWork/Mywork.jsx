import React from 'react'
import './Mywork.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mywork_data from '../../assets/mywork_data'
import arrow from '../../assets/arrow_icon.svg'
const Mywork = () => {
  return (
    <div className='Mywork'>
        <div id='work' className="mywork-title">
            <h1>My Latest Work</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="mywork-container">
            {mywork_data.map((work, index) => {
                return <img key={index} src={work.w_img} alt=''/>
            })}
        </div>
        <dfiv className="mywork-showmore">
            <p>Show More</p>
            <img src={arrow} alt="" />
        </dfiv>
        
    </div>
  )
}

export default Mywork