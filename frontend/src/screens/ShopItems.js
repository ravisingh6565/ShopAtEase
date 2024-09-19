import React, { useState, useEffect } from 'react'
import { useShopId } from './../components/ContextReducer'
import Card from '../components/Card';
import ShopData from '../components/ShopData';
import './ShopItems.css';
import Footer from '../components/Footer';

export default function ShopItems() {
  let shopId = useShopId();
  const [shopItems, setShopItems] = useState([]);
  const [shopData, setShopData] = useState({});
  const loadData = async () => {
    try {
      let response = await fetch(`/api/v1/shop/${shopId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      // console.log(response.shopProducts);
      setShopItems(response.shopProducts);
      setShopData(response.shop);
      // if (response && response.length > 0) {
      //   setShopItems(response);
      // } else {
      //   throw new Error('API response was empty');
      // }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);



  return (
    <div>
      {/* <div>{console.log(shopItems[0]?.name)}</div>
      {console.log(shopData.address?.state)} */}
      <ShopData shopData={shopData} />

    <div className='shopItem' style={{"display":"flex", "flexWrap":"wrap"}}>
    
    {/* {console.log("id===="+data.id)} */}
      {
        shopItems !== []
          ? shopItems.map((data) => {
            return (
              <div className="shopItem-card">
              <Card key={data._id} shopItem={data} />
              </div>
            )
          }) : ""
      }
      </div>
      <Footer/>
    </div>
  )
}
