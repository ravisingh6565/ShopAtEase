import React, { useState } from 'react';
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function SellerSignup() {
  const [nameState, setNameState] = useState('');
  const [shopnameState, setShopnameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [phoneNumberState, setPhoneNumberState] = useState('');
  const [areaState, setAreaState] = useState('');
  const [cityState, setCityState] = useState('');
  const [stateState, setStateState] = useState('');
  const [pinCodeState, setpinCodeState] = useState('');
  const [zipCodeState, setzipCodeState] = useState('');
  const [fileState, setFileState] = useState('');
  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setNameState(event.target.value);
  }
  const shopnameChangeHandler = (event) => {
    setShopnameState(event.target.value);
  }
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
  const zipCodeChangeHandler = (event) => {
    setzipCodeState(event.target.value);
  }
  const fileChangeHandler = (event) => {
    setFileState(event.target.files[0]);
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    const address = {
      state: stateState,
      city: cityState,
      pinCode: pinCodeState,
      zipCode: zipCodeState,
      area: areaState
    }

    try {
      //register seller
      let registerSeller = await fetch("/api/v1/register/seller", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      registerSeller = await registerSeller.json();
      console.log(registerSeller.success);

      if (registerSeller.success === true) {
        console.log(fileState);
        // const response = await fetch("/api/v1/register/shop",{
        //   method:'POST',
        //   headers:{
        //     'Content-Type': 'application/json'
        //   },
        //   body:JSON.stringify(inputData)
        // });
        const formData = new FormData();
        formData.append("ownerName", nameState);
        formData.append("shopName", shopnameState);
        formData.append("email", emailState);
        formData.append("phoneNumber", phoneNumberState);
        formData.append("address", JSON.stringify(address));
        formData.append("file", fileState);
        const response =await axios.post("/api/v1/register/shop",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (!response.data.success) {
          alert("Enter valid credentials");
        }
        console.log(response.data.shop);
      }
      else{
        alert("Login first to Register your shop");
      }
    } catch (error) {
      console.log(error.message);
    }


    setNameState('');
    setShopnameState('');
    setEmailState('');
    setPhoneNumberState('');
    setCityState('');
    setAreaState('');
    setStateState('');
    setpinCodeState('');
    setzipCodeState('');
    setFileState('');
    alert("Your Shop Has Been Successfully Registered");
    navigate('/seller-page');
  }
  return (
    <div>
    <h2 className='head'>Shop Details</h2>
    <div className='signup-form'>
      <form onSubmit={submitHandler} enctype="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Shop Name</label>
          <input type="text" className="form-control" name="shopName" value={shopnameState} onChange={shopnameChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Seller Name</label>
          <input type="text" className="form-control" name="ownerName" value={nameState} onChange={nameChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={emailState} onChange={emailChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Phone Number</label>
          <input type="number" className="form-control" name='phoneNumber' value={phoneNumberState} onChange={phoneNumberChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Shop Area</label>
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
          <input type="text" className="form-control" name="address.pinCode" value={pinCodeState} onChange={pinCodeChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">zipCode</label>
          <input type="text" className="form-control" name="address.zipCode" value={zipCodeState} onChange={zipCodeChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Upload Shop Image</label>
          <input type="file" onChange={fileChangeHandler} name="file" />
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}
