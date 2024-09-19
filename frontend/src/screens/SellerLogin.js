import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SellerLogin() {
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
    const response = await fetch("http://localhost:5000/api/seller-login",{
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
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

    setEmailState('');
    setPassState('');
  }
  return (
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
    <Link to="/seller-signup" className="btn btn-primary already-user">New Seller ?</Link>
    </div>
  </form>
  </div>
  )
}
