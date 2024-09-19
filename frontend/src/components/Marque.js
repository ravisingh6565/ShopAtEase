import React from 'react'
import Marquee from 'react-fast-marquee'
import img1 from "../../src/images/items/fruit.jpeg";
import img2 from "../../src/images/items/vege.png";
import img3 from "../../src/images/items/drinksmi.jpg";
import img4 from "../../src/images/items/egg.png";
import img7 from "../../src/images/items/butterr.png";
// import img8 from "../../src/images/items/handwash.png";
import img9 from "../../src/images/items/nuts.png";
// import img10 from "../../src/images/items/soap.png";
// import img11 from "../../src/images/items/pulses.png";
import img12 from "../../src/images/items/shampoo.png";
import img13 from "../../src/images/items/spices.png";
import img14 from "../../src/images/items/surf.jpg";
import img15 from "../../src/images/items/veg.png";
import img16 from "../../src/images/items/cerelac.jpg";
import img17 from "../../src/images/items/chips.png";
// import img18 from "../../src/images/items/cleaning.png";
import img19 from "../../src/images/items/milk.png";

import './Marque.css'

export default function Marque() {
return (
    <>
    <hr></hr>
    <div className='Marq'> 
        <div className="Title">
            <h2>All grocery items at your doorstep!</h2>
        </div>
        <div>
            <Marquee pauseOnHover speed={100} direction='right'>
                <div className='img-container'>
                    <img src={img1} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img2} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img3} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img4} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img7} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img9} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img12} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img13} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img14} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img15} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img16} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img17} alt=""/>
                </div>
                <div className='img-container'>
                    <img src={img19} alt=""/>
                </div>
            </Marquee>
        </div>      
    </div>
    </>
  )
}
