import React from 'react'
import { useDispatchCart } from '../components/ContextReducer';

export default function PaymentSuccess() {
  const dispatch = useDispatchCart();
   dispatch({type:"REMOVE"});
    localStorage.removeItem("cart");
  return (
    <div>
        <h1>Order Successfully Placed</h1>
    </div>
  )
}
