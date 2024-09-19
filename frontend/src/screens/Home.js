import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Crousel from '../components/Crousel'
import ShopCard from '../components/ShopCard'
import axios from 'axios';
import Marque from '../components/Marque'
import Marquee from 'react-fast-marquee'
import './Home.css'
import BannerSlider from '../components/BannerSlider'
export default function Home() {
    const [shopData, setShopData] = useState([{}]);
    const loadData = async () => {
        try {
            let response = await fetch('/api/v1/shops', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // let response = await axios.get('/api/v1/shops');
            response = await response.json()
            // console.log(response.shop);
            setShopData(response.shop);
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        loadData();
    }, []);

    const [search, setSearch] = useState('');
    const searchHandler = (searchKey) => {
        setSearch(searchKey);
        console.log(search);
    }

    return (
        <div> 
            <Navbar onSearch={searchHandler}  />
            {/* <BannerSlider /> */}
            <Crousel />
            <Marque />
            <div className='shophead'>
                <h2 >Choose your store </h2>
            </div>
            <div className='container' style={{ "display": "flex", "flexWrap": "wrap" }}>

                {
                    shopData === []
                        ? {} : shopData.map((data) => {
                            return (
                                <ShopCard key={data._id} shopData={data} />
                            )
                        })
                }

                {/* {console.log(shopData)} */}
                {/* {console.log(shopData[0].shopName)} */}
                {/* {console.log(shopData[1]?.address.state)} */}
            </div>
            <Footer />
        </div>
    )
}
