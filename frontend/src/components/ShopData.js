import React from 'react'
import Navbar from './Navbar'
import './ShopData.css'

export default function ShopData(props) {
  return (
    <div>
      <Navbar/>
      <div className='mainsec'>      
        <div className='shop-page'>
          {/* {console.log(props.shopData.shopName)} */}
          <div className='desc'>
          <h3>{props.shopData.shopName}</h3>
          <h5> {(props.shopData?.address) && <p>{props.shopData?.address.street} {props.shopData?.address.area}, {props.shopData?.address.locality} {props.shopData?.address.city}, {props.shopData?.address.state} - {props.shopData?.address.pinCode}</p>}</h5>
          <p>Owner Name : {props.shopData.ownerName}</p>
          <p>Contact No : {props.shopData.phoneNumber}</p>
          <p>Email : {props.shopData.email}</p>
          {/* <p>Shop Description : {props.shopData?.description}</p> */}
          </div>          
        </div>
        {/* <div className='cat'>
          <CategorySidebar/>
        </div>              */}
      </div>      
    </div>
  )
}
