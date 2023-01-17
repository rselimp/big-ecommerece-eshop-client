import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { cartActions } from '../Redux/Slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {

    const cartItems = useSelector(state =>state.cart.cartItems)
    const totalAmount = useSelector((state ) =>state.cart.totalAmount);

    return (
        <section className='mt-10 mb-10 flex-wrap lg:flex '>
           
               
            
            <div className="mx-auto lg:max-w-screen-lg grow">
                {
                    cartItems.length ===0 ? (
                    <h2 className='text-center text-2xl'>No item added to the card</h2>
                    ) : (
                        <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            cartItems.map((item,i) =>(
                            <Tr item ={item} key={i}/>
                        //     <tr key={i} className="hover">
                        //     <th>{i+1}</th>
                        //     <td><div className="avatar">
                        //         <div className="w-24 rounded-full">
                        //             <img src={item.imgUrl} alt='' />
                        //         </div>
                        //     </div></td>
                        //     <td>{item.productName}</td>
                        //     <td>{item.price}</td>
                        //     <td>{item.quantity}</td>
                        //     <td><FaTrashAlt></FaTrashAlt></td>
                           
                        // </tr>
                            ))}
        
                        </tbody>
                    </table>
                )}
           
        </div>
        <div className='text-center ml-5 mt-2'>
        <div>
            <p className=' flex justify-between'>Subtotal:<strong>${totalAmount}</strong></p>
            
        </div>
        <p className='flex justify-between'>taxes and shipping will calculate in checkout</p>
        <div>
            <button className='btn btn-sm border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-2 w-full mt-2'><Link to ='/shop'>Continue shopping</Link></button>
            <br />
            <button className='btn btn-sm border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full'><Link to ='/checkout'>Checkout</Link></button>
        </div>
        </div>
        </section>
    );
};

const Tr =({item}) =>{
    const dispatch = useDispatch();
    const deleteProduct =() =>{
        dispatch(cartActions.deleteItem(item._id))
    }
    return <tr>
    <th></th>
    <td><div className="avatar">
        <div className="w-24 rounded-full">
            <img src={item.imgUrl} alt='' />
        </div>
    </div></td>
    <td>{item.productName}</td>
    <td>{item.price}</td>
    <td>{item.quantity}</td>
    <td><Link><FaTrashAlt onClick={deleteProduct}></FaTrashAlt></Link></td>
   
</tr>
}

export default Cart;