import React, { useEffect, useState } from 'react'
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const loadData = async () => {
        try {
            let response = await fetch('/api/v1/my-order', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // let response = await axios.get('/api/v1/shops');
            response = await response.json()
            // console.log(response.shop);
            setOrderData(response.order);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className='my-cart'>
            <div className="hd"><h2> My Orders</h2></div>
            {
                (orderData.length === 0) ? <h1>No orders placed yet!</h1> :
                <div className='table-data'>                   
                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">quantity</th>
                                <th scope="col">Delivery Location</th>
                                <th scope="col">Contact info</th>
                            </tr>
                        </thead>
                        
                            {
                                orderData !== []
                                    ? orderData.map((order, i) => {
                                        return (
                                            <tbody>
                                                {
                                                    order.products.map((productData, j) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{j + 1}</th>
                                                                <td>{productData.name}</td>
                                                                <td>₹{productData.price}/-</td>
                                                                <td>{productData.quantity}</td>
                                                                <td>{order.shippingInfo.street}, {order.shippingInfo.area}, {order.shippingInfo.locality}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.pinCode}</td>
                                                                <td>{order.contact.phoneNumber}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        )

                                    }) : ""
                            }
 
                    </table>
                    </div>
            }
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
