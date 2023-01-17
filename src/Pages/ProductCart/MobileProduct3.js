import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/Slices/cartSlice';
import {motion} from 'framer-motion';
import {  FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MobileProduct3 = ({mobileProduct}) => {
    const {_id,productName,imgUrl,price} = mobileProduct

    const dispatch = useDispatch()
    const addToCart =() =>{
        dispatch(
            cartActions.addItem({
                _id:_id,
                productName:productName,
                price:price,
                imgUrl:imgUrl
            })
        )

        toast.success('Product Added Successful')
    }
    return (
        <div className="card card-compact shadow-xl">
        <figure>< motion.img whileHover={{scale:1.2}} className=''src={imgUrl} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title"><Link to={`/shop/${_id}`}>{productName}</Link></h2>
            <p>{productName}</p>
            <p>{price}</p>
            <button onClick={addToCart} className=''><span><FaPlusCircle className='w-5 h-5'/></span></button>
            <Toaster/>
        </div>
    </div>
    );
};

export default MobileProduct3;