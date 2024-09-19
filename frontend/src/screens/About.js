import React, { useEffect } from 'react'
import SingleBanner from '../../src/components/SingleBanner'
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import './Extrapages.css'
// import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import devlopers from '../devlopers.png';
import mentor from '../mentor.png';

const About = () => {

    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
  return (
    <div className='extrapage'>
        <Navbar reloadnavbar={false}/>
        <SingleBanner
        heading="About Us"
        bannerimage= 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
        />
        <div className='pgleft pgcommon'>
            <img src={logo} alt='noimg' className='logoabt'/>

            <div>
                <h1>Our Story</h1>
                <p>We observed that in the recent scenario everyone is opting to shop online rather than going to their nearby shops. The busy schedule of people and the easy home delivery option of various websites have made it the choice of the customers to even buy the groceries online. Due to this the local shop owners are suffering because most of their customers who used to shop groceries from them are now considering to order it online from websites like Flipkart Grocery, BigBasket, Grofers, etc.
                <br/>
                To solve this problem we have come up with our website <b>"Shop at Ease"</b>. This website will give the local sellers the opportunity to make their business online. It will provide the sellers a platform where they will list their shops and the customers will be able to access them and shop from there online.
                <br/>
                This way the customers will be able to enjoy the ease of online grocery shopping and the local sellers will also not suffer. This website will also help the sellers to expand their reach and make more customers :)                 
                </p>

            </div>
        </div>
        <div className='pgright pgcommon'>
            <img src={devlopers} alt='noimg' className='devlopersimg' />

            <div>
                <h1>Who are we</h1>
                <p>
                    <b>Anuj Singh</b><br/> Student of BCA (Bachelor in Computer Applications) at School of Management Sciences. <br/> Roll no. 11421407031
                    <br/> <br/>
                    <b>Ariba Fazal</b><br/> Student of BCA (Bachelor in Computer Applications) at School of Management Sciences. <br/> Roll no. 11421407002
                    <br/> <br/>
                    <b>Harsh Sharma</b><br/> Student of BCA (Bachelor in Computer Applications) at School of Management Sciences. <br/> Roll no. 11421407044
                    <br/> <br/>
                    <b>Ravi Singh</b><br/> Student of BCA (Bachelor in Computer Applications) at School of Management Sciences. <br/> Roll no. 11421407059
                    <br/> <br/>
                </p>

            </div>
        </div>
        <div className='pgleft pgcommon'>
            <img src={mentor} alt='noimg' className='mentorimg' />

            <div>
                <h1>Our Mentor</h1>
                <p>
                    <b>DR. KAMAL SHEEL MISHRA</b>
                    <br/>Ph.D.(IIT BHU), M.Tech
                    <br/>PROFESSOR, HOD(COMPUTER SCIENCE)
                    <br/>School of Management Sciences, Varanasi
                </p>
            </div>
        </div>
        <Footer/>
        
        </div>
  )
}

export default About