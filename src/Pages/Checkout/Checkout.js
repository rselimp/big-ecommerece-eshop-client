import React from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';

const Checkout = () => {
    const totalQty = useSelector(state=>state.cart.totalQuantity) 
    const totalAmount = useSelector(state =>state.cart.totalAmount)
    const {currentUser} = useAuth();

    const handlePlaceOrder =(event) =>{
        event.preventDefault()
        const form = event.target;
        const name= form.name.value;
        const email= currentUser?.email || 'unregistered';
        const number = form.number.value;
        const address = form.address.value;
        const city = form.city.value;
        const code = form.code.value;
        const country = form.country.value;

        const order ={
            customer :name,
            email,
            number,
            address,
            city,
            code,
            country,
            totalQty,
            totalAmount,
            
        }

        fetch('https://big-esupershop-server.vercel.app/orders',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
            if(data.acknowledged){
                toast.success('Order Place Successfully')
                form.reset();
            }

        })
        .catch(error =>console.error(error))


    }

   
    return (
        <form onSubmit={handlePlaceOrder} className='flex justify-evenly ml-10 gap-6 lg:gap-0 lg:m-0'>
            <div className='w-1/2'>
                <p>Billing Information</p>
                <div>
                    
                        <div className="form-control mb-4 mt-4">

                            <input type="text" name='name' placeholder="Enter your name" defaultValue={currentUser?.displayName} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control mb-4">

                            <input type="text" name='email' placeholder="Enter your email" defaultValue={currentUser?.email} className="input input-bordered" />
                        </div>
                        <div className="form-control mb-4">

                            <input type="number" name='number' placeholder="Enter your number" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-4">

                            <input type="text" name='address' placeholder="Streed address" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-4">

                            <input type="text" name='city' placeholder="city" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-4">

                            <input type="text" name='code' placeholder="Postal code" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-4">

                            <input name='country' type="text" placeholder="country" className="input input-bordered" />
                        </div>
                
                </div>
            </div>
            <div className="card bg-neutral text-neutral-content mt-10 w-80 h-80">
                <div className="card-body">
                    <h2 className="card-title">Total Qty: ${totalQty} items</h2>
                    <h2 className="card-title">Subtotal: ${totalAmount}</h2>
                    <h2 className="card-title">Shipping: $0</h2>
                    <h2 className="card-title">Total Cost: ${totalAmount}</h2>
                    <p>Products available returns</p>
                    <div className="card-actions justify-end">
                        <button type='submit' className=" border-0 btn bg-gradient-to-r from-cyan-500 to-blue-500 w-full"><Link to='/orders'>Place an order</Link></button>
                    </div>
                </div>
            </div>
            

        </form>
    );
};

export default Checkout;