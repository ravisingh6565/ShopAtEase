import React,{useState} from 'react';
import "./SignUp.css";
import {Link, useNavigate} from "react-router-dom";
import Marquee from 'react-fast-marquee'
import logo from '../../src/images/logo.png'



export default function SignUp() {
  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passState, setPassState] = useState('');
  const navigate= useNavigate();

  const nameChangeHandler = (event)=>{
    setNameState(event.target.value);
  }
  const emailChangeHandler = (event)=>{
    setEmailState(event.target.value);
  }
  const passChangeHandler = (event)=>{
    setPassState(event.target.value);
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    const inputData = {
      name : nameState,
      email: emailState,
      password: passState
    }
    const response = await fetch("/api/v1/register",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(inputData)
    });
    const json = await response.json();
    console.log(json);
    if(!json.success)
    {
      alert("Enter valid credentials");
    }

    setNameState('');
    setEmailState('');
    setPassState('');
    navigate('/login');
  }
  return (

    <div className='lg'>
    
     <Link className="nav-link active" aria-current="page" to="/"> <div className='logo-top'> <img src={logo} alt='logo' className='logo'/></div></Link>
    <div>
      <h2 className='head'>Sign Up</h2>
    
    <div className='signup-form'>
    <form onSubmit={submitHandler}>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">Name</label>
      <input type="text" className="form-control" name="username" value={nameState} onChange={nameChangeHandler}/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" name='email' value={emailState} onChange={emailChangeHandler}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" value={passState} onChange={passChangeHandler}/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label" htmlFor="remeber">Remember me</label>
    </div>
    <div className='SignUp-btns'>
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to="/login" className="btn btn-primary already-user">Already User ?</Link>
    </div>
  </form>
  </div>
  <div className='Mar'>
    <Marquee speed={100} direction='left'>
      <div>
        <h3>Welcome! SignUp to experience hassle free Grocery Shopping</h3>
      </div>
    </Marquee>
  </div>
  </div>
  </div>
  )
}
