import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useShopIdDispatch, useShopId } from './ContextReducer';
import './ShopCard.css';
export default function ShopCard(props) {
  const data = useShopId();
  const dispatch = useShopIdDispatch();

  const handleSelectShop = async () => {
    await dispatch({ type: "SELECT", id: props.shopData._id });
    // console.log(data);
  }
  return (
    // <div className="card" style={{ "width": "70rem" }}>
    //   {/* <img className="card-img-top" src="https://cdn.pixabay.com/photo/2021/05/27/18/55/woman-6289052_640.png" alt="Card image cap"/> */}
    //   <div className="card-body">
    //     <h5 className="card-title">{props.shopData.shopName}</h5>
    //     {
    //       (props.shopData?.address) && <p>{props.shopData?.address.street} {props.shopData?.address.area} {props.shopData?.address.locality} {props.shopData?.address.city} {props.shopData?.address.state} {props.shopData?.address.pinCode}</p>
    //     }
    //     {console.log(props.shopData?.address)}
    //     <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur molestiae officiis ut eum aspernatur dolorem vero nisi? Quis veniam doloribus cupiditate, dolor dicta, qui molestias reprehenderit nemo sunt nulla quam.</p>

    //     <Link className="nav-link active" aria-current="page" to="/shop-items" onClick={handleSelectShop}>Shop Here</Link>
    //   </div>
    // </div>
    
      <div className='homecategories'>
      <Link className="nav-link active" aria-current="page" to="/shop-items" onClick={handleSelectShop}>
        <div className='container'>
          {((props.shopData?.images)?.length>0 ) && <img src={props.shopData?.images[0].url} alt='shop' />}
          <div className='content'>
            <h3>{props.shopData.shopName}</h3>
            {
              (props.shopData?.address) && <p>{props.shopData?.address.street} {props.shopData?.address.area} {props.shopData?.address.locality} {props.shopData?.address.city} {props.shopData?.address.state} {props.shopData?.address.pinCode}</p>
            }
          </div>
        </div>
        </Link>
      </div>
  )
}
