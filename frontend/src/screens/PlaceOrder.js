import React, { useState } from 'react';
import "./SignUp.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatchCart } from '../components/ContextReducer';


export default function PlaceOrder() {
  
  const dispatch = useDispatchCart();

  const [emailState, setEmailState] = useState('');
  const [phoneNumberState, setPhoneNumberState] = useState('');
  const [areaState, setAreaState] = useState('');
  const [cityState, setCityState] = useState('');
  const [stateState, setStateState] = useState('');
  const [pinCodeState, setpinCodeState] = useState('');
  const [localityState, setLocalityState] = useState('');
  const [streetState, setStreetState] = useState('');
  const [paymentMethodState, setPaymentMethodState] = useState('');
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmailState(event.target.value);
  }
  const phoneNumberChangeHandler = (event) => {
    setPhoneNumberState(event.target.value);
  }
  const areaChangeHandler = (event) => {
    setAreaState(event.target.value);
  }
  const cityChangeHandler = (event) => {
    setCityState(event.target.value);
  }
  const stateChangeHandler = (event) => {
    setStateState(event.target.value);
  }
  const pinCodeChangeHandler = (event) => {
    setpinCodeState(event.target.value);
  }
  const localityChangeHandler = (event) => {
    setLocalityState(event.target.value);
  }
  const streetChangeHandler = (event) => {
    setStreetState(event.target.value);
  }
  const PaymentMethodChangeHandler = (event) => {
    setPaymentMethodState(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const shippingInfo = {
      state: stateState,
      city: cityState,
      pinCode: pinCodeState,
      area: areaState,
      locality: localityState,
      street: streetState
    }
    const contact = {
      phoneNumber: phoneNumberState,
      email: emailState
    }
    const payment={
      method: paymentMethodState
    }
    const cart = JSON.parse(localStorage.getItem("cart"));

    let totalAmount=0;

    let products=[{}];
    cart.map((product,index)=>{
           products[index]={
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: product.qty
          }
          totalAmount = totalAmount+product.price;
    })


    if(paymentMethodState==='ONLINE')
    {
      let userId;
      //get user details
      try {
      
      const response = await fetch("/api/v1/me",{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
        userId= data.user._id;
    } catch (error) {
      console.log(error.message);
    }


      //payment
    try {
      const orderDetails={
        shippingInfo,
        contact,
        products,
        payment,
        user:userId
      }
      const {data:{order}}=await axios.post("/api/v1/checkout", {
        totalAmount,
        orderDetails
      })
      
      const options = {
        key: "rzp_test_DFJaRXBU8oVv1d", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "ShopAtEase",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://127.0.0.1:4000/api/v1/paymentVerification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            color: "#528FF0"
        }
    };
    const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
      console.log(error.message);
    }
    // try {
    //   const order={
    //     shippingInfo,
    //     contact,
    //     products,
    //     payment
    //   }
    //   const response = await fetch("/api/v1/place-order",{
    //     method:'POST',
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(order)
    //   });
    //   const json = await response.json();
    //   console.log(json);
        
    // } catch (error) {
    //   console.log(error.message);
    // }
    
    }
    
    if(paymentMethodState==='COD')
    {
      try {
        const order={
          shippingInfo,
          contact,
          products,
          payment
        }
        const response = await fetch("/api/v1/place-order",{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(order)
        });
        const json = await response.json();
        console.log(json);
        navigate('/paymentsuccess');
          
      } catch (error) {
        console.log(error.message);
      }
    }
    
    setEmailState('');
    setPhoneNumberState('');
    setCityState('');
    setAreaState('');
    setStateState('');
    setpinCodeState('');
    setLocalityState('');
    setStreetState('');
    setPaymentMethodState('');
    
    // await dispatch({type:"REMOVE"});
    // localStorage.removeItem("cart");
    // alert("Order have been Placed Successfully");
    // navigate('/');
  }
  return (
    <div className='lg'>
      <h2 className='head'>Delivery Details</h2>
   
    <div className='signup-form'>
   
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={emailState} onChange={emailChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Phone Number</label>
          <input type="number" className="form-control" name='phoneNumber' value={phoneNumberState} onChange={phoneNumberChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Area</label>
          <input type="text" className="form-control" name="address.area" value={areaState} onChange={areaChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">City</label>
          <input type="text" className="form-control" name="address.city" value={cityState} onChange={cityChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">State</label>
          <input type="text" className="form-control" name="address.state" value={stateState} onChange={stateChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Pin Code</label>
          <input type="number" className="form-control" name="address.pinCode" value={pinCodeState} onChange={pinCodeChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="locality" className="form-label">Locality</label>
          <input type="text" className="form-control" name="address.locality" value={localityState} onChange={localityChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Street</label>
          <input type="text" className="form-control" name="address.street" value={streetState} onChange={streetChangeHandler} />
        </div>
        <div className="mb-3">
          <p>Payment Method</p>
          <input type="radio" name="paymentMethod" value="COD" onChange={PaymentMethodChangeHandler} />
          <label htmlFor="location" className="form-label">Cash On Delivery</label>
          <input type="radio" name='paymentMethod' value="ONLINE" onChange={PaymentMethodChangeHandler} />
          <label htmlFor="location" className="form-label">ONLINE</label>
        </div>
        
        {/* <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" value={passState} onChange={passChangeHandler}/>
    </div> */}
        {/* <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label" htmlFor="remeber">Remember me</label>
    </div> */}
        <div className='SignUp-btns'>
          <button type="submit" className="btn btn-primary">Confirm Order</button>
        </div>
      </form>
    </div>
    </div>
  )
}
