import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from "react-router-dom";
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import logo from '../../src/images/logo.png'
import './Navbar.css'
import { useState } from 'react';


export default function Navbar(props) {
    const [searchKey, setSearchKey]= useState('');

    const changeHandler = (event)=>{
        setSearchKey(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        props.onSearch(searchKey);
      }
  const navigate = useNavigate();
  const handleLogout = async (event) => {
    
    try {
      let response = await fetch('/api/v1/logout', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // let response = await axios.get('/api/v1/shops');
      response = await response.json()
      console.log(response.message);
      localStorage.removeItem("authToken");
      navigate('/');
      // console.log(response.shop);
    } catch (error) {
      console.log(error.message);
    }
  }
  const noOfItems = ()=>{
    try {
      if (JSON.parse(localStorage.getItem("cart")).length > 0) {
          return JSON.parse(localStorage.getItem("cart")).length;
      }
  } catch (error) {
      console.log(error.message);
      return 0;
  }
  }
  return (
    <>
      <nav className="navbar">
        <div className='s1'>
        <img src={logo} alt='logo' className='logo'/>
        <form className='searchbar' onSubmit={submitHandler}>
                <input type='text' placeholder="   Search for products or shop" className='search' value={searchKey} onChange={changeHandler}/>
                <button className="btn " type="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg></button>
        </form>  
        {!localStorage.getItem("authToken") ?
            <div className='right'>
              <Link className="btn" to="/login"><span>Login</span></Link>
              <Link className="btn " to="/signup"><span>SignUp</span></Link>
            </div>
            : <div>
              <div className="btn" >
                <Link className='' to="/my-cart"><span>My Cart{' '}</span></Link>
                <Badge pill bf="danger">{noOfItems()}</Badge>
              </div>
              <div className="btn" onClick={handleLogout}><span>Logout</span></div>
            </div>}
        </div>               
        <div className='s2'>
          {/* <div className='d-inline-flex'> */}
            <Link className="Sacramento" to="/">Shop at Ease</Link>

            <div className='nav-options'>
  
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/"><span>Home</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/about"><span>About</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/FAQ"><span>FAQ</span></Link>
                </li>
                {
                  localStorage.getItem("authToken") ?
                  <div className="navbar-nav">
                  <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/seller-page"><span>I'm a Seller</span></Link>
                </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/my-orders"><span>My Orders</span></Link>
                    </li>
                    </div> : ""
                }
              </ul>
            </div>
            <div className="extra"><h6>Shop shop shop</h6></div>
          {/* </div> */}
          
        </div>
      </nav >
    </>

















    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
    //     <div className="container-fluid">
    //       <div className='d-inline-flex'>
    //         <Link className="navbar-brand fs-1 fst-italic" to="/">Shop At Ease</Link>
    //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //           <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <ul className="navbar-nav mb-2 nav-links">

    //           <li className="nav-item">
    //             <Link className="nav-link active" aria-current="page" to="/">Home</Link>
    //           </li>
    //           {
    //             localStorage.getItem("authToken") ?
    //             <div className="navbar-nav mb-2 nav-links">
    //             <li className="nav-item">
    //             <Link className="nav-link active" aria-current="page" to="/seller-page">Seller ?</Link>
    //           </li>
    //               <li className="nav-item">
    //                 <Link className="nav-link active" aria-current="page" to="/">My Orders</Link>
    //               </li>
    //               </div>
    //                : ""
    //           }
    //         </ul>
    //       </div>
    //       {!localStorage.getItem("authToken") ?
    //         <div>
              // <Link className="btn" to="/login">Login</Link>
              // <Link className="btn " to="/signup">SignUp</Link>
    //         </div>
    //         : <div>
    //           <div className="btn" >
                // My Cart{' '}
    //             <Badge pill bf="danger">2</Badge>
    //           </div>
              // <div className="btn" onClick={handleLogout}>Logout</div>
    //         </div>}
    //     </div>
    //   </nav >
    // </div>
  )
}
