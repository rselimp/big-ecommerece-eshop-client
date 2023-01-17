import React from 'react';
import productimage1 from '../../assets/images/arm-chair-01.jpg';
import {motion} from 'framer-motion';
import {  FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { cartActions } from '../Redux/Slices/cartSlice';
import { useDispatch } from 'react-redux';


const SearchItem = ({item}) => {
    const {_id,productName,imgUrl,price} = item;

   // console.log(productName)
    const dispatch = useDispatch();

    const addToCart =() =>{
        dispatch(
            cartActions.addItem({
            id:_id,
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
            <button onClick={addToCart} className=''><span><FaPlusCircle/></span></button>
           <Toaster/>
        </div>
    </div>
    );
};

export default SearchItem;