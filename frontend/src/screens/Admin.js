import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../components/admin-components/Dashboard';
import Orders from '../components/admin-components/Orders';
import Shops from '../components/admin-components/Shops';
import Accounts from '../components/admin-components/Accounts';

export default function Admin() {
    const [navigationState, setNavigationState] = useState('Dashboard');

    const dashboardNavigationHandler=()=>{
        setNavigationState('Dashboard')
    }
    const ordersNavigationHandler=()=>{
        setNavigationState('Orders')
    }
    const shopsNavigationHandler=()=>{
        setNavigationState('Shops')
    }
    const accountsNavigationHandler=()=>{
        setNavigationState('Accounts')
    }

    
    return (
        //   <div classNameName='admin'>
        //     <div classNameName='sidebar'>
        //         <ul>
        //             <li><Link to="/admin/dashboard">Dashboard</Link></li>
        //             <li><Link to="/admin/orders">Orders</Link></li>
        //             <li><Link to="/admin/sellers">Sellers</Link></li>
        //             <li><Link to="/admin/products">Products</Link></li>
        //             <li><Link to="/admin/users">Users</Link></li>
        //         </ul>
        //     </div>
        //   </div>
        <div className='admin-portal'>
            <div className='admin-navbar'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">ShopAtEase</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={dashboardNavigationHandler}>Dashboard <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={ordersNavigationHandler}>Orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={shopsNavigationHandler}>Shops</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={accountsNavigationHandler}>Accounts</a>
                            </li>
                        </ul>
                        {/* <span className="navbar-text">
      Navbar text with an inline element
    </span> */}
                    </div>
                </nav>
            </div>
                {(navigationState==="Dashboard")&&<Dashboard/>}
                {(navigationState==="Orders")&&<Orders/>}
                {(navigationState==="Shops")&&<Shops/>}
                {(navigationState==="Accounts")&&<Accounts/>}
        </div>
    );
}
