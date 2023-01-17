import React from 'react';
import {motion} from 'framer-motion';
import {  FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { cartActions } from '../Redux/Slices/cartSlice';
import { useDispatch } from 'react-redux';


const FilterItem = ({element}) => {
    const {_id,productName,imgUrl,price} = element;
    const dispatch = useDispatch()


    const addToCart =() =>{
        dispatch(
            cartActions.addItem({
            _id:_id,
            productName:productName,
            price:price,
            imgUrl:imgUrl,

        }))
        toast.success('Product Added Successful')
    }
    return (
        <div className="card card-compact shadow-xl">
        <figure>< motion.img whileHover={{scale:1.2}} className=''src={imgUrl} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title"><Link to={`/shop/${_id}`}>{productName}</Link></h2>
            <p>{price}</p>
            <button onClick={addToCart} className=''><span><Link><FaPlusCircle/></Link></span></button>
           <Toaster/>
        </div>
    </div>
    );
};

export default FilterItem;