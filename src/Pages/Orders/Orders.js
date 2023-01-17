import React, { useEffect, useState } from 'react';
import useAuth from '../../custom-hooks/useAuth';
import OrderRow from './OrderRow';

const Orders = () => {
    const {currentUser}= useAuth();
    const [orders, setOrders] = useState('')


    useEffect(  () =>{
        fetch(`https://big-esupershop-server.vercel.app/allorders?email=${currentUser?.email}`)
        .then(res =>res.json())
        .then(data =>setOrders(data))

    },[currentUser?.email])
    return (
        <div className="overflow-x-auto">
  <table className="table table-compact w-full">
    <thead>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>email</th> 
        <th>number</th> 
        <th>address</th> 
        <th>city</th> 
        <th>code</th>
        <th>country</th>
        <th>TotalQty</th>
        <th>TotalAmount</th>
       
        
      </tr>
    </thead> 
    <tbody>
      { orders &&
        orders?.map((order,i) =><OrderRow key={order._id} order={order} i={i}></OrderRow>)
      }
       
   </tbody>     
  
  </table>
 
</div>
    );
};

export default Orders;