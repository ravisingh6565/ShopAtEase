import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../src/images/logo.png'
import payimg from '../../src/images/pay.png'
import social from '../../src/images/social.png' 
import './Footer.css' 
export default function Footer() {
  return (
    <>
    <hr></hr>
    <div className='footer'>
      <div className='footerin1'>
        <div className='f1'>
          <img src={logo} alt='logo' className='logo' />
          <p>Shop at ease is a multi-vendor grocery shopping website where local sellers can register their shop and the nearby customers can shop from local sellers online. </p>
          <img src={social} alt='social' className='social' />
        </div>
        <div className='f2'>
          <h3>About Us</h3>
          <Link to='/about' className='stylenone'>
            <p>About us</p>
          </Link>
          <Link to='/contact' className='stylenone'>
            <p>Contact us</p>
          </Link>
          <p>About team</p>
          <p>Customer Support</p>
        </div>
        <div className='f2'>

          <h3>Our Information</h3>
          <Link to='/privacypolicy' className='stylenone'>
            <p>Privacy policy</p>
          </Link>
          <Link to='/termsandconditions' className='stylenone'>
            <p>Terms & conditions</p>
          </Link>
          <p>Return Policy</p>
          <p>Site Map</p>

        </div>
        
        <div className='f2'>
          <h3>Community</h3>
          <p>Announcements</p>
          <p>Answer center</p>
          <p>Discussion boards</p>
          <p>Giving works</p>
        </div>
        <div className='f2'>
          <h3>Subscribe Now</h3>
          <p>Subscribe your email for newsletter and featured news based on your interest</p>
          <div className='inputcontainer'>
            <span className='icon1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
              </svg>

            </span>
            <input type='text' placeholder='Enter your email' />
            <span className='icon2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>

            </span>
          </div>
        </div>        
      </div>
      <div className='footerin2'>
        <h3>© Copyright 2023 Shop at Ease, Inc.  All rights reserved<p> Anuj Singh, Ariba Fazal, Harsh Sharma, Ravi Singh</p></h3>
        <img src={payimg} alt='payimg' />        
      </div>
      
    </div>
    </>
  //   <div><footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
  //   <div className="col-md-4 d-flex align-items-center">
  //     <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
  //     <span className="mb-3 mb-md-0 text-muted">© 2023 Copyright, <div> Anuj Singh, Ariba Fazal, Harsh Sharma, Ravi Singh </div></span>
  //     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
  //     <li className="ms-3"><Link className="text-muted" to="#"><i className="fa-brands fa-linkedin"></i></Link></li>
  //     <li className="ms-3"><Link className="text-muted" to="#"><i className="fa-brands fa-instagram"></i></Link></li>
  //     <li className="ms-3"><Link className="text-muted" to="#"><i className="fa-brands fa-facebook"></i></Link></li>
  //   </ul>
      
  //   </div>

    
  // </footer></div>
  )
}
