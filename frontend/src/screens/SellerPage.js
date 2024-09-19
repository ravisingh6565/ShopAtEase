import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './SellerPage.css';
import logo from '../../src/images/logo.png'

export default function SellerPage() {
  const [isSeller, setIsSeller] = useState();
    const loadData = async () => {
        try {
            let response = await fetch('/api/v1/me', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // let response = await axios.get('/api/v1/shops');
        response = await response.json()
        // console.log(response.shop);
        if(response.user.role==="seller"){
        setIsSeller(true);
        }
        else{
          setIsSeller(false);
        }
        console.log(response.user.role)
        } catch (error) {
            console.log(error.message);
        }
        
    }

    useEffect(() => {
        loadData();
    }, []);
  return (
    <div className='lg'>
      
    <div className="container-seller">
    <div className='c1'>
      <div className='c2'>
      <div>      <Link className="nav-link active" aria-current="page" to="/"> <div className='logo-top'> <img src={logo} alt='logo' className='logo'/></div></Link>
</div>

        {
          (isSeller) ? <Link className="btn" to="/create-product">Create Shop Product</Link>
          : <Link className="btn" to="/seller-signup">Register Shop</Link>
        }
      </div>
    </div>      
  </div>  
  </div>
  )
}
