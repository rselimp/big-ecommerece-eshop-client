import React from 'react';
import { useSelector } from 'react-redux';

const OrderRow = ({order,i}) => {
    const{customer,email,number,address,city,code, country} = order;
    const totalQty = useSelector(state=>state.cart.totalQuantity) 
    const totalAmount = useSelector(state =>state.cart.totalAmount)
    return (
        <>
        <tr>
        <th>{i+1}</th> 
        <td>{customer}</td> 
        <td>{email}</td> 
        <td>{number}</td> 
        <td>{address}</td> 
        <td>{city}</td> 
        <td>{code}</td>
        <td>{country}</td>
        <td>{totalQty}</td>
        <td>{totalAmount}</td>
      
   
      </tr>
      <div>

      </div>
      </>
    );
};

export default OrderRow;