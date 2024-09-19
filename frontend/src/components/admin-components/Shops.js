import React, { useEffect, useState } from 'react'

export default function Shops() {
  const [shopData, setShopData] = useState([]);
  const loadData = async () => {
    try {
      let response = await fetch('/api/v1/admin/shops', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // let response = await axios.get('/api/v1/shops');
      response = await response.json()
      // console.log(response.shop);
      setShopData(response.shop);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div><h2> Shops</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Shop Name</th>
            <th scope="col">Owner Name</th>
            <th scope="col">Contact no</th>
            <th scope="col">Address</th>
          </tr>
        </thead>


        <tbody>
          {
            shopData !== []
            && shopData.map((shop, i) => {
              return (

                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{shop.shopName}</td>
                  <td>{shop.ownerName}</td>
                  <td>{shop.phoneNumber}</td>
                  <td>{shop.address.area}, {shop.address.city}, {shop.address.state}, {shop.address.pinCode}</td>
                </tr>

              )
            })

          }
        </tbody>
      </table>

    </div>
  )

}
