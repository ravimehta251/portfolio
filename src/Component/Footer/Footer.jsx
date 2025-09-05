import './Footer.css'
import footer_logo from '../../assets/footer_logo.svg'
import user_icon from '../../assets/user_icon.svg'
import logo from '../../assets/logo.png'
const Footer = () => {
return (
    <div className='footer'>
        <div className="footer-top">
            <div className="footer-top-left">
                <img src={logo} alt="Footer Logo" className='logo-g'/>
                <p>
                    I am a 3rd year Information Science Engineering student, passionate about technology and continuous learning.
                </p>
            </div>
            <div className="footer-top-right">
                <div className="footer-email-input">
                    <img src={user_icon} alt="" />
                    <input type="email" placeholder='Enter Your Email'/>
                </div>
                <div className="footer-subcribe">Subscribe</div>
            </div>
        </div>
        <hr/>
        <div className="footer-boottom">
            <p className='footer-bottom-left'>
                &copy; {new Date().getFullYear()} Ravi Portfolio. All rights reserved.
            </p>
            <div className="footer-bottom-right">
                <p>Term of Service</p>
                <p>Privacy Policy</p>
                <p>Connect With Me</p>
            </div>
        </div>

    </div>
)
}

export default Footer