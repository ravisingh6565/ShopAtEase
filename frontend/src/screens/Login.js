import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import logo from '../../src/images/logo.png'
import Marquee from 'react-fast-marquee'
export default function Login() {
  const navigate = useNavigate();

  const [emailState, setEmailState] = useState('');
  const [passState, setPassState] = useState('');


  const emailChangeHandler = (event)=>{
    setEmailState(event.target.value);
  }
  const passChangeHandler = (event)=>{
    setPassState(event.target.value);
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    const inputData = {
      email: emailState,
      password: passState
        }
    const response = await fetch("/api/v1/login",{
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
    if(json.success){
      localStorage.setItem("authToken", json.token);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

    setEmailState('');
    setPassState('');
  }
  return (
    <div className='lg'>
     <Link className="nav-link active" aria-current="page" to="/"> <div className='logo-top'> <img src={logo} alt='logo' className='logo'/></div></Link>
      <h2 className='head'>Login</h2>
      <div className='signup-form'>        
        <form onSubmit={submitHandler}>
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
          <button type="submit" className="btn btn-primary">Login</button>
          <Link to="/signup" className="btn btn-primary already-user">New User ?</Link>
          </div>
        </form>
      </div>
      <div className='Mar'>
        <Marquee speed={100} direction='left'>
          <div>
            <h3>Welcome back to Shop at Ease!</h3>
          </div>
        </Marquee>
      </div>
      {/* <div className='lg'>
            <img src={logo} alt='logo' className='logo'/>
      </div> */}
  </div>
  )
}
