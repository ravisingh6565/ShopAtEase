import React, { useEffect, useState } from 'react'

export default function Users() {
    const [accounts, setAccounts] = useState([]);
    const loadData = async () => {
      try {
        let response = await fetch('/api/v1/admin/users', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // let response = await axios.get('/api/v1/shops');
        response = await response.json()
        // console.log(response.shop);
        setAccounts(response.users);
      } catch (error) {
        console.log(error.message);
      }
    }
    useEffect(() => {
      loadData();
    }, []);
    return (
      <div><h2> Accounts</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          
          <tbody>
            {
              accounts !== []
              && accounts.map((account, i) => {
                return (
  
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.role}</td>
                  </tr>
  
                )
              })
  
            }
          </tbody>
        </table>
  
      </div>
    )
}
